import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AssignedProjects = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: bookingsData = {}, refetch } = useQuery({
        queryKey: ['bookings-decorator', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data;
        }
    });

    const bookings = bookingsData.data || [];

    const handleStatusUpdate = (id, newStatus) => {
        axiosSecure.patch(`/bookings/${id}`, { status: newStatus })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire('Updated', `Status changed to ${newStatus}`, 'success');
                }
            });
    };

    return (
        <div>
            <h2 className="text-3xl font-semibold my-4">Assigned Projects: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User Email</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking, index) => (
                            <tr key={booking._id}>
                                <th>{index + 1}</th>
                                <td>{booking.userEmail}</td>
                                <td>{booking.serviceName}</td>
                                <td>{new Date(booking.date).toLocaleDateString()}</td>
                                <td>{booking.status}</td>
                                <td>
                                    {booking.status === 'confirmed' && (
                                        <button
                                            onClick={() => handleStatusUpdate(booking._id, 'in-progress')}
                                            className="btn btn-xs btn-primary">
                                            Start Work
                                        </button>
                                    )}
                                    {booking.status === 'in-progress' && (
                                        <button
                                            onClick={() => handleStatusUpdate(booking._id, 'completed')}
                                            className="btn btn-xs btn-success">
                                            Complete
                                        </button>
                                    )}
                                    {booking.status === 'completed' && <span className="text-green-600 font-bold">Done</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedProjects;
