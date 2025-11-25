import React from 'react';
import {styled, keyframes, css} from 'styled-components';

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
const focusing = keyframes`
    0%{
        transform: scale(1);
    }
    100% {
    transform: scale(1.3);
    background-color: #ffd700;
    }
  
`

const BallWrap =styled.div`
    box-shadow: 1px 1px 3px gray;
    border-radius: 10px;
    width: 600px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

`

const Ball = styled.div`
    display: inline-block;
    margin: 0.5rem 0.3rem;
    text-align: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 0.5px solid gray;
    background-color: #e9e9e9;
    
    animation: ${(props) =>
    props.$isMatch&&props.$winNums
      ? css`${fadeInScale} 0.6s ease-in-out, ${focusing} 0.6s ease-in-out forwards`
      : css`${fadeInScale} 0.6s ease-in-out`};
    
`
const rank =styled.div`
    background-color: aqua;
`


function UserLotto({userNum,lottoNum,winNums,bonusNum}) {

    const rank =(count,bonus)=>{
        if(count===6)return '1등';
        if(count===5&&bonus)return '2등';
        if(count===5)return '3등';
        if(count===4)return '4등';
        if(count===3)return '5등';
        if(count===2)return '6등';
        return '꽝';
    }

    return (
        <>
            <BallWrap>

                {userNum.map((row, index) => {
                    const winNumShow = row.filter((num)=>lottoNum.includes(num)).length;
                    const bonusShow = row.includes(bonusNum);
                    return(
                    <div key={index}>
                        {row.map((num, i)=>(
                            <Ball key={i}
                            $isMatch={lottoNum.includes(num)}
                            $winNums={winNums}
                            >
                                {num}
                            </Ball>
                        ))}
                        {winNums&&
                            (<div className='rank'>
                               등수 : {rank(winNumShow,bonusShow)} 
                            </div>)
                        }
                    </div>
                )})}
            </BallWrap>
            
        </>
    );
}

export default UserLotto;