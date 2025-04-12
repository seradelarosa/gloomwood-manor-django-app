import React, { createContext, useContext, useState, useEffect } from 'react';

// create ghost context so the ghost data is global
const GhostContext = createContext();
export const useGhosts = () => useContext(GhostContext);

// randomize ghost assignments to rooms
const randomizeGhostAssignments = (ghosts, rooms) => {
  // make copy of ghosts array to avoid modifying the original
  const availableGhosts = [...ghosts];
  
  const assignments = [];
  
  // assign one ghost to each room randomly
  rooms.forEach((room) => {
    // get random ghost from available ghosts
    const randomIndex = Math.floor(Math.random() * availableGhosts.length);
    const selectedGhost = availableGhosts[randomIndex];
    
    // remove selected ghost from available pool
    availableGhosts.splice(randomIndex, 1);
    
    // add assignment
    assignments.push({
      ghostId: selectedGhost.id,
      roomId: room.id
    });
  });

  return assignments;
};

// send updated ghost assignment to the backend
const updateGhostAssignment = async (ghostId, roomId) => {
  try {
    const response = await fetch(`http://localhost:8000/api/ghosts/${ghostId}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ assigned: roomId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update ghost ${ghostId}`);
    }

    const updatedGhost = await response.json();
    return updatedGhost;
  } catch (error) {
    console.error('Error updating ghost:', error);
    throw error;
  }
};

// define context provider so any child components can access global ghost state useGhosts()
export const GhostProvider = ({ children }) => {
  const [ghosts, setGhosts] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [lastShuffleTime, setLastShuffleTime] = useState(Date.now());

  // Fetch all ghosts from backend
  const fetchGhosts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/ghosts/');
      const data = await response.json();
      setGhosts(data);
    } catch (error) {
      console.error('Error fetching ghosts:', error);
    }
  };

  // fetch real room data from backend
  useEffect(() => {
    fetch('http://localhost:8000/api/rooms/')
      .then((res) => res.json())
      .then((data) => setRooms(data))
      .catch((err) => console.error('Error fetching rooms:', err));

    // Initial ghost fetch
    fetchGhosts();
  }, []);

  // set up initial ghost data and shuffle
  useEffect(() => {
    if (rooms.length !== 7) return;

    const shuffleGhosts = async () => {
      try {
        const shuffledAssignments = randomizeGhostAssignments(ghosts, rooms);
        
        // Update each ghost's room assignment
        for (const { ghostId, roomId } of shuffledAssignments) {
          await updateGhostAssignment(ghostId, roomId);
        }

        // Fetch updated ghost data
        await fetchGhosts();
        
        setLastShuffleTime(Date.now());
      } catch (error) {
        console.error('Error shuffling ghosts:', error);
      }
    };

    // Initial shuffle
    shuffleGhosts();

    // Set up interval for shuffling
    const intervalId = setInterval(shuffleGhosts, 120000);

    return () => clearInterval(intervalId);
  }, [rooms, ghosts.length]);

  return (
    <GhostContext.Provider value={{ ghosts, lastShuffleTime }}>
      {children}
    </GhostContext.Provider>
  );
};
