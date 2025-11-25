import React, { useState } from "react";

function Usebook({ userBook, logInfo, isLog, onReturnSelectedBooks }) {
  const [chkReturn, setChkReturn] = useState([]);

  if (!isLog) return null;

  const handleChkReturn = (id) => {
    setChkReturn((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h2>{logInfo}님의 개인 서재</h2>
      {Array.isArray(userBook) && userBook.length > 0 ? (
        <>
          <button onClick={() => onReturnSelectedBooks(chkReturn)}>
            선택한 책 반납
          </button>
          <ul>
            {userBook.map((book) => (
              <span key={book.id}>
                <input
                  type="checkbox"
                  checked={chkReturn.includes(book.id)}//체크박스에 해당 id의 책이 있는지 여부 리턴
                  onChange={() => handleChkReturn(book.id)}
                />
                {book.name}
              </span>
            ))}
          </ul>
        </>
      ) : (
        <p>아직 빌린 책이 없습니다.</p>
      )}
    </div>
  );
}

export default React.memo(Usebook);
