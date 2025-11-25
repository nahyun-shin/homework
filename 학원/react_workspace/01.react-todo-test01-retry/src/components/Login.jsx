import React from "react";

function Login({isLogin,selectUser,changeLog,setSelectUser,users,logUser}) {
  return (
    <>
      <section>
        <select
          disabled={isLogin}
          value={selectUser}
          onChange={(e) => setSelectUser(e.target.value)}
        >
          {users.map((user) => (
            <option key={user.id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>

        <button type="button" onClick={changeLog}>
          {isLogin ? "로그아웃" : "로그인"}
        </button>

        <span>{logUser}</span>
      </section>
    </>
  );
}

export default Login;
