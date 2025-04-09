import React, { useState, useEffect } from 'react';
import Home from '../src/components/Home/Home';
import RequestsList from './components/RequestsList/RequestsList';
import GuestsList from './components/GuestsList/GuestsList';


const App = () => {
  const [guests, setGuests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/guests/')
      .then((response) => response.json())
      .then((data) => setGuests(data))
      .catch((error) => {
        console.error('Error fetching guests:', error);
      });
  }, []); 

  return (
    <div>
      
        <RequestsList />
        <GuestsList guests={guests} />
      
      <Home /> 
      <h1>Here is the map</h1> 
    </div>
  );
}

export default App;

