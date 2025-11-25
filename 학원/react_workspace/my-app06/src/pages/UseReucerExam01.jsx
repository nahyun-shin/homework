import React, { useReducer, useState } from 'react';

function UseReucerExam01(props) {


    const accountReducer =(state, action)=>{
        console.log('======계좌 처리 프로세스======');

        //return자체가 balance 상태 변경
        switch(action.type){
            case 'deposit':
                return state + Number(action.payload);
            case 'widthdraw':
                return state - Number(action.payload);
            default : 
            return state;
        }
        
    }

    const [balance, dispatch] = useReducer(accountReducer, 10000);
    // const [balance, setBalance] = useReducer(처리할 함수, 초기값);
    const [money, setMoney]=useState(10000);

    const manageAccount = (action)=>{
    
       dispatch({ type : action, payload : money});
    }

    return (
        <div>
            <main>
                <header>
                    <h2>계좌 입출금</h2>
                </header>
                <section>
                    <p>잔액 : {balance}</p>
                </section>
                <section>
                    <label htmlFor="money">금액 : </label>
                    <input type="number" id='money' value={money} 
                           onChange={(e)=>setMoney(e.target.value)} />
                </section>
                <div>
                    <button type='button' onClick={()=>manageAccount('deposit')}>입금</button>
                    <button type='button' onClick={()=>manageAccount('widthdraw')}>출금</button>
                </div>
            </main>
        </div>
    );
}

export default UseReucerExam01;