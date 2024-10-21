import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Image } from 'react-bootstrap';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      const { data } = await axios.get('/api/admin/submissions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSubmissions(data);
    };
    fetchSubmissions();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Social Media Handle</th>
          <th>Images</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission, idx) => (
          <tr key={idx}>
            <td>{submission.name}</td>
            <td>{submission.socialHandle}</td>
            <td>
              {submission.images.map((image, imgIdx) => (
                <Image key={imgIdx} src={image} thumbnail />
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminDashboard;
