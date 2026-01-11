import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import { Link } from 'react-router';
import ServiceCard from '../../../components/ServiceCard/ServiceCard';
import FeaturedServiceSkeleton from '../../../components/Skeleton/SkeletonCard';

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

    if (isError) return null; // Hide section if error

    return (
        <section className="py-24 bg-base-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black mb-6 font-serif text-primary tracking-tight">Our Premium Packages</h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto text-lg leading-relaxed">Explore our most popular decoration packages designed to make your special moments unforgettable.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {isLoading ? (
                        [...Array(4)].map((_, i) => <FeaturedServiceSkeleton key={i} />)
                    ) : (
                        displayServices.map(service => (
                            <ServiceCard key={service._id} service={service} />
                        ))
                    )}
                </div>

                {!isLoading && (
                    <div className="text-center mt-16">
                        <Link to="/services" className="btn btn-outline btn-primary btn-lg rounded-xl px-12 border-2 hover:border-primary transition-all font-bold">
                            View All Services
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default FeaturedServices;
