import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import Home from '../src/components/Home/Home';
import RequestsList from './components/RequestsList/RequestsList';
import GuestsList from './components/GuestsList/GuestsList';
import GhostsList from './components/GhostsList/GhostsList';
import Navbar from './components/Navbar/Navbar';
import { Link } from 'react-router-dom';


const App = () => {
  const [guests, setGuests] = useState([]);
  const [ghosts, setGhosts] = useState([]);

  // fetch guests (registered and unregistered)
  useEffect(() => {
    // make sure this goes to the back end, not the front end!!
    fetch('http://localhost:8000/api/guests/')
      .then((response) => response.json())
      .then((data) => setGuests(data))
      .catch((error) => {
        console.error('Error fetching guests:', error);
      });
  }, []); 

  // fetch ghosts
  useEffect(() => {
    fetch('http://localhost:8000/api/ghosts/')
      .then((response) => response.json())
      .then((data) => setGhosts(data))
      .catch((error) => {
        console.error('Error fetching ghosts:', error);
      });
  }, []);
  

  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={ <h2> This is a map of the hotel. </h2> }/>
      <Route path="/requests-list" element={<RequestsList />} />
      <Route path="/guests-list" element={<GuestsList guests={guests}/>} />
      <Route path="/ghosts-list" element={<GhostsList ghosts={ghosts}/>} />
    </Routes>
    </>
  );
}

export default App;

