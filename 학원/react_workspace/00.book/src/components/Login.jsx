import React from 'react';
import { useUser } from './UserContext';

function Login() {
  const { setUser } = useUser();

  const handleLogin = () => {
    // 실제론 서버 통신 후 사용자 정보 받아와야 하지만 예시로 하드코딩
    const loggedInUser = { id: 'user01', name: '김영희' };
    setUser(loggedInUser);
  };

  return (
    <button onClick={handleLogin}>로그인</button>
  );
}

export default Login;
