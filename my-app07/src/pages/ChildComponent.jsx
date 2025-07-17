import React from 'react';

const ChildComponent=React.memo(({name})=> {
    console.log('child component')
    return (
        <div>
            <p>안녕 나는 {name}이다.</p>
            
        </div>
    );
});

export default ChildComponent;