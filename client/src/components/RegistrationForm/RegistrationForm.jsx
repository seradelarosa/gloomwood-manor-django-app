import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const existingGuest = location.state?.guest;

    const [fullName, setFullName] = useState(existingGuest?.full_name || '');
    const [stayDuration, setStayDuration] = useState(existingGuest?.stay_duration || '');
    const [preferences, setPreferences] = useState(existingGuest?.preferences || '');
    const [error, setError] = useState('');

    const isNewGuest = !existingGuest;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!fullName || !stayDuration) {
            setError('Full Name and Stay Duration are required.');
            return;
        }

        try {
            let response;
            const guestData = {
                full_name: fullName,
                stay_duration: parseInt(stayDuration, 10),
                preferences: preferences,
                registered: true
            };

            if (isNewGuest) {
                response = await fetch('http://localhost:8000/api/guests/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(guestData),
                });
            } else {
                response = await fetch(`http://localhost:8000/api/guests/${existingGuest.id}/`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(guestData),
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || `Failed to ${isNewGuest ? 'add' : 'register'} guest`);
            }

            navigate('/guests-list');
        } catch (error) {
            console.error(`Error ${isNewGuest ? 'adding' : 'registering'} guest:`, error);
            setError(error.message || `An error occurred.`);
        }
    };

    return (
        <div className="registration-container">
            <h2 className="registration-title">{isNewGuest ? 'Add New Guest' : 'Register Guest'}</h2>
            <form onSubmit={handleSubmit} className="registration-form">
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <label>Full Name:</label>
                    <input 
                        type="text" 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        readOnly={!isNewGuest}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Stay Duration (seconds):</label>
                    <input 
                        type="number" 
                        value={stayDuration}
                        onChange={(e) => setStayDuration(e.target.value)}
                        readOnly={!isNewGuest}
                        required
                        min="1"
                    />
                </div>
                <div className="form-group">
                    <label>Preferences:</label>
                    <textarea 
                        value={preferences}
                        onChange={(e) => setPreferences(e.target.value)}
                        readOnly={!isNewGuest}
                    />
                </div>
                <div className="button-group">
                    <button 
                        type="button" 
                        onClick={() => navigate(isNewGuest ? '/requests-list' : '/requests-list')}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        className="submit-button"
                    >
                        {isNewGuest ? 'Add Guest' : 'Confirm Registration'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm; 