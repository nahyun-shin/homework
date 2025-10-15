import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/layout.css';
import { Outlet } from 'react-router';
import MenuBar from '../compoents/MenuBar';
import { useLocation } from 'react-router';
import { getFixedMenuKey } from '../hooks/menuData.js';

function Layout() {
    const [showSideMenu, setShowSideMenu] = useState(false);
    const [isFixedSubMenu, setIsFixedSubMenu] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fixedMenuKey = getFixedMenuKey(location.pathname);
        const shouldFix = !!fixedMenuKey;
        if (shouldFix) {
        setIsFixedSubMenu(true);
        } else {
        setIsFixedSubMenu(false);
        setShowSideMenu(false);
        }
    }, [location]);

    return (
        <div>
            <MenuBar
                showSideMenu={showSideMenu}
                setShowSideMenu={setShowSideMenu}
                isFixed={isFixedSubMenu}
            />
            <section className={`content-area ${isFixedSubMenu ? 'with-sidemenu' : ''}`}>
                <Outlet/>
            </section>
        </div>
    );
}

export default Layout;
