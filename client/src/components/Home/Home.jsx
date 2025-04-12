import React, { useState, useEffect } from 'react';
import { useGhosts } from '../../services/ghostShuffle';
import HotelMap from '../HotelMap/HotelMap';

const Home = ({ guests, rooms }) => {
  const { ghosts, lastShuffleTime } = useGhosts();
  const [roomAssignments, setRoomAssignments] = useState([]);

  // get ghost assignments whenever ghosts change or shuffle occurs
  useEffect(() => {
    const fetchGhostAssignments = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/ghosts/');
        const ghostData = await response.json();
        setRoomAssignments(ghostData);
      } catch (error) {
        console.error('Error fetching ghost assignments:', error);
      }
    };

    fetchGhostAssignments();
    console.log('Ghost shuffle occurred at:', new Date(lastShuffleTime).toLocaleTimeString());
  }, [lastShuffleTime]); // re-fetch when ghost shuffle occurs

  return (
    <div>

      <HotelMap />

      <h2>Room Assignments</h2>
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <div className="room-grid">
          {rooms.map((room) => {
            // find the guest and ghost for this room
            const guest = guests.find((guest) => guest.assigned === room.id);
            const ghost = roomAssignments.find((ghost) => ghost.assigned === room.id);

            return (
              <div key={room.id} className="room-card">
                <h3>Room {room.room_number}</h3>
                <p>
                  Guest: {guest ? `${guest.full_name}` : 'No guest assigned'}
                </p>
                <p>
                  Ghost: {ghost ? `${ghost.name} (${ghost.ghost_type})` : 'No ghost assigned'}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
