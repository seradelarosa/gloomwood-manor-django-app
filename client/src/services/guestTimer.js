import axios from 'axios';
import eventEmitter from './eventEmitter';

const API_URL = 'http://localhost:8000';

// Store all active timers
const activeTimers = {};

/**
 * Check for expired stays
 * @returns {Promise<Array>} Array of expired guests
 */
export const checkExpiredStays = async () => {
    try {
        const response = await axios.post(`${API_URL}/api/check-expired-stays/`);
        return response.data;
    } catch (error) {
        console.error('Error checking expired stays:', error);
        return [];
    }
};

/**
 * Start a timer for a guest's stay
 * @param {Object} guest - The guest object
 * @param {Function} onExpired - Callback function when timer expires
 * @returns {string} Timer ID
 */
export const startGuestTimer = (guest, onExpired) => {
    // Clear any existing timer for this guest
    clearGuestTimer(guest.id);
    
    // Convert stay_duration to milliseconds (1 second = 100ms for demo purposes)
    const durationMs = guest.stay_duration * 100;
    const endTime = Date.now() + durationMs;
    
    console.log(`Starting timer for ${guest.full_name} - ${guest.stay_duration} seconds`);
    
    // Create a countdown interval
    const countdownInterval = setInterval(() => {
        const timeLeft = Math.max(0, Math.ceil((endTime - Date.now()) / 100));
        
        // Log every 5 seconds to make it more visible
        if (timeLeft % 5 === 0 && timeLeft > 0) {
            console.log(`${guest.full_name}'s stay: ${timeLeft} seconds remaining`);
        }
    }, 100);
    
    // Set the main timer
    const timerId = setTimeout(async () => {
        console.log(`Stay is up for ${guest.full_name}!`);
        console.log(`%c${guest.full_name}'s stay has ended!`, 'color: red; font-weight: bold; font-size: 16px;');
        
        // Clear the countdown interval
        clearInterval(countdownInterval);
        
        // Update the backend to unregister the guest and remove room assignment
        try {
            const response = await axios.patch(`${API_URL}/api/guests/${guest.id}/`, {
                registered: false,
                assigned: null
            });
            
            console.log(`Guest ${guest.full_name} has been unregistered and checked out.`);
            
            // Emit a global event that the guest has checked out
            eventEmitter.emit('guestCheckedOut', {
                guestId: guest.id,
                guestData: response.data
            });
            
            // Call the onExpired callback if provided
            if (onExpired) {
                onExpired(guest.id, response.data);
            }
        } catch (error) {
            console.error('Error updating guest status:', error);
        }
        
        // Remove the timer from active timers
        delete activeTimers[guest.id];
    }, durationMs);
    
    // Store the timer and interval
    activeTimers[guest.id] = {
        timerId,
        countdownInterval,
        guest,
        endTime
    };
    
    return guest.id;
};

/**
 * Get the remaining time for a guest's stay
 * @param {number} guestId - The guest ID
 * @returns {number|null} Remaining time in seconds or null if no timer exists
 */
export const getRemainingTime = (guestId) => {
    if (!activeTimers[guestId]) {
        return null;
    }
    
    const { endTime } = activeTimers[guestId];
    return Math.max(0, Math.ceil((endTime - Date.now()) / 100));
};

/**
 * Clear a guest's timer
 * @param {number} guestId - The guest ID
 */
export const clearGuestTimer = (guestId) => {
    if (activeTimers[guestId]) {
        const { timerId, countdownInterval } = activeTimers[guestId];
        clearTimeout(timerId);
        clearInterval(countdownInterval);
        delete activeTimers[guestId];
    }
};

/**
 * Get all active timers
 * @returns {Object} Object containing all active timers
 */
export const getAllActiveTimers = () => {
    return { ...activeTimers };
}; 