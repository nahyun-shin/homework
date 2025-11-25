import React from 'react';
import { useCustomInput } from '../hooks/useCustomInput';

function InputHookExam(props) {

    const {value,onChange}=useCustomInput([]);

    return (
        <div>
            <p>{value}</p>
            <input type="text" value={value} onChange={onChange}/>
        </div>
    );
}

export default InputHookExam;