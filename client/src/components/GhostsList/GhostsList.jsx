import React, { useState, useEffect } from "react";
import { useGhosts } from '../../services/ghostShuffle';

const GhostsList = () => {
    const { ghosts, lastShuffleTime } = useGhosts();
    const [rooms, setRooms] = useState({});

    // fetch room details for assigned ghosts
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/rooms/');
                const roomsData = await response.json();
                // Create a map of room IDs to room numbers
                const roomMap = roomsData.reduce((acc, room) => {
                    acc[room.id] = room.room_number;
                    return acc;
                }, {});
                setRooms(roomMap);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    // Format the last shuffle time
    const formatLastShuffle = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    console.log('Current ghosts:', ghosts);
    console.log('Current rooms state:', rooms);

    return (
        <div className="ghosts-list-container">
            <h2>Ghosts List</h2>
            <p>Last shuffled at: {formatLastShuffle(lastShuffleTime)}</p>
            <div className="ghosts-grid">
                {ghosts.map((ghost) => (
                    <div key={ghost.id} className="ghost-card">
                        <h3>{ghost.name}</h3>
                        <p>Type: {ghost.ghost_type}</p>
                        <p>Room: {ghost.assigned && rooms[ghost.assigned] ? `Room ${rooms[ghost.assigned]}` : 'Unassigned'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GhostsList;