import React, { useState, useEffect } from "react";
import assignRoom from '../../services/assignRoom';

const GuestsList = ({ guests = [] }) => {
  
    // const handleAssignRoom = async () => {
    //   if (!selectedGuestId || !selectedRoomNumber) {
    //     alert("Please select a guest and a room.");
    //     return;
    //   }
  
    //   try {
    //     const data = await assignRoom(selectedGuestId, selectedRoomNumber);
    //     console.log("Guest assigned:", data);
    //     alert("Guest successfully assigned to room!");
    //   } catch (error) {
    //     console.error("Error assigning guest:", error);
    //     alert("Failed to assign guest to room.");
    //   }
    // };

  return (
    <>
      <h2 className="section-title">Registered Guests</h2>
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Stay Duration</th>
            <th>Preferences</th>
            <th>Assigned Room</th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr key={guest.id}>
              <td>{guest.full_name}</td>
              <td>{guest.stay_duration} minutes</td>
              <td>{guest.preferences}</td>
              <td>{guest.assigned ? guest.assigned.room_number : "None"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default GuestsList;
