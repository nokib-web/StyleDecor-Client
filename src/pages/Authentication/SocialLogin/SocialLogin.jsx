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
    <div className='text-center mb-4 px-8'>
      <div className="divider">OR</div>
      <button onClick={handleGoogleLogin} className="btn w-full btn-outline flex items-center justify-center gap-2 hover:bg-base-200 hover:text-black">
        <FcGoogle className='text-xl' />
        Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;
