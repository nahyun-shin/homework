import React from 'react';
import {styled} from 'styled-components';
import TodoItem from './TodoItem';

const ListDiv =styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 60vh;
    overflow: auto;
    background-color: #f7f7f7;
    border-radius: 10px;
    padding: 2rem 1rem;
    margin-top: 1rem;
`


function TodoList({todoList}) {
    return (
        <>
            <ListDiv>
                {
                    todoList?.map((todo, index)=>(
                        <TodoItem key={index} todo={todo}/>
                    ))
                }
            </ListDiv>
        </>
    );
}

export default TodoList;