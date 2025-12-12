import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import Logo from '../../../components/Logo/Logo';
import { useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
// Imports updated to include Icons for theme
import { FiUser, FiLogOut, FiGrid, FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { useEffect } from 'react';

const Navbar = () => {
    const { user, signOutUser } = useAuth();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // --- DARK MODE LOGIC ---
    const [theme, setTheme] = useState(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    const handleToggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

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

    // Active Link Class - Simplified
    const getLinkClass = ({ isActive }) =>
        isActive
            ? "text-primary font-bold border-b-2 border-primary pb-1 transition-all duration-300"
            : "text-text-secondary hover:text-primary font-medium transition-all duration-300 hover:pb-1";

    const sidebarLinkClass = ({ isActive }) =>
        isActive
            ? "block px-6 py-4 text-xl font-bold text-primary bg-primary-light/20 border-l-4 border-primary"
            : "block px-6 py-4 text-xl font-medium text-text-secondary hover:text-primary hover:bg-surface-2 transition-all";

    // --- NAV LINKS ---
    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/services', label: 'Services' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/coverage', label: 'Coverage' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <>
            <div className="sticky top-0 z-50 bg-base-100/95 backdrop-blur-md shadow-sm border-b border-base-200">
                <div className="navbar max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="navbar-start">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="btn btn-ghost btn-circle lg:hidden text-base-content hover:bg-base-200"
                        >
                            <FiMenu className="h-7 w-7" />
                        </button>

                        <div className="px-2 hover:bg-transparent cursor-pointer">
                            <Logo />
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="navbar-center hidden lg:flex">
                        <ul className="flex items-center gap-8">
                            {navItems.map((item) => (
                                <li key={item.path}>
                                    <NavLink to={item.path} className={getLinkClass}>
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="navbar-end gap-3">
                        <Link to="/style-quiz" className="hidden md:flex btn btn-ghost btn-sm bg-gradient-to-r from-[#4A5A4E] to-[#6B3A3F] text-white hover:from-[#7A8A7E] hover:to-[#9B6A6F] rounded-full px-4 border-none shadow-md animate-pulse">
                            ✨ AI Style Quiz
                        </Link>

                        {/* Theme Toggle */}
                        <button onClick={handleToggleTheme} className="btn btn-ghost btn-circle text-xl">
                            {theme === 'light' ? <FiMoon /> : <FiSun />}
                        </button>

                        {user ? (
                            <div className="dropdown dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar online ring-2 ring-primary ring-offset-2 ring-offset-base-100 h-10 w-10">
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User Avatar"
                                            src={user?.photoURL || "https://placehold.co/100"}
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-2 shadow-xl border border-base-200"
                                >
                                    <div className="px-4 py-3 border-b border-base-200 mb-2">
                                        <p className="font-semibold text-base-content truncate">{user.displayName || 'User'}</p>
                                        <p className="text-xs text-base-content/70 truncate">{user.email}</p>
                                    </div>
                                    <li>
                                        <NavLink to="/dashboard" className="flex items-center gap-2 py-2 hover:text-primary">
                                            <FiGrid /> Dashboard
                                        </NavLink>
                                    </li>
                                    {!user.role && <li><NavLink to='/become-decorator' className="hover:text-primary">Become a Decorator</NavLink></li>}

                                    <li className="mt-1">
                                        <button onClick={handleLogout} className="flex items-center gap-2 py-2 text-red-500 hover:bg-red-50 hover:text-red-600">
                                            <FiLogOut /> Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="">
                        
                                <Link to="/register" className="btn btn-primary text-white px-6 rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:-translate-y-0.5">
                                    Join Now
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>


            {/* Mobile Sidebar Overlay */}
            < div
                className={`fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`
                }
                onClick={() => setIsSidebarOpen(false)}
            >
                {/* Sidebar Content */}
                < div
                    className={`fixed top-0 left-0 w-[85%] max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-6 border-b border-gray-100">
                        <Logo />
                        <button onClick={() => setIsSidebarOpen(false)} className="btn btn-ghost btn-circle text-gray-500">
                            <FiX className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="py-4 overflow-y-auto h-[calc(100%-80px)]">
                        {user && (
                            <div className="px-6 pb-6 mb-4 border-b border-gray-100">
                                <div className="flex items-center gap-4">
                                    <div className="avatar online">
                                        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                            <img src={user.photoURL || "https://placehold.co/100"} alt="Avatar" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 text-lg">{user.displayName}</p>
                                        <p className="text-sm text-gray-500 truncate w-40">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <nav className="flex flex-col">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={sidebarLinkClass}
                                    onClick={() => setIsSidebarOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}

                            <NavLink
                                to="/style-quiz"
                                className="block px-6 py-4 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 hover:text-pink-600 transition-all border-l-4 border-transparent hover:border-pink-500"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                ✨ AI Style Quiz
                            </NavLink>

                            {user ? (
                                <>
                                    <div className="divider px-6 my-2">Account</div>
                                    <NavLink
                                        to="/dashboard"
                                        className={sidebarLinkClass}
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-6 py-4 text-xl font-medium text-red-500 hover:bg-red-50 transition-all"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <div className="p-6 mt-4">
                                    <Link
                                        to="/login"
                                        className="btn btn-outline btn-primary w-full mb-3"
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="btn btn-primary w-full text-white"
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div >
            </div >
        </>
    );
};

export default Navbar;
