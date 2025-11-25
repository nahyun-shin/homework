import React from 'react';

function InputExam01(props) {

    const InputEvent =()=>{
        const text =document.querySelector('#iptText').value;
        document.querySelector('#result').textContent = text;
    }

    return (
        <>
        <div>
            <input type="text" id='iptText'></input>
            <button type='button' onClick={InputEvent}>입력</button>
        </div>
        <div>결과 : <span id='result'></span></div>
        </>
    );
}

export default InputExam01;