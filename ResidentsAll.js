import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResidentsByApartment = () => {
    const [residentsData, setResidentsData] = useState({});
    const [resident, setResident] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('access_token');
                if (!token) {
                    throw new Error('No access token found');
                }

                const response = await axios.get('http://localhost:8000/api/getUser', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setResident(response.data)
            } catch (err) {
                setError(err.message);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchResidents = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://localhost:8000/api/residentsAll/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setResidentsData(response.data);
            } catch (error) {
                setError('Failed to fetch residents.');
            }
        };

        fetchResidents();
    }, [resident]);

    function backPage(){
        navigate('/home');
    }

    return (
        <div>
            <h2>Residents by Apartment</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {Object.keys(residentsData).length === 0 ? (
                <p>No residents found.</p>
            ) : (
                Object.keys(residentsData).map(apartment => (
                    <div key={apartment}>
                        <h3>Apartment Number: {apartment}</h3>
                        <ul>
                            {residentsData[apartment].map((user, index) => (
                                <li key={index}>
                                    {user.name} (Phone: {user.phone_number}) - {user.role}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
            <button onClick={backPage}>Back</button>
        </div>
    );
};

export default ResidentsByApartment;
