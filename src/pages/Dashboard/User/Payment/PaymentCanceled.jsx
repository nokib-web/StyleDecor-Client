
import React from 'react';
import { Link } from 'react-router';

const PaymentCanceled = () => {
    return (
        <div>
            <h1 className='text-4xl'>Payment canceled. Please try again</h1>
            <Link to={'/'}    >
            <button className='btn btn-primary text-black'> Try Again</button>
            </Link>
        </div>
    );
};

export default PaymentCanceled;