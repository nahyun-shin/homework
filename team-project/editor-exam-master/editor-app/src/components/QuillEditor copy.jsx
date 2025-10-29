import { useMemo, useRef, useEffect, useCallback, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const QuillEditor = ({
  value,
  onChange,
  authToken,
  uploadUrl = '/api/v1/book/ed/img',
  fileField = 'img',
  height = 800,
  placeholder = '내용을 입력하세요...',
}) => {
  const quillRef = useRef(null);          // ReactQuill ref
  const quillInstanceRef = useRef(null);  // 실제 Quill 인스턴스
  const [isReady, setIsReady] = useState(false);

  // (선택) 모듈 등록이 필요하면 여기서 한번만 하세요.
  // 현재는 별도 등록 모듈 없음. 필요 시 try/catch로 Quill 모듈 등록 후 setIsReady 영향 X.

  /** Quill 인스턴스를 안전하게 획득 (마운트 후 첫 이벤트에서만) */
  const ensureEditor = useCallback(() => {
    if (quillInstanceRef.current) return; // 이미 잡았으면 패스
    try {
      const q = quillRef.current?.getEditor();
      if (q) {
        quillInstanceRef.current = q;
        setIsReady(true);
      }
    } catch (error) {
      // 아직 미초기화 상태일 수 있으니 조용히 무시
    }
  }, []);

  /** 이미지 업로드 → URL 삽입 */
  const uploadAndInsert = useCallback(
    async (file) => {
      if (!file) return;
      const editor = quillInstanceRef.current;
      if (!editor) return; // 아직 준비 전이면 무시

      const fd = new FormData();
      fd.append(fileField, file);

      const res = await fetch(uploadUrl, {
        method: 'POST',
        headers: authToken ? { Authorization: `Bearer ${authToken}` } : {},
        body: fd,
      });
      if (!res.ok) throw new Error('이미지 업로드 실패');

      const data = await res.json();
      const imageUrl = data.imageUrl || data.url;
      if (!imageUrl) throw new Error('서버 응답에 이미지 URL이 없습니다');

      const range = editor.getSelection(true);
      editor.insertEmbed(range.index, 'image', imageUrl, 'user');
      editor.setSelection(range.index + 1);
    },
    [authToken, uploadUrl, fileField]
  );

  /** 툴바의 이미지 버튼 핸들러 */
  const imageHandler = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.click();
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        await uploadAndInsert(file);
      } catch (e) {
        console.error(e);
        alert('이미지 업로드에 실패했습니다.');
      }
    };
  }, [uploadAndInsert]);

  /** 붙여넣기 이미지 처리 */
  useEffect(() => {
    if (!isReady) return;
    const editor = quillInstanceRef.current;
    if (!editor) return;

    const root = editor.root;
    const onPaste = async (e) => {
      const cd = e.clipboardData;
      if (!cd) return;
      const items = Array.from(cd.items);
      const img = items.find((it) => it.type?.startsWith('image/'));
      if (!img) return;

      e.preventDefault();
      e.stopPropagation();

      const file = img.getAsFile();
      if (!file) return;
      try {
        await uploadAndInsert(file);
      } catch (err) {
        console.error(err);
        alert('이미지 붙여넣기에 실패했습니다.');
      }
    };

    root.addEventListener('paste', onPaste);
    return () => root.removeEventListener('paste', onPaste);
  }, [isReady, uploadAndInsert]);

  /** 드래그&드롭 이미지 처리 */
  useEffect(() => {
    if (!isReady) return;
    const editor = quillInstanceRef.current;
    if (!editor) return;

    const el = editor.root;

    const onDrop = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const files = Array.from(e.dataTransfer?.files || []);
      const images = files.filter((f) => f.type.startsWith('image/'));
      try {
        for (const f of images) {
          await uploadAndInsert(f);
        }
      } catch (err) {
        console.error(err);
        alert('이미지 업로드에 실패했습니다.');
      }
    };

    const onDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    el.addEventListener('drop', onDrop, true);
    el.addEventListener('dragover', onDragOver, true);
    return () => {
      el.removeEventListener('drop', onDrop, true);
      el.removeEventListener('dragover', onDragOver, true);
    };
  }, [isReady, uploadAndInsert]);

  /** 모듈/포맷은 useMemo로 고정 (재마운트 방지) */
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
      // 필요시 clipboard, history 등 추가
    }),
    [imageHandler]
  );

  const formats = useMemo(
    () => [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'list',
      'color',
      'background',
      'align',
      'link',
      'image',
    ],
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
      /* 에디터가 살아있는 시점의 이벤트에서만 한번 인스턴스 확보 */
      onFocus={ensureEditor}
      onChangeSelection={ensureEditor}
    />
  );
};

export default QuillEditor;
