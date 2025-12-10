import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FiDollarSign, FiBriefcase, FiCheckCircle } from 'react-icons/fi';

const DecoratorEarnings = () => {
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

            {/*  Maybe a chart or history table later */}
            <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
                <p className="text-gray-500">Detailed earning history and withdraw options coming soon.</p>
            </div>
        </div>
    );
};

export default DecoratorEarnings;
