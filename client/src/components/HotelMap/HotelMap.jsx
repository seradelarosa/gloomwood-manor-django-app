import { useEffect, useRef } from "react";
import Phaser from "phaser";
import room1Image from '../../assets/img/room1.png';
import room2Image from '../../assets/img/room2.png';
import room3Image from '../../assets/img/room3.png';
import room4Image from '../../assets/img/room4.png';
import room5Image from '../../assets/img/room5.png';
import room6Image from '../../assets/img/room6.png';
import room7Image from '../../assets/img/room7.png';
import groundsImage from '../../assets/img/grounds.png';

const TILE_SIZE = 140;
const MAP_WIDTH = 2;
const MAP_HEIGHT = 4;
const TOTAL_ROOMS = 7;
const MOBILE_WIDTH = 480;
const MOBILE_HEIGHT = 750;

class HotelScene extends Phaser.Scene {
  constructor() {
    super({ key: "HotelScene" });
    this.roomAssignments = [];
  }

  // images
  preload() {
    this.load.image('tileBg1', room1Image);
    this.load.image('tileBg2', room2Image);
    this.load.image('tileBg3', room3Image);
    this.load.image('tileBg4', room4Image);
    this.load.image('tileBg5', room5Image);
    this.load.image('tileBg6', room6Image);
    this.load.image('tileBg7', room7Image);
    this.load.image('groundsImage', groundsImage);
  }

  init(data) {
    this.roomAssignments = data.roomAssignments || [];
  }

  create() {
    // Add background image first, before any other drawing
    this.add.image(MOBILE_WIDTH/2, MOBILE_HEIGHT/2, 'groundsImage')
      .setDisplaySize(MOBILE_WIDTH, MOBILE_HEIGHT)
      .setOrigin(0.5);

    const graphics = this.add.graphics();

    // calculate starting position (to center the grid)
    const totalWidth = MAP_WIDTH * TILE_SIZE;
    const totalHeight = MAP_HEIGHT * TILE_SIZE;
    const startX = 50;
    const startY = 60;

    // draw the grid
    graphics.lineStyle(2, 0x666666);

    let roomCount = 0;
    const TILE_GAP = 70;
    const TILE_GAP2 = 50;
    const VERTICAL_OFFSET = 72;
    let tileWidth = TILE_SIZE;
    let tileHeight = TILE_SIZE;

    for (let row = 0; row < MAP_HEIGHT; row++) {
      for (let col = 0; col < MAP_WIDTH; col++) {
        if (roomCount >= TOTAL_ROOMS) break;

        const roomNumber = roomCount + 1;
        let x = startX + col * TILE_SIZE;
        let y = startY + row * TILE_SIZE;

        if (roomNumber === 1) {
            this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg1')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5);
        }

        if (roomNumber === 2) {
          tileWidth = TILE_SIZE + 70;
          this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg2')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5);
        }

        if (roomNumber === 3) {
          y += TILE_GAP2;
          tileWidth = TILE_SIZE;
          tileHeight = TILE_SIZE + 20;
          this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg3')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5);
        }

        // vertical gap *after* room 4
        if (roomNumber === 4) {
          x += TILE_GAP;
          tileHeight = TILE_SIZE + 70;
          this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg4')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5);
        }

        if (roomNumber === 5) {
          tileHeight = TILE_SIZE;
        }

        // vertical offset for rooms 5, 6, and 7
        if (roomNumber >= 5) {
          y += VERTICAL_OFFSET;
        }

        // Add room 5's background image after the position is finalized
        if (roomNumber === 5) {
          this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg5')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5);
        }

        if (roomNumber === 6) {
          x += TILE_GAP;
          this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg6')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5);
        }

        if (roomNumber === 7) {
          y += VERTICAL_OFFSET - 20;
          this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg7')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5);
        }

        // room tile with darker background
        graphics.fillStyle(0x2c2c2c);
        graphics.fillRect(x, y, tileWidth, tileHeight);
        graphics.strokeRect(x, y, tileWidth, tileHeight);

        // room number in white
        this.add
          .text(x + 10, y + 10, roomNumber.toString(), {
            color: "#ffffff",
            fontSize: "16px",
          })
          .setOrigin(0, 0);

        const guestInRoom = this.roomAssignments.find(
          (assignment) =>
            assignment.assigned === roomNumber && assignment.full_name
        );

        const ghostInRoom = this.roomAssignments.find(
          (assignment) =>
            assignment.assigned === roomNumber && assignment.ghost_type
        );

        if (guestInRoom) {
          this.add
            .text(x + TILE_SIZE / 2, y + TILE_SIZE / 2 + 10, "👤", {
              fontSize: "16px",
            })
            .setOrigin(0.5);
        }

        if (ghostInRoom) {
          this.add
            .text(
              x + TILE_SIZE / 2,
              y + TILE_SIZE / 2 + (guestInRoom ? 30 : 10),
              "👻",
              { fontSize: "16px" }
            )
            .setOrigin(0.5);
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
      parent: "hotel-map",
      width: MOBILE_WIDTH,
      height: MOBILE_HEIGHT,
      backgroundColor: "#1a1a1a",
      scene: HotelScene,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      audio: {
        noAudio: true,
      },
    };

    gameRef.current = new Phaser.Game(config);

    // pass room assignments to the scene
    gameRef.current.scene.start("HotelScene", { roomAssignments });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [roomAssignments]);

  return (
    <div
      id="hotel-map"
      style={{
        width: "100%",
        height: MOBILE_HEIGHT,
        marginBottom: "20px",
        marginTop: "20px",
        borderRadius: "8px",
        marginRight: "15px",
      }}
    />
  );
};

export default HotelMap;
