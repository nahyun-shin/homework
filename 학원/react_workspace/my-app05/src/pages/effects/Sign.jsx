import React, { useEffect } from 'react';

function Sign(props) {


    useEffect(()=>{

        console.log('sign mount')
        return ()=>{
            console.log('sign umount')
        }
    },[])

    return (
        <div>
            <div>보인다</div>
        </div>
    );
}

export default Sign;