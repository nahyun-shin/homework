import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../compoents/Pagination";
import { bookAPI } from "../../service/bookService";
import { goDetail } from '../../hooks/menuData.js';

function NewBookList() {
  const navigate = useNavigate();
  const { type } = useParams();
  const [bookList, setBookList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  
  const periods = ['daily', 'weekly', 'monthly', 'all'];
  const [page, setPage] = useState(0);
  const size=8;
  const sort='createDate,desc';
  


  useEffect(() => {
    if (!periods.includes(type)) {
      navigate('/new/daily', { replace: true });
    }
    setPage(0); // 페이지 초기화
  }, [type]);

  

  useEffect(() => {
    if (!type || !periods.includes(type)) return;

    const fetchNewBooks = async () => {
      setLoading(true);
      try {

        const res = await bookAPI.getNewList({
          period: type,
          page, 
          size, 
          sort, 
        });

        setBookList(res.content);
        setTotalRows(res.totalElements);
      
      } catch (err) {
        console.error('신상품 API 호출 오류:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewBooks();
  }, [type, page]);

  const handleClick = (p) => {
    navigate(`/new/${p}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="contents-container">
       {/* 기간 선택 탭 */}
      {/* 기간 선택 셀렉트 박스 */}
<div className="period-selector sort-bg">
  <label>정렬 : </label>
  <select className="sort-box" value={type} onChange={(e) => handleClick(e.target.value)}>
    {periods.map((p) => (
      <option key={p} value={p}>
        {p.toUpperCase()}
      </option>
    ))}
  </select>
</div>
      <div>
        {bookList?.map(book => (
          <div key={book.bookId} className="container-list-bg" >
            <div className="content-list-lmg-bg" onClick={() => goDetail(navigate, book.bookId)}>
              <img src={book.mainImageUrl} alt={book.title} />
            </div>
            <div className="content-list-text-bg">
              <span className='list-title' onClick={() => goDetail(navigate, book.bookId)}>
                {book.title} 
              </span>
              <span>
                {book.writer} · {book.publisher} · {book.pubDate}
              </span>
              <span className='list-price'>
                {book.price}
                <span className='list-price-won'> 원</span>
              </span>
              <span className='list-content' onClick={() => goDetail(navigate, book.bookId)}>
                {book.content}
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

export default NewBookList;
