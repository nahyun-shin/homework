import React from 'react';
import MenuBar from '../components/MenuBar';
import { Outlet } from 'react-router';
import '../assets/css/layout.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home(props) {
    return (
        <div>
            <MenuBar/>
            <section className='contents'>
                <Outlet/>
            </section>
        </div>
    );
}

export default Home;