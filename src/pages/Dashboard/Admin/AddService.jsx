import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const AddService = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const onSubmit = (data) => {
        const serviceData = {
            title: data.service_name,
            price: parseFloat(data.cost),
            unit: data.unit,
            category: data.category,
            description: data.description,
            image: data.image,
            createdByEmail: user?.email,
            details: data.description // Mapping description to details as well to be safe
        };

        axiosSecure.post('/services', serviceData)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Service added successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                    reset();
                }
            });
    };

    return (
        <div className="w-full p-8 bg-base-100 rounded-xl shadow-lg border border-base-200">
            <h2 className="text-3xl font-bold mb-8 text-center text-base-content">Add New Decoration Service</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Service Name & Cost */}
                <div className="flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium text-base-content/70">Service Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Wedding Stage Decor"
                            {...register("service_name", { required: true })}
                            className="input input-bordered w-full focus:input-primary"
                        />
                        {errors.service_name && <span className="text-red-500 text-sm">Service Name is required</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium text-base-content/70">Cost (BDT)*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 5000"
                            {...register("cost", { required: true })}
                            className="input input-bordered w-full focus:input-primary"
                        />
                        {errors.cost && <span className="text-red-500 text-sm">Cost is required</span>}
                    </div>
                </div>

                {/* Unit & Category */}
                <div className="flex gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium text-base-content/70">Unit*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. per sqft, per floor, per event"
                            {...register("unit", { required: true })}
                            className="input input-bordered w-full focus:input-primary"
                        />
                        {errors.unit && <span className="text-red-500 text-sm">Unit is required</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium text-base-content/70">Category*</span>
                        </label>
                        <select
                            defaultValue="default"
                            {...register("category", { required: true })}
                            className="select select-bordered w-full focus:select-primary"
                        >
                            <option disabled value="default">Select a category</option>
                            <option value="home">Home Decor</option>
                            <option value="wedding">Wedding Decor</option>
                            <option value="office">Office Decor</option>
                            <option value="seminar">Seminar Decor</option>
                            <option value="meeting">Meeting Decor</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.category && <span className="text-red-500 text-sm">Category is required</span>}
                    </div>
                </div>

                {/* Image URL */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-medium text-base-content/70">Service Image URL*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Image URL"
                        {...register("image", { required: true })}
                        className="input input-bordered w-full focus:input-primary"
                    />
                    {errors.image && <span className="text-red-500 text-sm">Image URL is required</span>}
                </div>

                {/* Description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium text-base-content/70">Description*</span>
                    </label>
                    <textarea
                        {...register("description", { required: true })}
                        className="textarea textarea-bordered h-24 focus:textarea-primary"
                        placeholder="Detailed description of the service..."
                    ></textarea>
                    {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
                </div>

                {/* Created By (Read-only) */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-medium text-base-content/70">Created By</span>
                    </label>
                    <input
                        type="text"
                        value={user?.email || ''}
                        readOnly
                        className="input input-bordered w-full bg-base-200 text-base-content/50 cursor-not-allowed border-base-300"
                    />
                </div>

                <div className="flex justify-center mt-6">
                    <button className="btn btn-primary w-full max-w-xs text-lg">
                        Add Service
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddService;
