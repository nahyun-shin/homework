import React, { useEffect, useState } from "react";
import { Todo } from "../data/Index";

function TodoLayout(props) {
  const [users, setUsers] = useState([
    { id: 1, name: "김영희", todoList: [] },
    { id: 2, name: "김철수", todoList: [] },
  ]); //유저정보

  const [selectUser, setSelectUser] = useState(users[0].id); //선택된 유저
  const [logUserName, setLogUserName] = useState(""); //로그인 된 유저 표시
  const [isLog, setIsLog] = useState(false); //로그인여부
  const [iptTodo, setIptTodo] = useState(""); //input창 입력한 값
  const [isCheck, setIsCheck] = useState([]);

  //로그인
  const loginHandle = () => {
    //로그인정보 넘기기
    setIsLog((prevIsLog) => {
      //선택된 유저 정보 넘기기
      if (isLog) {
        //로그아웃시
        setLogUserName("");
        setUsers((prev)=>
        prev.map(user=>({
            ...user,todoList:[]
        })))
      } else {
        //로그인시
        setLogUserName(users.find((u) => u.id === selectUser)?.name);
      }
      return !prevIsLog; //상태반전
    });
  };

  //할일 추가
  const add = (userId, todo) => {
    if (!todo.trim()) return;
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === userId
          ? {
              ...u,
              todoList: [
                ...u.todoList,
                new Todo(Date.now(), todo, u.name, false),
              ],
            }
          : u
      )
    );
    setIptTodo("");
  };

  //체크박스 체크유무
 const isChecked = (id) => {
  setIsCheck((prev) =>
    prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
  );
};
  const done = (userId, todoId) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === userId
          ? {
              ...u,
              todoList: u.todoList.map((t) =>
                t.id === todoId ? { ...t, checked: true } : t
              ),
            }
          : u
      )
    );
  };

  const del = (userId, todoId) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === userId
          ? {
              ...u,
              todoList: u.todoList.filter((t) => t.id !== todoId),
            }
          : u
      )
    );
  };

  const allDone = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              todoList: user.todoList.map((todo) =>
                isCheck.includes(todo.id) ? { ...todo, checked: true } : todo
              ),
            }
          : user
      )
    );
    setIsCheck([]); // 체크박스 초기화
  };

  const allDel = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              todoList: user.todoList.filter(
                (todo) => !isCheck.includes(todo.id)
              ),
            }
          : user
      )
    );
    setIsCheck([]);
  };

   const user = users.find((u) => u.id === selectUser);
  const total = user ? user.todoList.length : 0;
  const completed = user ? user.todoList.filter((t) => t.checked).length : 0;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div>
      <div className="header-wrap">
        <h2>TODO LIST</h2>
        <section>
          <select
            name="userName"
            id="userName"
            disabled={isLog}
            value={selectUser}
            onChange={(e) => setSelectUser(Number(e.target.value))}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <button type="button" onClick={loginHandle}>
            {isLog ? "로그아웃" : "로그인"}
          </button>
          <span>
            {isLog
              ? `${users.find((u) => u.id === selectUser).name}님 환영합니다.`
              : "로그인해주세요"}
          </span>
        </section>
        <section>
          <p>할 일: {total}</p>
          <p>완료: {completed}</p>
          <p>달성률: {progress}%</p>
        </section>
      </div>
      <div>
        <section>
          <input
            type="text"
            value={iptTodo}
            onChange={(e) => setIptTodo(e.target.value)}
          />
          <button onClick={() => add(selectUser, iptTodo)}>등록</button>
          <button
            onClick={() => allDone(selectUser)}
            disabled={isCheck.length === 0}
          >
            일괄완료
          </button>
          <button
            onClick={() => allDel(selectUser)}
            disabled={isCheck.length === 0}
          >
            일괄삭제
          </button>
        </section>
      </div>
      <div>
        <section>
          {isLog ? (
            (() => {
              const user = users.find((u) => u.id === selectUser);
              return (
                <div>
                  <h3>{user.name}의 할 일 목록</h3>
                  {user.todoList.length > 0 ? (
                    <ul>
                      {user.todoList.map((todo) => (
                        <li key={todo.id}>
                          <input
                            type="checkbox"
                            checked={isCheck.includes(todo.id)}
                            onChange={() => isChecked(todo.id)}
                            />

                          <span
                            style={{
                              textDecoration: todo.checked
                                ? "line-through"
                                : "none",
                              color: todo.checked ? "gray" : "black",
                            }}
                          >
                            {todo.todoName}
                          </span>
                          <button
                            onClick={() => done(selectUser, todo.id)}
                            disabled={todo.checked}
                          >
                            완료
                          </button>
                          <button onClick={() => del(selectUser, todo.id)}>
                            삭제
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>등록된 할 일이 없습니다.</p>
                  )}
                </div>
              );
            })()
          ) : (
            <p>로그인 후 할 일을 확인하세요.</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default TodoLayout;
