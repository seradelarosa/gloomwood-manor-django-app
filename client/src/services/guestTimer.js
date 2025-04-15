import axios from 'axios';
import eventEmitter from './eventEmitter';

const API_URL = 'https://gloomwood-manor-6a698e38105d.herokuapp.com';
const timers = new Map();

// timer for a guest's stay
export const startGuestTimer = (guest, onExpired) => {
  // clear any existing timer for this guest
  clearGuestTimer(guest.id);
  
  // convert stay_duration to milliseconds
  const duration = guest.stay_duration * 100;
  
  console.log(`Starting ${duration/1000} second timer for ${guest.full_name}`);
  
  // set timer
  const timer = setTimeout(async () => {
    try {
      // update guest on backend
      const response = await axios.patch(`${API_URL}/api/guests/${guest.id}/`, {
        registered: false,
        assigned: null
      });
      
      console.log(`${guest.full_name}'s stay has ended!`);
      
      // emit guest checkout event
      eventEmitter.emit('guestCheckedOut', {
        guestId: guest.id,
        guestName: guest.full_name,
        roomNumber: guest.assigned
      });
      
      // callback with updated guest data
      if (onExpired) {
        onExpired(guest.id, response.data);
      }
    } catch (error) {
      console.error('Error updating guest status:', error);
    }
    
    // clean up timer
    timers.delete(guest.id);
  }, duration);
  
  // store timer
  timers.set(guest.id, timer);
  
  // return the remaining time in seconds
  return Math.ceil(duration / 1000);
};

// get the remaining time for a guest's stay
export const getRemainingTime = (guestId) => {
  if (!timers.has(guestId)) {
    return null;
  }
  return Math.ceil(timers.get(guestId)._idleTimeout / 100);
};

// clear guest's timer
export const clearGuestTimer = (guestId) => {
  if (timers.has(guestId)) {
    clearTimeout(timers.get(guestId));
    timers.delete(guestId);
  }
}; 