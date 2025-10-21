import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { bookAPI } from "../../service/bookService";
import Pagination from "../../compoents/Pagination";
import "../../assets/css/adminBookList.css";
import { goAdminBookDetail, useBook } from "../../hooks/menuData.js";
import { goUpdate } from '../../hooks/menuData.js';

function AdminBookList() {
  const { categoryId: paramCategoryId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { deleteBookMutation } = useBook();
  const queryParams = new URLSearchParams(location.search);
  
  const currentPage = parseInt(queryParams.get("page") ?? "0", 10);
  const currentSort = queryParams.get("sort") ?? "createDate,desc";
  const currentCategoryId = parseInt(
    paramCategoryId ?? queryParams.get("categoryId") ?? "0",
    10
  );
  
  const [searchQuery, setSearchQuery] = useState(queryParams.get("query") ?? "");
  // 검색어용 ref
  const searchQueryRef = useRef(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState(currentCategoryId);

  const [bookList, setBookList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [categoryMenus, setCategoryMenus] = useState([]);

  const menus = [
    { name: "도서 관리", path: "/admin/books" },
    { name: "회원 관리", path: "/admin/users" },
  ];
  const [activeIndex, setActiveIndex] = useState(null);

  // --------------------------
  // 데이터 조회
  // --------------------------
  
const { data, isLoading, error, refetch } = useQuery({
  queryKey: ["books", currentPage, currentSort, selectedCategory],
  queryFn: () =>
    bookAPI.getAdminBookList({
      page: currentPage,
      categoryId: selectedCategory,
      query: searchQueryRef.current, // 검색어는 ref를 통해 수동 적용
      sort: currentSort,
    }),
  keepPreviousData: true,
});
console.log(data);



  useEffect(() => {
    if (data) {
      setBookList(data.content ?? []);
      setTotalRows(data.total ?? 0);
    }
  }, [data]);

 

  // --------------------------
  // 카테고리 메뉴 로드
  // --------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await bookAPI.getCategoryMenus(true);
        setCategoryMenus(data);
      } catch (err) {
        console.error("카테고리 메뉴 불러오기 실패:", err);
      }
    };
    fetchCategories();
  }, []);

  // --------------------------
  // URL 기반 메뉴 하이라이트
  // --------------------------
  useEffect(() => {
    const currentPath = location.pathname;
    const activeIdx = menus.findIndex((menu) => currentPath.startsWith(menu.path));
    setActiveIndex(activeIdx >= 0 ? activeIdx : null);
  }, [location.pathname]);

  // --------------------------
  // 검색 핸들러
  // --------------------------
  const handleSearch = () => {
  const params = new URLSearchParams(location.search);
  params.set("query", searchQueryRef.current);
  params.set("page", "0");
  navigate(`${location.pathname}?${params.toString()}`);
  refetch(); // 검색 버튼 눌러서 수동 조회
};

  // --------------------------
  // input 이벤트 처리 
  // --------------------------
  
  const handleChange = (e) => {
  setSearchQuery(e.target.value);
  searchQueryRef.current = e.target.value; // 변경만 저장, 자동 조회는 없음
};

  // --------------------------
  // 페이지 이동
  // --------------------------
  const movePage = (newPage) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage);
    navigate(`${location.pathname}?${params.toString()}`);
    refetch();
  };

  // --------------------------
  // 카테고리 변경
  // --------------------------
  const handleCategoryChange = (e) => {
    const newCategory = parseInt(e.target.value, 10);
    setSelectedCategory(newCategory);

    const params = new URLSearchParams(location.search);
    params.set("categoryId", newCategory);
    params.set("page", "0");
    navigate(`${location.pathname}?${params.toString()}`);
    refetch();
  };

  // --------------------------
  // 정렬 변경
  // --------------------------
  const handleSortChange = (e) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(location.search);
    params.set("sort", newSort);
    params.set("page", "0");
    navigate(`${location.pathname}?${params.toString()}`);
    refetch();
  };

  const goDelete = async (bookId) => {
    if (confirm("삭제하시겠습니까?")) {
      try {
        const result = await deleteBookMutation.mutateAsync(bookId);
        
        if (result.status === 200) {
          alert("도서가 삭제되었습니다.");

          navigate("/admin/books");
        } else {
          alert("도서 삭제에 실패하였습니다.");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // --------------------------
  // 메뉴 클릭 / 책 추가
  // --------------------------
  const goMenu = (idx) => navigate(menus[idx].path);
  const goCreateBook = () => navigate(`/admin/books/create`);

  // --------------------------
  // 렌더링
  // --------------------------
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div className="admin-body">
      <div className="admin-menu-bg">
        <div className="admin-menu-wrap">
          <div className="admin-menu-title">관리자 메뉴</div>
          <ul className="admin-menu-list">
            {menus.map((menu, idx) => (
              <li key={idx} onClick={() => goMenu(idx)}>
                {menu.name}
                <div
                  className="admin-menu-circle"
                  style={{ display: activeIndex === idx ? "block" : "none" }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="contents-container">
        <section className="func">

          <section className="select-bg category-bg">
            <label>카테고리 : </label>
            <select
              className="select-box category-box"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categoryMenus.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
          </section>

          <section className="select-bg">
            <label>정렬 : </label>
            <select
              className="select-box sort-box"
              value={currentSort}
              onChange={handleSortChange}
            >
              <option value="createDate,desc">최신 등록 순</option>
              <option value="createDate,asc">과거 등록 순</option>
              <option value="title">제목 순</option>
              <option value="writer">작가 순</option>
              <option value="publisher">출판사 순</option>
              <option value="price,asc">가격 낮은 순</option>
              <option value="price,desc">가격 높은 순</option>
            </select>
          </section>

          <section className="search-bg">
            <div className="search-wrap">
              <input
                type="text"
                placeholder="관리자 검색창입니다."
                value={searchQuery}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="search-input admin-search-input"
              />
              <button
                type="button"
                onClick={handleSearch}
                className="search-button"
              >
                검색
              </button>
            </div>
          </section>

          <section className="content-list-button-bg admin-add-btn">
            <button
              type="button"
              className="yellow-btn"
              onClick={goCreateBook}
            >
              등록하기
            </button>
          </section>
        </section>

        <div>
          {bookList.map((book) => (
            <div key={book.bookId} className="container-list-bg">
              <div
                className="content-list-lmg-bg"
                onClick={() => goAdminBookDetail(navigate, book.bookId)}
              >
                <img src={book.mainImageUrl} alt={book.title} />
              </div>
              <div className="content-list-text-bg">
                <span className="list-title">{book.title}</span>
                <span>
                  {book.writer} · {book.publisher} · {book.pubDate}
                </span>
                <span className="list-price">
                  {book.price}
                  <span className="list-price-won"> 원</span>
                </span>
                
              </div>
              <div className="content-list-button-bg list">
                <button type="button" className="yellow-btn" onClick={()=>goUpdate(navigate,book.bookId)}>
                  수정하기
                </button>
                <button type="button" className="del-btn" onClick={()=>goDelete(book.bookId)}>
                  삭제하기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Pagination page={currentPage} totalRows={totalRows} movePage={movePage} />
    </div>
  );
}

export default AdminBookList;
