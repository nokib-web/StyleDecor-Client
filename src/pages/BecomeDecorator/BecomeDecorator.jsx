import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { FiCheckCircle, FiUploadCloud, FiBriefcase, FiDollarSign } from 'react-icons/fi';

const image_hosting_key = import.meta.env.VITE_image_host;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
import useAuth from '../../hooks/useAuth';

const BecomeDecorator = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            // Upload Image to ImgBB
            const imageFile = { image: data.portfolio[0] };
            const imgRes = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (imgRes.data.success) {
                const applicationData = {
                    ...data,
                    portfolio: imgRes.data.data.url, // Use the uploaded image URL
                    email: user?.email,
                    photo: user?.photoURL,
                    currentRole: 'user',
                };

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
        <div className="min-h-screen bg-base-200">
            {/* Hero Section */}
            <div className="bg-base-300 py-20 px-6 text-center border-b border-base-200">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-base-content">Join Our Decorator Team</h1>
                <p className="text-base-content/70 text-lg max-w-2xl mx-auto">
                    Showcase your talent, connect with clients, and grow your interior design business with StyleDecor.
                </p>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12 -mt-10">
                <div className="bg-base-100 rounded-2xl shadow-xl p-8 md:p-12 border border-base-200">
                    <h2 className="text-2xl font-bold mb-6 text-base-content">Apply to become a Decorator</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name & Email (Read only) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label font-medium text-base-content/70">Name</label> <br />
                                <input
                                    type="text"
                                    value={user?.displayName || ''}
                                    readOnly
                                    className="input input-bordered bg-base-200 text-base-content/50 cursor-not-allowed border-base-300"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label font-medium text-base-content/70">Email</label> <br />
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    readOnly
                                    className="input input-bordered bg-base-200 text-base-content/50 cursor-not-allowed border-base-300"
                                />
                            </div>

                            {/* Portfolio Image Upload */}
                            <div className="form-control">
                                <label className="label font-medium text-base-content/70">Best Work Sample (Image)</label> <br />
                                <input
                                    type="file"
                                    {...register("portfolio", { required: "Portfolio image is required" })}
                                    className="file-input file-input-bordered w-full"
                                />
                                {errors.portfolio && <p className="text-red-500 text-sm mt-1">{errors.portfolio.message}</p>}
                            </div>
                        </div>



                        {/* Experience */}
                        <div className="form-control">
                            <label className="label font-medium text-base-content/70">Years of Experience</label> <br />
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
                            <label className="label font-medium text-base-content/70">Specialty (e.g., Modern, Rustic, Commercial)</label> <br />
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
                            <label className="label font-medium text-base-content/70">Why should we hire you?</label> <br />
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
                <h2 className="text-3xl font-bold text-center mb-12 text-base-content">Why Join StyleDecor?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-base-100 rounded-xl shadow-sm border border-base-200">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <FiCheckCircle className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-base-content">High Quality Leads</h3>
                        <p className="text-base-content/60">Get matched with clients actively looking for your specific design style.</p>
                    </div>
                    <div className="text-center p-6 bg-base-100 rounded-xl shadow-sm border border-base-200">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <FiBriefcase className="w-8 h-8" /> {/* Reusing icon, need import if different */}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-base-content">Manage Projects</h3>
                        <p className="text-base-content/60">Use our dashboard to track bookings, payments, and client communications.</p>
                    </div>
                    <div className="text-center p-6 bg-base-100 rounded-xl shadow-sm border border-base-200">
                        <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                            <FiDollarSign className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-base-content">Secure Payments</h3>
                        <p className="text-base-content/60">Guaranteed payments for your completed work, processed securely.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default BecomeDecorator;
