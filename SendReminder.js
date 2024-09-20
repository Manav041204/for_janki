// SendReminder.js
import React, { useState } from 'react';
import axios from 'axios';

const SendReminder = () => {
    const [message, setMessage] = useState('');

    const handleSend = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.post('http://localhost:8000/api/sendReminder/', {
                message
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Reminder sent to all residents!');
        } catch (error) {
            console.error('Error sending reminder:', error);
        }
    };

    return (
        <div>
            <h2>Send Reminder</h2>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter reminder message"
            />
            <button onClick={handleSend}>Send Reminder</button>
        </div>
    );
};

export default SendReminder;
