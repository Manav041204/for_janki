// SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        house_number: '',
        is_resident: false,
        is_committee: false,
        password_committee:'',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        if (name === 'is_committee' && checked) {
            setFormData({
                ...formData,
                is_committee: true,
                is_resident: false,  // Deselect resident if committee is checked
            });
        }

        if (name === 'is_resident' && checked) {
            setFormData({
                ...formData,
                is_resident: true,
                is_committee: false,  // Deselect committee if resident is checked
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.is_committee) {
                // const storedPassword = localStorage.getItem('committee_password');  // Password stored in localStorage
    
                if (formData.password_committee !== "12345678") {
                    // If password doesn't match, alert and ask them to sign in again
                    alert('Incorrect committee password. Please sign in again.');

                    // Optionally, you can reset the form or take them back to a login page
                    setFormData({
                    name: '',
                    email: '',
                    phoneNumber: '',
                    password: '',
                    house_number: '',
                    is_resident: false,
                    is_committee: false,
                    password_committee: ''
                });
                    return;  // Stop form submission
                }
            }
            // If password matches, remove password_committee from formData
            const { password_committee, ...finalFormData } = formData;
            await axios.post('http://127.0.0.1:8000/api/signup/', finalFormData);
            navigate('/login'); // Redirect to login after successful signup
    
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} value={formData.name} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} value={formData.phoneNumber} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} value={formData.password} required />
            <input type="text" name="house_number" placeholder="House Number" onChange={handleChange} value={formData.house_number} required />
            <label>
                <input
                    type="checkbox"
                    name="is_resident"
                    checked={formData.is_resident}
                    onChange={handleChange}
                /> Is Resident
            </label>
            <label>
                <input
                    type="checkbox"
                    name="is_committee"
                    checked={formData.is_committee}
                    onChange={handleChange}
                /> Is Committee
            </label>

            {formData.is_committee && (
                <div>Enter specific committee password given<input
                    type="password"
                    name="password_committee"
                    placeholder="Committee Password"
                    onChange={handleChange}
                    required
                /></div>
            )}
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignupForm;