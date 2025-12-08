import React from 'react';

import { Outlet } from 'react-router';


const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
        
            <div className='flex items-center justify-center'>
                <div className='flex-1 p-8 '>
                    <Outlet />
                </div>
               
            </div>

        </div>
    );
};

export default AuthLayout;