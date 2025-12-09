import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ServiceDetails = () => {
    const { id } = useParams();

    // Fetch single service by ID
    const { data, isLoading, isError } = useQuery({
        queryKey: ["service", id],
        queryFn: async () => {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/services/${id}`
            );
            return res.data;
        },
    });

    if (isLoading)
        return (
            <div className="flex justify-center items-center h-96">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );

    if (isError)
        return (
            <div className="text-center text-red-600 mt-10">
                Failed to load service details.
            </div>
        );

    const service = data?.data; // backend returns { success, data }

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-base-100 shadow-xl rounded-xl overflow-hidden">
                <img
                    src={service?.image}
                    alt={service?.title}
                    className="w-full h-72 object-cover"
                />

                <div className="p-6 space-y-4">
                    <h1 className="text-3xl font-bold text-secondary">
                        {service?.title}
                    </h1>

                    <p className="text-gray-600 leading-relaxed">
                        {service?.description}
                    </p>

                    <div className="border-t pt-4">
                        <p className="text-lg font-semibold">
                            Price:{" "}
                            <span className="text-primary">
                                ${service?.price}
                            </span>
                        </p>

                        <p className="text-sm text-gray-500">
                            Category: {service?.category}
                        </p>
                    </div>

                    <button className="btn btn-neutral w-full mt-4">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
