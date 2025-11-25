import React from 'react';
import{styled} from 'styled-components';

    const Square =styled.div`
        width : 100px;
        height : 100px;
        border : 1px solid black;
        border-radius : 5px;
        background-color:${(props)=>props.$bgColor||'black'};
    `;
function Box({boxColor}) {

    return (
        <>
            <Square $bgColor ={boxColor}/>
        </>
    );
}

export default Box;