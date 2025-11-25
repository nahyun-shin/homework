import React from 'react';
import styled from 'styled-components';

const CardStyle = styled.div`
    width : 100px;
    height : 150px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border : 1px solid black;
    border-radius : 5px;
    background-color: red;
` 

function CardWrap({children}) {
    return (
        <>
            <CardStyle>
                {children}
            </CardStyle>
        </>
    );
}

export default CardWrap;