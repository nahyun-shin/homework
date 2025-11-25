import React, { useState } from "react";

function StateExam01(props) {
  const [val, setVal] = useState(0);
  const [result, setResult] = useState(0);

  const add = () => {
    const resultVal = result + Number(val);
    setResult(resultVal);
    //set함수는 비동기는 아니지만 로직절차에 따라서 타이미잉 비동기같이 보임
    //그래서 함수 처리 후 react에서 값을 바로 사용한다면 주의해야함
    //가장 편한 방법은 별도의 변수에 결과를 받아서 set함수에 넣고 바로 사용하는것
    console.log(resultVal);
  };

  const inputValue = (e) => {
    //e 이벤트 객체가 발생한 target에서 변경된 value를 가져오기
    setVal(e.target.value);
  };
  return (
    <>
      <p>값 : {result}</p>
      <div>
        <input type="text" value={val} onChange={inputValue}></input>
      </div>
      <div>
        <button type="button" onClick={add}>
          더하기
        </button>
      </div>
    </>
  );
}

export default StateExam01;
