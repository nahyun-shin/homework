import React from 'react';
import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function ContextHeader() {

    //context API 공유하는 내용을 가져올 수 있음
    const {isDark}=useContext(ThemeContext);
    
    const headerCss={
        backgroundColor : isDark?'black':'lightgray',
        color : isDark?'white':'black'
    }
    return (
        <div>
            <header className='header' style={headerCss}>
                <h2>환영합니다.</h2>
            </header>
        </div>
    );
}

export default ContextHeader;