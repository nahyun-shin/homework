import React from 'react';


function Contents({isDark}) {
    const contentsCss={
        backgroundColor : isDark?'black':'lightgray',
        color : isDark?'white':'black'
    }
    return (
        <div>
            <main className='contents' style={contentsCss}>
                <h3>날씨가 이상하네요.</h3>
            </main>
        </div>
    );
}

export default Contents;