// src/hooks/useAxiosSecure.js
import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        if ((status === 401 || status === 403) && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = localStorage.getItem('refreshToken');

          if (!refreshToken) {
            await signOutUser();
            navigate('/login');
            return Promise.reject(error);
          }

          try {
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            // Send refresh token in body
            const res = await axios.post(`${baseURL}/auth/refresh-token`, { refreshToken });
            if (res.data.accessToken) {
              localStorage.setItem('accessToken', res.data.accessToken);
              // Retry original request with new token
              originalRequest.headers.authorization = `Bearer ${res.data.accessToken}`;
              return axiosSecure(originalRequest);
            }
          } catch (refreshError) {
            console.error('refresh failed', refreshError);
            await signOutUser();
            navigate('/login');
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [signOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
