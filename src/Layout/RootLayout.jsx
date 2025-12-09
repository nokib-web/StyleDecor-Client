import React from 'react';
import { Outlet, useNavigation } from 'react-router';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import Navbar from '../pages/Shared/Header/Navbar';
import Footer from '../pages/Shared/Footer/Footer';



const RootLayout = () => {
    const navigation = useNavigation();

    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar />
            {navigation.state === "loading" ? <LoadingSpinner /> : <Outlet />}
            <Footer />
        </div>
    );
};

export default RootLayout;