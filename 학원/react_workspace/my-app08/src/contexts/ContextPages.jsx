import React from 'react';
import ContextHeader from './ContextHeader';
import ContextContents from './ContextContents';
import ContextFooter from './ContextFooter';


function ContextPages() {
    return (
        <div className='pages'>
            <ContextHeader/>
            <ContextContents/>
            <ContextFooter/>
            
        </div>
    );
}

export default ContextPages;