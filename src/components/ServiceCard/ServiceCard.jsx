import React from "react";
import { Link } from "react-router";
import { FaStar, FaClock, FaUserTie } from "react-icons/fa";

const ServiceCard = ({ service, onToggleCompare, isSelected }) => {
    const { _id, title, image, description, price, rating, serviceProvider, deliveryTime, isFeatured } = service;

    return (
        <div className={`card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 border ${isSelected ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-gray-100'} group relative`}>
            <figure className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {isFeatured && (
                    <div className="absolute top-2 right-2 badge badge-secondary badge-md font-semibold">
                        Featured
                    </div>
                )}
                {rating && (
                    <div className="absolute top-2 left-2 badge badge-warning gap-1 shadow-sm">
                        <FaStar className="text-white" /> {rating}
                    </div>
                )}

                {/* Compare Checkbox */}
                {onToggleCompare && (
                    <div className="absolute bottom-2 right-2">
                        <label className="label cursor-pointer bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm hover:bg-white transition-colors">
                            <span className="label-text text-xs font-bold mr-2 text-gray-700">Compare</span>
                            <input
                                type="checkbox"
                                className="checkbox checkbox-xs checkbox-primary"
                                checked={isSelected || false}
                                onChange={() => onToggleCompare(service)}
                            />
                        </label>
                    </div>
                )}
            </figure>

            <div className="card-body p-5">
                <h2 className="card-title text-lg">{title}</h2>
                <p className="text-gray-500 text-sm line-clamp-2 h-10">
                    {description}
                </p>

                <div className="mt-4 space-y-2">
                    <div className="flex justify-between items-center text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <FaUserTie className="text-primary" />
                            <span className="truncate max-w-[100px]">{serviceProvider}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaClock className="text-primary" />
                            <span>{deliveryTime} Days</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                        <span className="text-xl font-bold text-primary">${price}</span>
                        <Link
                            to={`/services/${_id}`}
                            className="btn btn-sm btn-outline btn-primary hover:text-white"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
