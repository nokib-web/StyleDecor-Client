import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import { FaTag, FaTools, FaCheckCircle, FaMapMarkerAlt, FaShieldAlt, FaClock, FaUserTie } from "react-icons/fa";
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
    // Renamed 'data' to 'serviceData' for clarity
    const { data: serviceData, isLoading, isError } = useQuery({
        queryKey: ["service", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/services/${id}`);
            // res.data is the service object itself
            console.log("Service API Response:", res.data);
            return res.data;
        },
    });

    // service is now correctly assigned the fetched object
    const service = serviceData?.data;
    console.log("ServiceData:", serviceData);
    console.log("Derived Service:", service);

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const address = form.address.value;
        const date = form.date.value;
        const slot = form.slot.value;
        const serviceType = form.serviceType.value;

        if (!user) {
            Swal.fire("Please login to book a service");
            navigate("/login");
            return;
        }

        // Correctly using service for booking payload
        const bookingData = {
            serviceId: id,
            serviceName: service?.title,
            serviceImage: service?.image,
            price: service?.price,
            userEmail: user.email,
            userName: user.displayName,
            address,
            date,
            slot,
            serviceType,
            status: "pending"
        };
        console.log("Booking Submission Payload:", bookingData);

        if (!bookingData.price) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Service price is missing. Cannot proceed with booking. Check if serviceData has loaded correctly.",
            });
            return;
        }

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

    const {
        title,
        image,
        description,
        price,
        category,
        features = [],
        tags = [],
        serviceProvider,
        deliveryTime,
        rating,
        location,
        warrantyDays,
        isCustomizable
    } = service || {};

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Image & Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Hero Image */}
                    <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Title & Description */}
                    <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
                                <div className="flex items-center gap-2 mt-2 text-primary uppercase font-semibold text-sm tracking-wide">
                                    <span className="badge badge-outline badge-primary">{category}</span>
                                    {isCustomizable && <span className="badge badge-accent text-white">Customizable</span>}
                                </div>
                            </div>
                            {rating && (
                                <div className="flex flex-col items-center bg-yellow-50 p-2 rounded-lg border border-yellow-100">
                                    <div className="flex items-center gap-1 text-yellow-500 font-bold text-xl">
                                        <span>★</span> {rating}
                                    </div>
                                    <span className="text-xs text-gray-500">Rating</span>
                                </div>
                            )}
                        </div>

                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                            {description}
                        </p>

                        {/* Features List */}
                        {features.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                    <FaTools className="text-secondary" /> Key Features
                                </h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 bg-base-200 p-3 rounded-lg">
                                            <FaCheckCircle className="text-green-500 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Key Details & Booking */}
                <div className="lg:col-span-1">
                    <div className="bg-base-100 rounded-xl shadow-lg border border-base-200 sticky top-24 p-6">

                        {/* Price Section */}
                        <div className="mb-6 pb-6 border-b border-gray-100">
                            <span className="text-gray-500 block mb-1">Total Price</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-primary">${price}</span>
                                <span className="text-gray-400 font-medium">/ service</span>
                            </div>
                        </div>

                        {/* Metadata Grid */}
                        <div className="space-y-4 mb-8">
                            {serviceProvider && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <FaUserTie />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Service Provider</p>
                                        <p className="font-semibold text-gray-700">{serviceProvider}</p>
                                    </div>
                                </div>
                            )}

                            {deliveryTime && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                                        <FaClock />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Estimated Delivery</p>
                                        <p className="font-semibold text-gray-700">{deliveryTime} Days</p>
                                    </div>
                                </div>
                            )}

                            {location && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Service Area</p>
                                        <p className="font-semibold text-gray-700">{location}</p>
                                    </div>
                                </div>
                            )}

                            {warrantyDays > 0 && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                                        <FaShieldAlt />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Warranty</p>
                                        <p className="font-semibold text-gray-700">{warrantyDays} Days Coverage</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Booking Button */}
                        <button
                            onClick={() => user ? setIsModalOpen(true) : navigate('/login')}
                            className="btn btn-primary btn-lg w-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:-translate-y-1"
                        >
                            Book This Service
                        </button>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <div className="flex items-center gap-2 mb-3 text-gray-500 text-sm font-medium">
                                    <FaTag /> Related Tags
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, i) => (
                                        <span key={i} className="badge badge-ghost bg-gray-100 text-gray-600 px-3 py-3">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-md relative shadow-2xl animate-fade-in-up">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 text-gray-500"
                        >
                            ✕
                        </button>
                        <h3 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-4">Confirm Booking</h3>
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Service Name</span>
                                </label>
                                <input type="text" value={title} disabled className="input input-bordered bg-gray-50 font-semibold text-gray-700" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Price</span>
                                    </label>
                                    <input type="text" value={`$${price}`} disabled className="input input-bordered bg-gray-50 font-bold text-primary" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">User</span>
                                    </label>
                                    <input type="text" value={user?.displayName || 'User'} disabled className="input input-bordered bg-gray-50" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Service Mode</span>
                                    </label>
                                    <select name="serviceType" className="select select-bordered focus:select-primary" required>
                                        <option value="consultation">In-studio (Consultation)</option>
                                        <option value="on-site">On-site (Decoration)</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Time Slot</span>
                                    </label>
                                    <select name="slot" className="select select-bordered focus:select-primary" required>
                                        <option value="10:00 AM">10:00 AM</option>
                                        <option value="12:00 PM">12:00 PM</option>
                                        <option value="03:00 PM">03:00 PM</option>
                                        <option value="06:00 PM">06:00 PM</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Preferred Date</span>
                                </label>
                                <input type="date" name="date" required className="input input-bordered focus:input-primary" min={new Date().toISOString().split('T')[0]} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Service Address</span>
                                </label>
                                <input type="text" name="address" placeholder="Enter your full address" required className="input input-bordered focus:input-primary" />
                            </div>
                            <div className="modal-action pt-4">
                                <button type="submit" className="btn btn-primary w-full">Confirm & Book</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetails;