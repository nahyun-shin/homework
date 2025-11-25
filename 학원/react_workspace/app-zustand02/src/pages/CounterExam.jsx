import React from 'react';
import ButtonComp from './ButtonComp';
import useCounterStore from '../store/useCounterStore';

function CounterExam(props) {
    //원하는 부분의 상태 값만 가져옴
    //재 랜더링 방지용
    const count =useCounterStore((s)=>s.count);

    //기존에는 아래와 같은 방법으로 예제를 실행했는데
    //해당 방법은 전체의 상태변경을 가져오는것 
    // const {count} =useCounterStore();

    return (
        <div>
            <div>
                <p>{count}</p>
            </div>
            <ButtonComp/>
        </div>
    );
}

export default CounterExam;