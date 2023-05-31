import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Add.css"; // Import the CSS file

const Add = () => {
  const [item, setItem] = useState({
    name: "",
    description: "",
    quantity: "",
  });

  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setItem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8400/inventory/items/add", item);
      navigate("/items"); // Navigate to the items route after adding the item
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div className="add-item-form">
      <h1>Add New Item</h1>
      <input
        type="text"
        className="form-control"
        placeholder="Item name"
        name="name"
        onChange={handleChange}
      />
      <textarea
        rows={5}
        className="form-control"
        placeholder="Item description"
        name="description"
        onChange={handleChange}
      />
      <input
        type="number"
        className="form-control"
        placeholder="Item quantity"
        name="quantity"
        onChange={handleChange}
      />

      <button onClick={handleClick} className="btn btn-primary">
        Add
      </button>
      {error && <p>Something went wrong!</p>}
      <Link to="/items" className="see-all-items-link"> {/* Update the 'to' prop */}
        See all items
      </Link>
    </div>
  );
};

export default Add;
