import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const UserSubmissionForm = () => {
  const [name, setName] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [images, setImages] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialHandle', socialHandle);
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i]);
    }
    await axios.post('/api/users/submit', formData);
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="socialHandle">
        <Form.Label>Social Media Handle</Form.Label>
        <Form.Control type="text" value={socialHandle} onChange={(e) => setSocialHandle(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="images">
        <Form.Label>Upload Images</Form.Label>
        <Form.Control type="file" multiple onChange={(e) => setImages(e.target.files)} />
      </Form.Group>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default UserSubmissionForm;
