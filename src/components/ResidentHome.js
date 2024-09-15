// ResidentHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResidentHome = () => {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login'); // Redirect to login page
    };
    return (
        <div>
            <h1>Welcome to the Resident Home</h1>
            <button onClick={handleLogout}>Logout</button>
            {/* Resident-specific content */}
        </div>
    );
};

export default ResidentHome;