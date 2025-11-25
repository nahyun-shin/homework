import React, { useState } from 'react';
import TodoLi from '../components/TodoLi';

function TodoLayout() {
    const [addTodo, setAddTodo] = useState("");
    const [todoList, setTodoList] = useState([]);
    const [choiese, setChoiese] = useState([]);
    const [idCounter, setIdCounter] = useState(1); // 숫자로 id 생성

    

    const add = () => {
        if (addTodo.trim().length === 0) {
            alert('할일을 입력해 주세요');
            return;
        }

        const newTodo = {
            id: idCounter,
            text: addTodo,
            isDone: false
        };

        setTodoList(prev => [...prev, newTodo]);
        setIdCounter(prev => prev + 1);
        setAddTodo('');
    };

    const deleteTodo = (id) => {
        setTodoList(prev => prev.filter(todo => todo.id !== id));
        setChoiese(prev => prev.filter(cid => cid !== id));
    };

    const toggleDone = (id) => {
        setTodoList(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const toggleCheckbox = (id, checked) => {
        if (checked) {
            setChoiese(prev => [...prev, id]);
        } else {
            setChoiese(prev => prev.filter(cid => cid !== id));
        }
    };

    const completeSelected = () => {
        setTodoList(prev =>
            prev.map(todo =>
                choiese.includes(todo.id) ? { ...todo, isDone: true } : todo
            )
        );
        setChoiese([]);
    };

    return (
        <div>
            <main className="container">
                <section className='todoTopWarp'>
                    <p>TODO LIST</p>
                    <p>할 일 : {todoList.length}</p>
                    <p>달 성 : {todoList.filter(t => t.isDone).length}</p>
                    <p>달성률 : {todoList.length > 0
                        ? Math.round(todoList.filter(t => t.isDone).length / todoList.length * 100) + "%"
                        : "0%"}</p>
                    <input type="text" onChange={(e) => setAddTodo(e.target.value)} value={addTodo} />
                    <button type='button' onClick={add}>추가</button>
                    <button type='button' onClick={completeSelected}>일괄완료</button>
                </section>

                <section className='todoListWarp'>
                    {todoList.map(todo => (
                        <TodoLi
                            key={todo.id}
                            todo={todo}
                            onToggle={() => toggleDone(todo.id)}
                            onDelete={() => deleteTodo(todo.id)}
                            onCheck={(checked) => toggleCheckbox(todo.id, checked)}
                            isChecked={choiese.includes(todo.id)}
                        />
                    ))}
                </section>
            </main>
        </div>
    );
}

export default TodoLayout;