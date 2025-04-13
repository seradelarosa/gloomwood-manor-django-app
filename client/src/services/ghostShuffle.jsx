import React, { createContext, useContext, useState, useEffect } from 'react';

// create ghost context for global state
const GhostContext = createContext();
export const useGhosts = () => useContext(GhostContext);

// GhostProvider component
export const GhostProvider = ({ children }) => {
  const [ghosts, setGhosts] = useState([]);
  const [rooms, setRooms] = useState([]);

  // fetch ghosts
  const fetchGhosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/ghosts/');
      if (!response.ok) {
        throw new Error('Failed to fetch ghosts');
      }
      const data = await response.json();
      console.log('Fetched ghosts:', data);
      setGhosts(data);
    } catch (error) {
      console.error('Error fetching ghosts:', error);
    }
  };

  // Fetch ghosts when component mounts
  useEffect(() => {
    fetchGhosts();
  }, []);

  return (
    <GhostContext.Provider value={{ ghosts, rooms }}>
      {children}
    </GhostContext.Provider>
  );
};
