import React from 'react';
import {styled} from 'styled-components'

const MyCard=styled.div`
    width: 120px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
    border-radius: 7px;
    //props받을때 isDiabled 상태 일때이니까 처음은 핑크
    background-color: ${(props)=>props.$isDiabled?'lightblue':'#efaaef'};
    border-color: ${(props)=>props.$isDiabled?'#797979':'black'};
    opacity: ${(props)=>props.$isDiabled?0.5:1};
`
function Card({number, isDisabled, isChecked, selecedCard}) {
    return (
        <>
            <MyCard $isDiabled ={isDisabled}>
                <input type='checkbox'
                onChange={selecedCard}
                value={number}
                checked={isChecked}
                disabled={isDisabled}/>
                <p style={{color:'white'}}>{number}</p>
            </MyCard>
        </>
    );
}

export default React.memo(Card);