import React from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

function UseMemoExam03(props) {
    const [num01,setNum01]=useState(0);
    const [num02,setNum02]=useState(0);
    const [sum,setSum]=useState(0);

    //sum값이 바뀔때에만

    const avg = useMemo(()=>{
        console.log('----평균----')
        return parseFloat((sum/2).toFixed(2));
    },[sum])

    const makeSum=()=>{
        setSum(Number(num01)+Number(num02))
    }

    return (
        <div> 
            <p>합 : {sum},평균 : {avg}</p>
            <div>
                <input type="number" value={num01} onChange={(e)=>setNum01(e.target.value)} />
                <input type="number" value={num02} onChange={(e)=>setNum02(e.target.value)} />
            </div>
            <button type='button' onClick={makeSum}>합구하기</button>
        </div>
    );
}

export default UseMemoExam03;