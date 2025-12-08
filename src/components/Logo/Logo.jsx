import React from 'react';
import logo from '../../assets/Logo.png'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
            <Link to='/'>
                    <img className='w-full h-12' src={logo} alt="" />
            </Link>
        </div>
    );
};

export default Logo;