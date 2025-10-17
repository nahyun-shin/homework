import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { bookAPI } from '../../service/bookService';
import { current } from 'immer';
import { Pagination } from 'react-bootstrap';

function AdminBookList(props) {
    const { categoryId: paramCategoryId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('query')??'';
    const currentSort = queryParams.get('sort')??'createDate,desc';
    const currentPage = parseInt(queryParams.get('page')??'0',10);
    const currentCategoryId=paramCategoryId ?? queryParams.get('categoryId')??0;

    const [bookList, setBookList] = useState([]);
    const [totalRows, setTotalRows] = useState(0);

    const {data, isLoading, error}= useQuery({
        queryKey:['adminBooks',currentPage, currentSort,currentCategoryId,searchQuery],
        queryFn:()=>bookAPI.getAdminBookList({
            page: currentPage,
            categoryId:currentCategoryId,
            query: searchQuery,
            sort: currentSort,
        }),
        keepPreviousData:true,
    })
    useEffect(()=>{
        if(data){
            setBookList(data.content ?? []);
            setTotalRows(data.total??0);
        }
    }, [data]);

    const movePage = (newPage) => {
    const params = new URLSearchParams(location.search);
    params.set('page', newPage);
    navigate(`${location.pathname}?${params.toString()}`);
  };

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
            <h2>관리자다</h2>
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
            <div className="content-list-lmg-bg" >
              <img src={book.mainImageUrl} alt={book.title} />
            </div>
            <div className="content-list-text-bg">
              <span className="list-title" >
                {book.title}
              </span>
              <span>{book.writer} · {book.publisher} · {book.pubDate}</span>
              <span className="list-price">{book.price}<span className="list-price-won"> 원</span></span>
              <span className="list-content" >
                {book.content}
              </span>
            </div>
            <div className="content-list-button-bg list">
              <button type="button" id="cart-btn">수정하기</button>
              <button type="button" id="buy-btn">삭제하기</button>
            </div>
          </div>
        ))}
      </div>

      <Pagination page={currentPage} totalRows={totalRows} movePage={movePage} />
    </div>
  );
}

export default AdminBookList;