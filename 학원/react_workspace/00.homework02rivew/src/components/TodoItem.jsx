import React, { useContext } from 'react';
import{styled} from 'styled-components';
import { TodoContext } from '../context/TodoContext';


const TodoItemDiv =styled.div`
    display: flex;
    gap: 1px;
    height: 70px;
    background-color: ${(props)=>props.$isDone ? '#e2e2e2':'white'};
    width: 100%;
    border-radius: 7px;
    align-items: center;
    padding: 1rem 1rem;
`

function TodoItem({todo}) {

    const {updatedChecked, doneTodoBtn, delTodoBtn}=useContext(TodoContext);

    return (
        <>
            <TodoItemDiv $isDone={todo.isDone}>
                <div className='ms-3' style={{flex:1}}>
                    <input type="checkbox"
                    checked={todo.checked}
                    onChange={()=>updatedChecked(todo.id)}
                    />
                </div>
                <div style={{flex:2, textDecoration:todo.isDone? 'line-through':''}}>
                    {todo.contents}
                </div>
                <div className='text-end' style={{flex:2}}>
                    <button type='button'
                    className='btn btn-primary mx-1'
                    disabled={todo.isDone?true:false}
                    onClick={()=>doneTodoBtn(todo.id)}
                    >완료</button>
                    <button type='button'
                    className='btn btn-danger'
                    onClick={()=>delTodoBtn(todo.id)}
                    >삭제</button>
                </div>
            </TodoItemDiv>
        </>
    );
}

export default TodoItem;