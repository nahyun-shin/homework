import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../compoents/Pagination";
import { bookAPI } from "../../service/bookService";
import '../../assets/css/CategoryBooklist.css';

function NewBookList() {
  const location = useLocation();
  const { type } = useParams();  // week or month
  const [bookList, setBookList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [type]);
  console.log(type);

  const queryFn = async () => {
    if (type === 'week') {
      return await bookAPI.getNewWeekList({ page });
    }
    if (type === 'month') {
      return await bookAPI.getNewMonthList({ page });
    }
     return Promise.reject(new Error('Invalid type'));
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['newBooks', page, type],
    queryFn,
    enabled: type === 'week' || type === 'month',
    onError: (err) => console.error('Query Error:', err),
  });

  console.log(data);
  useEffect(() => {
    if (data) {
      setBookList(data.content ?? []);
      setTotalRows(data.total ?? 0);
    } else {
      setBookList([]);
      setTotalRows(0);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      <h2>신상품 도서</h2>

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
