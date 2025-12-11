import React, { useState } from 'react';
import { FaHome, FaUsers, FaCalendarAlt, FaChartPie, FaPaintBrush, FaImages } from 'react-icons/fa';
import { FiMenu } from 'react-icons/fi';
import { MdOutlineMiscellaneousServices, MdPayment } from 'react-icons/md';
import { Link, NavLink, Outlet } from 'react-router';
import useRole from '../hooks/useRole';

const DashboardLayout = () => {
    const { role, loading } = useRole();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    if (loading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    const renderSidebarItems = () => {
        if (role === 'admin') {
            return (
                <>
                    <li><NavLink to="/dashboard/admin-home"><FaChartPie /> Analytics</NavLink></li>
                    <li><NavLink to="/dashboard/manage-users"><FaUsers /> Manage Decorators</NavLink></li>
                    <li><NavLink to="/dashboard/manage-services"><MdOutlineMiscellaneousServices /> Manage Services</NavLink></li>
                    <li><NavLink to="/dashboard/manage-bookings"><FaCalendarAlt /> Manage Bookings</NavLink></li>
                </>
            );
        } else if (role === 'decorator') {
            return (
                <>
                    <li><NavLink to="/dashboard/assigned-projects"><FaPaintBrush /> Assigned Projects</NavLink></li>
                    <li><NavLink to="/dashboard/decorator-earnings"><MdPayment /> Earnings</NavLink></li>
                    <li><NavLink to="/dashboard/my-portfolio"><FaImages /> My Portfolio</NavLink></li>
                </>
            );
        } else {
            // Default to User
            return (
                <>
                    <li><NavLink to="/dashboard/profile"><FaHome /> Profile</NavLink></li>
                    <li><NavLink to="/dashboard/bookings"><FaCalendarAlt /> My Bookings</NavLink></li>
                    <li><NavLink to="/dashboard/wishlist"><FaCalendarAlt /> My Wishlist</NavLink></li>
                    <li><NavLink to="/dashboard/payment-history"><MdPayment /> Payment History</NavLink></li>
                </>
            );
        }
    };

    return (
        <div className={`drawer max-w-7xl mx-auto ${isSidebarOpen ? 'lg:drawer-open' : ''}`}>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col bg-canvas">
                {/* Navbar for mobile */}
                <div className="w-full navbar bg-surface lg:hidden border-b border-border sticky top-0 z-50">
                    <div className="flex-none">
                        <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost text-text-primary">
                            <FiMenu className="text-xl" />
                        </label>
                    </div>
                    <div className="flex-1 px-2 mx-2 font-bold text-text-primary">StyleDecor Dashboard</div>
                </div>

                {/* Desktop Top Bar */}
                <div className="hidden lg:flex w-full bg-surface h-16 items-center px-8 shadow-sm border-b border-border gap-4 sticky top-0 z-50">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="btn btn-square btn-ghost text-text-primary">
                        <FiMenu className="text-xl" />
                    </button>
                    <h1 className="text-xl font-bold text-text-primary">StyleDecor Dashboard</h1>
                </div>

                <div className="p-8">
                    <Outlet></Outlet>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* Sidebar content here */}
                    <div className="mb-4 text-xl font-bold px-4">StyleDecor</div>

                    {renderSidebarItems()}

                    <div className="divider"></div>
                    <li><Link to="/"><FaHome /> Home</Link></li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;