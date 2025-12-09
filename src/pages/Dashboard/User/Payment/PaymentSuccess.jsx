import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState({})
    const axiosSecure = useAxiosSecure();
    const sessionId = searchParams.get('session_id')
    console.log(sessionId)

    useEffect(() => {
        if (sessionId) {
            axiosSecure.patch(`payment-success?session_id=${sessionId}`)
                .then(res => {
                    console.log(res.data)
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId

                    })
                })
        }
    }, [sessionId, axiosSecure])

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-success text-3xl">Payment Successful!</h2>
                    <p className="py-4">Thank you for your payment.</p>

                    <div className="w-full text-left space-y-2 mb-4">
                        <p><span className="font-semibold">Transaction ID:</span> <br /> <span className="text-xs">{paymentInfo.transactionId || 'Loading...'}</span></p>
                        <p><span className="font-semibold">Tracking ID:</span> <br /> <span className="text-xs">{paymentInfo.trackingId || 'Loading...'}</span></p>
                    </div>

                    <div className="card-actions">
                        <a href="/dashboard/bookings" className="btn btn-primary">Go to My Bookings</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;