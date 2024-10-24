import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, { username, password });
            localStorage.setItem('token', data.token);
            alert('Login Successful');
            navigate('/admin/dashboard');
        } catch (error) {
            alert('Login Failed: ' + error.response?.data?.message || error.message || 'Something went wrong');
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h2>Admin Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <Link to="/" className="link">Want to upload? Go to the submission form</Link>
        </form>
    );
};

export default AdminLogin;
