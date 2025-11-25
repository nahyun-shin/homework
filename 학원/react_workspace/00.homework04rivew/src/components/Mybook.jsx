import React, { useState } from "react";
import "../assets/css/mybook.css";

function Mybook({ logUser, rentalBookList, returnBookEvt }) {
  const [checkList, setCheckList] = useState([]);
  const checkBooksEvt = (e) => {
    const {value, checked} = e.target;

    if (checked) {
      setCheckList((prev) => [...prev, Number(value)]);
    } else {
      //체크풀린애들은 제외
      setCheckList((prev) => prev.filter((brId) => brId !== Number(value)));
    }
  };

  const returnBooksEvt = () => {
    if (checkList.length === 0) {
      alert("반납할책선택해주세요");
      return false;
    }

    returnBookEvt(checkList);
    //대여목록 변경 시 체크 풀기
    setCheckList([]);
  };

  return (
    <div className="my-list">
      <div>
        <h3>대여목록</h3>
      </div>
      <div className="text-end mb-3">
        <button
          type="button"
          className="btn btn-success me-2"
          onClick={returnBooksEvt}
        >
          반납
        </button>
      </div>
      <div className="borrow-list">
        {rentalBookList
          ?.filter((book) => book.userName === logUser)
          .map((book) => (
            <div className="mx-2" key={`b_${book.bookId}`}>
              <input
                type="checkbox"
                checked={checkList.includes(book.bookId)}
                onChange={checkBooksEvt}
                value={book.bookId}
              />
              <span className="ms-1">{book.bookName}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Mybook;
