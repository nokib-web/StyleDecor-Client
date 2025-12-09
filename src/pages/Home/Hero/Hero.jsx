import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

const Hero = () => {
    return (
        <div className="hero min-h-[80vh] relative overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1519225421980-715cb0202128?q=80&w=2600&auto=format&fit=crop)' }}>
            <div className="hero-overlay bg-black bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content z-10">
                <div className="max-w-md">
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-5 text-5xl font-bold font-serif"
                    >
                        Style Your Dream Event
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mb-8 font-light text-lg"
                    >
                        Professional decoration services for weddings, parties, and corporate events. We bring your vision to life.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <Link to="/services" className="btn btn-primary btn-lg border-none shadow-lg hover:scale-105 transition-transform">
                            Book Decoration Service
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
