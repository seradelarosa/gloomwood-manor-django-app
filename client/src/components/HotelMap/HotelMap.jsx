import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import room1Image from '../../assets/img/room1.png';
import room2Image from '../../assets/img/room2.png';
import room3Image from '../../assets/img/room3.png';
import room4Image from '../../assets/img/room4.png';
import room5Image from '../../assets/img/room5.png';
import room6Image from '../../assets/img/room6.png';
import room7Image from '../../assets/img/room7.png';
import groundsImage from '../../assets/img/grounds.png';

import fireWraith from '../../assets/img/ghosts/Ashes.png';
import flicker from '../../assets/img/ghosts/Flicker.png';
import hollowWatcher from '../../assets/img/ghosts/hollow_watcher.png';
import malgrith from '../../assets/img/ghosts/Malgrith.png';
import mourner from '../../assets/img/ghosts/The_mourner.png';
import mrGrin from '../../assets/img/ghosts/Mr_Grin.png';
import winnie from '../../assets/img/ghosts/whispering_winnie.png';

import claraMoon from '../../assets/img/guests/Clara_Moon.png';
import desmondKaye from '../../assets/img/guests/Desmond_Kaye.png';
import elenaFrost from '../../assets/img/guests/Elena_Frost.png';
import julianAsh from '../../assets/img/guests/Julian_Ash.png';
import lunaSterling from '../../assets/img/guests/Luna_Sterling.png';
import miraForest from '../../assets/img/guests/Mira_Forest.png';
import theoBlackwell from '../../assets/img/guests/Theo_Blackwell.png';
import eventEmitter from '../../services/eventEmitter';

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

  
  preload() {
    // background images
    this.load.image('tileBg1', room1Image);
    this.load.image('tileBg2', room2Image);
    this.load.image('tileBg3', room3Image);
    this.load.image('tileBg4', room4Image);
    this.load.image('tileBg5', room5Image);
    this.load.image('tileBg6', room6Image);
    this.load.image('tileBg7', room7Image);
    this.load.image('groundsImage', groundsImage);
    
    // ghost images
    this.load.image('fireWraith', fireWraith);
    this.load.image('flicker', flicker);
    this.load.image('hollowWatcher', hollowWatcher);
    this.load.image('malgrith', malgrith);
    this.load.image('mourner', mourner);
    this.load.image('mrGrin', mrGrin);
    this.load.image('winnie', winnie);
    
    // guest images
    this.load.image('claraMoon', claraMoon);
    this.load.image('desmondKaye', desmondKaye);
    this.load.image('elenaFrost', elenaFrost);
    this.load.image('julianAsh', julianAsh);
    this.load.image('lunaSterling', lunaSterling);
    this.load.image('miraForest', miraForest);
    this.load.image('theoBlackwell', theoBlackwell);
  }

  init(data) {
    this.roomAssignments = data.roomAssignments || [];
  }

  create() {
    // set background image first
    this.add.image(MOBILE_WIDTH/2, MOBILE_HEIGHT/2, 'groundsImage')
      .setDisplaySize(MOBILE_WIDTH, MOBILE_HEIGHT)
      .setOrigin(0.5);

    const graphics = this.add.graphics();
    graphics.setDepth(1); // set graphics to appear above background

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

    // First, draw all room backgrounds
    for (let row = 0; row < MAP_HEIGHT; row++) {
      for (let col = 0; col < MAP_WIDTH; col++) {
        if (roomCount >= TOTAL_ROOMS) break;

        const roomNumber = roomCount + 1;
        let x = startX + col * TILE_SIZE;
        let y = startY + row * TILE_SIZE;

        if (roomNumber === 1) {
            this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg1')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5)
                .setDepth(0); // lowest depth
        }

        if (roomNumber === 2) {
          tileWidth = TILE_SIZE + 70;
          this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg2')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5)
                .setDepth(0); 
        }

        if (roomNumber === 3) {
          y += TILE_GAP2;
          tileWidth = TILE_SIZE;
          tileHeight = TILE_SIZE + 20;
          this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg3')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5)
                .setDepth(0); 
        }

        // vertical gap after room 4
        if (roomNumber === 4) {
          x += TILE_GAP;
          tileHeight = TILE_SIZE + 70;
          this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg4')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5)
                .setDepth(0);
        }

        if (roomNumber === 5) {
          tileHeight = TILE_SIZE;
        }

        // vertical offset for rooms 5, 6, and 7
        if (roomNumber >= 5) {
          y += VERTICAL_OFFSET;
        }

        if (roomNumber === 5) {
          this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg5')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5)
                .setDepth(0);
        }

        if (roomNumber === 6) {
          x += TILE_GAP;
          this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg6')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5)
                .setDepth(0);
        }

        if (roomNumber === 7) {
          y += VERTICAL_OFFSET - 20;
          this.add.image(x + tileWidth/2, y + tileHeight/2, 'tileBg7')
                .setDisplaySize(tileWidth, tileHeight)
                .setOrigin(0.5)
                .setDepth(0);
        }

        roomCount++;
      }
    }

    // reset roomCount for the second pass
    roomCount = 0;
    
    // Second pass: draw backgrounds, borders and occupants
    for (let row = 0; row < MAP_HEIGHT; row++) {
      for (let col = 0; col < MAP_WIDTH; col++) {
        if (roomCount >= TOTAL_ROOMS) break;

        const roomNumber = roomCount + 1;
        let x = startX + col * TILE_SIZE;
        let y = startY + row * TILE_SIZE;
        let tileWidth = TILE_SIZE;
        let tileHeight = TILE_SIZE;

        // specific positioning for each room
        if (roomNumber === 2) {
          tileWidth = TILE_SIZE + 70;
        }

        if (roomNumber === 3) {
          y += TILE_GAP2;
          tileWidth = TILE_SIZE;
          tileHeight = TILE_SIZE + 20;
        }

        if (roomNumber === 4) {
          x += TILE_GAP;
          tileHeight = TILE_SIZE + 70;
        }

        if (roomNumber === 5) {
          tileHeight = TILE_SIZE;
        }

        if (roomNumber >= 5) {
          y += VERTICAL_OFFSET;
        }

        if (roomNumber === 6) {
          x += TILE_GAP;
        }

        if (roomNumber === 7) {
          y += VERTICAL_OFFSET - 20;
        }
        
        // add a border around rooms
        graphics.lineStyle(3, 0xffffff, 1); // white, 3px, opaque
        graphics.strokeRect(x, y, tileWidth, tileHeight);

        // room number in white
        this.add
          .text(x + 10, y + 10, roomNumber.toString(), {
            color: "#ffffff",
            fontSize: "16px",
          })
          .setOrigin(0, 0)
          .setDepth(2); // set text above borders

        const guestInRoom = this.roomAssignments.find(
          (assignment) =>
            assignment.assigned === roomNumber && assignment.full_name
        );

        const ghostInRoom = this.roomAssignments.find(
          (assignment) =>
            assignment.assigned === roomNumber && assignment.ghost_type
        );

        if (guestInRoom) {
          const guestSprite = this.add.sprite(
            x + TILE_SIZE / 2 - 20,
            y + TILE_SIZE / 2 - 20,
            this.getGuestImageKey(guestInRoom.full_name)
          );
          guestSprite.setScale(1.3); // guest sizze
          guestSprite.setDepth(3); // set guest above borders
        }

        if (ghostInRoom) {
          const ghostSprite = this.add.sprite(
            x + TILE_SIZE / 2 + 20,
            y + TILE_SIZE / 2 + 20,
            this.getGhostImageKey(ghostInRoom.ghost_type)
          );
          ghostSprite.setScale(1.2); // ghost size 
          ghostSprite.setDepth(3); // set ghost above borders
        }

        roomCount++;
      }
    }
  }

  getGhostImageKey(ghostType) {
    const ghostMap = {
      'Clown Apparition': 'mrGrin',
      'Child Spirit': 'winnie',
      'Banshee': 'mourner',
      'Fire Wraith': 'fireWraith',
      'Demon': 'malgrith',
      'Poltergeist': 'flicker',
      'Shadow Entity': 'hollowWatcher'
    };
    return ghostMap[ghostType] || 'winnie'; // i wish i could delete this line without everything breaking??
  }

  getGuestImageKey(guestName) {
    const guestMap = {
      'Clara Moon': 'claraMoon',
      'Desmond Kaye': 'desmondKaye',
      'Elena Frost': 'elenaFrost',
      'Julian Ash': 'julianAsh',
      'Luna Sterling': 'lunaSterling',
      'Mira Forest': 'miraForest',
      'Theo Blackwell': 'theoBlackwell'
    };
    return guestMap[guestName] || 'claraMoon'; // this one too for some reason
  }
}

const HotelMap = ({ roomAssignments = [] }) => {
  const gameRef = useRef(null);
  const [currentAssignments, setCurrentAssignments] = useState(roomAssignments);

  // update current assignments when roomAssignments prop changes
  useEffect(() => {
    setCurrentAssignments(roomAssignments);
  }, [roomAssignments]);

  // listen for guest checkout events...
  useEffect(() => {
    const unsubscribe = eventEmitter.on('guestCheckedOut', (data) => {
      console.log('HotelMap: Guest checked out event received:', data);
      
      // Update the current assignments to reflect the guest checkout
      setCurrentAssignments(prevAssignments => {
        // Filter out the guest that checked out
        return prevAssignments.filter(assignment => 
          !(assignment.id === data.guestId && !assignment.ghost_type)
        );
      });
    });

    // unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

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
    gameRef.current.scene.start("HotelScene", { roomAssignments: currentAssignments });

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [currentAssignments]);

  // Restart scene when assignments change
  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.scene.start("HotelScene", { roomAssignments: currentAssignments });
    }
  }, [currentAssignments]);

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
