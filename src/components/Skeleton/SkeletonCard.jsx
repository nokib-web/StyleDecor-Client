import React from 'react';

const Skeleton = () => {
    return (
        <div className="card bg-base-100 shadow-xl border border-base-200 rounded-2xl flex flex-col h-full animate-pulse">
            {/* Image Placeholder */}
            <div className="bg-base-300 h-56 rounded-t-2xl w-full"></div>

            <div className="card-body p-6 flex flex-col flex-grow">
                {/* Title and Desc */}
                <div className="h-7 bg-base-300 rounded-lg w-3/4 mb-4"></div>
                <div className="space-y-2 mb-6">
                    <div className="h-4 bg-base-300 rounded w-full"></div>
                    <div className="h-4 bg-base-300 rounded w-5/6"></div>
                </div>

                {/* Meta Grid */}
                <div className="mt-auto pt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="h-9 bg-base-300 rounded-lg"></div>
                        <div className="h-9 bg-base-300 rounded-lg"></div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-base-200 mt-2">
                        <div className="space-y-1">
                            <div className="h-3 bg-base-300 rounded w-12"></div>
                            <div className="h-8 bg-base-300 rounded w-20"></div>
                        </div>
                        <div className="h-12 bg-base-300 rounded-xl w-32"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;



