import React from 'react';
import { Link, Outlet } from 'react-router';
import Logo from '../components/Logo/Logo';
import { FaArrowLeft } from 'react-icons/fa';

const AuthLayout = () => {
    return (

        <div className='min-h-screen max-w-7xl mx-auto  bg-canvas flex flex-col'>
            {/* Auth Header */}
            <div className=" bg-surface backdrop-blur-md border-b border-border py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
                <Logo />
                <Link to="/" className="flex items-center gap-2 text-text-secondary hover:text-primary font-medium transition-colors duration-300">
                    <FaArrowLeft /> Back to Home
                </Link>
            </div>

            <div className='flex-1 flex items-center justify-center p-4'>
                <div className='w-full max-w-md'>
                    <Outlet />
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;