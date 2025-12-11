import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const image_hosting_key = import.meta.env.VITE_image_host;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyPortfolio = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [uploading, setUploading] = useState(false);

    const { data: portfolios = [], refetch } = useQuery({
        queryKey: ['my-portfolio'],
        queryFn: async () => {
            const res = await axiosSecure.get('/portfolios/my-portfolio');
            return res.data;
        }
    });

    const onSubmit = async (data) => {
        setUploading(true);
        try {
            // Image Upload
            const imageFile = { image: data.image[0] };
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: { 'content-type': 'multipart/form-data' }
            });

            if (res.data.success) {
                const portfolioItem = {
                    title: data.title,
                    description: data.description,
                    image: res.data.data.url
                };

                const dbRes = await axiosSecure.post('/portfolios', portfolioItem);
                if (dbRes.data.insertedId) {
                    reset();
                    refetch();
                    Swal.fire('Success', 'Project added to your portfolio!', 'success');
                }
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Something went wrong', 'error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full p-4 sm:p-10 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold mb-8 text-center sm:text-left">My Portfolio</h2>

            {/* Upload Form */}
            <div className="card bg-base-100 shadow-xl mb-12">
                <div className="card-body">
                    <h3 className="card-title mb-4">Add New Project</h3>
                    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">Project Title</label>
                            <input {...register("title", { required: true })} type="text" placeholder="e.g. Modern Living Room Makeover" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">Project Image</label>
                            <input {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full" />
                        </div>
                        <div className="form-control md:col-span-2">
                            <label className="label">Description</label> <br />

                            <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-24" placeholder="Describe the work done..."></textarea>
                        </div>
                        <div className="form-control mt-4 md:col-span-2">
                            <button disabled={uploading} className="btn btn-primary text-white">
                                {uploading ? <span className="loading loading-spinner"></span> : 'Add to Portfolio'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolios.map(item => (
                    <div key={item._id} className="card bg-base-100 shadow-xl image-full group h-64">
                        <figure><img src={item.image} alt={item.title} className="w-full h-full object-cover" /></figure>
                        <div className="card-body opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                            <h2 className="card-title text-white text-xl">{item.title}</h2>
                            <p className="text-gray-200 text-sm">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPortfolio;
