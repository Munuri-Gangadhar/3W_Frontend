import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/dashboard`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(data);
            } catch (error) {
                alert('Error fetching data: ' + error.response?.data?.message || error.message || 'Something went wrong');
            }
        };
        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        alert('Logged out successfully');
        navigate('/admin/login');
    };

    return (
        <div className="dashboard">
            <h2>Admin Dashboard</h2>
            {users.length === 0 ? (
                <p>No submissions yet</p>
            ) : (
                users.map((user) => (
                    <div key={user._id} className="user-card">
                        <h4>{user.name}</h4>
                        <p>{user.socialMediaHandle}</p>
                        {user.images.map((image, idx) => (
                            <img key={idx} src={`${process.env.REACT_APP_BACKEND_URL}${image}`} alt="Uploaded" />
                        ))}
                    </div>
                ))
            )}
            <nav>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </nav>
        </div>
    );
};

export default AdminDashboard;
