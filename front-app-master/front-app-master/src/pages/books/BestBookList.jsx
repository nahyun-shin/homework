import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../compoents/Pagination";
import { bookAPI } from "../../service/bookService";
import '../../assets/css/CategoryBooklist.css'; // 스타일 공유

function BestBookList() {

  const [bookList, setBookList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);

  const { data, isLoading, error } = useQuery({
  queryKey: ['bestBooks', page],
  queryFn: () => bookAPI.getBestList({
    page,
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
  console.log(data);
}, [data]);

  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      <h2>베스트 도서</h2>

      {/* 정렬 */}
      <div>
        
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
