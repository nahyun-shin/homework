import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../compoents/Pagination";
import { bookAPI } from "../../service/bookService";
import '../../assets/css/CategoryBooklist.css'; // 스타일 공유

function BestBookList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [bookList, setBookList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [sort, setSort] = useState('createDate');

  const queryParams = new URLSearchParams(location.search);
  const currentType = queryParams.get('type') || 'all'; // all/popular1/popular2
  const currentSort = queryParams.get('sort') || sort;

  const { data, isLoading, error } = useQuery({
  queryKey: ['bestBooks', page, sort, currentType],
  queryFn: () => bookAPI.getBooksByType(currentType),
  keepPreviousData: true,
});

useEffect(() => {
  if (data) {
    // 카테고리 페이지처럼 data.content가 아니라 data 자체가 리스트면
    setBookList(data ?? []);  
    setTotalRows(data?.length ?? 0); // 총 개수
    setPage(page); // 페이지 처리 필요하면 백엔드에서 페이지 정보 받아야 함
  }
}, [data]);

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    queryParams.set('sort', newSort);
    navigate(`/best?${queryParams.toString()}`);
    setPage(0);
  };

  const handleSubMenuClick = (type) => {
    queryParams.set('type', type);
    navigate(`/best?${queryParams.toString()}`);
    setPage(0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      <h2>베스트 도서</h2>

      {/* 하위 메뉴 */}
      <div className="fside-menu-wrap">
        {['all', 'popular1', 'popular2'].map((type, idx) => (
          <button
            key={idx}
            className={currentType === type ? 'selected' : ''}
            onClick={() => handleSubMenuClick(type)}
          >
            {type === 'all' ? '전체보기' : `인기상품${type.slice(-1)}`}
          </button>
        ))}
      </div>

      {/* 정렬 */}
      <div>
        <label>정렬: </label>
        <select value={sort} onChange={handleSortChange}>
          <option value="title">제목순</option>
          <option value="writer">작가순</option>
          <option value="publisher">출판사순</option>
          <option value="price,asc">가격 낮은순</option>
          <option value="price,desc">가격 높은순</option>
        </select>
      </div>

      <ul>
        {bookList.map(book => (
          <li key={book.bookId}>
            {book.title} | {book.writer} | {book.publisher} | {book.pubDate} | {book.price}
          </li>
        ))}
      </ul>

      <Pagination page={page} totalRows={totalRows} movePage={setPage} />
    </div>
  );
}

export default BestBookList;
