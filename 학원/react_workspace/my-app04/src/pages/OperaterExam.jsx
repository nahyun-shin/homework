import React from 'react';
import Button from '../components/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
function OperaterExam() {

    const[one, setOne]= useState(0);
    const[two, setTwo]=useState(0);
    const[op, setOp]=useState('+');
    const [result, setResult] =useState(0);

    const operaterValue = ()=>{
        let cal = 0;
        switch(op){
            case '+':
               cal = Number(one)+Number(two);
                break;
            case '-':
                cal =Number(one)-Number(two);
                break;
            case '*':
                cal =Number(one)*Number(two);
                break;
            case '/':
                if(Number(two) == 0){
                    alert('0으로는 나눌 수 없음')
                    cal = 0;
                    return;
                }
                cal =Number(one)/Number(two);
                break;

        }
        //결과 업데이트
        setResult(cal);
    }


    return (
        <div className='container mt-5'> 
            <div className='mx-auto w-75 text-center'>
                <label htmlFor="one">첫번째 : </label>
                <input type="text" id='one' onChange={(e)=>setOne(e.target.value)}/>
                <select className='mx-3'
                style={{width : '100px'}}
                onChange={(e)=>setOp(e.target.value)}>

                    <option value="+">+</option>
                    <option value="-">-</option>
                    <option value="*">*</option>
                    <option value="/">/</option>
                </select>
                <label htmlFor="two">두번째 : </label>
                <input type="text" id='two' onChange={(e)=>setTwo(e.target.value)}/>
                
            </div>
            <div className='text-end w-75 mt-3'>
                <Button bgColor={'#338a69'} clickEvnt={operaterValue}>입력</Button>
            </div>
            <div className='w-75 text-center'>
                <p>결과 : {result} </p>
            </div>
        </div>
    );
}

export default OperaterExam;