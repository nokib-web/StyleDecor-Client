import React from "react";
import { Link } from "react-router";
import { FaStar, FaClock, FaUserTie } from "react-icons/fa";

const ServiceCard = ({ service, onToggleCompare, isSelected }) => {
    const { _id, title, image, description, price, rating, serviceProvider, deliveryTime, isFeatured } = service;

    return (
        <div className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border rounded-2xl ${isSelected ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-base-200'} group relative flex flex-col h-full`}>
            {/* Image section with fixed height */}
            <figure className="relative h-56 overflow-hidden rounded-t-2xl shrink-0">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {isFeatured && (
                    <div className="absolute top-3 right-3 badge badge-secondary badge-md font-semibold shadow-sm">
                        Featured
                    </div>
                )}
                {rating && (
                    <div className="absolute top-3 left-3 badge badge-warning gap-1 shadow-sm font-bold text-white">
                        <FaStar /> {rating}
                    </div>
                )}

                {/* Compare Checkbox */}
                {onToggleCompare && (
                    <div className="absolute bottom-3 right-3">
                        <label className="label cursor-pointer bg-base-100/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-md hover:bg-base-100 transition-colors">
                            <span className="label-text text-xs font-bold mr-2 text-base-content/80">Compare</span>
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

            {/* Content section with flex-grow to push footer down */}
            <div className="card-body p-6 flex flex-col flex-grow">
                <h2 className="card-title text-xl text-base-content font-bold line-clamp-1">{title}</h2>
                <p className="text-base-content/60 text-sm line-clamp-2 min-h-[2.5rem] mt-2 leading-relaxed">
                    {description || "No description available for this premium service."}
                </p>

                {/* Dedicated Meta Info Grid */}
                <div className="mt-auto pt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2 text-sm text-base-content/70">
                        <div className="flex items-center gap-2 bg-base-200/50 p-2 rounded-lg">
                            <FaUserTie className="text-primary shrink-0" />
                            <span className="truncate whitespace-nowrap">{serviceProvider || "Expert"}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-base-200/50 p-2 rounded-lg">
                            <FaClock className="text-primary shrink-0" />
                            <span className="whitespace-nowrap">{deliveryTime || "2-5"} Days</span>
                        </div>
                    </div>

                    {/* Pricing and Action Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-base-200 mt-2">
                        <div className="flex flex-col">
                           
                            <span className="text-xl font-black text-primary">${price}</span>
                        </div>
                        <Link
                            to={`/services/${_id}`}
                            className="btn btn-outline btn-primary  px-2 h-8  text-sm hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 font-bold"
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
