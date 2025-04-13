import React, { useState, useEffect } from 'react';
import { useGhosts } from '../../services/ghostShuffle';
import HotelMap from '../HotelMap/HotelMap';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [guests, setGuests] = useState([]);
  const { ghosts } = useGhosts();

  // fetch rooms from the backend
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/rooms/');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch rooms: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fetched rooms:', data);
        setRooms(data);
      } catch (err) {
        console.error('Error fetching rooms:', err);
      }
    };

    fetchRooms();
  }, []);

  // fetch guests from the backend
  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/guests/');
        if (!response.ok) {
          throw new Error(`Failed to fetch guests: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched guests:', data);
        setGuests(data);
      } catch (err) {
        console.error('Error fetching guests:', err);
      }
    };

    fetchGuests();
  }, []);

  // Combine ghosts and guests for the map
  const roomAssignments = [...ghosts, ...guests];

  return (
    <div>
      <HotelMap roomAssignments={roomAssignments} />

      <h2>Room Assignments</h2>
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <div>
          {rooms.map((room) => {
            // find the ghost assigned to this room
            const ghost = ghosts.find((ghost) => ghost.assigned === room.room_number);
            // find the guest assigned to this room
            const guest = guests.find((guest) => guest.assigned === room.room_number);

            return (
              <div key={room.room_number}>
                <h3>Room {room.room_number}</h3>
                <p>
                  Guest: {guest ? guest.full_name : 'No guest assigned'}
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
