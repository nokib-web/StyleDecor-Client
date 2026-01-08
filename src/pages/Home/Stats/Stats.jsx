import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { value: "1,200+", label: "Projects Completed", suffix: "" },
    { value: "45+", label: "Expert Decorators", suffix: "" },
    { value: "98%", label: "Client Satisfaction", suffix: "" },
    { value: "15+", label: "Years Experience", suffix: "" }
];

const Stats = () => {
    return (
        <section className="py-20 bg-primary">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-center"
                        >
                            <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tight">
                                {stat.value}
                            </div>
                            <div className="text-primary-content/80 font-medium uppercase tracking-widest text-xs md:text-sm">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
