import React, { useState, useEffect } from "react";

const GhostsList = ({ ghosts = [] }) => {
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
                  <p>
                    Check-In Time:{' '}
                    {ghost.check_in_time
                      ? new Date(ghost.check_in_time).toLocaleString()
                      : 'Not checked in'}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      );
    };

export default GhostsList;