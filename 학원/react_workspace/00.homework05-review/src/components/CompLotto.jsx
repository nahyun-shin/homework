import React from 'react';
import { useState } from 'react';
import '../assets/css/compLotto.css'
import Ball from './Ball';

function CompLotto({compLotto}) {


    


    return (
        <>
           <div className='lotto-table'>
                {
                    compLotto.lotto?.map((lotto,index)=>(
                        <Ball number={lotto.number}
                        key={index}/>
                    ))
                }
                {
                    compLotto.lotto&&
                    (
                        <>
                        <h3>+</h3>
                        <Ball number={compLotto.bonusNum}/>
                        </>
                    )
                }
            </div> 
        </>
    );
}

export default CompLotto;