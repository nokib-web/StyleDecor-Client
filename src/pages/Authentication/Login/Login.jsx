import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const {signInUser, forgotPassword}= useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = data => {
        console.log('login data', data);
        signInUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            navigate(location?.state || '/', {replace: true});
            console.log(user);
        })
        .catch(error => {
            console.log(error.message);
        });
    }

    const handleForgotPassword = () => {
        const email = prompt("Please enter your email for password reset:");
        if (email) {
            forgotPassword(email)
            .then(() => {
                alert("Password reset email sent!");
            })
            .catch(error => {
                console.log(error.message);
            });
        }
    }

    return (
        <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
            <h1 className='text-3xl text-center mt-5 font-bold text-secondary'>Welcome Back</h1>
            <form onSubmit={handleSubmit(handleLogin)} className="card-body">
                <h1 className="text-xl font-bold text-secondary text-center">Please Login</h1>
                <fieldset className="fieldset">
                    {/* email */}
                    <label className="label">Email</label>
                    <input type="email" {...register("email", { required: true })} className="input" placeholder="Email" />
                    {errors.email?.type === "required" && <span className="text-red-600">Email is required</span>}


                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password" {...register("password", { required: true })} className="input" placeholder="Password" />
                    {errors.password?.type === "required" && <span className="text-red-600">Password is required</span>}
                    {errors.password?.type === "minLength" && <span className="text-red-600">Password must be 6 characters or longer</span>}


                    <div><a onClick={handleForgotPassword} className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p>New to StyleDecor? <Link state={location.state}  to="/register" className="link text-blue-800 link-hover">Register here</Link></p>
            </form>
            <SocialLogin />
        </div>
    );
};

export default Login;