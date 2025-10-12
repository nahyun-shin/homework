import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Pagination from "../../compoents/Pagination";
import { subMenus } from "../../hooks/menuData";

function BestBookList() {
const categories = subMenus['베스트'];
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
    queryKey: ['best', searchQuery, currentSort, page],
    queryFn: async () => {
      let url = `/api/v1/best?page=${page}&sort=${currentSort}`;
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
    navigate(`/best?${params.toString()}`);
  };

  return (
    <div>
      <div className="fside-menu-bg">
        <div className="fside-menu-wrap">
          <div className="side-menu-label">
              베스트
              <div className="flabel-circle" />
          </div>
          <ul className="fsub-menu-list">
            {categories?.map((item, index) => (
              <li
                key={index}
                className="fsub-menu-item"
                onClick={() => handleSubMenuClick(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h2>베스트 도서</h2>
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

export default BestBookList;
