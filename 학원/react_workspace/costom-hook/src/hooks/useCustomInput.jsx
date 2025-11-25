import { useState } from "react";


export function useCustomInput(initValue){
    const [value, setValue]=useState(initValue);

    const onChange =(e)=>setValue(e.target.value);
    return{
        value,
        onChange
    }
}