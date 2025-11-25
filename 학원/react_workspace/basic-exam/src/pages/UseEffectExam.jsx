import React, { useEffect, useState } from 'react';

function UseEffectExam(props) {
    //최초 실행 후 업데이트 될 때마다 실행
    const [count, setCount]=useState(0);
    const [value, setValue]=useState(0);


    useEffect(()=>{
        console.log('실행1');
    })
    //최초 실행 후 실행 안됨
    useEffect(()=>{
        console.log('실행2');
    },[])
    //최초 실행 후 count의 값이 업데이트 될 때만 실행
    useEffect(()=>{
        console.log('실행3');
    },[count])
    const add=()=>{
        setCount(count+Number(value));
    }
    return (
        <div>
            <h1>개수 : {count}</h1><br/>
            <div>
                <input type="text" onChange={(e)=>setValue(e.target.value)} />
            </div>
            <button type='button' onClick={add}>증가</button>
        </div>
    );
}

export default UseEffectExam;