import React, { useState } from 'react';
import styled from 'styled-components';

    
function BoxMake(props) {

    const [boxWidth, setBoxWidth] = useState(0);
    const [boxHeight, setBoxHeight] = useState(0);
    const [boxColor, setBoxColor] = useState('#');

    const makeBtn=()=>{
        const pick = document.querySelectorAll('div');
        const widthValue = pick[0].querySelector('input');
        const heightValue = pick[1].querySelector('input');
        const colorValue = pick[2].querySelector('input');

        
        setBoxWidth(widthValue.value);
        setBoxHeight(heightValue.value);
        setBoxColor(colorValue.value);


    }

    const mainCss={
        backgrondColor : boxColor,
        width : boxWidth,
        height : boxHeight
    }


    return (
        <>
            <div>
                width : <input type="text" />
            </div>
            <div>
                height : <input type="text" />
            </div>
            <div>
                color : <input type="text" />
            </div>
            
            <button type='button' onClick={makeBtn}>생성</button>
            
            <div>
                결과 :
                <div style={mainCss}></div>
            </div>
        </>
    );
}

export default BoxMake;