import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from './pages/PrivateRoute';

function App() {


return (
    <>
        <Router>
            <Routes>
                <Route path="/" element={<Register />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/Dashboard" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                  } />
                <Route path="*" element={<Register />} />
            </Routes>
        </Router>

    </>
)
}

export default App