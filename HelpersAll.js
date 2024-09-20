import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HelpersAll = () => {
    const [maidsData, setMaidsData] = useState({});
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
        const fetchMaids = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://localhost:8000/api/helpersAll/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setMaidsData(response.data);
            } catch (error) {
                setError('Failed to fetch maids.');
            }
        };

        fetchMaids();
    }, [resident]);

    function backPage(){
        navigate('/home');
    }

    return (
        <div>
            <h2>All maids present</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {Object.keys(maidsData).length === 0 ? (
                <p>No maids found.</p>
            ) : (
                Object.keys(maidsData).map(apartment => (
                    <div key={apartment}>
                        <h3>Apartment Number: {apartment}</h3>
                        <ul>
                            {maidsData[apartment].map((maid, index) => (
                                <li key={index}>
                                    {maid.name} - {maid.job} (Phone: {maid.phone_number})
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

export default HelpersAll;
