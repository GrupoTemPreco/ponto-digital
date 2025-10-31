// utils/axiosInterceptor.js
import axios from 'axios';

export default function setupAxiosInterceptors(getToken) {
  axios.defaults.baseURL =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

  axios.interceptors.request.use((config) => {
    const token =
      (typeof getToken === 'function' && getToken()) ||
      (typeof window !== 'undefined' && localStorage.getItem('token'));
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  axios.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err?.response?.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // window.location.href = '/login'; // se quiser redirecionar ao login
      }
      return Promise.reject(err);
    }
  );
}