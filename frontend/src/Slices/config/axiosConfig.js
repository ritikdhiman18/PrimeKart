import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL || 'https://primekart.onrender.com',
    timeout: 5000,
    withCredentials: true,
});

export default axiosInstance;