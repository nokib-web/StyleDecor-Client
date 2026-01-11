import React from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const About = () => {
    return (
        <div className="bg-base-100">
            {/* Hero Section */}
            <div className="bg-base-300 py-20 px-6 text-center border-b border-base-200">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-base-content">About StyleDecor</h1>
                <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                    Transforming spaces into timeless masterpieces with passion, precision, and creativity.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-6 text-base-content">Our Story</h2>
                    <p className="text-base-content/70 mb-4 leading-relaxed">
                        Founded in 2020, StyleDecor began with a simple mission: to make professional interior design accessible to everyone. What started as a small team of passionate decorators has grown into a premier platform connecting clients with top-tier design talent.
                    </p>
                    <p className="text-base-content/70 leading-relaxed">
                        We believe that your environment profoundly impacts your well-being. That's why we're dedicated to creating spaces that are not only visually stunning but also functional and reflective of your unique personality.
                    </p>
                </div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                        alt="Interior Design Work"
                        className="rounded-lg shadow-xl w-full object-cover h-80"
                    />
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="bg-base-200 py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center text-base-content">Why Choose Us?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-base-100 p-8 rounded-xl shadow-sm border border-base-300">
                            <FiCheckCircle className="text-primary w-10 h-10 mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-base-content">Expert Decorators</h3>
                            <p className="text-base-content/60">Our team consists of vetted, experienced professionals who live and breathe design.</p>
                        </div>
                        <div className="bg-base-100 p-8 rounded-xl shadow-sm border border-base-300">
                            <FiCheckCircle className="text-primary w-10 h-10 mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-base-content">Tailored Solutions</h3>
                            <p className="text-base-content/60">Every project is unique. We customize our approach to fit your style and budget.</p>
                        </div>
                        <div className="bg-base-100 p-8 rounded-xl shadow-sm border border-base-300">
                            <FiCheckCircle className="text-primary w-10 h-10 mb-4" />
                            <h3 className="text-xl font-bold mb-2 text-base-content">Seamless Experience</h3>
                            <p className="text-base-content/60">From consultation to completion, we handle the details so you can enjoy the transformation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
