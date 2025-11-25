import React, { useState } from 'react';

function TestExam01(props) {

    const [count, setCount]=useState(0);

    const upCount =()=>{
        setCount(count+1);
    }

    return (
        <div>
            
            <p>카운트 : {count}</p>

            <button type='button'
            onClick={upCount}>증가</button>

        </div>
    );
}

export default TestExam01;