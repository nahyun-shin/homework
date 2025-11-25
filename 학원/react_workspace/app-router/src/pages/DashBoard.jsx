import React from 'react';
import { Link, NavLink, Outlet } from 'react-router';
import '../assets/css/dashboard.css'

function DashBoard(props) {
    return (
        <div>
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to="/dash/board/"
                        className={({isActive})=>isActive?'active':''}>게시판</NavLink>
                    </li>
                    <li>
                        {/*isActive는 내부함수임 구조분해할당을 해서 컬러변경해줌*/}
                        <NavLink to="/dash/gall/"
                        className={({isActive})=>isActive?'active':''}>갤러리</NavLink>

                    </li>
                </ul>
            </nav>
            <div>
                {/**자식 컴포넌트가 랜더링 되는 위치 */}
                <Outlet/>
            </div>
        </div>
    );
}

export default DashBoard;