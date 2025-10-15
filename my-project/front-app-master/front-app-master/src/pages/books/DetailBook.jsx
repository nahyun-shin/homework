import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { bookAPI } from "../../service/bookService";
import { useNavigate, useParams } from "react-router";
import "../../assets/css/detailBook.css";

function DetailBook() {
  const { bookId } = useParams();
  const id = parseInt(bookId, 10);
  const navigate = useNavigate();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["detailBook", id],
    queryFn: () => bookAPI.getBook(id),
  });

  console.log(book);

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
          <div className="img-body">
            <div className="img-bg">
              {book.fileList?.map((img) => (
                <div key={img.imgId} className="detail-img-wrap">
                  <img src={img.imageUrl} alt={img.fileName} />
                </div>
              ))}
            </div>
          </div>
          <div>{book.categoryName}</div>
          <div>
            {book.subTitle}|{book.writer}|{book.publisher}|{book.pubDate}|
            {book.content}|{book.price}|{book.stockYn}
          </div>
        
      </div>
    </div>
  );
}

export default DetailBook;
