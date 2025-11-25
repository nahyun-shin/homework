import React, { useRef, useState } from 'react';

function TodoList(props) {
    const id = useRef(1);
    const [list, setList]=useState([
            {id:id.current++, contents :'안녕'}
           
        ])

    const addTodo = ()=>{
        setList((prev)=>[...prev, {id:id.current++,contents:'안녕'}])
    }
    
        return (
            
            <div>
                <div>
                    <button type='button' name='addBtn' onClick={addTodo}>추가</button>
                    {/* <button type='button' name='delBtn' onClick={delTodo}>삭제</button> */}
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>내용</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map(obj=>(
                            <tr key={Object.id} data-testid='row-item'>
                                <td data-testid={`id-${Object.id}`}>
                                    {obj.id}
                                </td>
                                <td data-testid={`contents-${Object.id}`}>
                                    {obj.contents}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
}

export default TodoList;