import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ServiceDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch single service by ID
    const { data, isLoading, isError } = useQuery({
        queryKey: ["service", id],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/services/${id}`
            );
            return res.data;
        },
    });

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const address = form.address.value;
        const date = form.date.value;

        if (!user) {
            Swal.fire("Please login to book a service");
            navigate("/login");
            return;
        }

        const bookingData = {
            serviceId: id,
            serviceName: data?.data?.title,
            serviceImage: data?.data?.image,
            price: data?.data?.price,
            userEmail: user.email,
            userName: user.displayName,
            address,
            date,
            status: "pending"
        };

        try {
            const res = await axiosSecure.post("/bookings", bookingData);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Booking Successful!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsModalOpen(false);
                navigate("/dashboard/bookings");
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        }
    };

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-96">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );

    if (isError)
        return (
            <div className="text-center text-red-600 mt-10">
                Failed to load service details.
            </div>
        );

    const service = data?.data; // backend returns { success, data }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-base-100 shadow-xl rounded-xl overflow-hidden">
                <img
                    src={service?.image}
                    alt={service?.title}
                    className="w-full h-72 object-cover"
                />

                <div className="p-6 space-y-4">
                    <h1 className="text-3xl font-bold text-secondary">
                        {service?.title}
                    </h1>

                    <p className="text-gray-600 leading-relaxed">
                        {service?.description}
                    </p>

                    <div className="border-t pt-4">
                        <p className="text-lg font-semibold">
                            Price:{" "}
                            <span className="text-primary">
                                ${service?.price}
                            </span>
                        </p>

                        <p className="text-sm text-gray-500">
                            Category: {service?.category}
                        </p>
                    </div>

                    <button
                        onClick={() => user ? setIsModalOpen(true) : navigate('/login')}
                        className="btn btn-neutral w-full mt-4"
                    >
                        Book Now
                    </button>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                >
                                    ✕
                                </button>
                                <h3 className="font-bold text-lg mb-4">Confirm Booking</h3>
                                <form onSubmit={handleBookingSubmit} className="space-y-4">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Service</span>
                                        </label>
                                        <input type="text" value={service?.title} disabled className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Price</span>
                                        </label>
                                        <input type="text" value={`$${service?.price}`} disabled className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Your Name</span>
                                        </label>
                                        <input type="text" value={user?.displayName || ''} disabled className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Your Email</span>
                                        </label>
                                        <input type="text" value={user?.email || ''} disabled className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Date</span>
                                        </label>
                                        <input type="date" name="date" required className="input input-bordered" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Address</span>
                                        </label>
                                        <input type="text" name="address" placeholder="Service Address" required className="input input-bordered" />
                                    </div>
                                    <div className="modal-action">
                                        <button type="submit" className="btn btn-primary">Confirm</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
