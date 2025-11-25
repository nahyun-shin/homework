import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Usebook from "../components/Usebook";

function BookContents() {
  //로그인 정보
  const [userInfo, setUserInfo] = useState("");//로그인한 유저 아이디 저장
  const [logInfo, setLogInfo] = useState("");//로그인한 유저 이름 저장
  const [isLog, setIsLog] = useState(false);//로그인 여부 확인

  const [chkBook, setChkBook] = useState([]);//체크된 책 저장
  const [bookList, setBookList] = useState([]);//공용 서재 리스트
  const [inpBook, setInpBook] = useState("");//공용 서재 추가할 책 이름 저장

  //유저정보저장
  const [users, setUsers] = useState({
    user01: { name: "김영희", haveBook: [] },
    user02: { name: "김철수", haveBook: [] },
  });
  //개인 서재에 담긴 책 정보 저장
  const [currentBooks, setCurrentBooks] = useState([]);

  // 로그인
  const login = () => {
    if (userInfo) {
      setLogInfo(users[userInfo]?.name || ""); //users객체에 유저id로 저장한 것과 같은 속성이 있다면 users객체안 name 보내기
      setCurrentBooks(users[userInfo]?.haveBook || []);//동일한내용으로 개인서재 목록 보내기
      setIsLog(true); //로그인 여부 
    }else{
      setIsLog(false);
    }
  };

  // 책 추가
  const add = () => {
    if (inpBook.trim() === "") { //input창에 입력한 값이 없다면 alert띄우기
      alert("등록할 책 이름을 입력해 주세요.");
      return;
    }
    

    const newBook = {//고유 아이디를 부여해서 중복되거나 변경되지 않게 uuid로 부여
      id: uuidv4(),
      name: inpBook,
    };
    setBookList((prev) => [...prev, newBook]);//이전목록 불러와서 만든책으로 집어넣기
    setInpBook(""); //input창 초기화
  };

  // 공용서재 체크
  const handleChk = (id) => { //id값 받아와서
    setChkBook((prev) => //이전목록가지고

    //해당하는 id의 목록이 있으면 해당하는 id를 가지지 않은 item만 목록으로 남기고 그렇지 않으면 해당 id 넣어주기
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id] 
    );
  };

  // 대여
  const rentBook = () => {
    if (!userInfo || chkBook.length === 0) {
      alert("책을 선택해주세요.");
      return;
    }
    //체크된 책 배열에 bookList에 있는 책id가 참이면 해당하는 요소들로 배열 만들기
    const rentedBooks = bookList.filter((book) => chkBook.includes(book.id));
    //유저정보안에 있는 havebook업뎃
    setUsers((prev) => ({//기존목록 불러와서
      ...prev,//펼치고
      [userInfo]: {//userinfo에 해당하는 속성의 객체안을 다시 펼쳐서
        ...prev[userInfo],
        haveBook: [...prev[userInfo].haveBook, ...rentedBooks],//havebook속성에 rentedbook배열 펼쳐서 하나씩 넣어주기
      },
    }));

    setCurrentBooks((prev) => [...prev, ...rentedBooks]);//대여한 책 배열저장
    setChkBook([]);
  };

  // 대여했던 책 선택 반납
  const returnSelectedBooks = (chkReturn) => {
    if (chkReturn.length === 0) {
      alert("반납할 책을 선택해주세요.");
      return;
    }

    setUsers((prev) => ({
      ...prev,
      [userInfo]: {
        ...prev[userInfo],
        haveBook: prev[userInfo].haveBook.filter(
          (book) => !chkReturn.includes(book.id)
        ),
      },
    }));

    setCurrentBooks((prev) => prev.filter((book) => !chkReturn.includes(book.id)));
  };

  // ✅ 삭제 (공용서재에서만)
  const delBook = () => {
    setBookList((prev) => prev.filter((book) => !chkBook.includes(book.id)));
    setChkBook([]);
  };

  // ✅ 이미 대여된 책
  const rentedIds = useMemo(() => {
    const ids = new Set();
    Object.values(users).forEach((user) =>
      user.haveBook.forEach((book) => ids.add(book.id))
    );
    return ids;
  }, [users]);

  return (
    <div>
      <div>
        <select
          name="user"
          id="user"
          onChange={(e) => setUserInfo(e.target.value)}
        >
          <option value="">사용자를 선택해주세요</option>
          <option value="user01">김영희</option>
          <option value="user02">김철수</option>
        </select>
        <button type="button" onClick={login}>
          로그인
        </button>
        {isLog && <span>{logInfo} 사용자님 환영합니다!</span>}
      </div>

      {/* ✅ 개인 서재 */}
      {isLog && (
        <Usebook
          userBook={currentBooks}
          logInfo={logInfo}
          isLog={isLog}
          onReturnSelectedBooks={returnSelectedBooks}
        />
      )}

      {/* ✅ 공용 서재 */}
      {isLog && (
        <>
          <h2>전체 도서 목록</h2>
          <div>
            <input
              type="text"
              value={inpBook}
              onChange={(e) => setInpBook(e.target.value)}
            />
            <button type="button" onClick={add}>
              추가
            </button>
            <button type="button" onClick={rentBook}>
              대여
            </button>
            <button type="button" onClick={delBook}>
              삭제
            </button>
          </div>

          <div>
            {bookList.map((book) => (
              <span key={book.id} >
                <input
                  type="checkbox"
                  disabled={rentedIds.has(book.id)}
                  checked={chkBook.includes(book.id)}
                  onChange={() => handleChk(book.id)}
                />
                <span>
                  {book.name}
                  {rentedIds.has(book.id) && (
                    <span>
                      (대여중)
                    </span>
                  )}
                </span>
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default BookContents;
