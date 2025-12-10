import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiDollarSign, FiBriefcase, FiCheckCircle } from 'react-icons/fi';

import useAuth from '../../../hooks/useAuth';

const DecoratorEarnings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['decorator-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/decorator/stats');
            return res.data;
        }
    });

    const { totalEarnings = 0, totalBookings = 0, completedBookings = 0 } = stats;

    if (isLoading) {
        return <div className="p-8 text-center">Loading stats...</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">My Earnings & Stats</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Earnings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                    <div className="p-4 bg-green-100 text-green-600 rounded-full">
                        <FiDollarSign className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                        <h3 className="text-3xl font-bold text-gray-900">
                            ${totalEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h3>
                    </div>
                </div>

                {/* Total Bookings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                    <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
                        <FiBriefcase className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Assigned Projects</p>
                        <h3 className="text-3xl font-bold text-gray-900">{totalBookings}</h3>
                    </div>
                </div>

                {/* Completed Projects */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4 transition-transform hover:scale-[1.02]">
                    <div className="p-4 bg-purple-100 text-purple-600 rounded-full">
                        <FiCheckCircle className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Completed Projects</p>
                        <h3 className="text-3xl font-bold text-gray-900">{completedBookings}</h3>
                    </div>
                </div>

            </div>

            {/* Earnings History Table */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Payment History</h3>
                <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
                    <table className="table w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th>Date</th>
                                <th>Service</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th className="text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* We need to fetch bookings for history. Currently stats only has summary. 
                                Let's assume we pass bookings down or fetch them here. 
                                For now, I will add a secondary query to fetch bookings for history. */}
                            <HistoryRows userEmail={user?.email} axiosSecure={axiosSecure} />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Helper component to avoid refetching if possible, or just cleaner code
const HistoryRows = ({ userEmail, axiosSecure }) => {
    const { data: bookingsData = {} } = useQuery({
        queryKey: ['bookings-history', userEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${userEmail}`);
            return res.data;
        }
    });

    const bookings = bookingsData.data || [];
    // Filter for completed or paid
    const history = bookings.filter(b => b.status === 'completed' || b.status === 'paid');

    if (history.length === 0) {
        return <tr><td colSpan="5" className="text-center py-4">No payment history available.</td></tr>;
    }

    return (
        <>
            {history.map(booking => (
                <tr key={booking._id} className="hover:bg-gray-50">
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
                    <td>
                        <div className="font-bold">{booking.serviceName}</div>
                        <div className="text-xs opacity-50 capitalize">{booking.serviceType}</div>
                    </td>
                    <td>{booking.userName}</td>
                    <td>
                        <span className={`badge ${booking.status === 'paid' ? 'badge-success text-white' : 'badge-ghost'}`}>
                            {booking.status}
                        </span>
                    </td>
                    <td className="text-right font-mono font-bold">
                        ${booking.price}
                    </td>
                </tr>
            ))}
        </>
    );
};

export default DecoratorEarnings;
