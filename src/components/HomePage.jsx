import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State variable to track authentication status

  // Function to handle user sign out
  const handleSignOut = () => {
    // Perform sign out logic here
    setIsAuthenticated(false);
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-dark bg-primary">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Inventory Management System
          </Link>
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/add" className="nav-link">
                    Add Items
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/items" className="nav-link">
                    Items
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger" onClick={handleSignOut}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/items" className="nav-link">
                    Items
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <div className="container-fluid content">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-6">
            <h2>Welcome to Inventory Management System</h2>
            <p className="lead">
              This is a system that will be used to manage items. It allows authenticated or registered users to access the system.
            </p>
            <p className="lead">You can:</p>
            <ul className="lead">
              <li>Add a new item</li>
              <li>Edit/update an item</li>
              <li>Delete an item</li>
            </ul>
            {isAuthenticated ? (
              <div className="d-flex justify-content-center mt-5">
                <Link to="/add" className="btn btn-primary me-3">
                  Add items
                </Link>
                <Link to="/items" className="btn btn-secondary me-3">
                  Items
                </Link>
                <button className="btn btn-danger" onClick={handleSignOut}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex justify-content-center mt-5">
                <Link to="/login" className="btn btn-primary me-3">
                  Login
                </Link>
                <Link to="/register" className="btn btn-secondary">
                  Register
                </Link>
                <Link to="/items" className="btn btn-secondary">
                  Items
                </Link>
                <Link to="/logout" className="btn btn-secondary">
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
