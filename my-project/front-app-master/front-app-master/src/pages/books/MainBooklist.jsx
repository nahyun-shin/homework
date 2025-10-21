import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { bookAPI } from "../../service/bookService";
import "../../assets/css/MainBooklist.css";
import { Link, useNavigate } from "react-router";
import { goDetail } from "../../hooks/menuData.js";

function MainBookList() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  function insertLineBreaks(str, maxChars = 13) {
    if (!str) return "";
    let result = "";
    for (let i = 0; i < str.length; i += maxChars) {
      result += str.slice(i, i + maxChars) + "\n";
    }
    return result.trim();
  }

  const {
    data: bestBooks,
    isLoading: loadingBest,
    error: errorBest,
  } = useQuery({
    queryKey: ["main", "best"],
    queryFn: () => bookAPI.getBooksByType("best"),
  });
  console.log(bestBooks);

  const {
    data: newBooks,
    isLoading: loadingNew,
    error: errorNew,
  } = useQuery({
    queryKey: ["main", "new"],
    queryFn: () => bookAPI.getBooksByType("new"),
  });

  const {
    data: bannerBooks,
    isLoading: loadingBanner,
    error: errorBanner,
  } = useQuery({
    queryKey: ["main", "banner"],
    queryFn: () => bookAPI.getBooksByType("banner"),
  });

  useEffect(() => {
    if (!bannerBooks || bannerBooks.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % bannerBooks.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerBooks]);

  if (loadingBest || loadingNew || loadingBanner) return <div>Loading...</div>;

  if (errorBest || errorNew || errorBanner) return <div>Error occurred</div>;

  if (!bannerBooks || bannerBooks.length === 0)
    return <div>배너 도서가 없습니다.</div>;

  // 안전한 currentIndex 계산
  const validIndex = currentIndex % bannerBooks.length;

  return (
    <div className="main-container">
      <section className="banner-slider">
        {bannerBooks.map((book, index) => (
          <div
            key={book.bookId}
            className={`banner-slide ${
              index === validIndex ? "active" : "inactive"
            }`}
          >
            <p className="title">{book.title}</p>
            <div className="banner-bg">
              <div className="banner-slide-content">
                <div className="banner-slide-left">
                  <img src={book.mainImageUrl} alt={book.title} />
                </div>
                <div className="banner-slide-right">
                  <h2>{book.subTitle}</h2>
                  <p>{book.content}</p>
                  <button
                    className="bookmark-btn"
                    onClick={() =>
                      goDetail(navigate, book.categoryId, book.bookId)
                    }
                    aria-label="책갈피 버튼"
                  >
                    둘러보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="indicator-container">
          {bannerBooks.map((_, index) => (
            <span
              key={index}
              className={`indicator-dot ${
                index === validIndex ? "active" : ""
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`슬라이드 ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 베스트 영역 */}
      <section className="best-books">
        <div className="title-wrap">
          <div className="circle"></div>
          <span>BEST</span>
          <Link
            to="/best"
            className="more-link"
            aria-label="베스트 도서 더보기"
          >
            더보기 &gt;
          </Link>
        </div>
        <div className="book-list">
          {bestBooks?.map((book) => (
            <div key={book.bookId} className="book-wrap">
              <div
                className="img-wrap"
                onClick={() => goDetail(navigate, book.categoryId, book.bookId)}
                style={{ cursor: "pointer" }}
              >
                <img src={book.mainImageUrl} alt={book.title} />
              </div>
              <span className="list-pub">{book.publisher}</span>
              <span
                className="list-title"
                onClick={() => goDetail(navigate, book.categoryId, book.bookId)}
                style={{whiteSpace:"pre-line"}}
              >
                {insertLineBreaks(book.title)}
              </span>

              <span className="list-price">
                {book.price}
                <span className="list-price-won"> 원</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 뉴 영역 */}
      <section className="new-books">
        <div className="title-wrap">
          <div className="circle"></div>
          <span>NEW</span>
          <Link
            to="/new/week"
            className="more-link"
            aria-label="베스트 도서 더보기"
          >
            더보기 &gt;
          </Link>
        </div>
        <div className="book-list">
          {newBooks?.map((book) => (
            <div key={book.bookId} className="book-wrap">
              <div
                className="img-wrap"
                onClick={() => goDetail(navigate, book.categoryId, book.bookId)}
              >
                <img src={book.mainImageUrl} alt={book.title} />
              </div>
              <span className="list-pub">{book.publisher}</span>
              <span
                className="list-title"
                onClick={() => goDetail(navigate, book.categoryId, book.bookId)}
                style={{whiteSpace:"pre-line"}}
              >
                {insertLineBreaks(book.title)}
              </span>

              <span className="list-price">
                {book.price}
                <span className="list-price-won"> 원</span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MainBookList;
