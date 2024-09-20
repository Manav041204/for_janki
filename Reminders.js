// SendReminder.js
import React, { useState } from 'react';
import axios from 'axios';

const Reminders = () => {
    const [message, setMessage] = useState('');
    const [reminders, setReminders] = useState([]);
    const [error, setError] = useState(null);

    const handleSend = async () => {
        try {
            const token = localStorage.getItem('access_token');
            await axios.post('http://localhost:8000/api/sendReminder/', {
                message
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Reminder sent to all residents!');
            setMessage('')
        } catch (error) {
            console.error('Error sending reminder:', error);
        }
    };


    
    useEffect(() => {
        const fetchReminders = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get('http://localhost:8000/api/viewReminders/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const unviewedReminders = [];
                for (const reminder of response.data) {
                    if (!reminder.viewed) {
                        unviewedReminders.push(reminder);
                        await axios.patch(`http://localhost:8000/api/reminders/${reminder.id}/markViewed/`, {}, {
                            headers: { Authorization: `Bearer ${token}` }
                        });
                    }
                }

                setReminders(unviewedReminders);
            } catch (error) {
                setError('Failed to fetch reminders.');
            }
        };

        fetchReminders();
    }, []);

    return (
        <div>
            <h2>Send Reminder</h2>
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter reminder message"
            />
            <button onClick={handleSend}>Send Reminder</button>

            {reminders.length > 0 ? (
                <div>
                    <h3>Reminders:</h3>
                    <ul>
                        {reminders.map(reminder => (
                            <li key={reminder.id}>
                                {reminder.message} (sent on {new Date(reminder.created_at).toLocaleDateString()})
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>No new reminders.</p>
            )}
        </div>
    );
};

export default Reminders;
