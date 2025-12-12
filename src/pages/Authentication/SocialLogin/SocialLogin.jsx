// src/components/SocialLogin.jsx
import React from 'react';
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
    <div className='text-center mb-4 '>
      <p className='mb-2'>Or</p>
      <button onClick={handleGoogleLogin} className="btn px-4 py-2 bg-white text-black border-[#e5e5e5]">
        {/* SVG and text */}
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
