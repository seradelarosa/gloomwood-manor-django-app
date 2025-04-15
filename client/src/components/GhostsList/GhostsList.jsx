import React, { useState, useEffect } from "react";

const GhostsList = () => {
  const [ghosts, setGhosts] = useState([]);

  // fetch ghosts
  useEffect(() => {
    const fetchGhosts = async () => {
      try {
        const response = await fetch('https://gloomwood-manor-6a698e38105d.herokuapp.com/api/ghosts/');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ghosts: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fetched ghosts:', data);
        setGhosts(data);
      } catch (err) {
        console.error('Error fetching ghosts:', err);
      }
    };

    fetchGhosts();
  }, []);

  return (
    <div>
      <h1>Ghosts</h1>
      
      {ghosts.length === 0 ? (
        <p>No ghosts found.</p>
      ) : (
        <ul>
          {ghosts.map((ghost) => (
            <li key={ghost.id}>
              <h2>{ghost.name}</h2>
              <p>Type: {ghost.ghost_type}</p>
              <p>Assigned Room: {ghost.assigned ? `Room ${ghost.assigned}` : 'Unassigned'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GhostsList;