
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Items from "./pages/items";  // Update the import statement to use lowercase "items"
import Add from "./pages/Add";
import Update from "./pages/Update";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";
import HomePage from './components/HomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/items" element={<Items />} />
        <Route path="/add" element={<Add />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/logout" element={<LogoutButton />} />
      </Routes>
    </Router>
  );
};

export default App;
