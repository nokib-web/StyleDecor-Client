// src/components/SocialLogin.jsx
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import useAuth from '../../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithGoogle();
      const idToken = await result.user.getIdToken();

      // Send idToken to server to mint cookies & upsert user
      const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${baseURL}/auth/firebase-login`, { idToken }, { withCredentials: true });

      // optional: fetch profile or rely on server response role
      console.log('Login server response:', res.data);

      // redirect
      navigate(location?.state?.from || '/', { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='text-center mb-0'>
      <div className="divider text-[10px] uppercase font-bold text-base-content/20 tracking-[0.2em] my-6">Social Integration</div>
      <button
        onClick={handleGoogleLogin}
        className="btn w-full btn-outline border-base-300 hover:border-primary hover:bg-primary/5 hover:text-primary rounded-xl flex items-center justify-center gap-3 transition-all duration-300 font-bold h-12"
      >
        <FcGoogle className='text-2xl' />
        <span className="opacity-80">Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
