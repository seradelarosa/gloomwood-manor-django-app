import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestsList.css';

const RequestsList = () => {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    // fetch unregistered guests
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/guests/');
                const data = await response.json();
                // filter for unregistered guests only
                const unregisteredGuests = data.filter(guest => !guest.registered);
                setRequests(unregisteredGuests);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests();
    }, []);

    const handleShowRegistrationForm = (guest) => {
        navigate('/register-guest', { state: { guest } });
    };

    return (
        <div className="requests-container">
            <h2 className="requests-title">Booking Requests</h2>
            <div className="requests-list">
                {requests.length === 0 ? (
                    <p className="no-requests">No booking requests at this time.</p>
                ) : (
                    requests.map(request => (
                        <div key={request.id} className="request-card">
                            <h3>{request.full_name}</h3>
                            <p>
                                <strong>Stay Duration:</strong> {request.stay_duration} seconds
                            </p>
                            <p>
                                <strong>Preferences:</strong> {request.preferences || 'None specified'}
                            </p>
                            <button 
                                onClick={() => handleShowRegistrationForm(request)}
                                className="register-button"
                            >
                                Register Guest
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RequestsList;