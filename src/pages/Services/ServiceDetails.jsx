import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// Imports updated
import { FaTag, FaTools, FaCheckCircle, FaMapMarkerAlt, FaShieldAlt, FaClock, FaUserTie, FaHeart } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";

const ServiceDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const currentLocation = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- Bonus Features State ---
    const [couponCode, setCouponCode] = useState("");
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [selectedAddOns, setSelectedAddOns] = useState([]);

    const addOnOptions = [
        { name: "Extra Floral Arrangements", price: 50 },
        { name: "Premium Mood Lighting", price: 80 },
        { name: "Custom Theme Banner", price: 30 }
    ];

    const handleAddOnToggle = (addOn) => {
        if (selectedAddOns.some(item => item.name === addOn.name)) {
            setSelectedAddOns(selectedAddOns.filter(item => item.name !== addOn.name));
        } else {
            setSelectedAddOns([...selectedAddOns, addOn]);
        }
    };

    const handleApplyCoupon = () => {
        if (couponCode === "STYLE20") {
            setIsCouponApplied(true);
            Swal.fire("Success", "Coupon Applied! You saved 20%", "success");
        } else {
            Swal.fire("Invalid Coupon", "Try using STYLE20", "warning");
        }
    };

    // Fetch single service by ID
    const { data: serviceData, isLoading, isError } = useQuery({
        queryKey: ["service", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/services/${id}`);
            return res.data;
        },
    });

    const service = serviceData?.data;

    // --- Wishlist & Reviews Logic ---
    const { data: reviews, isLoading: isReviewsLoading } = useQuery({
        queryKey: ['reviews', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/${id}`);
            return res.data;
        },
        enabled: !!id // only fetch if id exists
    });

    const handleAddToWishlist = async () => {
        if (!user) {
            Swal.fire("Please login first");
            return;
        }
        const wishlistItem = {
            serviceId: id,
            serviceName: service?.title,
            serviceImage: service?.image,
            price: service?.price,
            userEmail: user.email
        };
        try {
            const res = await axiosSecure.post('/wishlist', wishlistItem);
            if (res.data.insertedId) {
                Swal.fire("Success", "Added to your Wishlist!", "success");
            } else if (res.data.message === 'Already in wishlist') {
                Swal.fire("Info", "Already in your Wishlist", "info");
            }
        } catch (error) {
            console.error(error);
        }
    };

    // --- Calculation Helpers ---
    const calculateTotal = () => {
        const basePrice = service?.price || 0;
        const addOnsPrice = selectedAddOns.reduce((acc, curr) => acc + curr.price, 0);
        return basePrice + addOnsPrice;
    };

    const calculateDiscountedTotal = () => {
        const total = calculateTotal();
        return isCouponApplied ? total * 0.8 : total;
    };

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

        const bookingData = {
            serviceId: id,
            serviceName: service?.title,
            serviceImage: service?.image,
            price: calculateDiscountedTotal(),
            originalPrice: calculateTotal(),
            discountApplied: isCouponApplied ? "20%" : "0%",
            addOns: selectedAddOns,

            userEmail: user.email,
            userName: user.displayName,
            address,
            date,
            slot,
            serviceType,
            status: "pending"
        };

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
                    <div className="rounded-2xl overflow-hidden shadow-lg h-64 md:h-[400px]">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    {/* Title & Description */}
                    <div className="bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
                        <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-base-content flex items-center gap-3">
                                    {title}

                                </h1>
                                <div className="flex items-center gap-2 mt-2 text-primary uppercase font-semibold text-sm tracking-wide">
                                    <span className="badge badge-outline badge-primary">{category}</span>
                                    {isCustomizable && <span className="badge badge-accent text-white">Customizable</span>}
                                    <button onClick={handleAddToWishlist} className="btn btn-ghost btn-sm text-red-500 hover:bg-red-50" title="Add to Wishlist">
                                        <FaHeart className="text-2xl" /> <span>Add to Wishlist</span>
                                    </button>
                                </div>
                                <div>

                                </div>
                            </div>
                            {rating && (
                                <div className="flex flex-col items-center bg-warning/10 p-2 rounded-lg border border-warning/20">
                                    <div className="flex items-center gap-1 text-warning font-bold text-xl">
                                        <span>★</span> {rating}
                                    </div>
                                    <span className="text-xs text-base-content/50">Rating</span>
                                </div>
                            )}
                        </div>


                        <p className="text-base-content/70 leading-relaxed text-lg mb-6">
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
                                            <FaCheckCircle className="text-success shrink-0" />
                                            <span className="text-base-content/80">{feature}</span>
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
                        <div className="mb-6 pb-6 border-b border-base-200">
                            <span className="text-base-content/50 block mb-1">Total Price</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold text-primary">${price}</span>
                                <span className="text-base-content/40 font-medium">/ service</span>
                            </div>
                        </div>

                        {/* Metadata Grid */}
                        <div className="space-y-4 mb-8">
                            {serviceProvider && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                                        <FaUserTie />
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/50">Service Provider</p>
                                        <p className="font-semibold text-base-content/80">{serviceProvider}</p>
                                    </div>
                                </div>
                            )}

                            {deliveryTime && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                                        <FaClock />
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/50">Estimated Delivery</p>
                                        <p className="font-semibold text-base-content/80">{deliveryTime} Days</p>
                                    </div>
                                </div>
                            )}

                            {location && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-accent/10 text-accent rounded-lg">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/50">Service Area</p>
                                        <p className="font-semibold text-base-content/80">{location}</p>
                                    </div>
                                </div>
                            )}

                            {warrantyDays > 0 && (
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-success/10 text-success rounded-lg">
                                        <FaShieldAlt />
                                    </div>
                                    <div>
                                        <p className="text-xs text-base-content/50">Warranty</p>
                                        <p className="font-semibold text-base-content/80">{warrantyDays} Days Coverage</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Booking Button */}
                        <button
                            onClick={() => user ? setIsModalOpen(true) : navigate('/login', { state: { from: currentLocation } })}
                            className="btn btn-primary btn-lg w-full shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all transform hover:-translate-y-1"
                        >
                            Book This Service
                        </button>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-base-200">
                                <div className="flex items-center gap-2 mb-3 text-base-content/50 text-sm font-medium">
                                    <FaTag /> Related Tags
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, i) => (
                                        <span key={i} className="badge badge-ghost bg-base-200 text-base-content/70 px-3 py-3 border-none">
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
                <div className="fixed inset-0 z-[2000] flex items-start sm:items-center justify-center bg-base-300/60 backdrop-blur-md p-4 overflow-y-auto pt-20 sm:pt-4">
                    <div className="bg-base-100 p-8 rounded-3xl w-full max-w-2xl relative shadow-2xl animate-fade-in-up my-auto border border-base-200">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6 text-base-content/50 hover:bg-base-200"
                        >
                            ✕
                        </button>
                        <h3 className="font-bold text-3xl mb-8 text-base-content border-b border-base-200 pb-6">Confirm Booking</h3>
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium text-base-content/70">Service Name</span>
                                    </label>
                                    <input type="text" value={title} disabled className="input input-bordered bg-base-200 font-semibold text-base-content/80" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium text-base-content/70">Price</span>
                                    </label>
                                    <input type="text" value={`$${price}`} disabled className="input input-bordered bg-base-200 font-bold text-primary" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium text-base-content/70">User</span>
                                    </label>
                                    <input type="text" value={user?.displayName || 'User'} disabled className="input input-bordered bg-base-200 text-base-content/60" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium text-base-content/70">Email</span>
                                    </label>
                                    <input type="email" value={user?.email || ''} disabled className="input input-bordered bg-base-200 text-base-content/60" />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                            {/* Service Add-ons */}
                            <div className="form-control bg-base-100 p-3 rounded-lg border border-base-200">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-2"><FaTag className="text-accent" /> Service Add-ons</span>
                                </label>
                                <div className="space-y-2">
                                    {addOnOptions.map((addOn, index) => (
                                        <label key={index} className="label cursor-pointer justify-start gap-3">
                                            <input
                                                type="checkbox"
                                                className="checkbox checkbox-primary checkbox-sm"
                                                checked={selectedAddOns.some(item => item.name === addOn.name)}
                                                onChange={() => handleAddOnToggle(addOn)}
                                            />
                                            <span className="label-text">{addOn.name} (+$ {addOn.price})</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Coupon Code */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Have a Coupon?</span>
                                </label>
                                <div className="join">
                                    <input
                                        type="text"
                                        className="input input-bordered join-item w-full"
                                        placeholder="Promo Code (Try STYLE20)"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        disabled={isCouponApplied}
                                    />
                                    <button
                                        type="button"
                                        onClick={handleApplyCoupon}
                                        className="btn btn-secondary join-item"
                                        disabled={isCouponApplied}
                                    >
                                        Apply
                                    </button>
                                </div>
                                {isCouponApplied && <p className="text-green-600 text-sm mt-1">✓ 20% Discount Applied!</p>}
                            </div>

                            {/* Final Price Summary */}
                            <div className="flex justify-between items-center text-lg font-bold border-t border-base-200 pt-2">
                                <span>Total:</span>
                                <div>
                                    {isCouponApplied && <span className="text-base-content/40 line-through text-sm mr-2">${calculateTotal().toFixed(2)}</span>}
                                    <span className="text-primary">${calculateDiscountedTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="modal-action pt-4">
                                <button type="submit" className="btn btn-primary w-full">Confirm & Book (${calculateDiscountedTotal().toFixed(2)})</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}


            {/* Reviews Section */}
            <div className="mt-16 bg-base-100 p-6 rounded-xl shadow-sm border border-base-200">
                <h3 className="text-2xl font-bold mb-6 text-base-content">Customer Reviews</h3>
                {isReviewsLoading ? (
                    <span className="loading loading-dots loading-md"></span>
                ) : reviews && reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews.map(review => (
                            <div key={review._id} className="p-4 border border-base-200 rounded-lg bg-base-200/50">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="avatar placeholder">
                                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                                            <span className="text-xs">{review.userName.charAt(0)}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-base-content">{review.userName}</p>
                                        <div className="flex text-warning text-xs">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-base-content/70 text-sm">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-base-content/40 italic">No reviews yet. Be the first to book and review!</p>
                )}
            </div>
        </div>
    );
};

export default ServiceDetails;