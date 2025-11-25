import React from 'react';

function Exam02me(props) {
    const temp =Math.floor(Math.random()*25)+20
    return (
        <div>
            <div>오늘 날씨</div>
            {
                temp>=35&&<div>{temp}도 폭염주의</div>
            }
        </div>
    );
}

export default Exam02me;