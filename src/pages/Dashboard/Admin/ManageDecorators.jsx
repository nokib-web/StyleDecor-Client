import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageDecorators = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all users to promote/demote
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    });

    const handleMakeDecorator = (user) => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: 'decorator' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: 'Success!',
                        text: `${user.name} is now a Decorator!`,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    };

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/role/${user._id}`, { role: 'admin' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: 'Success!',
                        text: `${user.name} is now an Admin!`,
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    };

    return (
        <div className="w-full">
            <h2 className="text-3xl font-semibold my-4">Total Users: {users.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <th>{index + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td className="flex justify-center gap-2">
                                    {user.role === 'decorator' ? 'Decorator' :
                                        <button onClick={() => handleMakeDecorator(user)} className="btn btn-xs btn-ghost bg-indigo-500 text-white">
                                            Make Decorator
                                        </button>
                                    }
                                    {user.role === 'admin' ? 'Admin' :
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-xs btn-ghost bg-orange-500 text-white">
                                            <FaUserShield></FaUserShield>
                                        </button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageDecorators;
