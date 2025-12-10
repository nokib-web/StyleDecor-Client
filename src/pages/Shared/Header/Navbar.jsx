import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import Logo from '../../../components/Logo/Logo';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';

const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // --- LOGOUT FUNCTION ---
    const handleLogout = async () => {
        try {
            await signOutUser();          // Firebase logout
            queryClient.clear();          // Clear React Query cache
            navigate('/login');           // Redirect to login page
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    // --- NAV LINKS ---
    const links = (
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            {!user && <li><NavLink to='/login'>Login</NavLink></li>}
            {!user && <li><NavLink to='/register'>Register</NavLink></li>}
            {user && <li><NavLink to='/dashboard'>Dashboard</NavLink></li>}
            <li><NavLink to='/services'>All Services</NavLink></li>
            {user && <li><NavLink to='/become-decorator'>Be A Decorator</NavLink></li>}
            <li><NavLink to='/coverage'>Coverage</NavLink></li>
        </>
    );

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="navbar-start">

                    {/* Mobile Menu */}
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>

                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                        >
                            {links}

                            {/* Mobile Logout */}
                            {user && (
                                <li>
                                    <button onClick={handleLogout} className="btn btn-error mt-2">
                                        Logout
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>

                    <span className="btn btn-ghost text-xl">
                        <Logo />
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>

                {/* Desktop Logout Button */}
                <div className="navbar-end">
                    {user ? (
                        <button onClick={handleLogout} className="btn btn-error">
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="btn">
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
