import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Event Planner",
        content: "StyleDecor exceeded every expectation. Their attention to detail in our corporate gala was absolutely flawless. The theme was modern yet warm, exactly what we wanted.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=sarah"
    },
    {
        name: "Michael Chen",
        role: "Groom",
        content: "We couldn't have asked for a better wedding decor team. They took my wife's vague ideas and turned them into a fairytale reality. Professional, punctual, and talented.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=michael"
    },
    {
        name: "Jessica White",
        role: "Business Owner",
        content: "Our office grand opening was a huge success thanks to the atmosphere created by StyleDecor. Their concept design was innovative and perfectly reflected our brand.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=jessica"
    }
];

const Testimonials = () => {
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
                    {testimonials.map((t, index) => (
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
                                    {[...Array(t.rating)].map((_, i) => <FaStar key={i} />)}
                                </div>
                                <p className="text-base-content/80 text-lg italic leading-relaxed mb-8">
                                    "{t.content}"
                                </p>
                                <div className="flex items-center gap-4">
                                    <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-primary/20" />
                                    <div>
                                        <h4 className="font-bold text-base-content">{t.name}</h4>
                                        <p className="text-sm text-base-content/50">{t.role}</p>
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
