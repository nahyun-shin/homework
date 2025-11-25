import React from 'react';
import Contents from './Contents';
import { useState } from 'react';
import { SumContext } from './Sumcontext';
import { useContext } from 'react';

function MainLayout() {
    const[isSum, setIsSum]=useState(0);

    const add=(num1,num2)=>{
        setIsSum(num1+num2);
    }
    console.log(isSum)

    

    return (
        <div>
            <SumContext.Provider value={{add}}>

            <p>합은 : {isSum}</p>
            <Contents/>
                
            </SumContext.Provider>
            
        </div>
    );
}

export default MainLayout;