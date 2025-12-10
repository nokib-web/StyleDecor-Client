import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';

const ManageServices = () => {
    const axiosSecure = useAxiosSecure();

    // Use public axios or secure axios depending on api definition, using public get for now logic but admin protected ops
    // Assuming we can fetch all services publicly
    const [page, setPage] = React.useState(0);
    const [limit, setLimit] = React.useState(10);

    const { data: serviceData = {}, refetch } = useQuery({
        queryKey: ['services', page, limit],
        queryFn: async () => {
            const res = await axiosSecure.get(`/services?page=${page}&limit=${limit}`);
            return res.data;
        },
        keepPreviousData: true
    });

    const services = serviceData.data || [];
    const total = serviceData.total || 0;
    const totalPages = Math.ceil(total / limit);

    const handleDeleteService = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/services/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire("Deleted!", "Your service has been deleted.", "success");
                        }
                    })
            }
        });
    };

    const [selectedService, setSelectedService] = React.useState(null);

    const handleUpdateService = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const price = parseFloat(form.price.value);
        const unit = form.unit.value;
        const image = form.image.value;
        const category = form.category.value;
        const description = form.description.value;

        const updatedDoc = {
            title,
            price,
            unit,
            image,
            category,
            description
        };

        axiosSecure.patch(`/services/${selectedService._id}`, updatedDoc)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    setSelectedService(null);
                    Swal.fire("Success", "Service updated successfully", "success");
                }
            });
    };

    return (
        <div className="w-full">
            <div className="flex justify-between items-center my-4">
                <h2 className="text-3xl font-semibold">Manage Services: {total}</h2>
                <a href="/dashboard/add-service" className="btn btn-primary btn-sm">+ Add Service</a>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Service Name</th>
                            <th>Cost</th>
                            <th>Unit</th>
                            <th>Category</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image || "https://placehold.co/100"} alt="Service Type" />
                                        </div>
                                    </div>
                                </td>
                                <td>{item.title}</td>
                                <td className="text-right">${item.price}</td>
                                <td>{item.unit || '-'}</td>
                                <td><span className="badge badge-ghost badge-sm">{item.category || 'General'}</span></td>
                                <td>
                                    <button
                                        onClick={() => setSelectedService(item)}
                                        className="btn btn-ghost bg-orange-500 text-white">
                                        <FaEdit></FaEdit>
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteService(item)}
                                        className="btn btn-ghost bg-red-600 text-white">
                                        <FaTrashAlt></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">
                    Showing {services.length} of {total} services (Page {page + 1} of {Math.max(1, totalPages)})
                </div>
                <div className="join">
                    <button
                        className="join-item btn btn-sm"
                        disabled={page === 0}
                        onClick={() => setPage(old => Math.max(0, old - 1))}
                    >
                        « Prev
                    </button>
                    <button className="join-item btn btn-sm bg-white cursor-default">Page {page + 1}</button>
                    <button
                        className="join-item btn btn-sm"
                        disabled={page + 1 >= totalPages}
                        onClick={() => setPage(old => old + 1)}
                    >
                        Next »
                    </button>
                </div>
            </div>

            {/* Update Service Modal */}
            {selectedService && (
                <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold mb-4">Update Service</h3>
                        <form onSubmit={handleUpdateService}>
                            <div className="form-control w-full mb-4">
                                <label className="label"><span className="label-text">Service Name</span></label>
                                <input type="text" name="title" defaultValue={selectedService.title} className="input input-bordered w-full" />
                            </div>
                            <div className="flex gap-4">
                                <div className="form-control w-full mb-4">
                                    <label className="label"><span className="label-text">Cost (BDT)</span></label>
                                    <input type="number" name="price" defaultValue={selectedService.price} className="input input-bordered w-full" />
                                </div>
                                <div className="form-control w-full mb-4">
                                    <label className="label"><span className="label-text">Unit</span></label>
                                    <input type="text" name="unit" defaultValue={selectedService.unit} className="input input-bordered w-full" />
                                </div>
                            </div>
                            <div className="form-control w-full mb-4">
                                <label className="label"><span className="label-text">Image URL</span></label>
                                <input type="text" name="image" defaultValue={selectedService.image} className="input input-bordered w-full" />
                            </div>
                            <div className="form-control w-full mb-4">
                                <label className="label"><span className="label-text">Category</span></label>
                                <select name="category" defaultValue={selectedService.category || 'default'} className="select select-bordered w-full">
                                    <option value="home">Home Decor</option>
                                    <option value="wedding">Wedding Decor</option>
                                    <option value="office">Office Decor</option>
                                    <option value="seminar">Seminar Decor</option>
                                    <option value="meeting">Meeting Decor</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-control w-full mb-6">
                                <label className="label"><span className="label-text">Description</span></label>
                                <textarea name="description" defaultValue={selectedService.description} className="textarea textarea-bordered h-24"></textarea>
                            </div>
                            <div className="flex justify-end gap-4">
                                <button type="button" onClick={() => setSelectedService(null)} className="btn btn-ghost">Cancel</button>
                                <button type="submit" className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageServices;
