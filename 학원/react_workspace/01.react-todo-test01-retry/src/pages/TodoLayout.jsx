import React, { useRef, useState } from "react";
import { Todo } from "../data/Index";
import Login from "../components/Login";

function TodoLayout(props) {
  const [users, setUsers] = useState([
    { id: 1, name: "김영희", todoList: [] },
    { id: 2, name: "김철수", todoList: [] },
  ]); //사용자
  const [isLogin, setIsLogin] = useState(false); //로그인상태
  const [selectUser, setSelectUser] = useState("");
  const [logUser, setLogUser] = useState(""); //로그인된 유저
  const [iptTodo, setIptTodo] = useState("");
  const [checkList, setCheckList] = useState([]); //체크된 리스트
  const [isChecked, setIsChecked] = useState(false);
  const index = useRef(0);

  //버튼 클릭시 현재 가지고 있는 값에서 반대의 값으로 세팅
  const changeLog = () => {
    if (!isLogin) {
      //로그인 시도
      setIsLogin(true);
      //초기값을 첫번째 유저로 설정
      setLogUser(selectUser.trim().length === 0 ? users[0] : selectUser);
    } else {
      //로그아웃 시도
      setIsLogin(false);
      setLogUser("");
    }
  };

  //todo추가
  const addTodo = () => {
    if (iptTodo.trim() === 0) {
      alert("할 일을 입력해 주세요");
      return false;
    }

    const newTodo = {
      id: index.current++,
      text: iptTodo,
      user: logUser,
      done: false,
    };

    setUsers((userPrev) =>
      //기존유저목록 불러와서
      //한명한명의 유저 중 유저이름과 로그인된유저가 같은지 확인
      //같다면 newTodo해당유저 객체 배열에 넣기
      //그렇지 않다면 불러온 유저그대로 냅두기
      userPrev.map((user) =>
        user.name === logUser ? { ...user, todoList: [newTodo] } : user
      )
    );
    setIptTodo("");
  };

  //체크된 목록에 넣기
  const handlerChk = (todoId, checked) => {
    if (checked) {
      setCheckList((prev) => [...prev, todoId]);
    } else {
      setCheckList((prev) => prev.filter((chkTodo) => chkTodo !== todoId));
    }
  };

  return (
    <div>
      <section>
        <h2>TODO LIST</h2>

        <section>
          <Login
            isLogin={isLogin}
            logUser={logUser}
            selectUser={selectUser}
            setSelectUser={setSelectUser}
            users={users}
            changeLog={changeLog}
          />
        </section>

        <section>
          <p>할 일 :</p>
          <p>완료한 일 :</p>
          <p>달성률 :</p>
        </section>
      </section>
      <section>
        <div>
          <input
            type="text"
            value={iptTodo}
            onChange={(e) => setIptTodo(e.target.value)}
          />
          <button type="button" onClick={addTodo}>
            추가
          </button>
          <button>일괄완료</button>
          <button>일괄삭제</button>
        </div>
        <div>
          {users.map((user) =>
            user.name === logUser
              ? user.todoList.map((todo) => {
                  <section key={todo.id}>
                    <input
                      type="checkbox"
                      ischecked={(checked) => handlerChk(todo.id, checked)}
                    />
                    <span>{todo.text}</span>
                    <button type="button">완료</button>
                    <button type="button">삭제</button>
                  </section>;
                })
              : user
          )}
        </div>
      </section>
    </div>
  );
}

export default TodoLayout;
