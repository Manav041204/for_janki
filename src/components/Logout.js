// Logout.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api-control/axiosInstance';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axiosInstance.post('logout/', {});
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;