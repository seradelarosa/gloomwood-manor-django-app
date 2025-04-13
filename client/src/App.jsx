import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Home from '../src/components/Home/Home';
import RequestsList from './components/RequestsList/RequestsList';
import GuestsList from './components/GuestsList/GuestsList';
import GhostsList from './components/GhostsList/GhostsList';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import GuestDetail from './components/GuestDetail/GuestDetail';
import Navbar from './components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import { GhostProvider } from './services/ghostShuffle';

const App = () => {

  return (
    <GhostProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/requests-list" element={<RequestsList />} />
        <Route path="/register-guest" element={<RegistrationForm />} />
        <Route path="/guests-list" element={<GuestsList />} />
        <Route path="/guests/:id" element={<GuestDetail />} />
        <Route path="/ghosts-list" element={<GhostsList />} />
      </Routes>
    </GhostProvider>
  );
}

export default App;

