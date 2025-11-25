import React from 'react';

function Exam01(props) {
    const score = Math.floor(Math.random()*51)+50;
    return (
        <div>
            {
                /*html 영역에서 중괄호 영역은 스크립트 코드 영역 */
                /**jsx 문법은 별도의 주석이 없어서 주석을 적을 때는 스크립트 영역에서 처리 */

                score >=70? `합격,${score}` :`불합격,${score}`
            }
        </div>
    );
}

export default Exam01;