import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../compoents/Pagination";
import { bookAPI } from "../../service/bookService";
import { goDetail } from '../../hooks/menuData.js';

function BestBookList() {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(0);
  const { type } = useParams();

  useEffect(() => {
    setPage(0);
  }, [type]);

  const queryFn = async () => {
    if (type === 'day') {
      return await bookAPI.getBestDayList({ page });
    }
    if (type === 'week') {
      return await bookAPI.getBestWeekList({ page });
    }
    if (type === 'month') {
      return await bookAPI.getBestMonthList({ page });
    }
     return Promise.reject(new Error('Invalid type'));
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['newBooks', page, type],
    queryFn,
    enabled: type === 'day' || type === 'week' || type === 'month' || type === 'all',
    onError: (err) => console.error('Query Error:', err),
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



  

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div className="contents-container">

      <div>
        {bookList?.map(book => (
          <div key={book.bookId} className="container-list-bg">
            <div className="content-list-lmg-bg" onClick={() => goDetail(navigate, book.categoryId,book.bookId)}>
              <img src={book.mainImageUrl} alt={book.title} />
            </div>
            <div className="content-list-text-bg">
              <span className='list-title' onClick={() => goDetail(navigate, book.categoryId,book.bookId)}>
                {book.title} 
              </span>
              <span>
                {book.writer} · {book.publisher} · {book.pubDate}
              </span>
              <span className='list-price'>
                {book.price}
                <span className='list-price-won'> 원</span>
              </span>
              
            </div>
            <div className="content-list-button-bg list">
              <button type="button" className="cart-btn">장바구니</button>
              <button type="button" className="yellow-btn">구매하기</button>
            </div>
          </div>
        ))}
      </div>

      <Pagination page={page} totalRows={totalRows} movePage={setPage} />
    </div>
  );
}

export default BestBookList;
