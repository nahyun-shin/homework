import React, { useMemo, useRef, useCallback, useEffect } from 'react';
import 'react-quill-new/dist/quill.snow.css';

import ReactQuill, { Quill } from 'react-quill-new';
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

  // 이미지 리사이즈 함수 (pica 사용)
  const resizeImage = useCallback(async (file) => {
    const img = await new Promise((res, rej) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.onload = () => { URL.revokeObjectURL(url); res(image); };
      image.onerror = rej;
      image.src = url;
    });

    const ratio = Math.min(1, maxWidth / img.width, maxHeight / img.height);
    if (ratio === 1) {
      return file;
    }

    const targetW = Math.round(img.width * ratio);
    const targetH = Math.round(img.height * ratio);

    const from = document.createElement('canvas');
    const to   = document.createElement('canvas');
    from.width = img.width;   from.height = img.height;
    to.width   = targetW;     to.height   = targetH;
    from.getContext('2d').drawImage(img, 0, 0);

    try {
      const pica = (await import('pica')).default();
      await pica.resize(from, to, { quality: 3 });
      const blob = await pica.toBlob(to, outMime, quality);
      return new File([blob],
                      file.name.replace(/\.\w+$/, outMime === 'image/png' ? '.png' : '.jpg'),
                      { type: outMime });
    } catch (e) {
      console.warn('pica 리사이즈 실패, 기본 canvas 사용', e);
      const blob = await new Promise((r) => to.toBlob(r, outMime, quality));
      if (!blob) throw new Error('canvas toBlob 실패');
      return new File([blob],
                      file.name.replace(/\.\w+$/, outMime === 'image/png' ? '.png' : '.jpg'),
                      { type: outMime });
    }
  }, [maxWidth, maxHeight, outMime, quality]);

  // 서버 업로드 함수
  const uploadFile = useCallback(async (file) => {
    const fd = new FormData();
    fd.append(fileField, file);
    console.log('이미지 업로드')
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

  // 커스텀 이미지 핸들러
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        // 이미지 리사이즈 후 업로드
        const resized = await resizeImage(file);
        const url = await uploadFile(resized);

        // 에디터에 이미지 삽입
        const editor = quillRef.current?.getEditor();
        if (editor) {
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, 'image', url);
          editor.setSelection(range.index + 1);
        }
      } catch (err) {
        console.error('이미지 업로드 실패:', err);
        alert('이미지 업로드에 실패했습니다.');
      }
    };
  }, [resizeImage, uploadFile]);

  // URL에서 이미지를 다운로드하여 리사이즈 후 재업로드
  const reuploadResizedImage = useCallback(async (imgElement, newWidth, newHeight) => {
    try {
      const originalSrc = imgElement.getAttribute('data-original-src') || imgElement.src;
      console.log(originalSrc)

      // 절대 URL을 상대 경로로 변환 (프록시를 통해 요청하기 위함)
      let imagePath = originalSrc;
      try {
        const url = new URL(originalSrc);
        imagePath = url.pathname; // /img/editor/xxx.jpg 형태로 변환
      } catch (e) {
        // 이미 상대 경로인 경우 그대로 사용
      }

      // 이미지를 fetch로 가져오기 (responseType: 'blob' 추가)
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

      const file = new File([resizedBlob], 'resized.jpg', { type: outMime });

      // 서버에 업로드
      const newUrl = await uploadFile(file);

      // 원본 URL 저장 (처음 한 번만)
      if (!imgElement.getAttribute('data-original-src')) {
        imgElement.setAttribute('data-original-src', originalSrc);
      }

      // 새 URL로 교체
      imgElement.src = newUrl;

    } catch (err) {
      console.error('이미지 재업로드 실패:', err);
    }
  }, [uploadFile, outMime, quality]);

  // 드래그앤드롭 핸들러 설정
  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const editorElement = editor.root;
    let isUploading = false;

    const handleDrop = async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (isUploading) return;

      const files = e.dataTransfer?.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      if (!file.type.startsWith('image/')) return;

      isUploading = true;

      try {
        const resized = await resizeImage(file);
        const url = await uploadFile(resized);

        const range = editor.getSelection(true);
        editor.insertEmbed(range.index, 'image', url);
        editor.setSelection(range.index + 1);
      } catch (err) {
        console.error('이미지 업로드 실패:', err);
        alert('이미지 업로드에 실패했습니다.');
      } finally {
        isUploading = false;
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handlePaste = async (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          e.preventDefault();
          e.stopPropagation();

          const file = items[i].getAsFile();
          if (!file) continue;

          try {
            const resized = await resizeImage(file);
            const url = await uploadFile(resized);

            const range = editor.getSelection(true);
            editor.insertEmbed(range.index, 'image', url);
            editor.setSelection(range.index + 1);
          } catch (err) {
            console.error('이미지 업로드 실패:', err);
            alert('이미지 업로드에 실패했습니다.');
          }
          break;
        }
      }
    };

    // 캡처 단계에서 이벤트 가로채기
    editorElement.addEventListener('drop', handleDrop, true);
    editorElement.addEventListener('dragover', handleDragOver, true);
    editorElement.addEventListener('paste', handlePaste, true);

    return () => {
      editorElement.removeEventListener('drop', handleDrop, true);
      editorElement.removeEventListener('dragover', handleDragOver, true);
      editorElement.removeEventListener('paste', handlePaste, true);
    };
  }, [resizeImage, uploadFile]);

  // 간단한 이미지 리사이즈 - 이미지를 직접 드래그로 리사이즈
  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const editorElement = editor.root;

    // CSS 스타일 추가
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

    const handleImageClick = (e) => {
      if (e.target.tagName === 'IMG') {
        selectedImage = e.target;
        selectedImage.classList.add('resizing');
        alert('이미지를 우클릭하고 드래그하여 크기를 조정하세요.');
      }
    };

    const handleImageMouseDown = (e) => {
      if (e.target.tagName === 'IMG' && e.button === 2) { // 우클릭
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

    const handleMouseUp = async (e) => {
      if (isResizing && selectedImage) {
        isResizing = false;
        selectedImage.classList.remove('resizing');

        const width = selectedImage.offsetWidth;
        const height = selectedImage.offsetHeight;

        // 리사이즈 후 재업로드
        if (width !== selectedImage.naturalWidth) {
          await reuploadResizedImage(selectedImage, width, height);
        }

        selectedImage = null;
      }
    };

    const handleContextMenu = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
      }
    };

    editorElement.addEventListener('click', handleImageClick);
    editorElement.addEventListener('mousedown', handleImageMouseDown);
    editorElement.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      editorElement.removeEventListener('click', handleImageClick);
      editorElement.removeEventListener('mousedown', handleImageMouseDown);
      editorElement.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.head.removeChild(style);
    };
  }, [reuploadResizedImage]);

  const modules = useMemo(() => ({
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
      handlers: {
        image: imageHandler,
      },
    },
  }), [imageHandler]);

  const formats = useMemo(() => [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'color', 'background', 'align', 'link', 'image',
  ], []);

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
