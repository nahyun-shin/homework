 import React, { useState } from 'react';
import UserLotto from '../components/UserLotto';
import SysLotto from '../components/SysLotto';
import {styled} from 'styled-components';
import '../assets/css/lottos.css'

//랜덤함수
const randomNum=()=>{
    //45개의 배열 생성
    const numList = Array.from({length:45}, (_,index) => index+1);
    
    //셔플
    for(let i = numList.length-1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        [numList[i], numList[j]]=[numList[j],numList[i]];
    };
    
    return numList.slice(0,6);
}

function LottoWrap(props) {
    const [winNums,setWinNums]=useState(false);
    const [lottoNum, setLottoNum]=useState([]);
    const [bonusNum,setBounsNum]=useState(null);
    const [userNum, setUserNum]=useState([]);

    //로또번호 생성
    const makeLotto=()=>{
        init()
        
        const lotto=randomNum()
        setLottoNum(lotto);
        let bonus;
        do{
            bonus=Math.floor(Math.random()*45)+1;
        }while(lotto.includes(bonus));
        setBounsNum(bonus);
        setWinNums(false);

    }
    //사용자 로또번호 생성
    const userLotto=()=>{
        const setNum = Array.from({length:5}, ()=>randomNum())
        setUserNum(setNum);
        setWinNums(false);
    }
    
   const init=()=>{
    setWinNums(false);
    setLottoNum([]);
    setBounsNum(null);
    setUserNum([])
   }
    

    return (
        <div className='container'>
            <div>
                <SysLotto
                lottoNum={lottoNum}
                bonusNum={bonusNum}
                />
            </div>
            <div className='buttonWrap'>
                <button type='button' onClick={makeLotto}>로또생성</button>
                <button type='button' onClick={userLotto}>유저로또</button>
                <button type='button' onClick={()=>setWinNums(true)}>비교</button>
            </div>
            <div>
                <UserLotto
                userNum={userNum}
                lottoNum={lottoNum}
                winNums={winNums}
                bonusNum={bonusNum}
                />
            </div>
        </div>
    );
}

export default LottoWrap;