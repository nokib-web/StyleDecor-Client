import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const UserProfile = () => {
    const { user } = useAuth();
    const { role } = useRole();

    return (
        <div className="flex justify-center items-center h-full">
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={user?.photoURL} alt="Profile" className="rounded-xl w-24 h-24 object-cover" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{user?.displayName}</h2>
                    <p className="text-gray-500">{user?.email}</p>
                    <div className="badge badge-primary uppercase mt-2">{role}</div>
                    <div className="card-actions mt-4">
                        <button className="btn btn-sm btn-outline">Edit Profile</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
