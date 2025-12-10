import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Hero = () => {
    return (
        <div className="hero min-h-[50vh]  relative overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1620626013444-4860ced065ee?q=80&w=2600&auto=format&fit=crop)' }}>
            {/* Gradient Overlay: Primary Gold / Charcoal Mix */}
            <div className="hero-overlay bg-gradient-to-r from-[var(--color-primary)]/70 via-[var(--color-primary-dark)]/80 to-[var(--color-primary-dark)]/95"></div>
            <div className="hero-content text-center text-neutral-content z-10">
                <div className="max-w-md">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-5 text-5xl lg:text-7xl font-bold font-serif leading-tight text-white drop-shadow-md"
                    >
                        Style Your <span className="text-[var(--color-primary)] drop-shadow-xl">Dream</span> Event
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mb-8 font-light text-xl text-[#F9F9F9]/90"
                    >
                        Professional decoration services for weddings, parties, and corporate events. We bring your vision to life.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex gap-4 justify-center"
                    >
                        <Link to="/services" className="btn btn-primary btn-lg border-none hover:scale-105 transition-transform rounded-sm px-10 text-white">
                            Book Service
                        </Link>
                        <Link to="/about" className="btn btn-outline border-white text-white btn-lg hover:bg-white hover:text-[#111111] hover:scale-105 transition-transform rounded-sm px-10">
                            Learn More
                        </Link>
                    </motion.div>
                </div>
            </div>
            {/* Abstract Decorative Element */}
            <motion.div
                className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary rounded-full opacity-20 blur-3xl pointer-events-none"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 10, repeat: Infinity }}
            />
        </div>
    );
};

export default Hero;
