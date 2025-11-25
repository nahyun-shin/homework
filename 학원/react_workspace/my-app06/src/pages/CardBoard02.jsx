import React from 'react';
import '../assets/css/cards.css';
import CardWrap from '../components/CardWrap';

function CardBoard02(props) {

    const actionReducer =(state, action)=>{

    }

    const nums=[];
        
        for(let i=0; i<5; i++){
            nums.push(Math.floor(Math.random()*20)+1);
            
        }

    return (
        <div>
            <main className='container'>
                <section className='contants'>
                    <section className='canvas'>
                        {
                            cardList?.map(number=>(
                                <CardWrap>
                                    <p style={{color :'white'}}>
                                        {number}
                                    </p>
                                </CardWrap>
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

export default CardBoard02;