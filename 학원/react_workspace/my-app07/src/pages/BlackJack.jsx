import React, { useState } from 'react';
import '../assets/css/cards.css'
import { useReducer } from 'react';
import BlackJackComponents from './BlackJackComponents';




//셔플함수

const shuffle =(arr)=>{
    const arrNum=[...arr];
    for(let i=arrNum.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [arrNum[i],arrNum[j]] = [arrNum[j],arrNum[i]];
    }
    return arrNum; 
}

const initList={
    cardList:[],
    pcCardList:[],
    checkedCards:[],
    
}

const cardReducer=(state, action)=>{
    switch(action.type){
        case'start':{
            const arr = Array.from({length:20}, (_,i)=>i+1);
            const shuffled = shuffle(arr);
            return {
                //0~4번째 배열까지 잘라서 넣는다.
                //5~9번째 배열까지 잘라서 넣는다.
                cardList : shuffled.slice(0,5),
                pcCardList : shuffled.slice(5,7),
                checkedCards:[]
            }
        }
        case 'chiceChk':{
            
            

            return{
                
            }
        }
        
        case'reset':
            return initList;
        default:
            return state;
    }
}


function BlackJack(props) {
    
    const [state, dispatch]=useReducer(cardReducer,initList);

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
                                            checked={state.checkedCards.includes(cardNum)}
                                            
                                            value={cardNum}/>
                                    
                                        {cardNum}
                                    
                                </BlackJackComponents>
                            ))
                        }
                    </section>
                    <section className='btn-wrap'>
                        <button type='button' onClick={()=>dispatch({type:'start'})}>시작</button>
                        <button type='button' onClick={()=>dispatch({type:'chiceChk'})}>선택</button>
                        <button type='button' onClick={'reset'}>리셋</button>
                    </section>
                </section>
            </main>
        </div>
    );
}

export default BlackJack;