import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import ServiceCard from '../../../components/ServiceCard/ServiceCard';
import { Link } from 'react-router';

const FeaturedServices = () => {
    const axiosPublic = useAxios();

    const { data: services = [], isLoading, isError } = useQuery({
        queryKey: ['featuredServices'],
        queryFn: async () => {
            const res = await axiosPublic.get('/services?limit=4'); // Assuming server supports limit or we slice
            return res.data.data || [];
        }
    });

    const displayServices = services.slice(0, 4);

    if (isLoading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;
    if (isError) return null; // Hide section if error

    return (
        <section className="py-20 bg-base-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-primary">Our Premium Packages</h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto">Explore our most popular decoration packages designed to make your special moments unforgettable.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayServices.map(service => (
                        <ServiceCard key={service._id} service={service} />
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link to="/services" className="btn btn-outline btn-primary px-8">View All Services</Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedServices;
