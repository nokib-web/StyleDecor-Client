import React from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Contact = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Have a question or ready to start your project? We'd love to hear from you.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <h2 className="text-3xl font-bold mb-8 text-gray-800">Get in Touch</h2>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                <FiMapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Our Office</h3>
                                <p className="text-gray-500">123 Design Avenue, Creative District<br />Dhaka, Bangladesh 1212</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                <FiPhone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Phone</h3>
                                <p className="text-gray-500">+880 123 456 7890<br />Mon-Fri, 9am - 6pm</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary shrink-0">
                                <FiMail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Email</h3>
                                <p className="text-gray-500">hello@styledecor.com<br />support@styledecor.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
                    <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label text-sm font-medium">Name</label>
                                <input type="text" placeholder="Your Name" className="input input-bordered w-full" />
                            </div>
                            <div className="form-control">
                                <label className="label text-sm font-medium">Email</label>
                                <input type="email" placeholder="Your Email" className="input input-bordered w-full" />
                            </div>
                        </div>
                        <div className="form-control">
                            <label className="label text-sm font-medium">Subject</label>
                            <input type="text" placeholder="Project Inquiry" className="input input-bordered w-full" />
                        </div>
                        <div className="form-control">
                            <label className="label text-sm font-medium">Message</label>
                            <textarea className="textarea textarea-bordered h-32" placeholder="Tell us about your project..."></textarea>
                        </div>
                        <button className="btn btn-primary w-full">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
