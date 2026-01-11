import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';



const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { registerUser, updateUserProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = React.useState(false);
    const [registrationError, setRegistrationError] = React.useState('');

    const handleRegistration = data => {
        setRegistrationError('');
        setLoading(true);

        const profileImage = data.photo[0];

        registerUser(data.email, data.password)
            .then(result => {
                const formData = new FormData();
                formData.append('image', profileImage);

                axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`, formData)
                    .then(imgResponse => {
                        if (imgResponse.data.success) {
                            const photoURL = imgResponse.data.data.url;
                            const userInfo = {
                                email: data.email,
                                displayName: data.name,
                                photoURL: photoURL,
                                referralCodeInput: data.referralCode,
                            }
                            axiosSecure.post('/users', userInfo);

                            const userProfile = {
                                displayName: data.name,
                                photoURL: photoURL
                            }
                            updateUserProfile(userProfile)
                                .then(() => {
                                    setLoading(false);
                                    navigate(location?.state || '/', { replace: true });
                                })
                                .catch(err => {
                                    setLoading(false);
                                    console.log('profile update error', err)
                                });
                        }
                    })
                    .catch(err => {
                        setLoading(false);
                        console.log('image upload error', err);
                    });
            })
            .catch(error => {
                setLoading(false);
                if (error.code === 'auth/email-already-in-use') {
                    setRegistrationError('This email is already in use. Please try another one.');
                } else {
                    setRegistrationError(error.message);
                }
            });
    }

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-base-200/50 py-12 px-4">
            <div className='card bg-base-100 w-full max-w-md shrink-0 shadow-2xl border border-base-200 rounded-3xl overflow-hidden'>
                <div className="bg-primary p-8 text-white text-center">
                    <h1 className='text-3xl font-black tracking-tight'>Join StyleDecor</h1>
                    <p className="mt-2 opacity-80 font-medium">Create your professional profile today</p>
                </div>

                <form className='card-body p-8' onSubmit={handleSubmit(handleRegistration)}>
                    <div className="space-y-4">
                        {/* name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-base">Full Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className={`input input-bordered focus:input-primary bg-base-200/50 border-none rounded-xl h-12 ${errors.name ? 'input-error' : ''}`}
                                placeholder="John Doe"
                            />
                            {errors.name && <span className="text-error text-xs mt-1 font-medium">{errors.name.message}</span>}
                        </div>

                        {/* photo */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-base">Profile Image</span>
                            </label>
                            <input
                                type="file"
                                {...register("photo", { required: "Photo is required" })}
                                className={`file-input file-input-bordered focus:file-input-primary bg-base-200/50 border-none rounded-xl w-full ${errors.photo ? 'file-input-error' : ''}`}
                            />
                            {errors.photo && <span className="text-error text-xs mt-1 font-medium">{errors.photo.message}</span>}
                        </div>

                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-base">Email Address</span>
                            </label>
                            <input
                                type="email"
                                {...register("email", { required: "Email is required" })}
                                className={`input input-bordered focus:input-primary bg-base-200/50 border-none rounded-xl h-12 ${errors.email ? 'input-error' : ''}`}
                                placeholder="name@example.com"
                            />
                            {errors.email && <span className="text-error text-xs mt-1 font-medium">{errors.email.message}</span>}
                        </div>

                        {/* password */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-base">Secure Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters" },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).*$/,
                                        message: "Must include Uppercase, Number & Symbol"
                                    }
                                })}
                                className={`input input-bordered focus:input-primary bg-base-200/50 border-none rounded-xl h-12 ${errors.password ? 'input-error' : ''}`}
                                placeholder="••••••••"
                            />
                            {errors.password && <span className="text-error text-xs mt-1 font-medium">{errors.password.message}</span>}
                        </div>

                        {/* referral (optional) */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold text-base">Referral Code <span className="opacity-50 font-normal">(Optional)</span></span>
                            </label>
                            <input
                                type="text"
                                {...register("referralCode")}
                                className="input input-bordered focus:input-primary bg-base-200/50 border-none rounded-xl h-10"
                                placeholder="STYLE-2024"
                            />
                        </div>

                        <button className="btn btn-primary w-full h-12 rounded-xl text-white font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all mt-6" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : "Create Account"}
                        </button>

                        {registrationError && <p className="text-error text-center text-sm font-medium animate-pulse">{registrationError}</p>}
                    </div>

                    <div className="divider text-xs uppercase font-bold text-base-content/30 tracking-widest my-6">Or register with</div>
                    <SocialLogin />

                    <p className="text-center mt-6 text-base-content/60 text-sm">
                        Already have an account? <Link state={location.state} to="/login" className="text-primary font-bold hover:underline">Sign In Instead</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;