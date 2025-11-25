import { useState } from 'react';
import { useUser } from './pages/UserContext'; // 추가
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';


function App() {
  const [count, setCount] = useState(0);

  // Context에서 user, setUser 가져오기
  const { user, setUser } = useUser();

  // 임시 로그인 함수 (실제론 로그인 API나 로직 필요)
  const login = () => {
    setUser({ id: 'user01', name: '김영희' });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      {/* 로그인 상태 확인 UI */}
      {user ? (
        <div>
          <p>안녕하세요, {user.name}님!</p>
          <button onClick={logout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <p>로그인이 필요합니다.</p>
          <button onClick={login}>로그인</button>
        </div>
      )}

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
