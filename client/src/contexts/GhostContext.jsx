import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const GhostContext = createContext();

export const useGhost = () => {
    const context = useContext(GhostContext);
    if (!context) {
        throw new Error('useGhost must be used within a GhostProvider');
    }
    return context;
};

export const GhostProvider = ({ children }) => {
    const [ghosts, setGhosts] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [guests, setGuests] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);
    const [lastShuffleTime, setLastShuffleTime] = useState(null);

    const fetchGhosts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/ghosts/');
            setGhosts(response.data);
        } catch (error) {
            console.error('Error fetching ghosts:', error);
        }
    };

    const fetchRooms = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/rooms/');
            setRooms(response.data);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    const fetchGuests = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/guests/');
            setGuests(response.data);
        } catch (error) {
            console.error('Error fetching guests:', error);
        }
    };

    useEffect(() => {
        fetchGhosts();
        fetchRooms();
        fetchGuests();
    }, []);

    const value = {
        ghosts,
        rooms,
        guests,
        isShuffling,
        lastShuffleTime,
        setGhosts,
        setRooms,
        setGuests,
        setIsShuffling,
        setLastShuffleTime,
        fetchGhosts,
        fetchRooms,
        fetchGuests
    };

    return (
        <GhostContext.Provider value={value}>
            {children}
        </GhostContext.Provider>
    );
}; 