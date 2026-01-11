import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../hooks/useAuth';


const Login = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { signInUser, forgotPassword } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);
    const [loginError, setLoginError] = React.useState('');

    const handleLogin = data => {
        setLoginError('');
        setLoading(true);
        signInUser(data.email, data.password)
            .then(result => {
                setLoading(false);
                navigate(location?.state?.from || '/', { replace: true });
            })
            .catch(error => {
                setLoading(false);
                if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
                    setLoginError('Invalid email or password');
                } else {
                    setLoginError(error.message);
                }
            });
    }

    const fillDemo = (role) => {
        if (role === 'admin') {
            setValue('email', 'admin@gmail.com');
            setValue('password', '!QAZ1qaz');
        } else if (role === 'decorator') {
            setValue('email', 'decorator@styledecor.com');
            setValue('password', '!QAZ1qaz');
        } else {
            setValue('email', 'user@styledecor.com');
            setValue('password', '!QAZ1qaz');
        }
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
        <div className="min-h-[80vh] flex items-center justify-center bg-base-200/50 py-12 px-4">
            <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl border border-base-200 rounded-3xl overflow-hidden">
                <div className="bg-primary p-8 text-white text-center">
                    <h1 className='text-3xl font-black tracking-tight'>Welcome Back</h1>
                    <p className="mt-2 opacity-80 font-medium">Please login to access your account</p>
                </div>

                <form onSubmit={handleSubmit(handleLogin)} className="card-body p-8">
                    <div className="space-y-4">
                        {/* email */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-bold">Email Address</span>
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
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <input
                                type="password"
                                {...register("password", { required: "Password is required" })}
                                className={`input input-bordered focus:input-primary bg-base-200/50 border-none rounded-xl h-12 ${errors.password ? 'input-error' : ''}`}
                                placeholder="••••••••"
                            />
                            {errors.password && <span className="text-error text-xs mt-1 font-medium">{errors.password.message}</span>}
                        </div>

                        <div className="flex justify-end">
                            <button type="button" onClick={handleForgotPassword} className="link link-hover text-xs font-bold text-primary">Forgot password?</button>
                        </div>

                        <button className="btn btn-primary w-full h-12 rounded-xl text-white font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all" disabled={loading}>
                            {loading ? <span className="loading loading-spinner"></span> : "Sign In"}
                        </button>

                        {loginError && <p className="text-error text-center text-sm font-medium animate-pulse">{loginError}</p>}
                    </div>

                    <div className="divider text-xs uppercase font-bold text-base-content/30 tracking-widest my-6">Demo Credentials</div>

                    <div className="grid grid-cols-3 gap-2 mb-2">
                        <button type="button" onClick={() => fillDemo('admin')} className="btn btn-outline btn-xs sm:btn-sm rounded-lg border-base-300 hover:bg-primary hover:border-primary font-bold px-1">
                            Admin
                        </button>
                        <button type="button" onClick={() => fillDemo('decorator')} className="btn btn-outline btn-xs sm:btn-sm rounded-lg border-base-300 hover:bg-accent hover:border-accent font-bold px-1">
                            Decorator
                        </button>
                        <button type="button" onClick={() => fillDemo('user')} className="btn btn-outline btn-xs sm:btn-sm rounded-lg border-base-300 hover:bg-secondary hover:border-secondary font-bold px-1">
                            User
                        </button>
                    </div>

                    <div className="divider text-xs uppercase font-bold text-base-content/30 tracking-widest my-4">Or sign in with</div>
                    <SocialLogin />

                    <p className="text-center mt-6 text-base-content/60 text-sm">
                        New to StyleDecor? <Link state={location.state} to="/register" className="text-primary font-bold hover:underline">Create Account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;