import React from 'react';
import { useRouteError, Link } from 'react-router';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-4">
            <h1 className="text-9xl font-bold text-primary">Oops!</h1>
            <p className="text-2xl mt-4 font-semibold">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-500 mt-2 italic">
                {error.statusText || error.message}
            </p>
            <div className="mt-8">
                <Link to="/" className="btn btn-primary">Go Back Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;
