import React, { createContext, useContext, useState, useEffect, useRef } from "react";

// create ghost context for global state
const GhostContext = createContext();
export const useGhosts = () => useContext(GhostContext);

// GhostProvider component
export const GhostProvider = ({ children }) => {
  const [ghosts, setGhosts] = useState([]);
  const [rooms, setRooms] = useState([]);
  const isUpdating = useRef(false);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // update ghost assignments in the backend
  const updateGhostAssignments = async (assignments) => {
    if (isUpdating.current) {
      console.log('Update already in progress, skipping...');
      return;
    }
    
    isUpdating.current = true;
    console.log('Updating ghost assignments in the backend:');
    
    try {
      // order assignments in sequential order
      for (const [roomId, ghost] of Object.entries(assignments)) {
        
        const response = await fetch(`https://gloomwood-manor-6a698e38105d.herokuapp.com/api/ghosts/${ghost.id}/`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            assigned: parseInt(roomId)
          }),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to update ghost ${ghost.name} to room ${roomId}: ${response.status} ${response.statusText}`);
        }
        
        const updatedGhost = await response.json();
        console.log(`Successfully updated ghost ${ghost.id} (${ghost.name}) to room ${roomId}:`, updatedGhost);
        
        // delay between updates to ensure order
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      console.log('Successfully completed all ghost assignments');
      
      // fetch the updated ghosts after all assignments are complete
      const finalResponse = await fetch("https://gloomwood-manor-6a698e38105d.herokuapp.com/api/ghosts/");
      if (!finalResponse.ok) {
        throw new Error("Failed to fetch updated ghosts");
      }
      const updatedGhosts = await finalResponse.json();
      setGhosts(updatedGhosts);
      
    } catch (error) {
      console.error('Error updating ghost assignments:', error);
    } finally {
      isUpdating.current = false;
    }
  };

  // assign ghosts to rooms
  const assignGhostsToRooms = async (shuffledGhosts) => {
    // create a map of room assignments
    const roomAssignments = {};

    // assign each ghost to a room in order
    shuffledGhosts.forEach((ghost, index) => {
      const roomId = index + 1; // room IDs are 1-7
      roomAssignments[roomId] = ghost;
    });

    // log the room assignments
    console.log("Room Assignments:");
    for (let roomId = 1; roomId <= 7; roomId++) {
      const ghost = roomAssignments[roomId];
      console.log(`Room ${roomId}: ${ghost ? ghost.name : "No ghost assigned"}`);
    }

    // WAIT FOR BACKEND UPDATES TO COMPLETE!!! 
    await updateGhostAssignments(roomAssignments);

    return roomAssignments;
  };

  // fetch ghosts
  const fetchGhosts = async () => {
    if (isUpdating.current) {
      console.log('Update in progress, skipping fetch...');
      return;
    }

    try {
      const response = await fetch("https://gloomwood-manor-6a698e38105d.herokuapp.com/api/ghosts/");
      if (!response.ok) {
        throw new Error("Failed to fetch ghosts");
      }
      const data = await response.json();
      console.log("Fetched ghosts:", data);

      // Shuffle the ghosts after fetching
      const shuffledGhosts = shuffleArray(data);
      console.log("Shuffled ghosts:", shuffledGhosts);

      // wait for assignments to complete..
      await assignGhostsToRooms(shuffledGhosts);
      
      // don't need to set ghosts here anymore since it's done in updateGhostAssignments?
    } catch (error) {
      console.error("Error fetching ghosts:", error);
    }
  };

  // get ghosts when component mounts
  useEffect(() => {
    fetchGhosts();
    
    // Set up timer to shuffle every 2 minutes
    const timer = setInterval(() => {
      console.log("2 minutes passed, shuffling ghosts...");
      fetchGhosts();
    }, 120000); // 120000 ms = 2 minutes
    
    // Clean up timer on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <GhostContext.Provider value={{ ghosts, rooms }}>
      {children}
    </GhostContext.Provider>
  );
};
