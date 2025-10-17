import React, { useState, useEffect, useRef } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { authStore } from '../store/authStore';
import { bookAPI } from '../service/bookService';
import '../assets/css/MenuBar.css';

function MenuBar({ showSideMenu, setShowSideMenu, isFixed }) {
  const [selectedMenu, setSelectedMenu] = useState({});
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [searchTxt, setSearchTxt] = useState('');
  const [categoryMenus, setCategoryMenus] = useState([]);

  const { isAuthenticated, clearAuth, getUserRole } = authStore();
  const userName = authStore((state) => state.userName);
  const navigate = useNavigate();
  const location = useLocation();

  // 이전 카테고리 추적용 ref
  const prevCategoryRef = useRef(null);

  // -------------------------
  // DB 기반 카테고리 메뉴 로드
  // -------------------------
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await bookAPI.getCategoryMenus();
        setCategoryMenus(data);
      } catch (err) {
        console.error('카테고리 메뉴 불러오기 실패:', err);
      }
    };
    fetchCategories();
  }, []);

  // -------------------------
  // 메뉴 구성
  // -------------------------
  const mainMenus = [
    { name: '홈', path: '/main' },
    { name: '카테고리', path: '/books', sub: categoryMenus },
    {
      name: '베스트',
      path: '/best',
      sub: [
        { name: '오늘의 베스트 ', path: '/best/day' },
        { name: '이번주 베스트', path: '/best/week' },
        { name: '이번달 베스트', path: '/best/month' },
      ],
    },
    { name: '신상품', path: '/new' },
  ];

  // -------------------------
  // URL 기반 하이라이트 처리
  // -------------------------
  useEffect(() => {
    const path = location.pathname;
    if (path === '/main') {
      setSelectedMenu({});
      return;
    }

    mainMenus.forEach((menu) => {
      if (!menu.sub || menu.sub.length === 0) return;
      const idx = menu.sub.findIndex((sub) => path.startsWith(sub.path));
      if (idx >= 0) setSelectedMenu((prev) => ({ ...prev, [menu.name]: idx }));
    });
  }, [location.pathname, categoryMenus]);

  // -------------------------
  // 검색창 초기화 로직
  // -------------------------
  useEffect(() => {
    const currentCategoryId = selectedMenu['카테고리'] !== undefined
      ? categoryMenus[selectedMenu['카테고리']]?.categoryId ?? 0
      : null;

    if (prevCategoryRef.current !== currentCategoryId) {
      // 카테고리/메뉴 변경 시 검색 초기화
      setSearchTxt('');
      prevCategoryRef.current = currentCategoryId;
    }
  }, [selectedMenu, categoryMenus]);

  const fixedMenu = (() => {
    if (location.pathname.startsWith('/books')) return '카테고리';
    if (location.pathname.startsWith('/best')) return '베스트';
    if (location.pathname.startsWith('/new')) return '신상품';
    return null;
  })();

  const visibleMenu = hoveredMenu || (isFixed ? fixedMenu : null);

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem('auth-info');
    navigate('/login');
  };

  const inputChange = (e) => setSearchTxt(e.target.value);

  // -------------------------
  // 검색 처리
  // -------------------------
  const handleSearch = () => {
    if (!location.pathname.startsWith('/books')) return; // 카테고리 페이지 외에서는 무시

    const params = new URLSearchParams();

    if (searchTxt.trim()) params.set('query', searchTxt.trim());

    // 현재 선택된 카테고리
    const selectedCategoryId = selectedMenu['카테고리'] !== undefined
      ? categoryMenus[selectedMenu['카테고리']]?.categoryId ?? 0
      : 0;

    params.set('categoryId', selectedCategoryId);

    // sort 유지, 없으면 기본값
    if (!params.has('sort')) params.set('sort', 'createDate,desc');

    // 현재 카테고리 경로
    const path = selectedCategoryId === 0 ? '/books/all' : `/books/category/${selectedCategoryId}`;

    navigate(`${path}?${params.toString()}`);
  };

// -------------------------
// 하위 메뉴 클릭 (메뉴 타입 최소 분기)
// -------------------------
const handleSubMenuClick = (item, menuName, idx) => {
  let path = '';
  const params = new URLSearchParams();

  if (menuName === '카테고리') {
    // 카테고리 메뉴
    const categoryId = item.categoryId ?? 0;
    path = categoryId === 0 ? '/books/all' : `/books/category/${categoryId}`;
    params.set('categoryId', categoryId);
    params.set('sort', 'createDate,desc');
  } else if (menuName === '베스트' || menuName === '신상품') {
    // 베스트 / 신상품 메뉴
    path = item.path; // path 그대로 사용
    // categoryId는 넣지 않음 → undefined 방지
  } else {
    // 기타 메뉴
    path = item.path;
  }

  navigate(`${path}?${params.toString()}`);
  setSelectedMenu((prev) => ({ ...prev, [menuName]: idx }));
  setHoveredMenu(null);
  setSearchTxt('');
};



  return (
    <Navbar expand="lg" className="bg-body">
      <div className="body-wrap">
        <section className="logo-body">
          <Navbar.Brand className="logo" as={NavLink} to="/main">
            <span className="logo-font">책 밤</span>
          </Navbar.Brand>
        </section>

        <Container
          fluid
          className="menu-contanier"
          onMouseEnter={() => !isFixed && setShowSideMenu(true)}
          onMouseLeave={() => {
            if (!isFixed) setShowSideMenu(false);
            setHoveredMenu(null);
          }}
        >
          <Nav className="l-menu">
            {mainMenus.map((menu) => (
              <Nav.Link
                key={menu.name}
                as={NavLink}
                to={menu.path}
                onMouseEnter={() => setHoveredMenu(menu.name)}
              >
                {menu.name}
              </Nav.Link>
            ))}
          </Nav>

          {visibleMenu && (
            <div className="side-menu-bg">
              <div className="side-menu-wrap">
                <div className="hovered-label">{visibleMenu}</div>
                <ul className="sub-menu-list">
                  {mainMenus
                    .find((m) => m.name === visibleMenu)
                    ?.sub?.map((item, idx) => (
                      <li
                        key={idx}
                        className={`sub-menu-item ${
                          selectedMenu[visibleMenu] === idx ? 'selected' : ''
                        }`}
                        onClick={() => handleSubMenuClick(item, visibleMenu, idx)}
                      >
                        {item.name}
                        <div className="item-circle" />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}

          <div className="center">
            <input
              type="text"
              placeholder="검색어를 입력해주세요."
              value={searchTxt}
              onChange={inputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button type="button" onClick={handleSearch}>
              검색
            </button>
          </div>

          <Nav className="r-menu">
            {isAuthenticated() && getUserRole() === 'ROLE_ADMIN' && (
              <Nav.Link as={NavLink} to="/admin">
                관리자 페이지
              </Nav.Link>
            )}

            {isAuthenticated() ? (
              <NavDropdown title={userName} id="navbarScrollDropdown">
                <NavDropdown.Item href="#">회원정보</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                로그인
              </Nav.Link>
            )}

            {(!isAuthenticated() || getUserRole() === 'ROLE_USER') && (
              <Nav.Link as={NavLink} to="/cart">
                장바구니
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </div>
    </Navbar>
  );
}

export default MenuBar;
