import React from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiLayers, FiActivity, FiCheckCircle } from 'react-icons/fi';

const steps = [
    {
        icon: <FiSearch />,
        title: "Consultation",
        description: "We dive deep into your vision, discussing event themes, color palettes, and specific requirements to build a solid foundation.",
        color: "bg-primary"
    },
    {
        icon: <FiLayers />,
        title: "Concept Design",
        description: "Our experts create moodboards and digital sketches to visualize the atmosphere, ensuring every detail aligns with your dream.",
        color: "bg-secondary"
    },
    {
        icon: <FiActivity />,
        title: "Seamless Execution",
        description: "From logistical planning to on-site management, our professional team handles the heavy lifting with precision and care.",
        color: "bg-accent"
    },
    {
        icon: <FiCheckCircle />,
        title: "Final Reveal",
        description: "Experience the magic as your venue is transformed. We ensure a flawless delivery that leaves a lasting impression on your guests.",
        color: "bg-success"
    }
];

const OurProcess = () => {
    return (
        <section className="py-24 bg-base-200/50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-widest uppercase text-sm"
                    >
                        Our Workflow
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mt-4 mb-6 text-base-content font-serif"
                    >
                        Design Excellence in Four Steps
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-base-content/60 max-w-2xl mx-auto text-lg"
                    >
                        We follow a structured, professional approach to turn your event vision into a stunning reality.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Progress Line for Desktop */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-base-300 -translate-y-1/2 z-0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className="relative z-10 group"
                        >
                            <div className="bg-base-100 p-8 rounded-3xl border border-base-300 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col items-center text-center">
                                <div className={`w-16 h-16 ${step.color} text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-300`}>
                                    {step.icon}
                                </div>
                                <div className="absolute top-4 right-6 text-5xl font-black text-base-content/5 opacity-20">
                                    0{index + 1}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-base-content">{step.title}</h3>
                                <p className="text-base-content/60 leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurProcess;
