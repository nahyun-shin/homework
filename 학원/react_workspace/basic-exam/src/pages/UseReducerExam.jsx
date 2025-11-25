import React, { useReducer, useState } from 'react';

//setBalance와 같음
const bankReducer=(state, action)=>{
    switch(action.type){
        case 'deposit':
            return state+(action.payload);
        case 'withDraw':
            return state-action.payload;
        default:
            return state;
    }
}

function UseReducerExam(props) {
    const [money,setMoney]=useState(0);

    const[balance, dispatch]=useReducer(bankReducer,10000);

    const updateBalnce = (action)=>{
        if(action==='withDraw' && (balance<money)){
            alert('보유하고 있는 금액보다 출금 금액이 많습니다.');
            return false;
        }
        dispatch({type:action, payload:Number(money)});
    }
    


    return (
        <div>
            <p>잔액 : {balance}</p>
            <div>
                <label htmlFor="money">금액</label>
                <input type="number" id='money' value={money} onChange={(e)=>setMoney(e.target.value)}/>
            </div>
            <div>
                <button type='button' onClick={(e)=>updateBalnce('deposit')}>입금</button>
                <button type='button' onClick={(e)=>updateBalnce('withDraw')}>출금</button>
            </div>
        </div>
    );
}

export default UseReducerExam;