import React, { useMemo, useRef, useCallback, useEffect } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import axios from 'axios';

export default function QuillEditor({
  value,
  onChange,
  authToken,
  uploadUrl = '/api/v1/book/ed/img',
  fileField = 'img',
  placeholder = '내용을 입력하세요…',
  height = 500,
  maxWidth = 1600,
  maxHeight = 1600,
  outMime = 'image/jpeg',
  quality = 0.9,
}) {
  const quillRef = useRef(null);
  const resizeImageRef = useRef(null);
  const uploadFileRef = useRef(null);
  const insertImageToEditorRef = useRef(null);
  const reuploadResizedImageRef = useRef(null);

  // ========== 유틸리티 함수 ==========

  // URL에서 파일 이름 추출
  const extractFilenameFromUrl = useCallback((url) => {
    try {
      const pathname = new URL(url).pathname;
      return pathname.split('/').pop() || 'image.jpg';
    } catch {
      // 상대 경로인 경우
      return url.split('/').pop() || 'image.jpg';
    }
  }, []);

  // ========== 이미지 처리 함수 ==========

  // 이미지 리사이즈 (pica 사용)
  const resizeImage = useCallback(async (file) => {
    const img = await new Promise((res, rej) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => { URL.revokeObjectURL(url); res(image); };
      image.onerror = rej;
      image.src = url;
    });

    const ratio = Math.min(1, maxWidth / img.width, maxHeight / img.height);
    if (ratio === 1) return file;

    const targetW = Math.round(img.width * ratio);
    const targetH = Math.round(img.height * ratio);

    const from = document.createElement('canvas');
    const to = document.createElement('canvas');
    from.width = img.width;
    from.height = img.height;
    to.width = targetW;
    to.height = targetH;
    from.getContext('2d').drawImage(img, 0, 0);

    try {
      const pica = (await import('pica')).default();
      await pica.resize(from, to, { quality: 3 });
      const blob = await pica.toBlob(to, outMime, quality);
      const ext = outMime === 'image/png' ? '.png' : '.jpg';
      return new File([blob], file.name.replace(/\.\w+$/, ext), { type: outMime });
    } catch (e) {
      console.warn('pica 리사이즈 실패, 기본 canvas 사용', e);
      const blob = await new Promise((r) => to.toBlob(r, outMime, quality));
      if (!blob) throw new Error('canvas toBlob 실패');
      const ext = outMime === 'image/png' ? '.png' : '.jpg';
      return new File([blob], file.name.replace(/\.\w+$/, ext), { type: outMime });
    }
  }, [maxWidth, maxHeight, outMime, quality]);

  // 서버 업로드
  const uploadFile = useCallback(async (file) => {
    const fd = new FormData();
    fd.append(fileField, file);

    const res = await fetch(uploadUrl, {
      method: 'POST',
      headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
      body: fd,
    });


    if (!res.ok) throw new Error('이미지 업로드 실패');

    const data = await res.json();
    const url = data.imageUrl || data.url;
    if (!url) throw new Error('서버 응답에 URL이 없습니다');

    return url;
  }, [authToken, uploadUrl, fileField]);

  // 에디터에 이미지 삽입
  const insertImageToEditor = useCallback((url) => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, 'image', url);
      editor.setSelection(range.index + 1);
    }
  }, []);

  // 이미지 업로드 및 삽입 통합 함수
  const handleImageUpload = useCallback(async (file) => {
    try {
      const resized = await resizeImage(file);
      const url = await uploadFile(resized);
      insertImageToEditor(url);
    } catch (err) {
      console.error('이미지 업로드 실패:', err);
      alert('이미지 업로드에 실패했습니다.');
    }
  }, [resizeImage, uploadFile, insertImageToEditor]);

  // ref에 최신 함수들 저장
  useEffect(() => {
    resizeImageRef.current = resizeImage;
    uploadFileRef.current = uploadFile;
    insertImageToEditorRef.current = insertImageToEditor;
  }, [resizeImage, uploadFile, insertImageToEditor]);

  // ========== 이벤트 핸들러 ==========

  // 툴바 이미지 버튼 핸들러
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) await handleImageUpload(file);
    };
  }, [handleImageUpload]);

  // URL에서 이미지를 다운로드하여 리사이즈 후 재업로드
  const reuploadResizedImage = useCallback(async (imgElement, newWidth, newHeight) => {
    try {
      // 현재 src (가장 최근에 업로드된 이미지)
      const currentSrc = imgElement.src;

      // 현재 파일 이름 추출 (서버에서 이전 파일 삭제용)
      const currentFilename = extractFilenameFromUrl(currentSrc);

      // 절대 URL을 상대 경로로 변환
      let imagePath = currentSrc;
      try {
        const url = new URL(currentSrc);
        imagePath = url.pathname;
      } catch (e) {
        // 이미 상대 경로인 경우 그대로 사용
      }

      // 이미지 다운로드
      const response = await axios.get(imagePath, { responseType: 'blob' });
      const blob = response.data;

      // Canvas로 리사이즈
      const img = await new Promise((res, rej) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => res(image);
        image.onerror = rej;
        image.src = URL.createObjectURL(blob);
      });

      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, newWidth, newHeight);

      // Canvas를 blob으로 변환
      const resizedBlob = await new Promise((resolve) => {
        canvas.toBlob(resolve, outMime, quality);
      });

      // 현재 파일 이름으로 File 객체 생성 (서버에서 이전 파일 삭제 가능)
      const file = new File([resizedBlob], currentFilename, { type: outMime });

      // 서버에 업로드
      const newUrl = await uploadFile(file);

      // 새 URL로 교체
      imgElement.src = newUrl;
    } catch (err) {
      console.error('이미지 재업로드 실패:', err);
    }
  }, [uploadFile, outMime, quality, extractFilenameFromUrl]);

  // ref에 최신 함수 저장
  useEffect(() => {
    reuploadResizedImageRef.current = reuploadResizedImage;
  }, [reuploadResizedImage]);

  // ========== useEffect 훅 ==========

  // 드래그앤드롭 및 붙여넣기 핸들러 설정
  useEffect(() => {
    let timeoutId = null;
    let cleanupFn = null;

    const setupListeners = () => {
      const editor = quillRef.current?.getEditor();
      if (!editor) {
        // 에디터가 준비될 때까지 재시도
        timeoutId = setTimeout(setupListeners, 50);
        return;
      }

      const editorElement = editor.root;
      let isUploading = false;

      const uploadAndInsert = async (file) => {
        try {
          // ref를 통해 최신 함수 호출
          const resized = await resizeImageRef.current(file);
          const url = await uploadFileRef.current(resized);
          insertImageToEditorRef.current(url);
        } catch (err) {
          console.error('이미지 업로드 실패:', err);
          alert('이미지 업로드에 실패했습니다.');
        }
      };

      const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (isUploading) return;

        const file = e.dataTransfer?.files?.[0];
        if (!file || !file.type.startsWith('image/')) return;

        isUploading = true;
        await uploadAndInsert(file);
        isUploading = false;
      };

      const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };

      const handlePaste = async (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        for (const item of items) {
          if (item.type.startsWith('image/')) {
            e.preventDefault();
            e.stopPropagation();

            const file = item.getAsFile();
            if (file) await uploadAndInsert(file);
            break;
          }
        }
      };

      editorElement.addEventListener('drop', handleDrop, true);
      editorElement.addEventListener('dragover', handleDragOver, true);
      editorElement.addEventListener('paste', handlePaste, true);

      // cleanup 함수 저장
      cleanupFn = () => {
        editorElement.removeEventListener('drop', handleDrop, true);
        editorElement.removeEventListener('dragover', handleDragOver, true);
        editorElement.removeEventListener('paste', handlePaste, true);
      };
    };

    setupListeners();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (cleanupFn) cleanupFn();
    };
  }, []);

  // 이미지 드래그 리사이즈 핸들러 설정
  useEffect(() => {
    let timeoutId = null;
    let cleanupFn = null;

    const setupResizeHandlers = () => {
      const editor = quillRef.current?.getEditor();
      if (!editor) {
        // 에디터가 준비될 때까지 재시도
        timeoutId = setTimeout(setupResizeHandlers, 50);
        return;
      }

      const editorElement = editor.root;

      // 이미지 리사이즈 스타일
      const style = document.createElement('style');
      style.textContent = `
        .ql-editor img {
          cursor: pointer;
          max-width: 100%;
        }
        .ql-editor img.resizing {
          outline: 2px solid #4285f4;
          opacity: 0.8;
        }
        .ql-editor img:hover {
          outline: 1px dashed #4285f4;
        }
      `;
      document.head.appendChild(style);

      let selectedImage = null;
      let isResizing = false;
      let startX, startWidth;

      const handleImageMouseDown = (e) => {
        if (e.target.tagName === 'IMG' && e.button === 0) {
          e.preventDefault();
          selectedImage = e.target;
          isResizing = true;
          startX = e.clientX;
          startWidth = selectedImage.offsetWidth;
          selectedImage.classList.add('resizing');
        }
      };

      const handleMouseMove = (e) => {
        if (isResizing && selectedImage) {
          const deltaX = e.clientX - startX;
          const newWidth = Math.max(50, startWidth + deltaX);
          selectedImage.style.width = `${newWidth}px`;
        }
      };

      const handleMouseUp = async () => {
        if (isResizing && selectedImage) {
          isResizing = false;
          selectedImage.classList.remove('resizing');

          const width = selectedImage.offsetWidth;
          const height = selectedImage.offsetHeight;

          // 리사이즈 후 재업로드 (ref를 통해 최신 함수 호출)
          if (width !== selectedImage.naturalWidth && reuploadResizedImageRef.current) {
            await reuploadResizedImageRef.current(selectedImage, width, height);
          }

          selectedImage = null;
        }
      };

      editorElement.addEventListener('mousedown', handleImageMouseDown);
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      // cleanup 함수 저장
      cleanupFn = () => {
        editorElement.removeEventListener('mousedown', handleImageMouseDown);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        if (style.parentNode) {
          document.head.removeChild(style);
        }
      };
    };

    setupResizeHandlers();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (cleanupFn) cleanupFn();
    };
  }, []);

  // ========== Quill 설정 ==========

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [imageHandler]
  );

  const formats = useMemo(
    () => ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'color', 'background', 'align', 'link', 'image'],
    []
  );

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      placeholder={placeholder}
      style={{ height: `${height}px`, marginBottom: 50 }}
    />
  );
}
