import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from 'react-router';
import { authStore } from '../store/authStore'; //인증상태 관리용 zustand 스토어 authStore 불러옴
import { NavDropdown } from 'react-bootstrap'; //부트스트랩 드롭다운 메뉴

function MenuBar(props) {

    //랜더링 피하기 위해 필요한 것만 가져옴
    //isAuthenticated : 로그인 여부 확인 함수
    //clearAuth : 로그아웃 시 상태 초기화 함수
    //getUserRole : 사용자 권한 반환 함수
    const {isAuthenticated, clearAuth, getUserRole} = authStore();

    
    const userName = authStore((state)=> state.userName); // userName만 꺼내오기(리렌더링 최적화 위해)
                                                        //zustand는 selector방식으로 부분 상태만 가져올 수 있음
    const navigate = useNavigate(); //react router의 navigate() 함수를 사용하기 위해 선언

    const handleLogout = () =>{    //로그아웃 버튼 클릭시 실행
        clearAuth();    //상태 초기화
        localStorage.removeItem("auth-info");   //로컬스토리지의 인증 정보 제거
        navigate('/login');    //로그인 페이지로 이동
    }

    return (
        <Navbar className="bg-body-tertiary">
            <Nav className="me-auto">
                {/* 게시판페이지로 이동 
                NavLink 를 사용해 현재 페이지와 일치할 경우 active 클래스 적용 */}
                <Nav.Link as={NavLink} to="/board" className={ ({isActive})=> isActive ? 'active' : ''}>게시판</Nav.Link>
                <Nav.Link as={NavLink} to="/gal"   className={ ({isActive})=> isActive ? 'active' : ''}>이미지게시판</Nav.Link>
            </Nav>
                 {
                    isAuthenticated() && getUserRole() ==='ROLE_ADMIN' &&  //로그인 된 상태이며, 사용자 권한이 ROLE_ADMIN일 경우 관리자 메뉴 보여줌
                     ( <Nav.Link as={NavLink}   to ='/admin' > 관리자 페이지</Nav.Link> ) 
                                                                                        
                 }
            <Navbar.Collapse className="justify-content-end" style={{marginRight : '50px'}}>
                {//로그인 여부에 따라 로그인네비 영역의 내용이 달라짐

                    //로그인상태 true
                    isAuthenticated() ?
                    (
                         <>
                            <NavDropdown title={userName} id="navbarScrollDropdown">
                            <NavDropdown.Item href="#">회원정보</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>로그아웃</NavDropdown.Item>
                          </NavDropdown>
                         </>
                    ) :
                    //로그인상태 false
                    ( <Nav.Link as={NavLink}   to ='/login' > 로그인</Nav.Link> )  
                        
                }
            </Navbar.Collapse>
        </Navbar>
    );
}

export default MenuBar; //외부에서 이 MenuBar 컴포넌트를 사용할 수 있도록 export