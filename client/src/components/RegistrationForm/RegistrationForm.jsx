import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const guest = location.state?.guest;

    if (!guest) {
        return <div>No guest data provided</div>;
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const registerResponse = await fetch(`http://localhost:8000/api/guests/${guest.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    registered: true,
                    full_name: guest.full_name,
                    stay_duration: guest.stay_duration,
                    preferences: guest.preferences
                }),
            });

            if (!registerResponse.ok) {
                throw new Error('Failed to register guest');
            }

            navigate('/guests-list');
        } catch (error) {
            console.error('Error registering guest:', error);
        }
    };

    return (
        <div>
            <h2>Register Guest</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Full Name:</label>
                    <input 
                        type="text" 
                        value={guest.full_name}
                        readOnly
                    />
                </div>
                <div>
                    <label>Stay Duration (nights):</label>
                    <input 
                        type="number" 
                        value={guest.stay_duration}
                        readOnly
                    />
                </div>
                <div>
                    <label>Preferences:</label>
                    <textarea 
                        value={guest.preferences || ''}
                        readOnly
                    />
                </div>
                <div>
                    <button type="button" onClick={() => navigate('/requests-list')}>Cancel</button>
                    <button type="submit">Confirm Registration</button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm; 