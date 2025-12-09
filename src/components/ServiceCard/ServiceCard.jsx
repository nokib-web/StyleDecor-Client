import React from "react";
import { Link } from "react-router";

const ServiceCard = ({ service }) => {
    const { _id, title, image, description, price } = service;

    return (
        <div className="border rounded-xl p-5 shadow-md hover:shadow-lg transition bg-base-100">

            {image && (
                <img
                    src={image}
                    alt={title}
                    className="w-full h-40 object-cover rounded-md mb-4"
                />
            )}

            <h2 className="text-xl font-semibold mb-2">{title}</h2>

            <p className="text-gray-700 mb-3 line-clamp-2">
                {description}
            </p>

            <p className="font-semibold mb-4 text-primary">
                Price: ${price}
            </p>

            <Link
                to={`/services/${_id}`}
                className="btn btn-neutral w-full"
            >
                View Details
            </Link>

        </div>
    );
};

export default ServiceCard;
