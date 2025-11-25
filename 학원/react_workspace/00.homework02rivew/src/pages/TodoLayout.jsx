import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/todolayout.css';
import Todo from '../components/Todo';
import InputEditor from '../components/InputEditor';
import TodoList from '../components/TodoList';
import { TodoContext } from '../context/TodoContext';
import AllCheckButton from '../components/AllCheckButton';

function TodoLayout(props) {

    const todoReducer=(state, action)=>{
        switch(action.type){
            case 'insert':
                return[...state, action.payload];
            case 'check' :
                return state.map(todo =>
                    (todo.id===action.payload.id?
                    {...todo, checked:!todo.checked}:todo)
                )
            case 'todoDone' :
                return state.map(todo =>
                    (todo.id===action.payload.id?
                    {...todo, isDone:true}:todo)
                )
            case 'delTodo' :
                return state.filter(todo =>todo.id!==action.payload.id)
            case 'allDone' :
                return state.map(todo =>todo.checked?{...todo, isDone:true}:todo)
            case 'allDelTodo' :
                 return state.filter(todo =>!todo.checked);
            
            default:
                return state;
        }
    }

    const todoId = useRef(1);

    const[inputText, setInputText]=useState('');
    const[todoList,dispatch]=useReducer(todoReducer,[]);
    const [todoCount, setTodoCount]=useState(0);
    const [doneCount, setDoneCount]=useState(0);
    const [doneRate, setDoneRate]=useState(0);

    const createTodo =()=>{
        const todo = new Todo(todoId.current++, inputText, false, false);
        dispatch({type:'insert', payload:todo})
    }

    const updatedChecked=(id)=>{
        dispatch({type:'check', payload:{id}})
    }
    const doneTodoBtn=(id)=>{
        dispatch({type:'todoDone', payload:{id}})
    }
    const delTodoBtn=(id)=>{
        const isConfirm=confirm('정말 삭제하시겠습니까?');
        if(isConfirm){
            dispatch({type:'delTodo', payload:{id}});
        };
    }
    const allDoneTodo=useCallback(()=>{
        const todos =todoList?.filter(todo=>!todo.isDone && todo.checked);
        if(todos.length ===0){
            alert('일괄처리할 todo를 체크해주세요')
            return false;
        }
        dispatch({type:'allDone'})
    },[todoList])

    const allDelTodo=useCallback(()=>{
        const todos =todoList?.filter(todo=>todo.checked);
        if(todos.length ===0){
            alert('일괄삭제할 todo를 체크해주세요')
            return false;
        }
        const isConfirm=confirm('정말 삭제하시겠습니까?');
        if(isConfirm){
            
            dispatch({type:'allDelTodo'})
        };
    },[todoList])

    useEffect(()=>{
        const totalSize = todoList.length;
        const doneCount=todoList?.filter(todo=>todo.isDone).length;
        const todoCount=totalSize-doneCount;
        const doneRate=totalSize===0?0:parseFloat(((doneCount/totalSize)*100).toFixed(2));

        setDoneCount(doneCount);
        setTodoCount(todoCount);
        setDoneRate(doneRate);
    },[todoList])

   

    return (
        <div>
            <TodoContext.Provider value={{updatedChecked, doneTodoBtn, delTodoBtn}}>
                <main className='container'>
                    <section className='contents'>
                        <header className='text-center'>
                            <h2>TODO LIST</h2>
                        </header>
                        <section className='text-end'>
                            <p>할 일 : {todoCount} 건</p>
                            <p>한 일 : {doneCount} 건</p>
                            <p>달성률 : {doneRate} %</p>
                        </section>
                        {/**할일 등록할 editor */}
                        <AllCheckButton allDoneTodo={allDoneTodo} allDelTodo={allDelTodo}/>
                        <InputEditor
                            inputText={inputText}
                            setInputText={setInputText}
                            createTodo={createTodo}
                            
                            />
                        <TodoList todoList={todoList}/>
                    </section>
                </main>
            </TodoContext.Provider>
        </div>
    );
}

export default TodoLayout;