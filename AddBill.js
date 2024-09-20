import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBill = () => {
    const [resident, setResident] = useState([]);
    const [billType, setBillType] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [success, setSuccess] = useState(null);
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

    const handleAddBill = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                'http://localhost:8000/api/addBill/',
                {
                    bill_type: billType,
                    amount: amount,
                    description: description,
                    due_date: dueDate
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setSuccess('Bill added successfully!');
            setError(null);
            // Clear the form
            setBillType('');
            setAmount('');
            setDescription('');
            setDueDate('');
        } catch (err) {
            setError('Failed to add bill.');
            setSuccess(null);
        }
    };

    function handleBack(){
        navigate('/bills')
    }

    return (
        <div>
            <h2>Add a New Bill in {resident.name}'s House</h2>
            {success && <p style={{ color: 'green' }}>{success}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleAddBill}>
                <div>
                    <label>Bill Type:</label>
                    <input
                        type="text"
                        value={billType}
                        onChange={(e) => setBillType(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Due Date:</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add Bill</button>
            </form>
            <button onClick={handleBack}></button>
        </div>
    );
};

export default AddBill;
