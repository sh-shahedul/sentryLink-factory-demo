import React from 'react';
import { Outlet } from 'react-router';
import Header from '../Component/Shared/Header';
import Footer from '../Component/Shared/Footer';

const RootlayOut = () => {
    return (
        <div className='flex flex-col max-w-screen-2xl mx-auto min-h-screen'>
            <Header></Header>
           <div className='flex-1'>
             <Outlet></Outlet>
           </div>
           <Footer></Footer>
        </div>
    );
};

export default RootlayOut;