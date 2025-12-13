import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';



const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const { registerUser, updateUserProfile } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()
    const [registrationError, setRegistrationError] = React.useState('');

    const handleRegistration = data => {
        setRegistrationError('');

        // console.log('after register', data.photo[0]);
        const profileImage = data.photo[0];

        // console.log(data)

        registerUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);


                //1 store image in imgBB or cloudinary and get the url
                const formData = new FormData();
                formData.append('image', profileImage);


                // 2 upload image to imgBB
                axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`, formData)
                    .then(imgResponse => {
                        if (imgResponse.data.success) {
                            const photoURL = imgResponse.data.data.url;
                            // create user in the database
                            const userInfo = {
                                email: data.email,
                                displayName: data.name,
                                photoURL: photoURL,
                                referralCodeInput: data.referralCode,
                            }
                            axiosSecure.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        console.log('user created in the database',)
                                    }
                                })

                            // 1: update user profile with name and photo to firebase
                            const userProfile = {
                                displayName: data.name,
                                photoURL: photoURL
                            }
                            updateUserProfile(userProfile)
                                .then(() => { })
                                .catch(err => console.log('profile update error', err));
                            // 2: navigate to home page after successful registration and profile update
                            navigate(location?.state || '/', { replace: true });
                            console.log('image url', photoURL);
                        }
                    })
                    .catch(err => {
                        console.log('image upload error', err);
                    });



            })
            .catch(error => {
                console.error(error);
                if (error.code === 'auth/email-already-in-use') {
                    setRegistrationError('This email is already in use. Please try another one.');
                } else {
                    setRegistrationError(error.message);
                }
            });
    }



    return (
        <div className='card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl'>
            <h1 className='text-3xl text-center mt-8 font-bold  text-secondary'>Welcome to StyleDecor</h1>
            <h1 className="text-xl font-bold text-secondary text-center">Please Register</h1>
            <form className='card-body' onSubmit={handleSubmit(handleRegistration)}>
                <fieldset className="fieldset">


                    {/* name */}
                    <label className="label">Name</label>
                    <input type="text" {...register("name", { required: true })} className="input" placeholder="Name" />
                    {errors.name?.type === "required" && <span className="text-red-600">Name is required</span>}
                    {/* photo */}
                    <label className="label">Image</label>
                    <input type="file" {...register("photo", { required: true })} className="file-input" placeholder="Your Image" />
                    {errors.photo?.type === "required" && <span className="text-red-600">Photo  is required</span>}

                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === "required" && <span className="text-red-600">Email is required</span>}

                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password" {...register("password", { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).*$/ })} className="input" placeholder="Password" />
                    {errors.password?.type === "required" && <span className="text-red-600">Password is required</span>}
                    {errors.password?.type === "minLength" && <span className="text-red-600">Password must be 6 characters or longer</span>}
                    {errors.password?.type === "pattern" && <span className="text-red-600">Password must have one uppercase, one number and one special character</span>}

                    {/* referral (optional) */}
                    <label className="label">Referral Code (Optional)</label>
                    <input type="text" {...register("referralCode")} className="input" placeholder="Referral Code" />


                    <button className="btn btn-neutral mt-4">Register</button>
                    {registrationError && <p className="text-red-600 text-center mt-2">{registrationError}</p>}
                </fieldset>
                <p>Already have an account? <Link state={location.state} to="/login" className="link text-blue-800 link-hover">Login here</Link></p>
            </form>
            <SocialLogin />
        </div>
    );
};

export default Register;