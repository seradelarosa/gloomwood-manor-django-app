import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { startGuestTimer, clearGuestTimer, getRemainingTime } from '../../services/guestTimer';
import './GuestDetail.css';

const GuestDetail = () => {
    const [guest, setGuest] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState('');
    const [currentRoom, setCurrentRoom] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const countdownIntervalRef = useRef(null);

    // get guest details
    useEffect(() => {
        const fetchGuest = async () => {
            try {
                const response = await fetch(`https://gloomwood-manor-6a698e38105d.herokuapp.com/api/guests/${id}/`);
                const data = await response.json();
                setGuest(data);
                
                // if guest has an assigned room, get its details
                if (data.assigned) {
                    const roomResponse = await fetch(`https://gloomwood-manor-6a698e38105d.herokuapp.com/api/rooms/${data.assigned}/`);
                    const roomData = await roomResponse.json();
                    setCurrentRoom(roomData);
                    
                    // check if there's an active timer for this guest
                    const remainingTime = getRemainingTime(data.id);
                    if (remainingTime !== null) {
                        setCountdown(remainingTime);
                    }
                }
            } catch (error) {
                console.error('Error fetching guest:', error);
            }
        };

        fetchGuest();
        
        // when component unmounts..
        return () => {
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
            }
        };
    }, [id]);

    // update countdown display
    useEffect(() => {
        if (guest && guest.assigned) {
            // clear any existing interval
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
            }
            
            // set up a new interval to update the countdown display
            countdownIntervalRef.current = setInterval(() => {
                const remainingTime = getRemainingTime(guest.id);
                if (remainingTime !== null) {
                    setCountdown(remainingTime);
                } else {
                    // timer has ended, clear the interval
                    clearInterval(countdownIntervalRef.current);
                    setCountdown(null);
                }
            }, 100);
            
            return () => {
                if (countdownIntervalRef.current) {
                    clearInterval(countdownIntervalRef.current);
                }
            };
        }
    }, [guest]);

    // get available rooms
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('https://gloomwood-manor-6a698e38105d.herokuapp.com/api/rooms/');
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
            const response = await fetch(`https://gloomwood-manor-6a698e38105d.herokuapp.com/api/guests/${id}/`, {
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
                const roomResponse = await fetch(`https://gloomwood-manor-6a698e38105d.herokuapp.com/api/rooms/${updatedGuest.assigned}/`);
                const roomData = await roomResponse.json();
                setCurrentRoom(roomData);
                
                // Log the guest and assigned room
                console.log('Guest assigned to room:', {
                    guest: updatedGuest.full_name,
                    room: `Room ${roomData.room_number}`
                });
                
                // Start the stay timer using the global timer service
                startGuestTimer(updatedGuest, (guestId, updatedGuestData) => {
                    // This callback will be called when the timer expires
                    setGuest(updatedGuestData);
                    setCurrentRoom(null);
                });
                
                // set initial countdown
                setCountdown(updatedGuest.stay_duration);
            } else {
                setCurrentRoom(null);
                
                // clear timer if guest is unassigned
                clearGuestTimer(updatedGuest.id);
                setCountdown(null);
            }
            
        } catch (error) {
            console.error('Error assigning room:', error);
        }
    };

    if (!guest) {
        return <div>Loading...</div>;
    }

    return (
        <div className="guest-detail-container">
            <button 
                onClick={() => navigate('/guests-list')}
                className="back-button"
            >
                Back to Guests
            </button>
            
            <h2 className="guest-detail-title">Guest Details</h2>
            
            <div className="guest-info-card">
                <h3>{guest.full_name}</h3>
                <p>Stay Duration: {guest.stay_duration} seconds</p>
                <p>Preferences: {guest.preferences || 'None'}</p>
                <p>Current Room: {currentRoom ? `Room ${currentRoom.room_number}` : 'Not assigned'}</p>
            </div>

            <div className="room-assignment-card">
                <h3>Assign Room</h3>
                <form onSubmit={handleAssignRoom} className="room-form">
                    <select 
                        value={selectedRoom} 
                        onChange={(e) => setSelectedRoom(e.target.value)}
                        required
                        className="room-select"
                    >
                        <option value="">Select a room...</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                Room {room.room_number}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="assign-button">
                        Assign Room
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GuestDetail; 