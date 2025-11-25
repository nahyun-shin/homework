import React from 'react';

function Exam02(props) {
    const temp = Math.floor(Math.random()*25)+20;
    return (
        <div>
            <div>오늘 날씨는 매우 더움</div>
            {
                /*35도 이상일 때에만 폭염주의 출력 */
                temp >=35 &&<div>폭염주의!!</div>
                /**여기에서 &&은 ~이라면 */
            }
        </div>
    );
}

export default Exam02;