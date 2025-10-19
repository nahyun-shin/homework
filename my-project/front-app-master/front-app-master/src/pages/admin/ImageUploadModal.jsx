import React, { useState } from 'react';

function ImageUploadModal({ images, setImages, onClose }) {
  const [localFiles, setLocalFiles] = useState([]);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files).map(f => ({
      file: f,
      isMain: false,
    }));
    setLocalFiles(files);
  };

  const setMain = (index) => {
    setLocalFiles(prev => prev.map((f, i) => ({ ...f, isMain: i === index })));
  };

  const handleAdd = () => {
    setImages([...images, ...localFiles]);
    onClose();
  };

  return (
    <div className="modal-bg">
      <div className="modal-content">
        <h3>이미지 등록</h3>
        <input type="file" multiple onChange={handleFiles} />
        {localFiles.map((f, idx) => (
          <div key={idx}>
            <span>{f.file.name}</span>
            <button type="button" onClick={() => setMain(idx)}>
              {f.isMain ? '대표 이미지' : '대표로 선택'}
            </button>
          </div>
        ))}
        <button onClick={handleAdd}>추가</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default ImageUploadModal;
