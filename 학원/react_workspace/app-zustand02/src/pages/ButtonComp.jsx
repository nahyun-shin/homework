import React, { useCallback } from 'react';
import useCounterStore from '../store/useCounterStore';

function ButtonComp(props) {

    const {addCount, minusCount}= useCounterStore();

    //해당방법은 props로 넘길 때 의미가 있음 
    //어차피 빼기에서 랜더링이 되기 때문에
    //이러한 방법이 있다 정도로만 알고 있으면 된다.
    const addEvent =useCallback(()=>{
        addCount();
    },[addCount]);

    return (
        <div>
            <button onClick={addEvent}>더하기</button>
            <button onClick={minusCount}>빼기</button>
        </div>
    );
}

export default ButtonComp;