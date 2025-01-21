import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./components/login";
import Register from "./components/register";
import ExpenseTracker from "./components/ExpenseTracker";
import UserProfile from "./components/userprofile";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tracker" element={<ExpenseTracker/>}/>
        <Route path="/user-profile" element={<UserProfile />}/>

      </Routes>
    </Router>
  );
};

export default App;
