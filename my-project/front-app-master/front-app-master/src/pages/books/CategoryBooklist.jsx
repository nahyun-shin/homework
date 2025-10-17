import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../compoents/Pagination";
import '../../assets/css/CategoryBooklist.css';
import { bookAPI } from "../../service/bookService";
import { goDetail } from '../../hooks/menuData.js';

function CategoryBooklist({ showSideMenu }) {
  const { categoryId: paramCategoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // -------------------------
  // URL query 기반으로 상태 설정
  // -------------------------
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') ?? '';
  const currentSort = queryParams.get('sort') ?? 'createDate,desc';
  const currentPage = parseInt(queryParams.get('page') ?? '0', 10);
  const currentCategoryId =
  paramCategoryId && paramCategoryId !== 'undefined'
    ? Number(paramCategoryId)
    : queryParams.get('categoryId') && queryParams.get('categoryId') !== 'undefined'
    ? Number(queryParams.get('categoryId'))
    : 0;

  const [bookList, setBookList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);

  // -------------------------
  // 책 데이터 가져오기
  // -------------------------
  const { data, isLoading, error } = useQuery({
    queryKey: ['books', currentPage, currentSort, currentCategoryId, searchQuery],
    queryFn: () => bookAPI.getList({
      page: currentPage,
      categoryId: currentCategoryId,
      query: searchQuery,
      sort: currentSort,
    }),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      setBookList(data.content ?? []);
      setTotalRows(data.total ?? 0);
    }
     console.log(data);
  }, [data]);

  // -------------------------
  // 페이지 이동 처리
  // -------------------------
  const movePage = (newPage) => {
    const params = new URLSearchParams(location.search);
    params.set('page', newPage);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  // -------------------------
  // 정렬 변경
  // -------------------------
  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(location.search);
    params.set('sort', newSort);
    params.set('page', 0); // 정렬 변경 시 페이지 초기화
    navigate(`${location.pathname}?${params.toString()}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div className="contents-container">
      <div className="sort-bg">
        <label>정렬 : </label>
        <select className="sort-box" value={currentSort} onChange={handleSortChange}>
          <option value="createDate,desc">최신 등록 순</option>
          <option value="createDate,asc">과거 등록 순</option>
          <option value="title">제목 순</option>
          <option value="writer">작가 순</option>
          <option value="publisher">출판사 순</option>
          <option value="price,asc">가격 낮은 순</option>
          <option value="price,desc">가격 높은 순</option>
        </select>
      </div>

      <div>
        {bookList.map((book) => (
          <div key={book.bookId} className="container-list-bg">
            <div className="content-list-lmg-bg" onClick={() => goDetail(navigate, book.bookId)}>
              <img src={book.mainImageUrl} alt={book.title} />
            </div>
            <div className="content-list-text-bg">
              <span className="list-title" onClick={() => goDetail(navigate, book.bookId)}>
                {book.title}
              </span>
              <span>{book.writer} · {book.publisher} · {book.pubDate}</span>
              <span className="list-price">{book.price}<span className="list-price-won"> 원</span></span>
              <span className="list-content" onClick={() => goDetail(navigate, book.bookId)}>
                {book.content}
              </span>
            </div>
            <div className="content-list-button-bg list">
              <button type="button" id="cart-btn">장바구니</button>
              <button type="button" id="buy-btn">구매하기</button>
            </div>
          </div>
        ))}
      </div>

      <Pagination page={currentPage} totalRows={totalRows} movePage={movePage} />
    </div>
  );
}

export default CategoryBooklist;
