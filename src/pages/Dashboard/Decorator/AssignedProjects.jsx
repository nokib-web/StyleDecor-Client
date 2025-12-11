import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { sendEmail } from '../../../utils/emailService';
import { FaComments } from 'react-icons/fa';

const AssignedProjects = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Chat State
    const [selectedChatBooking, setSelectedChatBooking] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    const { data: bookingsData = {}, refetch } = useQuery({
        queryKey: ['bookings-decorator', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings?email=${user.email}`);
            return res.data;
        }
    });

    const bookings = bookingsData.data || [];

    const handleChatOpen = async (booking) => {
        setSelectedChatBooking(booking);
        try {
            // Mark messages as read
            await axiosSecure.patch(`/messages/mark-read/${booking._id}`);
            refetch(); // Clear badge

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
            senderName: user.displayName, // Decorator Name
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

    const handleStatusUpdate = (id, newStatus, customerEmail, customerName) => {
        axiosSecure.patch(`/bookings/${id}`, { status: newStatus })
            .then(async (res) => {
                if (res.data.modifiedCount > 0) {
                    refetch();

                    // Send Real Email Notification
                    try {
                        const templateParams = {
                            to_name: customerName || 'Customer',
                            to_email: customerEmail,
                            message: `Your project status has been updated to: ${newStatus}`,
                            status: newStatus
                        };
                        await sendEmail(templateParams);
                        Swal.fire({
                            position: 'bottom-end',
                            icon: 'success',
                            title: 'Email Sent',
                            text: `One email sent to ${customerEmail}`,
                            showConfirmButton: false,
                            timer: 2000,
                            toast: true
                        });
                    } catch (error) {
                        console.error('Email failed', error);
                        Swal.fire({
                            position: 'bottom-end',
                            icon: 'warning',
                            title: 'Status Updated',
                            text: 'But failed to send email notification.',
                            timer: 2000,
                            toast: true
                        });
                    }
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
                                            onChange={(e) => handleStatusUpdate(project._id, e.target.value, project.userEmail, project.userName)}
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
                                    <div className="flex items-center">
                                        <select
                                            className="select select-bordered select-xs w-full max-w-xs"
                                            value={booking.status}
                                            onChange={(e) => handleStatusUpdate(booking._id, e.target.value, booking.userEmail, booking.userName)}
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

                                        <div className="relative inline-block ml-2">
                                            <button onClick={() => handleChatOpen(booking)} className="btn btn-xs btn-ghost text-primary tooltip" data-tip="Chat">
                                                <FaComments />
                                            </button>
                                            {booking.unreadCount > 0 && (
                                                <span className="absolute -top-1 -right-1 badge badge-xs badge-secondary w-4 h-4 flex items-center justify-center rounded-full text-white">
                                                    {booking.unreadCount}
                                                </span>
                                            )}
                                        </div>

                                        {booking.status === 'completed' && <span className="ml-2 text-green-600 font-bold">Done</span>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Chat Modal */}
            <dialog id="chat_modal" className="modal">
                <div className="modal-box w-11/12 max-w-2xl h-[600px] flex flex-col">
                    <h3 className="font-bold text-lg border-b pb-2">Chat with {selectedChatBooking?.userName}</h3>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200 rounded-lg my-4">
                        {chatMessages.map((msg, idx) => (
                            <div key={idx} className={`chat ${msg.senderEmail === user.email ? 'chat-end' : 'chat-start'}`}>
                                <div className="chat-header text-xs opacity-50">{msg.senderName}</div>
                                <div className={`chat-bubble ${msg.senderEmail === user.email ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>{msg.text}</div>
                                <div className="chat-footer opacity-50 text-xs">{new Date(msg.timestamp || msg.createdAt).toLocaleTimeString()}</div>
                            </div>
                        ))}
                        {chatMessages.length === 0 && <p className="text-center text-gray-400 mt-10">No messages yet. Start the conversation!</p>}
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
        </div>
    );
};

export default AssignedProjects;
