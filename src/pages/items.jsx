import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './styles.css';

const Items = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:8400/inventory/items", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8400/inventory/items/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setUser("");
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8400/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.username);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container">
      <h1>Items</h1>
      <div className="d-flex justify-content-between align-items-center mb-3">
        {user && <p>Signed in as {user}</p>}
        <div>
          <Link to="/" className="btn btn-primary me-2">
            Homepage
          </Link>
          {user && (
            <button onClick={handleLogout} className="btn btn-danger">
              Logout
            </button>
          )}
        </div>
      </div>
      <Link to="/add" className="btn btn-primary mb-3">
        Add Item
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>
                <Link to={`/update/${item.id}`} className="btn btn-primary me-2">
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Items;
