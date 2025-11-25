import React, { useRef, useState } from 'react';
import TodoList from './TodoList';
import TodoList02 from './TodoList02';

function TodoLayout(props) {
    const id = useRef(1);
        const [todoList, setTodoList]=useState([
                {id:++id.current, contents :'안녕'}
               
            ])
            const addTodo = ()=>{
        setTodoList((prev)=>[...prev, {id:id.current++,contents:'안녕'}])
    }
    return (
        <div>
            <TodoList02
            addTodo={addTodo}
            todoList={todoList}
            />
        </div>
    );
}

export default TodoLayout;