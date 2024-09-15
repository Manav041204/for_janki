// axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api/',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    },
});

export default axiosInstance;