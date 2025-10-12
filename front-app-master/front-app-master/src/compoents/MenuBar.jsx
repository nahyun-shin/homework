import React, { useState } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router';
import { authStore } from '../store/authStore';
import { mainMenus, menuPathMap, subMenus } from '../hooks/menuData';
import '../assets/css/MenuBar.css';

function MenuBar() {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState('');
  const [searchTxt, setSearchTxt] = useState('');

  const { isAuthenticated, clearAuth, getUserRole } = authStore();
  const userName = authStore((state) => state.userName);
  const navigate = useNavigate();
  const location = useLocation();

  // 하위 메뉴 표시 여부
  const blockedPath = menuPathMap[hoveredMenu];
  const isSubMenuVisible =
    showSideMenu &&
    hoveredMenu &&
    !(blockedPath && location.pathname.startsWith(blockedPath));

  // 로그아웃
  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem('auth-info');
    navigate('/login');
  };

  // 검색어 입력
  const inputChange = (e) => setSearchTxt(e.target.value);

  // 검색 실행
  const handleSearch = () => {
    const params = new URLSearchParams();
    
    // 현재 페이지에 맞는 categoryId 유지 (하위 메뉴에서 검색)
    if (location.pathname.startsWith('/books')) {
      const categoryId = new URLSearchParams(location.search).get('categoryId');
      if (categoryId) params.set('categoryId', categoryId);
    }

    if (searchTxt.trim() !== '') params.set('query', searchTxt.trim());

    navigate(`/books?${params.toString()}`);
  };

  // 하위 메뉴 클릭 시: 검색어 초기화 + 해당 카테고리로 이동
  const handleSubMenuClick = (item) => {
    const params = new URLSearchParams();
    if (item.categoryId) params.set('categoryId', item.categoryId);

    navigate(`/books?${params.toString()}`);
    setSearchTxt('');
    setShowSideMenu(false);
    setHoveredMenu('');
  };

  return (
    <Navbar expand="lg" className="bg-body">
      <div className="body-wrap">
        {/* 로고 영역 */}
        <section className="logo-body">
          <Navbar.Brand className="logo" as={NavLink} to="/main">
            <span className="logo-font">책 밤</span>
          </Navbar.Brand>
        </section>

        {/* 전체 메뉴 */}
        <Container
          fluid
          className="menu-contanier"
          onMouseEnter={() => setShowSideMenu(true)}
          onMouseLeave={() => {
            setShowSideMenu(false);
            setHoveredMenu('');
          }}
        >
          {/* 왼쪽 메뉴 */}
          <Nav className="l-menu">
            {mainMenus.map((menu) => (
              <Nav.Link
                key={menu.name}
                as={NavLink}
                to={menu.path}
                onMouseEnter={() => setHoveredMenu(menu.hover)}
              >
                {menu.name}
              </Nav.Link>
            ))}
          </Nav>

          {/* 하위 메뉴 */}
          {isSubMenuVisible && (
            <div className="side-menu-bg">
              <div className="side-menu-wrap">
                <div className="hovered-label">
                  {hoveredMenu}
                  <div className="label-circle" />
                </div>
                <ul className="sub-menu-list">
                  {subMenus[hoveredMenu]?.map((item, index) => (
                    <li
                      key={index}
                      className="sub-menu-item"
                      onClick={() => handleSubMenuClick(item)}
                    >
                      {item.name}
                      <div className="item-circle" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 검색창 */}
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

          {/* 오른쪽 메뉴 */}
          <Nav className="r-menu">
            {isAuthenticated() && getUserRole() === 'ROLE_ADMIN' && (
              <Nav.Link as={NavLink} to="/admin">
                관리자 페이지
              </Nav.Link>
            )}

            {isAuthenticated() ? (
              <NavDropdown title={userName} id="navbarScrollDropdown">
                <NavDropdown.Item href="#">회원정보</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  로그아웃
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={NavLink} to="/login">
                로그인
              </Nav.Link>
            )}

            {(!isAuthenticated() || getUserRole() === 'ROLE_USER') && (
              <Nav.Link as={NavLink} to="/cart">장바구니</Nav.Link>
            )}
          </Nav>
        </Container>
      </div>
    </Navbar>
  );
}

export default MenuBar;
