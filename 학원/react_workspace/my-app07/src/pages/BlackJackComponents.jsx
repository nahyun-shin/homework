import React from 'react';
import { Children } from 'react';
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
` 


function BlackJackComponents({children}) {
    return (
        <div>

        <CardStyle>
            {children}
        </CardStyle>
        
        </div>
    );
}

export default BlackJackComponents;