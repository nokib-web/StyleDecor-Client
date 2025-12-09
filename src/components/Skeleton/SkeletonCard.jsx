import React from 'react';

const Skeleton = () => {
    return (
        <div className="card bg-base-100 shadow-xl animate-pulse">
            <div className="bg-gray-300 h-48 rounded-t-xl"></div>
            <div className="card-body">
                <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="flex justify-between items-center mt-6">
                    <div className="h-8 bg-gray-300 rounded w-24"></div>
                    <div className="h-10 bg-gray-300 rounded-lg w-20"></div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;



