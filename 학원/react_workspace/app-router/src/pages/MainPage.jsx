import React from 'react';
import AboutPage from './AboutPage';
import { NavLink, useNavigate } from 'react-router';
import'../assets/css/dashboard.css'

function MainPage(props) {
    
    return (
        <div>
            <h1>메인페이지</h1>
            <nav className='nav'>

            <ul>
                <li>
                    <NavLink to="/dash">dash</NavLink>

                </li>
                <li>

                     <NavLink to="/about">about</NavLink>  
                </li>
            </ul>
            </nav>
        </div>
    );
}

export default MainPage;