import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const AddService = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [loading, setLoading] = React.useState(false);

    const onSubmit = (data) => {
        setLoading(true);
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
                setLoading(false);
                if (res.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Service added successfully',
                        icon: 'success',
                        confirmButtonColor: '#4A5A4E',
                        confirmButtonText: 'Great'
                    });
                    reset();
                }
            })
            .catch(err => {
                setLoading(false);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add service',
                    icon: 'error',
                });
            });
    };

    return (
        <div className="w-full p-8 bg-base-100 rounded-2xl shadow-xl border border-base-200">
            <h2 className="text-3xl font-bold mb-8 text-center text-base-content">Add New Decoration Service</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                {/* Service Name & Cost */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content/70">Service Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. Wedding Stage Decor"
                            {...register("service_name", { required: true })}
                            className="input input-bordered w-full focus:input-primary transition-all duration-300"
                        />
                        {errors.service_name && <span className="text-error text-sm mt-1">Service Name is required</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content/70">Cost (USD)*</span>
                        </label>
                        <input
                            type="number"
                            placeholder="e.g. 500"
                            {...register("cost", { required: true })}
                            className="input input-bordered w-full focus:input-primary transition-all duration-300"
                        />
                        {errors.cost && <span className="text-error text-sm mt-1">Cost is required</span>}
                    </div>
                </div>

                {/* Unit & Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content/70">Unit*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. per sqft, per event"
                            {...register("unit", { required: true })}
                            className="input input-bordered w-full focus:input-primary transition-all duration-300"
                        />
                        {errors.unit && <span className="text-error text-sm mt-1">Unit is required</span>}
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold text-base-content/70">Category*</span>
                        </label>
                        <select
                            defaultValue="default"
                            {...register("category", { required: true })}
                            className="select select-bordered w-full focus:select-primary transition-all duration-300"
                        >
                            <option disabled value="default">Select a category</option>
                            <option value="home">Home Decor</option>
                            <option value="wedding">Wedding Decor</option>
                            <option value="office">Office Decor</option>
                            <option value="seminar">Seminar Decor</option>
                            <option value="meeting">Meeting Decor</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.category && <span className="text-error text-sm mt-1">Category is required</span>}
                    </div>
                </div>

                {/* Image URL */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold text-base-content/70">Service Image URL*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="https://example.com/image.jpg"
                        {...register("image", { required: true })}
                        className="input input-bordered w-full focus:input-primary transition-all duration-300"
                    />
                    {errors.image && <span className="text-error text-sm mt-1">Image URL is required</span>}
                </div>

                {/* Description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold text-base-content/70">Description*</span>
                    </label>
                    <textarea
                        {...register("description", { required: true })}
                        className="textarea textarea-bordered h-32 focus:textarea-primary transition-all duration-300"
                        placeholder="Detailed description of the service..."
                    ></textarea>
                    {errors.description && <span className="text-error text-sm mt-1">Description is required</span>}
                </div>

                {/* Created By (Read-only) */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text font-semibold text-base-content/70">Created By</span>
                    </label>
                    <input
                        type="text"
                        value={user?.email || ''}
                        readOnly
                        className="input input-bordered w-full bg-base-200 text-base-content/50 cursor-not-allowed border-base-200"
                    />
                </div>

                <div className="flex justify-center mt-10">
                    <button className="btn btn-primary w-full max-w-sm text-lg text-white" disabled={loading}>
                        {loading ? <span className="loading loading-spinner"></span> : "Add Service"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddService;
