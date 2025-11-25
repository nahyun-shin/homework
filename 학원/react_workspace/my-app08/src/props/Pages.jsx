import React from 'react';
import Footer from './Footer';
import Contents from './Contents';
import Header from './Header';

function Pages({isDark, setIsDark}) {
    return (
        <div className='pages'>
            <Header isDark={isDark}/>
            <Contents isDark={isDark}/>
            <Footer isDark={isDark} setIsDark={setIsDark}/>
            
        </div>
    );
}

export default Pages;