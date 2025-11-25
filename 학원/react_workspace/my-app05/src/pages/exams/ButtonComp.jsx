import React from 'react';

function ButtonComp({addBox, delBox}) {
    return (
        <>
            <button type='button' onClick={addBox}>추가</button>
            <button type='button' onClick={delBox}>삭제</button>
        </>
    );
}

export default ButtonComp;