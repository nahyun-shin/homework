import React from 'react';
import TodoLayout from '../todoList/TodoLayout';
import {styled} from 'styled-components'

const TodoOne=styled.div`
    width: 90%;
    height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;


    .done{
        text-decoration: line-through;
        color: gray;
    }

`


function TodoLi({todo, chkTodo,doneBtn,delBtn}) {
    return (
        <div>
            <TodoOne>
                <input type="checkbox" onChange={()=>chkTodo(todo.id)} checked={todo.checked}/>
                <span className={todo.completed? 'done':''}>{todo.text}</span>
                <button type='button' onClick={()=>doneBtn(todo.id)}>완료</button>
                <button type='button' onClick={()=>delBtn(todo.id)}>삭제</button>
            </TodoOne>
        </div>
    );
}

export default TodoLi;