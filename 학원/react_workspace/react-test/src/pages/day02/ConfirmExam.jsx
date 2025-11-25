import React from 'react';

function ConfirmExam(props) {

    const doDelete=()=>{
        const isConfirm = confirm('진짜 삭제?');

        if(isConfirm){
            alert('삭제됨');
        }else{
            alert('삭제취소');
        }
    }
    return (
        <div>
            <button type='button' onClick={doDelete}>삭제</button>
        </div>
    );
}

export default ConfirmExam;