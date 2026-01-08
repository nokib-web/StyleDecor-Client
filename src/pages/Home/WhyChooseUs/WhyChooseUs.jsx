import React from 'react';
import { FaLeaf, FaUserTie, FaHeadset, FaGem } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <FaUserTie className="text-4xl text-blue-500" />,
        title: "Professional Expertise",
        description: "Our certified decorators bring years of experience to transform your vision into reality with precision and style."
    },
    {
        icon: <FaLeaf className="text-4xl text-green-500" />,
        title: "Eco-Friendly Materials",
        description: "We prioritize sustainability by using biodegradable and eco-friendly decoration materials without compromising on beauty."
    },
    {
        icon: <FaHeadset className="text-4xl text-purple-500" />,
        title: "24/7 Support",
        description: "Our dedicated support team is available around the clock to answer your queries and ensure a smooth experience."
    },
    {
        icon: <FaGem className="text-4xl text-pink-500" />,
        title: "Customizable Packages",
        description: "From intimate gatherings to grand events, our packages are fully customizable to suit your specific needs and budget."
    }
];

const WhyChooseUs = () => {
    return (
        <div className="py-20 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl font-bold text-primary mb-4"
                    >
                        Why Choose StyleDecor?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-base-content/70 max-w-2xl mx-auto text-lg"
                    >
                        We create unforgettable experiences with a touch of elegance and sustainability. Here's what sets us apart.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-base-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-200 flex flex-col items-center text-center group"
                        >
                            <div className="mb-6 p-4 bg-base-200 rounded-full group-hover:bg-primary/10 transition-colors duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-base-content mb-3 group-hover:text-primary transition-colors">
                                {feature.title}
                            </h3>
                            <p className="text-base-content/70 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
