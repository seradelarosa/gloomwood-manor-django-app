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
  const [guests, setGuests] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const fetchData = async () => {
    try {
      // Fetch guests
      const guestsResponse = await fetch('http://localhost:8000/api/guests/');
      const guestsData = await guestsResponse.json();
      setGuests(guestsData);

      // Fetch rooms
      const roomsResponse = await fetch('http://localhost:8000/api/rooms/');
      const roomsData = await roomsResponse.json();
      setRooms(roomsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // initial fetch and set up refresh interval
  useEffect(() => {
    fetchData();

    // refresh data every 5 seconds
    const intervalId = setInterval(() => {
      setLastUpdate(Date.now());
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // fetch data when lastUpdate changes
  useEffect(() => {
    fetchData();
  }, [lastUpdate]);

  return (
    <GhostProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home guests={guests} rooms={rooms}/>}/>
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

