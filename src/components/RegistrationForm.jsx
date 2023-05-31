import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationForm.css'; // Import the CSS file

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8400/users/register', {
        username,
        email,
        password
      });

      setMessage(response.data.message);
      setUsername('');
      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      setMessage('');
      setError(error.response.data.error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="registration-form-container">
      <h2>Registration Form</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleRegistration}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
      <Link to="/" className="homepage-link">Go to Homepage</Link>
    </div>
  );
};

export default RegistrationForm;
