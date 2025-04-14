import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../src/components/Home/Home';
import RequestsList from './components/RequestsList/RequestsList';
import GuestsList from './components/GuestsList/GuestsList';
import GhostsList from './components/GhostsList/GhostsList';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import GuestDetail from './components/GuestDetail/GuestDetail';
import Navbar from './components/Navbar/Navbar';
import Login from './components/Login/Login';
import { Link } from 'react-router-dom';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div className="app-container">
      {isAuthenticated && <Navbar />}
      <div className="content-container">
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/requests-list" element={<RequestsList />} />
          <Route path="/register-guest" element={<RegistrationForm />} />
          <Route path="/guests-list" element={<GuestsList />} />
          <Route path="/guests/:id" element={<GuestDetail />} />
          <Route path="/ghosts-list" element={<GhostsList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

