import React from 'react';
import styled from 'styled-components';

    const DivBox = styled.div`
      width  :100px ;
      height: 100px;
      background-color: ${(props)=>props.$bgColor ||'white'};
      border-radius: 5px;

    `;
function Box(props) {


    return (
        <div>
            <DivBox $bgColor = {props.bgColor}></DivBox>
        </div>
    );
}

export default Box;