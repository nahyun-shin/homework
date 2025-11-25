import React, { useState } from 'react';
import ExampleCom from '../components/ExampleCom';

function Example(props) {
    const [list, setList]=useState([]);
    const [push, setPush]=useState('');
    
   

    const add=()=>{
        if(push.length===0){
            alert('입력해주세요')
            return false
        }
       setList((prev)=>[...prev, push]);
    }

    return (
        <div>
            <div>

                <input type="text" value={push} onChange={(e)=>setPush(e.target.value)}/>
                <button type='button' onClick={add}>입력</button>
            </div>
            <div>
                {
                    
                    list?.map((text,index)=>(
                        <div>
                            <input type='checkbox' id={`${index}`}/>
                            <p key={index}>{text}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Example;