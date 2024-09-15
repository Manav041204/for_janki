// CommitteeHome.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommitteeHome = () => {
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <h1>Welcome to the Committee Home</h1>
            <button onClick={handleLogout}>Logout</button>
            {/* Committee-specific content */}
        </div>
    );
};

export default CommitteeHome;