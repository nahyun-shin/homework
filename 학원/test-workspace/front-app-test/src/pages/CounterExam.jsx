import React, {useState} from 'react';

function CounterExam(props) {

    const [count, setCount]=useState(0);

    const increment=()=>{
        setCount(count+1);
    }
    const decrement=()=>{
        setCount(count-1);
    }
    return (
        <div>
            <p>{count}</p>
            <div>
                <button onClick={increment}>증가</button>
                <button onClick={decrement}>감소</button>
            </div>
        </div>
    );
}

export default CounterExam;