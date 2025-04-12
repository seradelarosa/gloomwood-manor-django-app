import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


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
        <div>
            <h2>Booking Requests</h2>
            <div>
                {requests.length === 0 ? (
                    <p>No booking requests at this time.</p>
                ) : (
                    requests.map(request => (
                        <div key={request.id}>
                            <div>
                                <h3>{request.full_name}</h3>
                                <span>{request.stay_duration} nights</span>
                            </div>
                            <div>
                                <p><strong>Preferences:</strong> {request.preferences || 'None specified'}</p>
                            </div>
                            <div>
                                <button onClick={() => handleShowRegistrationForm(request)}>
                                    Register Guest
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RequestsList;