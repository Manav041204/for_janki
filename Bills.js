import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Bills = () => {
    const [resident, setResident] = useState([]);
    const [bills, setBills] = useState([]);
    const [success, setSuccess] = useState([]);
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

    const handleAddBill = () => {
        navigate('/addBill');
    };

    // useEffect(() => {
    //     const fetchBills = async () => {
    //         const token = localStorage.getItem('access_token');
    //         try {
    //             const response = await axios.get('http://localhost:8000/api/viewBills/', {
    //                 headers: { Authorization: `Bearer ${token}` }
    //             });
    //             setBills(response.data);
    //         } catch (error) {
    //             setError('Error fetching bills.');
    //         }
    //     };

    //     fetchBills();
    // }, [resident]);


    // const handleRemoveBill = async (id) => {
    //     const token = localStorage.getItem('access_token');
    //     try {
    //         await axios.delete(`http://localhost:8000/api/deleteBill/${id}/`, {
    //             headers: { Authorization: `Bearer ${token}` }
    //         });
    //         setMessage('Bill deleted successfully.');
    //         setBills(bills.filter(bill => bill.id !== id));
    //     } catch (error) {
    //         setMessage('Error deleting bill.');
    //     }
    // };

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://localhost:8000/api/viewBills/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBills(response.data);
            } catch (error) {
                setError('Failed to fetch bills.');
            }
        };

        fetchBills();
    }, []);

    const handleRemoveBill = async (id) => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.delete(`http://localhost:8000/api/deleteBill/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setBills(bills.filter((bill) => bill.id !== id));
            setSuccess('Bill deleted successfully!');
            setError(null);
        } catch (error) {
            setError('Failed to delete bill.');
        }
    };

    // const handleViewHelper = () => {
    //     navigate('/viewHelper');
    // };

    const handleBackToHome = () => {
        navigate('/home');
    };

    return (
        <div>
            <h2>Your Bills</h2>

            <button onClick={handleAddBill}>Add bills</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <ul>
                {bills.map((bill) => (
                    <li key={bill.id}>
                        {bill.bill_type} - ₹{bill.amount} (Due: {bill.due_date})
                        <button onClick={() => handleRemoveBill(bill.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleBackToHome}>Back Home</button>
        </div>
    );
};

export default Bills;
