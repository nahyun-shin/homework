import React, { useEffect, useRef, useState } from 'react';

function UseRefExam01(props) {
    let count1 =0;
    const count2 = useRef(0);
    const [text, setText] = useState('');
    //처음 마운트 될 때 와 화명이 갱신 될 때 실행
    useEffect(()=>{
        console.log('화면이 갱신');
    });
    //state 가 변하면 화면이 재갱신됨
    //일반 자바스크립트 변수는 그래서 초기화 되지만
    //ref로 선언한 변수는 이전 내용을 저장하고 있어 유지 가능
    //사이트에 방문한 방문자수를 count할때 많이 사용
    const print = ()=>{
        count1++;
        count2.current++;

        console.log(`일반변수 count:${count1}, Ref 변수 count :${count2.current}`)
    }
    return (
        //input창에 value값은 입력만 받는다면 넣지 않아도 된다.
        <div>
            <input type="text" value={text} onChange={(e)=> setText(e.target.value)}/>
            <button type='button' onClick={print}>출력</button>
        </div>
    );
}

export default UseRefExam01;