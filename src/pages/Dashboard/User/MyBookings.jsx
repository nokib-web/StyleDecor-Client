import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link } from 'react-router';
import { FaCalendarAlt, FaComments } from 'react-icons/fa';
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

    // --- Review System Logic ---
    const [selectedBookingForReview, setSelectedBookingForReview] = useState(null);
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewComment, setReviewComment] = useState("");

    const handleOpenReviewModal = (booking) => {
        setSelectedBookingForReview(booking);
        setReviewRating(5);
        setReviewComment("");
        document.getElementById('review_modal').showModal();
    };

    const handleReviewSubmit = async () => {
        if (!reviewComment) {
            Swal.fire("Error", "Please write a comment", "error");
            return;
        }

        const reviewData = {
            serviceId: selectedBookingForReview.serviceId,
            userName: user.displayName,
            userEmail: user.email,
            rating: parseInt(reviewRating),
            comment: reviewComment,
            bookingId: selectedBookingForReview._id
        };

        try {
            const res = await axiosSecure.post('/reviews', reviewData);
            if (res.data.insertedId) {
                document.getElementById('review_modal').close();
                Swal.fire("Thank You!", "Your review has been submitted.", "success");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Error", "Failed to submit review", "error");
        }
    };

    // --- Google Calendar Logic ---
    const addToGoogleCalendar = (booking) => {
        const title = encodeURIComponent(`StyleDecor: ${booking.serviceName}`);
        const details = encodeURIComponent(`Service by StyleDecor. Address: ${booking.address}`);
        // Assuming booking.date is YYYY-MM-DD. Need strict formatting for GCal
        const startDate = new Date(booking.date).toISOString().replace(/-|:|\.\d\d\d/g, "");
        const endDate = new Date(new Date(booking.date).getTime() + 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, ""); // +1 hour

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&dates=${startDate}/${endDate}`;
        window.open(url, '_blank');
    };

    // --- Chat Logic ---
    const [selectedChatBooking, setSelectedChatBooking] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const handleChatOpen = async (booking) => {
        setSelectedChatBooking(booking);
        try {
            // Mark messages as read
            await axiosSecure.patch(`/messages/mark-read/${booking._id}`);
            refetch(); // Refetch to clear badge

            const res = await axiosSecure.get(`/messages/${booking._id}`);
            setChatMessages(res.data);
            document.getElementById('chat_modal').showModal();
        } catch (error) {
            console.error("Failed to load messages", error);
        }
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            bookingId: selectedChatBooking._id,
            senderEmail: user.email,
            senderName: user.displayName,
            text: newMessage,
            timestamp: new Date()
        };

        try {
            const res = await axiosSecure.post('/messages', messageData);
            if (res.data.insertedId) {
                setChatMessages([...chatMessages, messageData]);
                setNewMessage("");
            }
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

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
                                            {/* Show Addons Tag */}
                                            {booking.addOns && booking.addOns.length > 0 && (
                                                <div className="flex flex-wrap gap-1 mt-1">
                                                    {booking.addOns.map((addon, idx) => (
                                                        <span key={idx} className="badge badge-xs badge-outline">{addon.name}</span>
                                                    ))}
                                                </div>
                                            )}
                                            {booking.discountApplied && booking.discountApplied !== "0%" && (
                                                <span className="badge badge-sm badge-secondary ml-1">-{booking.discountApplied}</span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <BookingTracking status={booking.status} />
                                </td>

                                {/* Price Column */}
                                <td className="font-semibold">
                                    <div className="flex flex-col">
                                        <span>${parseFloat(booking.price).toFixed(2)}</span>
                                        {booking.originalPrice > booking.price && (
                                            <span className="text-xs text-gray-400 line-through">${parseFloat(booking.originalPrice).toFixed(2)}</span>
                                        )}
                                    </div>
                                </td>

                                {/* Action Column */}
                                <td>
                                    <div className="flex gap-2">
                                        {booking.status === 'pending' && (
                                            <button
                                                onClick={() => handleCancel(booking._id)}
                                                className="btn btn-sm btn-error text-white"
                                            >
                                                Cancel
                                            </button>
                                        )}

                                        {booking.status !== 'paid' && booking.status !== 'cancelled' && (
                                            <Link to={`/dashboard/payment/${booking._id}`} state={{ booking: booking }}>
                                                <button className="btn btn-sm btn-primary">Pay</button>
                                            </Link>
                                        )}

                                        {booking.status === 'paid' && (
                                            <span className="badge badge-success badge-outline">Paid</span>
                                        )}

                                        {booking.status === 'completed' && (
                                            <button
                                                onClick={() => handleOpenReviewModal(booking)}
                                                className="btn btn-sm btn-accent text-white"
                                            >
                                                Review
                                            </button>
                                        )}

                                        {/* Functional & Chat Buttons */}
                                        {booking.status !== 'cancelled' && (
                                            <>
                                                <button onClick={() => addToGoogleCalendar(booking)} className="btn btn-sm btn-circle btn-ghost text-blue-500 tooltip" data-tip="Add to Calendar">
                                                    <FaCalendarAlt />
                                                </button>
                                                <div className="relative inline-block">
                                                    <button onClick={() => handleChatOpen(booking)} className="btn btn-sm btn-circle btn-ghost text-green-500 tooltip" data-tip="Chat with Decorator">
                                                        <FaComments />
                                                    </button>
                                                    {booking.unreadCount > 0 && (
                                                        <span className="absolute -top-1 -right-1 badge badge-xs badge-secondary w-5 h-5 flex items-center justify-center rounded-full text-white">
                                                            {booking.unreadCount}
                                                        </span>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
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

            {/* Review Modal */}
            <dialog id="review_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Write a Review</h3>
                    <p className="py-4">How was your experience with <b>{selectedBookingForReview?.serviceName}</b>?</p>

                    <div className="form-control w-full max-w-xs mb-4">
                        <label className="label">
                            <span className="label-text">Rating</span>
                        </label>
                        <div className="rating">
                            {[1, 2, 3, 4, 5].map(star => (
                                <input
                                    key={star}
                                    type="radio"
                                    name="rating-2"
                                    className="mask mask-star-2 bg-orange-400"
                                    checked={reviewRating === star}
                                    onChange={() => setReviewRating(star)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Comment</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered h-24"
                            placeholder="Tell us about your experience..."
                            value={reviewComment}
                            onChange={(e) => setReviewComment(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-ghost mr-2">Close</button>
                        </form>
                        <button onClick={handleReviewSubmit} className="btn btn-primary">Submit Review</button>
                    </div>
                </div>
            </dialog>

            {/* Chat Modal */}
            <dialog id="chat_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl h-[80vh] flex flex-col">
                    <h3 className="font-bold text-lg border-b pb-2">Chat with Decorator (Project: {selectedChatBooking?.serviceName})</h3>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200 rounded-lg my-4">
                        {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`chat ${msg.senderEmail === user.email ? 'chat-end' : 'chat-start'}`}>
                                <div className="chat-header text-xs opacity-50">{msg.senderName}</div>
                                <div className={`chat-bubble ${msg.senderEmail === user.email ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>{msg.text}</div>
                                <div className="chat-footer opacity-50 text-xs">{new Date(msg.timestamp || msg.createdAt).toLocaleTimeString()}</div>
                            </div>
                        ))}
                        {chatMessages.length === 0 && <p className="text-center text-gray-400 mt-10">No messages yet. Ask anything regarding your booking!</p>}
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            className="input input-bordered w-full"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <button onClick={handleSendMessage} className="btn btn-primary">Send</button>
                    </div>

                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div >
    );
};

export default MyBookings;
