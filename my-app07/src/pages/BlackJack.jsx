import React, { useState } from 'react';
import '../assets/css/cards.css'
import { useReducer } from 'react';
import BlackJackComponents from './BlackJackComponents';



const cardReducer=(state, action)=>{
    switch(action.type){
        case'start':
            return {...state,cardList:action.payload};
        case'reset':
            return [];
        default:
            return state;
    }
}

//셔플함수
const shuffle =(arr)=>{
    const arrNum=[...arr];
    for(let i=arrNum.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [arrNum[i],arrNum[j]] = [arrNum[j],arrNum[i]];
    }
    return arrNum; 
}

function BlackJack(props) {
    const [state, dispatch]=useReducer(cardReducer,{ cardList: [] });
    const[chacked, setChacked]=useState(0);
    
    const randomNum=()=>{
        const arr = Array.from({length:20}, (_,i)=>i+1);
        const shuffled = shuffle(arr);

        //0~4번째 배열까지 잘라서 넣는다.
        const cardList= shuffled.slice(0,5);
        //5~9번째 배열까지 잘라서 넣는다.
        const pcCardList=shuffled.slice(5,7);
        console.log(cardList,pcCardList);
        dispatch({type:'start', payload:Array.from(cardList)})    
    }

    const choiceChk=()=>{

    }
    const handleCheck=(e)=>{
        const {value, checked: isChecked}=e.target;
        const numVal=Number(value);
        if(isChecked){
            setChacked((prev)=>[...prev,numVal])
        }else{
            setChacked((prev)=>prev.filter((v)=> v !==numVal))
        }
        console.log(chacked);
    }




    return (
        <div>
            <main className='container'>
                <section className='contents'>
                    <section className='canvas'>
                        {
                            state.cardList.map((cardNum,index)=>(

                                <BlackJackComponents key={index}>
                                    
                                        <input type="checkbox" 
                                            id='checkboxed'
                                            onClick={(e) => handleCheck(cardNum)}
                                            value={cardNum}/>
                                    
                                        {cardNum}
                                    
                                </BlackJackComponents>
                            ))
                        }
                    </section>
                    <section className='btn-wrap'>
                        <button type='button' onClick={randomNum}>시작</button>
                        <button type='button' onClick={choiceChk}>선택</button>
                        <button type='button' onClick={'reset'}>리셋</button>
                    </section>
                </section>
            </main>
        </div>
    );
}

export default BlackJack;