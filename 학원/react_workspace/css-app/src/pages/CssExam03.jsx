import React from 'react';
import {styled} from 'styled-components';

function CssExam03(props) {

    const Main = styled.div`
        background-color :rgb(76, 156, 93);
        width : 300px;
        height : 300px;
        border : solid 1px black;
        
    `;

    return (
        <>
            <Main>하위~</Main>
        </>
    );
}

export default CssExam03;