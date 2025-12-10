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

    const handleMakeDecorator = (user, isApproval = false) => {
        const payload = isApproval ? { role: 'decorator', status: 'verified' } : { role: 'decorator' };

        axiosSecure.patch(`/users/role/${user._id}`, payload)
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

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete user!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "User has been deleted.", "success");
                        }
                    })
            }
        });
    };

    const handleDisableDecorator = (user) => {
        Swal.fire({
            title: "Disable Decorator?",
            text: "This will revoke decorator access and mark as disabled.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e67e22",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, disable!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/role/${user._id}`, { role: 'user', status: 'disabled' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire("Disabled!", "Decorator access revoked.", "success");
                        }
                    })
            }
        });
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center my-4">
                <h2 className="text-3xl font-semibold">Manage Users</h2>
                {/* Filter or tabs could go here */}
            </div>

            {/* Pending Requests Section */}
            {users.some(u => u.status === 'requested') && (
                <div className="mb-8">
                    <h3 className="text-xl font-bold text-orange-600 mb-4">Pending Decorator Requests</h3>
                    <div className="overflow-x-auto bg-orange-50 rounded-lg p-4">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Details</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.filter(u => u.status === 'requested').map(user => (
                                    <tr key={user._id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <div className="text-xs">
                                                <p><strong>Portfolio:</strong> {user.portfolio}</p>
                                                <p><strong>Exp:</strong> {user.experience} years</p>
                                                <p><strong>Style:</strong> {user.specialty}</p>
                                            </div>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleMakeDecorator(user, true)}
                                                className="btn btn-sm btn-success text-white"
                                            >
                                                Approve
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <h3 className="text-xl font-bold mb-4">All Users</h3>
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
                                <td>
                                    {user.role}
                                    {user.status === 'verified' && <span className="ml-2 badge badge-success badge-xs">Verified</span>}
                                </td>
                                <td className="flex justify-center gap-2">
                                    {user.role === 'decorator' ?
                                        <div className="flex items-center gap-1">
                                            <span className="badge badge-primary">Decorator</span>
                                            <button
                                                onClick={() => handleDisableDecorator(user)}
                                                className="btn btn-xs btn-error text-white"
                                                title="Disable Account"
                                            >
                                                Disable
                                            </button>
                                        </div> :
                                        <button onClick={() => handleMakeDecorator(user)} className="btn btn-xs btn-ghost bg-indigo-500 text-white">
                                            Make Decorator
                                        </button>
                                    }
                                    {user.role === 'admin' ?
                                        <span className="badge badge-secondary">Admin</span> :
                                        <button onClick={() => handleMakeAdmin(user)} className="btn btn-xs btn-ghost bg-orange-500 text-white">
                                            <FaUserShield></FaUserShield>
                                        </button>
                                    }
                                    <button onClick={() => handleDeleteUser(user)} className="btn btn-xs btn-ghost bg-red-600 text-white">
                                        <FaTrashAlt></FaTrashAlt>
                                    </button>
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
