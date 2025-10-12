import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Pagination from "../../compoents/Pagination";

function NewBookList() {
  const location = useLocation();
  const navigate = useNavigate();

  const [bookList, setBookList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('title');

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('query') || '';
  const currentSort = queryParams.get('sort') || 'title';

  const { data } = useQuery({
    queryKey: ['new', searchQuery, currentSort, page],
    queryFn: async () => {
      let url = `/api/v1/new?page=${page}&sort=${currentSort}`;
      if (searchQuery) url += `&query=${searchQuery}`;
      const res = await axios.get(url);
      return res.data;
    }
  });

  useEffect(() => {
    if (data) {
      setBookList(data.content);
      setTotalRows(data.total);
      setPage(data.page);
    }
  }, [data]);

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSort(newSort);

    const params = new URLSearchParams(location.search);
    params.set('sort', newSort);
    navigate(`/new?${params.toString()}`);
  };

  return (
    <div>
      <h2>신상품 도서</h2>
      <div>
        <label>정렬: </label>
        <select value={sort} onChange={handleSortChange}>
          <option value="title">제목순</option>
          <option value="writer">작가순</option>
          <option value="publisher">출판사순</option>
          <option value="price">가격순</option>
        </select>
      </div>
      <ul>
        {bookList?.map(book => (
          <li key={book.id}>
            {book.title} | {book.writer} | {book.publisher} | {book.pubDate} | {book.price}
          </li>
        ))}
      </ul>
      <Pagination page={page} totalRows={totalRows} movePage={setPage} />
    </div>
  );
}

export default NewBookList;
