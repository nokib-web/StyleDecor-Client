import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const UserProfile = () => {
    const { user } = useAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();

    const { data: dbUser = {}, refetch } = useQuery({
        queryKey: ['user', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get('/users/me');
            return res.data.user;
        }
    });

    const copyToClipboard = () => {
        navigator.clipboard.writeText(dbUser.referralCode);
        Swal.fire({
            icon: 'success',
            title: 'Copied!',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <div className="flex flex-col items-center h-full space-y-8 py-10">
            {/* Profile Card */}
            <div className="card w-96 bg-base-100 shadow-xl border border-gray-100">
                <figure className="px-10 pt-10">
                    <img src={user?.photoURL} alt="Profile" className="rounded-xl w-24 h-24 object-cover ring ring-primary ring-offset-2" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title font-bold text-2xl">{user?.displayName}</h2>
                    <p className="text-gray-500">{user?.email}</p>
                    <div className="badge badge-primary uppercase mt-2">{role}</div>

                    {/* Referral Section */}
                    {dbUser.referralCode && (
                        <div className="mt-6 w-full bg-base-200 p-4 rounded-lg">
                            <p className="text-sm font-semibold mb-2">My Referral Code</p>
                            <div className="flex items-center gap-2">
                                <code className="bg-white px-3 py-2 rounded border border-gray-300 flex-1 font-mono text-lg tracking-wider">
                                    {dbUser.referralCode}
                                </code>
                                <button onClick={copyToClipboard} className="btn btn-square btn-sm btn-outline">
                                    📋
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">Share this code to earn rewards!</p>
                        </div>
                    )}

                    <div className="card-actions mt-6">
                        <button className="btn btn-sm btn-outline w-full">Edit Profile</button>
                    </div>
                </div>
            </div>

            {/* Rewards Section */}
            {dbUser.referralRewards && dbUser.referralRewards.length > 0 && (
                <div className="card w-96 bg-base-100 shadow-xl border border-gray-100">
                    <div className="card-body">
                        <h3 className="card-title text-primary">My Rewards</h3>
                        <div className="space-y-3 mt-2">
                            {dbUser.referralRewards.map((reward) => (
                                <div key={reward.code} className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-100">
                                    <div>
                                        <p className="font-bold text-green-700">{reward.discount}% OFF</p>
                                        <p className="text-xs text-green-600">{reward.code}</p>
                                    </div>
                                    <span className="badge badge-success text-white">Active</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
