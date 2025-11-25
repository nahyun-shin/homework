import React from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import styled from 'styled-components';


const MainLayout = styled.main`
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;
function Contents(props) {
  const { isLogin } = useContext(AuthContext);
  return (
    <div>
      <MainLayout>
        {isLogin ? 
          <p>로그인 하셨네요 환영합니다.</p>
         : 
          <p>로그아웃하였네요 안녕히가세요</p>
        }
      </MainLayout>
    </div>
  );
}

export default Contents;
