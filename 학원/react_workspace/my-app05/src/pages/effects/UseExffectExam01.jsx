import React, { useEffect, useState } from "react";

function UseExffectExam01(props) {
  //import 확인

  const [count, setCount] = useState(0);

  const upCount = () => {
    setCount(count + 1);
  };

  //의존성 부여x 화면갱신되면 계속실행
  useEffect(() => {
    console.log("실행1");
  });
  //의존성 부여 []<-괄호안에 의존할 것을 부여가능
  useEffect(() => {
    console.log("실행2");
  }, []);
  //count라는 의존성 부여
  useEffect(() => {
    console.log("실행3");
  }, [count]);

  return (
    <div>
      <p> 값 : {count}</p>
      <button type="button" onClick={upCount}>
        증가
      </button>
    </div>
  );
}

export default UseExffectExam01;
                                                        