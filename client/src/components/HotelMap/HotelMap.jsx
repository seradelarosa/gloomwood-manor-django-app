import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const TILE_SIZE = 48;
const MAP_WIDTH = 3;
const MAP_HEIGHT = 3;
const TOTAL_ROOMS = 7;
const MOBILE_WIDTH = 320;
const MOBILE_HEIGHT = 200;

class HotelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HotelScene' });
    this.roomAssignments = [];
  }

  init(data) {
    this.roomAssignments = data.roomAssignments || [];
  }

  create() {
    const graphics = this.add.graphics();
    
    // calculate starting position (to center the grid)
    const totalWidth = MAP_WIDTH * TILE_SIZE;
    const totalHeight = MAP_HEIGHT * TILE_SIZE;
    const startX = (MOBILE_WIDTH - totalWidth) / 2;
    const startY = (MOBILE_HEIGHT - totalHeight) / 2;

    // draw the grid
    graphics.lineStyle(2, 0x666666);
    
    let roomCount = 0;
    for (let row = 0; row < MAP_HEIGHT; row++) {
      for (let col = 0; col < MAP_WIDTH; col++) {
        if (roomCount >= TOTAL_ROOMS) break;
        
        const roomNumber = roomCount + 1;
        const x = startX + (col * TILE_SIZE);
        const y = startY + (row * TILE_SIZE);
        
        // room tile with darker background
        graphics.fillRect(x, y, TILE_SIZE - 2, TILE_SIZE - 2);
        graphics.strokeRect(x, y, TILE_SIZE - 2, TILE_SIZE - 2);
        
        // room number in white
        this.add.text(
            x + TILE_SIZE/2, 
            y + TILE_SIZE/2 - 10,
            roomNumber.toString(),
            { 
              color: '#ffffff',
              fontSize: '16px'
            }
          ).setOrigin(0.5);

          // check if there's a guest in the room (has full_name property)
          const guestInRoom = this.roomAssignments.find(
            assignment => assignment.assigned === roomNumber && assignment.full_name
          );

          // check if there's a ghost in this room (has ghost_type property)
          const ghostInRoom = this.roomAssignments.find(
            assignment => assignment.assigned === roomNumber && assignment.ghost_type
          );

          if (guestInRoom) {
            // add guest symbol (👤) below the room number
            this.add.text(
              x + TILE_SIZE/2,
              y + TILE_SIZE/2 + 10,
              '👤',
              {
                fontSize: '16px'
              }
            ).setOrigin(0.5);
          }

          if (ghostInRoom) {
            // add ghost symbol (👻) below the guest symbol or room number
            this.add.text(
              x + TILE_SIZE/2,
              y + TILE_SIZE/2 + (guestInRoom ? 30 : 10),
              '👻',
              {
                fontSize: '16px'
              }
            ).setOrigin(0.5);
          }
        
        roomCount++;
      }
    }
  }
}

const HotelMap = ({ roomAssignments = [] }) => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return;

    const config = {
      type: Phaser.AUTO,
      parent: 'hotel-map',
      width: MOBILE_WIDTH,
      height: MOBILE_HEIGHT,
      backgroundColor: '#1a1a1a',
      scene: HotelScene,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      audio: {
        noAudio: true
      }
    };

    gameRef.current = new Phaser.Game(config);

    // pass room assignments to the scene
    gameRef.current.scene.start('HotelScene', { roomAssignments });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [roomAssignments]);

  return (
    <div id="hotel-map" style={{ 
      width: '100%', 
      height: MOBILE_HEIGHT, 
      marginBottom: '20px',
      marginTop: '20px',
      borderRadius: '8px',
      padding: '10px'
    }} />
  );
};

export default HotelMap;