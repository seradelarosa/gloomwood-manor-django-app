import { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const TILE_SIZE = 48; // size of each tile
const MAP_WIDTH = 7; // number of rooms
const MOBILE_WIDTH = 320; // mobile width
const MOBILE_HEIGHT = 480; // mobile height

class HotelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'HotelScene' });
  }

  preload() {
    // add tiles here later
    this.load.setBaseURL('/');
  }

  create() {
    // ... a simple grid of rectangles for now..
    const graphics = this.add.graphics();
    
    // calculate starting position (to center the grid)
    const startX = (MOBILE_WIDTH - (MAP_WIDTH * TILE_SIZE)) / 2;
    // position the grid vertically
    const startY = 100;

    // create grid
    graphics.lineStyle(2, 0x666666);
    
    for (let i = 0; i < MAP_WIDTH; i++) {
      const x = startX + (i * TILE_SIZE);
      
      // room tile
      graphics.fillStyle(0xcccccc);
      graphics.fillRect(x, startY, TILE_SIZE - 2, TILE_SIZE - 2);
      graphics.strokeRect(x, startY, TILE_SIZE - 2, TILE_SIZE - 2);
      
      // room number
      this.add.text(
        x + TILE_SIZE/2, 
        startY + TILE_SIZE/2, 
        (i + 1).toString(),
        { 
          color: '#000000',
          fontSize: '16px'
        }
      ).setOrigin(0.5);
    }
  }

  update() {
    // put logic here lol
  }
}

const HotelMap = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    // prevent multiple game instances
    if (gameRef.current) return; 

    const config = {
      type: Phaser.AUTO,
      parent: 'hotel-map',
      width: MOBILE_WIDTH,
      height: MOBILE_HEIGHT,
      backgroundColor: '#f0f0f0',
      scene: HotelScene,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      }
    };

    gameRef.current = new Phaser.Game(config);

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);

  return <div id="hotel-map" style={{ width: '100%', height: '100%' }} />;
};

export default HotelMap;