import React, { useState } from "react";

function UseStateExam(props) {


    const [num01, setNum01]=useState(0);
    const [num02, setNum02]=useState(0);
    const [result, setResult]=useState(0);

    //선언하여 대입해도 되지만 굳이 불필요하게 만들 이유는 없다.
    // const inputValue=(e)=>{
    //     const {name, value}=e.target;
    //     if(name==='num01'){
    //         setNum01(value);
    //     }else{
    //         setNum02(value);
    //     }
    // }

    const add=()=>{
        const result =Number(num01)+Number(num02);
        setResult(result);
    }
    const minus=()=>{
        const result =Number(num01)-Number(num02);
        setResult(result);
    }

  return (
    //누군가에게 삽입된다고 하면 div를 없애고 플래그먼트로 남겨놓는다.
    <>
      <p>결과 : {result}</p>
      <div>
        { /**리액트에서 onChange, 순수 스크립트에서는 oninput 가능*/}
        <input type="text" name="num01" value={num01} onChange={(e)=>setNum01(e.target.value)}/>
        <input type="text" name="num02" value={num02} onChange={(e)=>setNum02(e.target.value)}/>
      </div>
      <button type="button" onClick={add}>더하기</button>
      <button type="button" onClick={minus}>빼기</button>
    </>
  );
}

export default UseStateExam;
