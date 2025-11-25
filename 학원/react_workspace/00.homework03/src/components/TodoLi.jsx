import React from 'react';
import styled from 'styled-components';

const TodoOne = styled.div`
    width: 90%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;

    span {
        flex: 1;
        text-decoration: ${props => props.isDone? 'line-through' : 'none'};
        color: ${props => props.$done ? 'gray' : 'black'};
    }
`;

function TodoLi({ todo, onToggle, onDelete, onCheck, isChecked }) {
    const handleCheck = (e) => {
        onCheck(e.target.checked);
    };

    return (
        <TodoOne $done={todo.isDone}>
            <input
                type="checkbox"
                onChange={handleCheck}
                checked={isChecked}
            />
            <span>{todo.text}</span>
            <button type='button' onClick={onToggle}>완료</button>
            <button type='button' onClick={onDelete}>삭제</button>
        </TodoOne>
    );
}

export default TodoLi;