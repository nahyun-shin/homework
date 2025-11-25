import React from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import styled from 'styled-components';

const Header= styled.div`
    display: flex;
    width: 100%;
    height: 10vh;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
`


function LoginHeader(props) {


    const {isLogin, login, logout}=useContext(AuthContext);

    return (
        <div>
            <Header>
                {isLogin? 
                <button onClick={logout}>로그아웃</button>
                :
                <button onClick={login}>로그인</button>
                }
            </Header>
        </div>
    );
}

export default LoginHeader;