// src/hooks/useAxiosSecure.js
import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

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

          if (isRefreshing) {
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            }).then(token => {
              originalRequest.headers.authorization = `Bearer ${token}`;
              return axiosSecure(originalRequest);
            }).catch(err => {
              return Promise.reject(err);
            });
          }

          originalRequest._retry = true;
          isRefreshing = true;

          const refreshToken = localStorage.getItem('refreshToken');

          if (!refreshToken) {
            isRefreshing = false; // Reset flag
            await signOutUser();
            navigate('/login');
            return Promise.reject(error);
          }

          try {
            const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const res = await axios.post(`${baseURL}/auth/refresh-token`, { refreshToken });

            if (res.data.accessToken) {
              const newToken = res.data.accessToken;
              localStorage.setItem('accessToken', newToken);

              axiosSecure.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
              originalRequest.headers.authorization = `Bearer ${newToken}`;

              processQueue(null, newToken);
              isRefreshing = false;

              return axiosSecure(originalRequest);
            }
          } catch (refreshError) {
            processQueue(refreshError, null);
            isRefreshing = false;
            await signOutUser();
            navigate('/login');
            return Promise.reject(refreshError);
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
