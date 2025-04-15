import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // First, get a CSRF token
            const csrfResponse = await fetch('https://gloomwood-manor-6a698e38105d.herokuapp.com/api/csrf/', {
                credentials: 'include',
            });
            const { csrfToken } = await csrfResponse.json();

            // Then make the login request
            const response = await fetch('https://gloomwood-manor-6a698e38105d.herokuapp.com/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken,
                },
                body: JSON.stringify({ 
                    username: username.trim(),
                    password: password.trim()
                }),
                credentials: 'include',
            });

            const data = await response.json();
            
            if (response.ok && data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                setIsAuthenticated(true);
                navigate('/');
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('An error occurred during login. Please try again.');
        }
    };

    return (
        <div className="login-container">
            <h2>Welcome to Gloomwood Manor</h2>
            <div className="login-card">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;