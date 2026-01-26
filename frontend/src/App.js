import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Register from "./pages/Register";
import Map from "./pages/Map"
import Booking from "./pages/Booking";


function App() {
  return (
    <Router>
      <Routes>

        {/* DEFAULT ROUTE */}
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/map" element={<Map/>}/>
        <Route path="/booking" element={<Booking/>}/>
        

      </Routes>
    </Router>
  );
}

export default App;
