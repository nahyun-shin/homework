import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../compoents/Pagination";
import { bookAPI } from "../../service/bookService";
import '../../assets/css/CategoryBooklist.css';

function NewBookList() {
  const navigate = useNavigate();
  const location = useLocation();

  const [bookList, setBookList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [sort, setSort] = useState('createDate');

  const queryParams = new URLSearchParams(location.search);
  const currentType = queryParams.get('type') || 'week'; // week/month
  const currentSort = queryParams.get('sort') || sort;

  const { data, isLoading, error } = useQuery({
    queryKey: ['newBooks', page, sort, currentType],
    queryFn: () => bookAPI.getBooksByType(currentType),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (data) {
      setBookList(data.content ?? []);
      setTotalRows(data.total ?? 0);
      setPage(data.page ?? 0);
    }
  }, [data]);

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);
    queryParams.set('sort', newSort);
    navigate(`/new?${queryParams.toString()}`);
    setPage(0);
  };

  const handleSubMenuClick = (type) => {
    queryParams.set('type', type);
    navigate(`/new?${queryParams.toString()}`);
    setPage(0);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      <h2>신상품 도서</h2>

      {/* 하위 메뉴 */}
      <div className="fside-menu-wrap">
        {['week', 'month'].map((type, idx) => (
          <button
            key={idx}
            className={currentType === type ? 'selected' : ''}
            onClick={() => handleSubMenuClick(type)}
          >
            {type === 'week' ? '이번주신상' : '이번달신상'}
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

export default NewBookList;
