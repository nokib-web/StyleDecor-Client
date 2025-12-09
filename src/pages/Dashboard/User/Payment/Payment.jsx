import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const Payment = () => {
    const { bookingId } = useParams();
    const axiosSecure = useAxiosSecure();
    const [priceToPay, setPriceToPay] = useState(0);
    const [priceError, setPriceError] = useState('');

    const { isLoading, data: booking = {} } = useQuery({
        queryKey: ['booking', bookingId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookings/${bookingId}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (booking?.price) {
            setPriceToPay(booking.price);
        } else if (booking?.serviceId) {
            // Fallback: Fetch service price if booking price is missing
            const fetchServicePrice = async () => {
                try {
                    const serviceRes = await axiosSecure.get(`/services/${booking.serviceId}`);
                    if (serviceRes.data.success && serviceRes.data.data.price) {
                        setPriceToPay(serviceRes.data.data.price);
                    } else {
                        setPriceError("Price not found for this service.");
                    }
                } catch (err) {
                    console.error("Failed to fetch service price:", err);
                    setPriceError("Failed to retrieve price details.");
                }
            };
            fetchServicePrice();
        }
    }, [booking, axiosSecure]);

    const handlePayment = async () => {
        if (!priceToPay) {
            setPriceError("Amount to pay is invalid.");
            return;
        }

        const paymentInfo = {
            cost: priceToPay,
            bookingId: booking._id,
            parcelId: booking.serviceId, // Keeping for server compatibility
            senderEmail: booking.userEmail,
            parcelName: booking.serviceName
        };

        try {
            const res = await axiosSecure.post('/payment-checkout-session', paymentInfo);
            console.log(res.data);
            if (res.data.url) {
                window.location.href = res.data.url;
            }
        } catch (error) {
            console.error("Payment initiation failed:", error);
            setPriceError("Failed to start payment.");
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen"><span className="loading loading-spinner loading-lg"></span></div>;
    }

    if (priceError) {
        return (
            <div className="alert alert-error m-4">
                <span>{priceError}</span>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">Payment for: <span className="text-primary">{booking.serviceName}</span></h2>
            <p className="text-xl mb-8">Amount to Pay: <span className="font-bold">${priceToPay}</span></p>

            <button onClick={handlePayment} className="btn btn-primary text-white">
                Pay with Stripe
            </button>
        </div>
    );
};

export default Payment;