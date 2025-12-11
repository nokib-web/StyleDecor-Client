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
                    Swal.fire({
                        title: 'Updated!',
                        text: `Status changed to ${newStatus}`,
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        // MOCK SMS NOTIFICATION
                        Swal.fire({
                            position: 'bottom-end',
                            icon: 'info',
                            title: 'SMS Sent',
                            text: `Customer notified: "Your project is now ${newStatus}"`,
                            showConfirmButton: false,
                            timer: 2500,
                            toast: true
                        });
                    });
                }
            });
    };

    const today = new Date().toISOString().split('T')[0];
    const todaysProjects = bookings.filter(b => b.date === today);

    return (
        <div>
            {/* Today's Schedule Section */}
            {todaysProjects.length > 0 && (
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-primary mb-4">Today's Schedule ({todaysProjects.length})</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {todaysProjects.map(project => (
                            <div key={project._id} className="card bg-base-100 shadow-xl border border-primary/20">
                                <div className="card-body">
                                    <h3 className="card-title text-gray-800">{project.serviceName}</h3>
                                    <p className="text-gray-600">
                                        <span className="font-semibold">Time:</span> {project.slot || 'N/A'} <br />
                                        <span className="font-semibold">Address:</span> {project.address} <br />
                                        <span className="font-semibold">Customer:</span> {project.userName}
                                    </p>
                                    <div className="card-actions justify-end mt-2">
                                        <div className="badge badge-primary badge-outline">{project.serviceType === 'on-site' ? 'On-Site' : 'Consultation'}</div>
                                        <a href={`tel:${project.userPhone}`} className="btn btn-sm btn-circle btn-ghost">📞</a>
                                    </div>
                                    <div className="mt-4">
                                        <select
                                            className="select select-bordered select-sm w-full"
                                            value={project.status}
                                            onChange={(e) => handleStatusUpdate(project._id, e.target.value)}
                                        >
                                            <option disabled value="">Update Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Assigned</option>
                                            <option value="planning">Planning Phase</option>
                                            <option value="materials">Materials Prepared</option>
                                            <option value="on-way">On the Way</option>
                                            <option value="setup">Setup in Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h2 className="text-3xl font-semibold my-4">All Assigned Projects: {bookings.length}</h2>
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
                                    <select
                                        className="select select-bordered select-xs w-full max-w-xs"
                                        value={booking.status}
                                        onChange={(e) => handleStatusUpdate(booking._id, e.target.value)}
                                    >
                                        <option disabled value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Assigned</option>
                                        <option value="planning">Planning Phase</option>
                                        <option value="materials">Materials Prepared</option>
                                        <option value="on-way">On the Way</option>
                                        <option value="setup">Setup in Progress</option>
                                        <option value="completed">Completed</option>
                                        <option value="paid">Paid (Archived)</option>
                                    </select>

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
