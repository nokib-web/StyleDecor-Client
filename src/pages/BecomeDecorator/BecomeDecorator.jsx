import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FiCheckCircle, FiUploadCloud, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';

const BecomeDecorator = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const applicationData = {
            ...data,
            email: user?.email,
            photo: user?.photoURL,
            currentRole: 'user', // Initial state
        };

        try {
            const res = await axiosSecure.post('/applications', applicationData);
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Application submitted successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
            } else if (res.data.message === 'Already applied') {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You have already submitted an application.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Submission Failed",
                text: "Failed to submit application. Try again.",
            });
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gray-900 text-white py-20 px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Decorator Team</h1>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Showcase your talent, connect with clients, and grow your interior design business with StyleDecor.
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 -mt-10">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Apply to become a Decorator</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name & Email (Read only) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label font-medium text-gray-600">Name</label> <br />
                                <input
                                    type="text"
                                    value={user?.displayName || ''}
                                    readOnly
                                    className="input input-bordered bg-gray-100 cursor-not-allowed"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label font-medium text-gray-600">Email</label> <br />
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    readOnly
                                    className="input input-bordered bg-gray-100 cursor-not-allowed"
                                />
                            </div>

                            {/* Portfolio Link */}
                            <div className="form-control">
                                <label className="label font-medium text-gray-600">Portfolio URL</label> <br />
                                <input
                                    type="url"
                                    placeholder="https://yourportfolio.com"
                                    {...register("portfolio", { required: "Portfolio link is required" })}
                                    className="input input-bordered"
                                />
                                {errors.portfolio && <p className="text-red-500 text-sm mt-1">{errors.portfolio.message}</p>}
                            </div>
                        </div>



                        {/* Experience */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-600">Years of Experience</label> <br />
                            <input
                                type="number"
                                placeholder="e.g. 5"
                                {...register("experience", { required: "Experience is required", min: 0 })}
                                className="input input-bordered"
                            />
                            {errors.experience && <p className="text-red-500 text-sm mt-1">{errors.experience.message}</p>}
                        </div>

                        {/* Specialty */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-600">Specialty (e.g., Modern, Rustic, Commercial)</label> <br />
                            <input
                                type="text"
                                placeholder="What is your main style?"
                                {...register("specialty", { required: "Specialty is required" })}
                                className="input input-bordered"
                            />
                            {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty.message}</p>}
                        </div>


                        {/* About */}
                        <div className="form-control">
                            <label className="label font-medium text-gray-600">Why should we hire you?</label> <br />
                            <textarea
                                className="textarea textarea-bordered h-32"
                                placeholder="Tell us about your passion and expertise..."
                                {...register("description", { required: true })}
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-sm mt-1">This field is required</p>}
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`btn btn-primary w-full text-lg normal-case ${isSubmitting ? 'loading' : ''}`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Benefits Section */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Why Join StyleDecor?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <FiCheckCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">High Quality Leads</h3>
                        <p className="text-gray-500">Get matched with clients actively looking for your specific design style.</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <FiBriefcase className="w-8 h-8" /> {/* Reusing icon, need import if different */}
                        </div>
                        <h3 className="text-xl font-bold mb-2">Manage Projects</h3>
                        <p className="text-gray-500">Use our dashboard to track bookings, payments, and client communications.</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <FiDollarSign className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
                        <p className="text-gray-500">Guaranteed payments for your completed work, processed securely.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default BecomeDecorator;
