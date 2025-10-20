import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { bookAPI } from "../../service/bookService";
import { useNavigate, useParams } from "react-router";
import "../../assets/css/detailBook.css";
import axios from "axios";

function DetailBook() {
  const { categoryId, bookId } = useParams();
  const catId = parseInt(categoryId, 10);
  const id = parseInt(bookId, 10);
  const navigate = useNavigate();
  const [countNum, setCountNum] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["detailBook", catId, id],
    queryFn: () => bookAPI.getBook(catId, id),
  });

  useEffect(() => {
    if (book) {
      console.log("📚 book data:", book);
    }
  }, [book]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>책 정보를 불러오지 못했습니다.</div>;
  if (!book) return <div>해당 책이 존재하지 않습니다.</div>;

  const prevImage = () => {
    setCurrentIndex((prev)=>(prev === 0?book.fileList.length-1:prev-1))
  };
  const nextImage = () => {
    setCurrentIndex((prev)=>(prev === book.fileList.length-1? 0:prev+1))
  };



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
              <p className="sold-out">{book.stockYn ? "" : "품절"}</p>
              <p className="detail-pub">
                {book.writer} · {book.publisher} · {book.pubDate}
              </p>
              {book.content?<p>{book.content}</p>:''}
              
              <p className="detail-price">
                {book.price}
                <span className="detail-price-won"> 원</span>
              </p>
            </div>

            <div className="count-bg">
              <button
                onClick={() => setCountNum((prev) => Math.max(0, prev - 1))}
              >
                -
              </button>
              {countNum}
              <button onClick={() => setCountNum((prev) => prev + 1)}>+</button>
            </div>

            <div className="content-list-button-bg dt">
              <button type="button" className="yellow-btn">
                구매하기
              </button>
              <button type="button" className="cart-btn">
                장바구니
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailBook;
