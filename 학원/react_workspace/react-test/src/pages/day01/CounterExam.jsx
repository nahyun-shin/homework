import React, { useState } from 'react';

function CounterExam(props) {

    const [counter, setCounter]=useState(0);

    const increaseCount =()=>{
        setCounter(counter+1);
    }
    
    const decreaseCount=()=>{
        setCounter(counter-1);

    }

    return (
        <div>
            <div>
                <p>결과 값 : {counter}</p>
            </div>
            <div>
                <button type='button'
                onClick={increaseCount}
                >증가</button>
                <button type='button'
                onClick={decreaseCount}
                >감소</button>
            </div>
        </div>
    );
}

export default CounterExam;