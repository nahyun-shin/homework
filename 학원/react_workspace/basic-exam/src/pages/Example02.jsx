import React, { useEffect, useState } from 'react';

function Example02(props) {

    const [list, setList]=useState([]);
    const [num, setNum]=useState(0);
    const [sum, setSum]=useState(0);

    const add=()=>{
        //숫자로 변환해서 리스트에 넣는게 근본적으로 사용하기 좋음
        const parsedNum = Number(num);
        setList((prev)=>[...prev,parsedNum]);
    }
    useEffect(()=>{
        if(list.length===0) return;

        const sum = list.reduce((hap, val)=>hap + val,0);
        setSum(sum);

        // setSum(Number(sum)+Number(num));

        console.log('입력값 업뎃')

    },[list]);

   
    return (
        <div>
            <div>
                <input type="number" value={num} onChange={(e)=>setNum(e.target.value)}/>
                <button type='button' onClick={add}>입력</button>
            </div>
            <div>
                {
                    list?.map((text, index)=>(
                        
                        <p key={index}>{text}</p>
                        
                    ))
                }
                <p>합 : {sum}</p>
            </div>
        </div>
    );
}

export default Example02;