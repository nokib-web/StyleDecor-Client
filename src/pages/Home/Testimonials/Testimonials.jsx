import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';

const Testimonials = () => {
    const axiosPublic = useAxios();

    const { data: reviews = [], isLoading } = useQuery({
        queryKey: ['featured-reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/featured-reviews');
            return res.data;
        }
    });

    if (isLoading) return <div className="py-24 bg-base-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>;

    // Fallback if no reviews yet
    const displayReviews = reviews.length > 0 ? reviews : [
        {
            userName: "Sarah J.",
            comment: "StyleDecor exceeded every expectation. Their attention to detail in our corporate gala was absolutely flawless.",
            rating: 5,
            userPhoto: "https://ui-avatars.com/api/?name=SJ&background=4A5A4E&color=fff"
        },
        {
            userName: "Michael C.",
            comment: "We couldn't have asked for a better wedding decor team. They turned ideas into a fairytale reality.",
            rating: 5,
            userPhoto: "https://ui-avatars.com/api/?name=MC&background=6B3A3F&color=fff"
        }
    ];

    return (
        <section className="py-24 bg-base-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
                    <div>
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-primary font-bold tracking-widest uppercase text-sm"
                        >
                            Client Stories
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold mt-4 text-base-content font-serif"
                        >
                            What Our Clients Say
                        </motion.h2>
                    </div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-base-content/60 max-w-md"
                    >
                        Trust is built through excellence. Here's why thousands choose us for their most important moments.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {displayReviews.map((t, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-base-200/40 p-10 rounded-3xl border border-base-300 relative group hover:bg-base-100 hover:shadow-2xl transition-all duration-500"
                        >
                            <FaQuoteLeft className="text-primary/10 text-6xl absolute top-8 left-8 group-hover:text-primary/20 transition-colors" />
                            <div className="relative z-10">
                                <div className="flex gap-1 mb-6 text-warning">
                                    {[...Array(t.rating || 5)].map((_, i) => <FaStar key={i} />)}
                                </div>
                                <p className="text-base-content/80 text-lg italic leading-relaxed mb-8">
                                    "{t.comment}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <img
                                        src={t.userPhoto || `https://ui-avatars.com/api/?name=${t.userName}&background=random`}
                                        alt={t.userName}
                                        className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                                    />
                                    <div>
                                        <h4 className="font-bold text-base-content">{t.userName}</h4>
                                        <p className="text-sm text-base-content/50">Verified Client</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
