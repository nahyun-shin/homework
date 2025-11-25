import React, { useState } from 'react';
import '../assets/css/cards.css'
import CardWrap from '../components/CardWrap';

function CardExam(props) {

    const [cardList, setCardList]=useState([]);

    //버튼눌러서 카드생성
    const createCard=()=>{
        const newCards = makeNumber();
        setCardList(newCards);
        
    }
    

    //랜덤 숫자 생성
    const makeNumber=()=>{
        const nums=[];
        
        for(let i=0; i<5; i++){
            nums.push(Math.floor(Math.random()*20)+1);
            
        }
        return nums;
    }

    const deleteCard=()=>{
        setCardList([]);
    }
    

    return (
        <div>
            <main className='container'>
                <section className='contants'>
                    <section className='canvas'>
                        {
                            cardList?.map((number, index)=>(
                                <CardWrap key={`key_${index}`}number={number}/>
                            ))
                        }
                    </section>
                </section>
                    <section className='but-box'>
                        <button type='button' onClick={createCard}>생성</button>
                        <button type='button' onClick={deleteCard}>초기화</button>
                    </section>
            </main>
        </div>
    );
}

export default CardExam;