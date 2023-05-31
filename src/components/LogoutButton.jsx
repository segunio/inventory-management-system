import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8400/logout');
      console.log(response.data.message);

      // Perform any necessary client-side logout logic here
      // For example, clear session or token
      // Update the user authentication status

      // After logout logic, navigate to the homepage
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Logout Button</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogoutButton;
