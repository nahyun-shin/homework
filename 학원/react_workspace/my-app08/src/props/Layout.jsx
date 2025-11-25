import React from 'react';
import { useState } from 'react';
import'../assets/css/common.css'
import Pages from './Pages';

function Layout(props) {
    const[isDark, setIsDark]=useState(false);
    return (
        <>
            <Pages isDark={isDark} setIsDark={setIsDark}/>
        </>
    );
}

export default Layout;