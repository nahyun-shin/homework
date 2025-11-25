import React, { useReducer } from 'react';
import '../assets/css/cards.css'
import CardWrap from '../components/CardWrap';



//상태변경처리reducer
const cardReducer=(state, action)=>{
    switch(action.type){
        case'create':
            return Array.from({length:5}, ()=>Math.floor(Math.random()*20)+1);
        case'delete':
            return [];
        default:
            return state;
    }
}




function CardBoard(props) {

    //초기값 빈 배열로
    const [cardList, dispatch]=useReducer(cardReducer,[]);

    

    const updateCard =(action)=>{
        dispatch({type:action});
    }



    return (
        <>
           <main className='container'>
                <section className='contents'>
                    <section className='canvas'>
                        {
                            cardList?.map((cardNum, index)=>(
                                <CardWrap key={index}>
                                    <p>
                                        {cardNum}
                                    </p>
                                </CardWrap>
                            ))
                        }
                    </section>
                    <section className='button-warp'>
                        <button type='button' onClick={()=>updateCard('create')}>생성</button>
                        <button type='button' onClick={()=>updateCard('delete')}>초기화</button>
                    </section>
                </section>
            </main> 
        </>
    );
}

export default CardBoard;