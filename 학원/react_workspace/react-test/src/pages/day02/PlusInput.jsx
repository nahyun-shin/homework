import React, { useState } from 'react';

function PlusInput(props) {
    const [num1,setNum1]=useState(0);
    const [num2,setNum2]=useState(0);
    const [result,setResult]=useState(0);

    const sumBtn=()=>{
        if(num1 === 0 || num2 === 0){
            alert('숫자를 입력해 주세요.');
            return false;
        }
        setResult(Number(num1)+Number(num2));
    }
    return (
        <div>
            <div>합계 : {result}</div>
            <input type="number" placeholder="첫 번째 숫자"  onChange={(e)=>setNum1(e.target.value)}/>
            <input type="number" placeholder="두 번째 숫자"  onChange={(e)=>setNum2(e.target.value)} />
            <button type='button' onClick={sumBtn}>더하기</button>
        </div>
    );
}

export default PlusInput;