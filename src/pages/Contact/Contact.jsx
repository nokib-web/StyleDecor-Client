import React from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Contact = () => {
    return (
        <div className="bg-base-100 min-h-screen">
            {/* Simple Header Text - No Hero */}
            <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-6 text-base-content">Contact Us</h1>
                <p className="text-xl md:text-2xl text-base-content/70 max-w-3xl mx-auto">
                    Ready to transform your space? We're here to help bring your vision to life.
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Contact Information */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-4xl font-semibold mb-8 text-base-content">Get in Touch</h2>
                            <p className="text-lg text-base-content/70 mb-10 max-w-lg">
                                We'd love to hear about your project. Reach out via phone, email, or visit our studio.
                            </p>
                        </div>

                        <div className="space-y-10">
                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 transition group-hover:bg-primary group-hover:text-white">
                                    <FiMapPin className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Our Studio</h3>
                                    <p className="text-base-content/70 leading-relaxed">
                                        123 Design Avenue<br />
                                        Creative District, Dhaka<br />
                                        Bangladesh 1212
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 transition group-hover:bg-primary group-hover:text-white">
                                    <FiPhone className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Phone</h3>
                                    <p className="text-base-content/70 leading-relaxed">
                                        +880 123 456 7890<br />
                                        Mon–Fri, 9am – 6pm
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0 transition group-hover:bg-primary group-hover:text-white">
                                    <FiMail className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                                    <p className="text-base-content/70 leading-relaxed">
                                        hello@styledecor.com<br />
                                        support@styledecor.com
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-base-200/50 backdrop-blur-sm p-10 md:p-12 rounded-3xl shadow-xl border border-base-300">
                        <h3 className="text-3xl font-semibold mb-8 text-base-content">Send Us a Message</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Name</span>
                                    </label>
                                    <input type="text" placeholder="Your Name" className="input input-bordered input-lg w-full bg-base-100" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Email</span>
                                    </label>
                                    <input type="email" placeholder="Your Email" className="input input-bordered input-lg w-full bg-base-100" />
                                </div>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Subject</span>
                                </label>
                                <input type="text" placeholder="e.g., Residential Project Inquiry" className="input input-bordered input-lg w-full bg-base-100" />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-medium">Message</span>
                                </label> <br />
                                <textarea className="textarea textarea-bordered h-40 w-full resize-none bg-base-100" placeholder="Tell us about your project, budget, timeline, or any ideas you have..."></textarea>
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="btn btn-primary btn-lg w-full rounded-xl shadow-lg hover:shadow-xl transition">
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;