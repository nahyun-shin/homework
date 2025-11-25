import React, { useState } from 'react';

function CheckBoxExam(props) {
    const [hobbies, setHobboes]=useState([]);
    const [result, setResult]=useState('');

    const checkHobbies=(e)=>{
        const {value, checked}=e.target;

        if(checked){
            setHobboes((prev)=>[...prev, value])
        }else{
            setHobboes((prev)=>prev.filter(h=>h!==value));
        }
    }

    const getMyHobbies=()=>{
        setResult(hobbies.join(', '))
    }
    return (
        <div>
            <div>
                <p>취미 : {result.length>0?result:'없음'}</p>
                <div>
                    <input type="checkbox" 
                    checked={hobbies.includes('영화')}
                    value={'영화'}
                    id='moive'
                    onChange={checkHobbies}
                    />
                    <label htmlFor="moive">영화감상</label>

                    <input type="checkbox" 
                    checked={hobbies.includes('농구')}
                    value={'농구'}
                    id='basketball'
                    onChange={checkHobbies}
                    />
                    <label htmlFor="basketball">농구</label>

                    <input type="checkbox" 
                    checked={hobbies.includes('축구')}
                    value={'축구'}
                    id='soccer'
                    onChange={checkHobbies}
                    />
                    <label htmlFor="soccer">축구</label>

                </div>
                <button type='button' onClick={getMyHobbies}>출력</button>
            </div>
        </div>
    );
}

export default CheckBoxExam;