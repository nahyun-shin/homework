import React from 'react';
import {styled, keyframes} from 'styled-components';


const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`


const SysWrap = styled.div`
    box-shadow: 1px 1px 3px gray;
    border-radius: 10px;
    width: 600px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem 0rem;
`

const SysBall = styled.div`
    display: inline-block;
    margin: 0.3rem;
    text-align: center;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 0.5px solid gray;
    background-color: #23548b;
    color: white;
    animation: ${fadeInScale} 0.6s ease-in-out;
`

function SysLotto({lottoNum,bonusNum}) {
    return (
        <>
            <SysWrap key={lottoNum.join('')}>
                {
                    lottoNum.map((num,index)=>(
                        <SysBall key={index}>
                            {num}
                        </SysBall>
                    ))
                }
                {bonusNum&&(
                <>
                <label>+</label>
                <SysBall className='bonusBall'>{bonusNum}</SysBall>
                </>
                )}
            </SysWrap>
        </>
    );
}

export default SysLotto;