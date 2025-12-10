import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import BookingTracking from '../../../components/BookingTracking';

const MyBookings = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [page, setPage] = useState(0);
    const limit = 5;

    const { data, refetch } = useQuery({
        queryKey: ['bookings', user?.email, page],
        queryFn: async () => {
            console.log("Fetching bookings for user:", user?.email);
            const res = await axiosSecure.get(`/bookings?page=${page}&limit=${limit}`);
            console.log("Bookings response:", res.data);
            return res.data;
        }
    });

    const bookings = data?.data || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit);

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/bookings/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
                        }
                    })
            }
        });
    };



    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold mb-6">My Bookings: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Service</th>
                            <th>Status Process</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={booking.serviceImage} alt={booking.serviceName} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{booking.serviceName}</div>
                                            <div className="text-sm opacity-50">{new Date(booking.date).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <BookingTracking status={booking.status} />
                                </td>
                                <td>
                                    {booking.status === 'pending' && (
                                        <button
                                            onClick={() => handleCancel(booking._id)}
                                            className="btn btn-sm btn-error text-white mr-2"
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    {booking.price && booking.status !== 'paid' && (
                                        <Link to={`/dashboard/payment/${booking._id}`} state={{ booking: booking }}>
                                            <button className="btn btn-sm btn-primary">Pay</button>
                                        </Link>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8">
                <div className="join">
                    <button
                        className="join-item btn"
                        onClick={() => setPage(old => Math.max(0, old - 1))}
                        disabled={page === 0}
                    >
                        «
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i}
                            className={`join-item btn ${page === i ? 'btn-active' : ''}`}
                            onClick={() => setPage(i)}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        className="join-item btn"
                        onClick={() => setPage(old => Math.min(totalPages - 1, old + 1))}
                        disabled={page >= totalPages - 1}
                    >
                        »
                    </button>
                </div>
            </div>
        </div >
    );
};

export default MyBookings;
