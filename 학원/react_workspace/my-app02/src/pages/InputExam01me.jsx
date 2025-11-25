import React from 'react';
import { useState } from 'react';

function InputExam01(props) {

    const [val, setVal]=useState(0);

    const iptvalue=(e)=>{
        setVal(e.target.value);
        
    };
    return (


        <>
            <div>
                <input type="text" id='ipttTxt' value={val} onChange={iptvalue}/>
                <button type='button'  onClick={InputEvent}>입력</button>
            </div>
            <div>결과 : {val}</div>
        </>
    );
}

export default InputExam01;