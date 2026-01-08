import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';

const TopDecorators = () => {
    const axiosPublic = useAxios();

    const { data: decorators = [], isLoading, isError } = useQuery({
        queryKey: ['decorators'],
        queryFn: async () => {
            const res = await axiosPublic.get('/decorators');
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center py-20"><span className="loading loading-spinner loading-lg"></span></div>;
    if (isError) return null;

    return (
        <section className="py-20 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif text-base-content">Meet Our Top Decorators</h2>
                    <p className="text-base-content/70 max-w-2xl mx-auto">Expert designers ready to transform your venue into a masterpiece.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {decorators.slice(0, 4).map((decorator, index) => (
                        <div key={decorator._id} className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border-t-4 border-primary">
                            <figure className="px-10 pt-10">
                                <div className="avatar">
                                    <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={decorator.photoURL || "https://i.ibb.co/7J5s23P/user.png"} alt={decorator.name} />
                                    </div>
                                </div>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title text-xl font-bold text-base-content">{decorator.name}</h2>
                                <p className="text-sm text-base-content/60">Certified Decorator</p>

                                {/* Mocking Data for UI Requirements */}
                                <div className="flex items-center gap-1 my-2">
                                    <span className="text-yellow-500">★</span>
                                    <span className="font-semibold text-base-content">4.{9 - (index % 3)}</span>
                                    <span className="text-base-content/40 text-xs">({10 + index * 5} reviews)</span>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2 mt-2">
                                    <span className="badge badge-ghost badge-sm">Weddings</span>
                                    <span className="badge badge-ghost badge-sm">Parties</span>
                                </div>

                                <div className="card-actions mt-4">
                                    <button className="btn btn-sm btn-primary btn-outline">View Profile</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopDecorators;
