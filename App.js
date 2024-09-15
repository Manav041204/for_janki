// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import ResidentHome from './components/ResidentHome';
import CommitteeHome from './components/CommitteeHome';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/home" element={<Home />} />
                <Route path="/resident_home" element={<ResidentHome />} />
                <Route path="/committee_home" element={<CommitteeHome />} />
            </Routes>
        </Router>
    );
};

export default App;