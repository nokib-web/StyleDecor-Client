import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { FaTrash, FaEye } from 'react-icons/fa';

const MyWishlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: wishlist = [], refetch, isLoading } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/wishlist');
            return res.data;
        }
    });

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/wishlist/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire("Deleted!", "Item has been removed.", "success");
                }
            }
        });
    };

    if (isLoading) return <div className="text-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">My Wishlist ({wishlist.length})</h2>

            {wishlist.length === 0 ? (
                <div className="text-center text-gray-500 py-10">
                    <p className="text-xl">Your wishlist is empty.</p>
                    <Link to="/services" className="btn btn-primary mt-4">Browse Services</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map(item => (
                        <div key={item._id} className="card bg-base-100 shadow-xl border border-base-200">
                            <figure className="h-48 overflow-hidden">
                                <img src={item.serviceImage} alt={item.serviceName} className="w-full h-full object-cover hover:scale-110 transition-transform" />
                            </figure>
                            <div className="card-body p-5">
                                <h2 className="card-title text-lg">{item.serviceName}</h2>
                                <p className="text-primary font-bold text-xl">${item.price}</p>
                                <div className="card-actions justify-end mt-4">
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-circle btn-ghost text-red-500 tooltip" data-tip="Remove">
                                        <FaTrash />
                                    </button>
                                    <Link to={`/services/${item.serviceId}`} className="btn btn-primary btn-sm flex items-center gap-2">
                                        <FaEye /> View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyWishlist;
