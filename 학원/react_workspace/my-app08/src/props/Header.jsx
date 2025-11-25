import React from 'react';

function Header({isDark}) {
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

export default Header;