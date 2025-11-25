import React from 'react';

function CssExam02(props) {
    //css-in-js
    //자바스크립트 객체를 이용해서 css를 적용하는 방식
    //랜더링 문제나 속도 관련하여 이슈가 있어 잘 사용하지는 않음
    const mainCss={
        backgroundColor : '#eeaaee',
        width : '300px',
        height : '200px',
        border : '1px solid black'
    }
    return (
        <div style={mainCss}>
            
        </div>
    );
}

export default CssExam02;