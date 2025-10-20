import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { bookAPI } from "../../service/bookService";
import { useNavigate, useParams } from "react-router";
import "../../assets/css/detailBook.css";
import { goUpdate } from "../../hooks/menuData";

function DetailBook() {
  const { bookId } = useParams();
  const id = Number(bookId);
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminDetailBook", id],
    queryFn: () => bookAPI.getAdminBook(id),
    enabled: !isNaN(id), // id가 유효할 때만 조회
  });
  console.log(book);

  

  const goBookList = () => {
    navigate(`/admin/books`);
  };

  const prevImage = () => {
    setCurrentIndex((prev)=>(prev === 0?book.fileList.length-1:prev-1))
  };
  const nextImage = () => {
    setCurrentIndex((prev)=>(prev === book.fileList.length-1? 0:prev+1))
  };

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>책 정보를 불러오지 못했습니다.</div>;
  if (!book) return <div>해당 책이 존재하지 않습니다.</div>;

  return (
    <div className="content-body">
      <div className="detail-title-bg">
        <div className="title-wrap">
          <div className="title-label">
            {book.title}
            {book.subTitle?
            <p className="detail-sTitle">{book.subTitle}</p>:''}
          </div>
        </div>
      </div>
      <div className="content-bg">
        <div className="left-body">
          <div className="detail-img-wrap">
              <img src={book.fileList[currentIndex].imageUrl} alt={book.fileList[currentIndex].fileName} />
          </div>
          <div className="detail-img-button-wrap">
            <button onClick={prevImage}>이전</button>
            <span>{currentIndex+1} / {book.fileList.length}</span>
            <button onClick={nextImage}>다음</button>
          </div>
        </div>
        <div className="right-body">
          <div className="right-bg">
            <div className="detail-text-wrap">
              <p>카테고리 : {book.categoryName}</p>
              <p className="detail-pub">
                {book.writer}
              </p>
              <p className="detail-pub">
                {book.publisher}
              </p>
              <p className="detail-pub">
                {book.pubDate}
              </p>
              <p className="detail-price">
                {book.price}
                <span> 원</span>
              </p>
              {book.content?<p>{book.content}</p>:''}
              <p>총 {book.bookQty} 개</p>
              <p>도서 노출 여부 : {book.showYn ? "노출" : "비노출"}</p>
              <p>배너 노출 여부 : {book.bannerYn ? "노출" : "비노출"}</p>
            </div>

            <div className="content-list-button-bg dt">
              <button
                type="button"
                className="yellow-btn"
                onClick={()=>goUpdate(navigate,book.bookId)}
              >
                수정하기
              </button>
              <button type="button" className="cart-btn" onClick={goBookList}>
                목록가기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBook;
