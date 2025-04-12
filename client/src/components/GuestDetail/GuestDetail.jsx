import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GuestDetail = () => {
    const [guest, setGuest] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [currentRoom, setCurrentRoom] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    // get guest details
    useEffect(() => {
        const fetchGuest = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/guests/${id}/`);
                const data = await response.json();
                setGuest(data);
                
                // if guest has an assigned room, get its details
                if (data.assigned) {
                    const roomResponse = await fetch(`http://localhost:8000/api/rooms/${data.assigned}/`);
                    const roomData = await roomResponse.json();
                    setCurrentRoom(roomData);
                }
            } catch (error) {
                console.error('Error fetching guest:', error);
            }
        };

        fetchGuest();
    }, [id]);

    // get available rooms
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/rooms/');
                const data = await response.json();
                
                // create room IDs that have guests
                const occupiedRoomIds = new Set(
                    data
                        .filter(room => room.guest && room.guest !== guest?.id)
                        .map(room => room.id)
                );

                // filter rooms to include only unoccupied rooms and current room
                const availableRooms = data.filter(room => 
                    !occupiedRoomIds.has(room.id) || (currentRoom && room.id === currentRoom.id)
                );

                setRooms(availableRooms);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, [currentRoom, guest]);

    const handleAssignRoom = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:8000/api/guests/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    assigned: selectedRoom
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to assign room');
            }

            // get updated guest data
            const updatedGuest = await response.json();
            setGuest(updatedGuest);

            // get new room details
            if (updatedGuest.assigned) {
                const roomResponse = await fetch(`http://localhost:8000/api/rooms/${updatedGuest.assigned}/`);
                const roomData = await roomResponse.json();
                setCurrentRoom(roomData);
            } else {
                setCurrentRoom(null);
            }
            
        } catch (error) {
            console.error('Error assigning room:', error);
        }
    };

    if (!guest) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={() => navigate('/guests-list')}>Back to Guests</button>
            
            <h2>Guest Details</h2>
            <div>
                <h3>{guest.full_name}</h3>
                <p>Stay Duration: {guest.stay_duration} nights</p>
                <p>Preferences: {guest.preferences || 'None'}</p>
                <p>Current Room: {currentRoom ? `Room ${currentRoom.room_number}` : 'Not assigned'}</p>
            </div>

            <div>
                <h3>Assign Room</h3>
                <form onSubmit={handleAssignRoom}>
                    <select 
                        value={selectedRoom} 
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        required
                    >
                        <option value="">Select a room...</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                Room {room.room_number}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Assign Room</button>
                </form>
            </div>
        </div>
    );
};

export default GuestDetail; 