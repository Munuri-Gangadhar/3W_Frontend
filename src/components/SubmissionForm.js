import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles.css';

const SubmissionForm = () => {
    const [name, setName] = useState('');
    const [socialMediaHandle, setSocialMediaHandle] = useState('');
    const [images, setImages] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('socialMediaHandle', socialMediaHandle);
            images.forEach((image) => {
                formData.append('images', image);
            });

            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/user/upload`, formData);
            alert('Submission Successful');
        } catch (error) {
            alert('Error: ' + error.response?.data?.message || error.message || 'Something went wrong');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Submit Your Work</h2>
            <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Your Social Media Handle"
                value={socialMediaHandle}
                onChange={(e) => setSocialMediaHandle(e.target.value)}
            />
            <input
                type="file"
                multiple
                onChange={(e) => setImages([...e.target.files])}
            />
            <button type="submit">Submit</button>
            <Link to="/admin/login" className="link">Are you an admin? Login here</Link>
        </form>
    );
};

export default SubmissionForm;
