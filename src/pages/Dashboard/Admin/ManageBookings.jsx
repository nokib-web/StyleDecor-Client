import React, {  } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ManageBookings = () => {
    const axiosSecure = useAxiosSecure();
    // const [selectedDecorator, setSelectedDecorator] = useState('');

    const { data: bookingsData = {}, refetch } = useQuery({
        queryKey: ['bookings-admin'],
        queryFn: async () => {
            const res = await axiosSecure.get('/bookings');
            return res.data;
        }
    });

    const bookings = bookingsData.data || [];

    const { data: decorators = [] } = useQuery({
        queryKey: ['decorators'],
        queryFn: async () => {
            const res = await axiosSecure.get('/decorators');
            return res.data;
        }
    });

    const handleAssignDecorator = (bookingId, decoratorEmail) => {
        if (!decoratorEmail) return;

        axiosSecure.patch(`/bookings/${bookingId}`, {
            decoratorEmail,
            status: 'confirmed'
        })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire('Success', 'Decorator assigned and booking confirmed', 'success');
                }
            });
    };

    return (
        <div>
            <h2 className="text-3xl font-semibold my-4">Manage Bookings: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Assigned Decorator</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.userEmail}</td>
                                <td>{item.serviceName}</td>
                                <td>{new Date(item.date).toLocaleDateString()}</td>
                                <td>{item.status}</td>
                                <td>{item.decoratorEmail || 'Unassigned'}</td>
                                <td>
                                    {item.status === 'pending' && (
                                        <div className="flex items-center gap-2">
                                            <select
                                                className="select select-bordered select-xs w-full max-w-xs"
                                                onChange={(e) => handleAssignDecorator(item._id, e.target.value)}
                                                defaultValue=""
                                            >
                                                <option disabled value="">Assign...</option>
                                                {decorators.map(dec => (
                                                    <option key={dec._id} value={dec.email}>{dec.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;
