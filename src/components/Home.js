// Home.js
import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHomeData = async () => {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                navigate('/login'); // Redirect to login if no token
                return;
            }

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/home', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // Include JWT token
                    },
                });
                if (response.data.redirect) {
                    navigate(`/${response.data.redirect}`); // Redirect to the appropriate home page
                }
            } catch (error) {
                console.error(error);
                alert('Error fetching home data');
            }
        };

        fetchHomeData();
    }, [navigate]);

    const handleLogout = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;