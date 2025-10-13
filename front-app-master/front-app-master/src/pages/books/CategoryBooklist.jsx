import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { subMenus } from '../../hooks/menuData';
import Pagination from "../../compoents/Pagination";
import '../../assets/css/CategoryBooklist.css';
import { bookAPI } from "../../service/bookService";

function CategoryBooklist({showSideMenu}) {
  const { categoryId: paramCategoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [bookList, setBookList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [size] = useState(6);
  const [sort, setSort] = useState('createDate');

  // URL query 기반으로 카테고리, 검색어, 정렬 가져오기
  const queryParams = new URLSearchParams(location.search);
  const queryCategoryId = queryParams.get('categoryId') ?? null;
  const searchQuery = queryParams.get('query') ?? '';
  const currentSort = queryParams.get('sort') ?? sort;

  const currentCategoryId = paramCategoryId ?? queryCategoryId;

  
  // -------------------------
  // 책 데이터 가져오기
  // -------------------------
const { data, isLoading, error } = useQuery({
  queryKey: ['books', page, sort, currentCategoryId, searchQuery],
  queryFn: () => bookAPI.getList({
    page,
    size,
    categoryId: currentCategoryId ?? 0,
    query: searchQuery,
    sort,
  }),
  keepPreviousData: true,
});




  useEffect(() => {
  if (data) {
    setBookList(data.content ?? []); // data.content가 undefined면 빈 배열
    setTotalRows(data.total ?? 0);
    setPage(data.page ?? 0);
  } else {
    setBookList([]);
    setTotalRows(0);
  }
}, [data]);

  

  // 정렬 변경
  const handleSortChange = (e) => {
  const newSort = e.target.value;
  setSort(newSort);
  const params = new URLSearchParams(location.search);
  params.set('sort', newSort);
  navigate(`/books?${params.toString()}`);
  setPage(0);
};

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div >

      <h2>책 목록</h2>

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
        {bookList?.map(book => (
          <li key={book.bookId}>
            {book.title} | {book.writer} | {book.publisher} | {book.pubDate} | {book.price}
          </li>
        ))}
      </ul>

      <Pagination page={page} totalRows={totalRows} movePage={setPage} />
    </div>
  );
}

export default CategoryBooklist;
