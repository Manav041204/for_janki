import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResidentApartment = () => {
    const [people, setPeople] = useState([]);
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
        const fetchPeople = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://localhost:8000/api/residentSameApartment/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPeople(response.data);
                setError(null); // Clear any previous errors
            } catch (error) {
                setError('Failed to fetch people in this apartment.');
                setPeople([]); // Clear previous results
            }
        };

        fetchPeople();
    }, [resident]);

    function backPage(){
        navigate('/home');
    }

    return (
        <div>
            <h2>People in Your Apartment</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {people.length > 0 ? (
                <ul>
                    {people.map((user, index) => (
                        <li key={index}>
                            {user.name} (Phone: {user.phone_number}) - {user.role}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No one found in your apartment.</p>
            )}
            <button onClick={backPage}>Back</button>
        </div>
    );
};

export default ResidentApartment;
