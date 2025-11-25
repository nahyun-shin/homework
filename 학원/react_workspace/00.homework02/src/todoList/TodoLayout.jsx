import React from 'react';
import TodoLi from '../components/TodoLi';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function TodoLayout(props) {
    const [addTodo, setAddTodo] =useState("");
    const [todoList, setTodoList]=useState([]);
   

    //input창에 입력시
    const writeIt=(e)=>{
        setAddTodo(e.target.value);
    }

    //할일추가버튼 클릭시
    const add=()=>{
        if(addTodo.trim().length===0){
            alert('할일을 입력해 주세요');
            return;
        }
        const newTodo={
            id : uuidv4(),
            text : addTodo,
            checked : false,
            completed : false
        };
        setTodoList((todo)=>[...todo,newTodo]);
        setAddTodo("");
        
    }

    
    //체크된 할일 상태변경
    const chkTodo=(id)=>{
        setTodoList(prev=>
            prev.map(todo=>
                todo.id === id ?{...todo, checked:!todo.checked} : todo
            )
        );
    }
    
    
    //완료버튼 클릭시
    const doneBtn=(id)=>{
        const isConfirm = confirm('완료하시겠습니까?');
        if(isConfirm){
            setTodoList(prev=>
                prev.map(todo=>
                    todo.id===id?{...todo, completed:!todo.completed} : todo
                )
            )
            
            alert('완료되었습니다.')
            return;
        }else{
            alert('취소되었습니다.')
            return;
        } 
    }
    
    
    
    //삭제버튼 클릭시
    const delBtn=(id)=>{
        const isConfirm = confirm('삭제하시겠습니까?');
        if(isConfirm){
            setTodoList(prev=>
                prev.filter(todo=>
                    todo.id !== id
                )
            )
            alert('삭제되었습니다.');
            return;
        }else{
            alert('삭제가 취소 되었습니다.');
            return;
        }
    }
    
    
    //일괄완료버튼 클릭시
    const allDone=()=>{
        //체크된 todo먼저 찾기
        const checkTodo = todoList.filter(todo=>todo.checked&&!todo.completed);
        if(checkTodo.length===0){
            alert('완료할 항목에 체크해주세요.');
            return;
        }

        setTodoList(prev=>
            prev.map(todo=>
                todo.checked &&!todo.completed ?
                {...todo, completed : true} : todo
            )
        )
        alert("일괄완료하였습니다.")
    }
    
    //일괄삭제버튼 클릭시
    const allDel=()=>{
        const checkTodo = todoList.filter(todo=>todo.checked);
        if(checkTodo.length===0){
            alert('완료할 항목에 체크해주세요.');
            return;
        }
        
        const isConfirm = confirm("정말 삭제하시겠습니까?");
        if(isConfirm){
            setTodoList(prev=>

                prev.filter(todo=>!(todo.checked))
            )
            alert('삭제되었습니다.');
        }else{
            alert('삭제가 취소되었습니다.');
        }
    }







    console.log(todoList.map(todo => ({
        '체크상태': todo.checked,
        '완료상태': todo.completed
    })));
    return (
        <div>
            <main className="container">
                <section className='todoTopWarp'>
                    <p>TODO LIST</p>
                    <p>할 일 : </p>
                    <p>달 성 : </p>
                    <p>달성률 : </p>
                    <input type="text" id='todoInput' onChange={writeIt} value={addTodo} />
                    <button type='button' onClick={add}>추가</button>
                    <button type='button' onClick={allDone}>일괄완료</button>
                    <button type='button' onClick={allDel}>일괄삭제</button>
                </section>
                <section className='todoListWarp'>
                    {todoList?.map((todo)=>(
                        <TodoLi 
                        key={todo.id}
                        todo={todo}
                        chkTodo={chkTodo}
                        doneBtn={doneBtn}
                        delBtn={delBtn}
                        > 
                        </TodoLi>
                    ))

                    }
                    
                </section>
            </main>
        </div>
    );
}

export default TodoLayout;