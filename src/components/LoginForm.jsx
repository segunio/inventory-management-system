import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './LoginForm.css'; // Custom CSS file

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8400/users/login', {
        username,
        password
      });

      setMessage(response.data.message);
      setUsername('');
      setPassword('');
      setError('');

      // Navigate to the items route after successful login
      navigate('/items');
    } catch (error) {
      setMessage('');
      setError(error.response.data.error);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h2 className="mt-5">Login Form</h2>
      {error && <p className="error-message">{error}</p>}
      {message && <p className="success-message">{message}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Username:</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">Login</button>
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
      </form>
      <Link to="/" className="mt-3">Go to Homepage</Link>
    </div>
  );
};

export default LoginForm;
