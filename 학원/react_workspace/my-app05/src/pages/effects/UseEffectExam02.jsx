import React, { useState } from 'react';
import Sign from './Sign';

function UseEffectExam02(props) {

    const [toggle, setToggle] = useState(false);

    //이벤트함수
    const toggleBtnEvent = () =>{
        setToggle(!toggle);
    }

    return (
        <div>
            <div>
                <button type='button' onClick={toggleBtnEvent}>
                    {toggle ? '가리기':'보이기'}
                </button>
            </div>
            <div>
                {toggle&&<Sign/>}
            </div>
        </div>
    );
}

export default UseEffectExam02;