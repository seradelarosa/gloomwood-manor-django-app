const assignRoom = (guest_id, room_number) => {
    return fetch('/api/assign-room/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guest_id, room_number }),
    })
      .then(res => {
        if (!res.ok) {
          return Promise.reject(`Failed to assign room: ${res.statusText}`);
        }
        return res.json();
      })
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        return data;
      })
      .catch(error => {
        console.error('Error assigning room:', error);
        throw error;
      });
  };
  
  export default assignRoom;
  
  