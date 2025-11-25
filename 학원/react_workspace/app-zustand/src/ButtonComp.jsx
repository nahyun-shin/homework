import React from 'react';
import useCounterStore from './store/useCounterStore';

function ButtonComp(props) {

    const { addNumber, minusNumber } = useCounterStore();

    return (
        <div>
            <button onClick={addNumber}>더하기</button>
            <button onClick={minusNumber}>빼기</button>
        </div>
    );
}

export default ButtonComp;