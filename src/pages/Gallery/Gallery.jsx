import React from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import SkeletonCard from '../../components/Skeleton/SkeletonCard';

const Gallery = () => {
    const axiosPublic = useAxiosPublic();

    const { data: portfolios = [], isLoading } = useQuery({
        queryKey: ['portfolios-public'],
        queryFn: async () => {
            const res = await axiosPublic.get('/portfolios');
            return res.data;
        }
    });

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Design Portfolio</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore the stunning transformations and creative projects by our talented decorators.
                    </p>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolios.map(item => (
                            <div key={item._id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                                <img src={item.image} alt={item.title} className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500" />
                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed flex-grow">{item.description}</p>
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-400">
                                        <span>Designer: {item.decoratorEmail}</span>
                                        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && portfolios.length === 0 && (
                    <div className="text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-400">No projects yet. Check back soon!</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;
