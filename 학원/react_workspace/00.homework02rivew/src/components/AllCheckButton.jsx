import React from 'react';

function AllCheckButton({allDoneTodo, allDelTodo}) {
    return (
        <>
            <div className='text-end mt-5'>
                <button type='button' className='btn btn-success me-2' onClick={allDoneTodo}>일괄 완료</button>
                <button type='button' className='btn btn-danger me-2' onClick={allDelTodo}>일괄 삭제</button>
            </div>   
        </>
    );
}

export default React.memo(AllCheckButton);