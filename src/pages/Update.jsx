import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Update.css"; // Import the CSS file
//import "bootstrap/dist/css/bootstrap.css";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState({
    name: "",
    description: "",
    quantity: 0,
  });
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8400/inventory/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8400/inventory/items/${id}`, item);
      navigate("/items"); // Navigate to the item list route after updating the item
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="update-item-form">
      <h1>Update Item</h1>
      <input
        type="text"
        className="form-control"
        placeholder="Item name"
        name="name"
        value={item.name}
        onChange={handleChange}
      />
      <input
        type="text"
        className="form-control"
        placeholder="Item description"
        name="description"
        value={item.description}
        onChange={handleChange}
      />
      <input
        type="number"
        className="form-control"
        placeholder="Item quantity"
        name="quantity"
        value={item.quantity}
        onChange={handleChange}
      />

      <button onClick={handleClick} className="btn btn-primary">
        Update
      </button>
      {error && <p>Something went wrong!</p>}
      <Link to="/" className="cancel-link">
        Cancel
      </Link>
    </div>
  );
};

export default Update;
