import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './GuestsList.css';

const GuestsList = () => {
  const [registeredGuests, setRegisteredGuests] = useState([]);
  const navigate = useNavigate();

  // Fetch only registered guests
  useEffect(() => {
    const fetchRegisteredGuests = async () => {
      try {
        const response = await fetch('https://gloomwood-manor-6a698e38105d.herokuapp.com/api/guests/');
        const data = await response.json();
        // Filter for registered guests only
        const registeredGuests = data.filter(guest => guest.registered);
        setRegisteredGuests(registeredGuests);
      } catch (error) {
        console.error('Error fetching registered guests:', error);
      }
    };

    fetchRegisteredGuests();
  }, []);

  const handleGuestClick = (guestId) => {
    navigate(`/guests/${guestId}`);
  };

  return (
    <div className="guests-container">
      <h2 className="guests-title">Registered Guests</h2>
      {registeredGuests.length === 0 ? (
        <p className="no-guests">No registered guests found.</p>
      ) : (
        <div className="guests-list">
          {registeredGuests.map((guest) => (
            <div 
              key={guest.id} 
              onClick={() => handleGuestClick(guest.id)}
              className="guest-card"
            >
              <h3>{guest.full_name}</h3>
              <p>Room: {guest.assigned ? `Room ${guest.assigned}` : 'Not assigned'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GuestsList;
