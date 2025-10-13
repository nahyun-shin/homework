import React, { useState, useEffect } from 'react';
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
        { name: '전체보기', path: '/best/all' },
        { name: '인기상품1', path: '/best/popular1' },
        { name: '인기상품2', path: '/best/popular2' },
      ],
    },
    {
      name: '신상품',
      path: '/new',
      sub: [
        { name: '이번주신상', path: '/new/week' },
        { name: '이번달신상', path: '/new/month' },
      ],
    },
  ];

  // -------------------------
  // URL 기반 하이라이트 처리
  // -------------------------
  useEffect(() => {
    const path = location.pathname;

    // 메인페이지라면 하이라이트 초기화
    if (path === '/main') {
      setSelectedMenu({});
      return;
    }

    mainMenus.forEach((menu) => {
      if (!menu.sub || menu.sub.length === 0) return;

      // 1️⃣ 하위 메뉴 URL과 일치하는 경우
      const idx = menu.sub.findIndex((sub) => path.startsWith(sub.path));
      if (idx >= 0) {
        setSelectedMenu((prev) => ({ ...prev, [menu.name]: idx }));
        return;
      }

      // 2️⃣ 상위 메뉴 직접 클릭 시: 첫번째 하위 메뉴 선택
      if (path === menu.path) {
        setSelectedMenu((prev) => ({ ...prev, [menu.name]: 0 }));
      }
    });
  }, [location.pathname, categoryMenus]);

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
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location.pathname.startsWith('/books')) {
      params.set('categoryId', categoryMenus[selectedMenu['카테고리']]?.categoryId || 0);
    }
    if (searchTxt.trim()) params.set('query', searchTxt.trim());
    navigate(`/books?${params.toString()}`);
  };

  // -------------------------
  // 하위 메뉴 클릭
  // -------------------------
  const handleSubMenuClick = (item, menuName, idx) => {
    let path = '';
    if (item.categoryId !== undefined) {
      path = item.categoryId === 0 ? '/books/all' : `/books/category/${item.categoryId}`;
    } else if (item.path) {
      path = item.path;
    }
    navigate(path);
    setSelectedMenu((prev) => ({ ...prev, [menuName]: idx }));
    setHoveredMenu(null);
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
