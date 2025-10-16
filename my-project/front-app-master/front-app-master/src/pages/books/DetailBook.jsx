import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { bookAPI } from "../../service/bookService";
import { useNavigate, useParams } from "react-router";
import "../../assets/css/detailBook.css";

function DetailBook() {
  const { bookId } = useParams();
  const id = parseInt(bookId, 10);
  const navigate = useNavigate();
  const [countNum,setCountNum] = useState(0);

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["detailBook", id],
    queryFn: () => bookAPI.getBook(id),
  });



  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>책 정보를 불러오지 못했습니다.</div>;
  if (!book) return <div>해당 책이 존재하지 않습니다.</div>;
  return (
    <div className="content-body">
      <div className="detail-title-bg">
        <div className="title-wrap">
          <div className="title-label">{book.title}</div>
        </div>
      </div>
      <div className="content-bg">
          <div className="left-body">
            
              {book.fileList?.map((img) => (
                <div key={img.imgId} className="detail-img-wrap">
                  <img src={img.imageUrl} alt={img.fileName} />
                </div>
              ))}
            
          </div>
          <div className="right-body">
            <div className="right-bg">

            <div className="detail-text-wrap">
              {/* <span>
                {book.stockYn}
              </span> */}
              <span>
                카테고리 : {book.categoryName}
              </span>
              <span className="detail-sTitle">
                {book.subTitle}
              </span>
              <span className="detail-pub">
                {book.writer} · {book.publisher} · {book.pubDate}
              </span>
              <span className="detail-price">
                {book.price}
                <span> 원</span>
              </span>
            </div>

            <div className="count-bg">
              <button onClick={() => setCountNum(prev => Math.max(0, prev - 1))}>-</button>
              {countNum}
              <button onClick={() => setCountNum(prev => prev + 1)}>+</button>
            </div>

            <div className="content-list-button-bg dt">
                <button type="button" id="buy-btn">구매하기</button>
                <button type="button" id="cart-btn">장바구니</button>
            </div>
            </div>
              <span>
                {book.content}
              </span>
          </div>
      </div>
    </div>
  );
}

export default DetailBook;
