const DEBUG = false;
const START_SCENE = "menu";
// const SCALE = 5;
const WIDTH = 640;
const HEIGHT = 480;

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  backgroundColor: "#ff0000",
  scene: [
    Boot,
    Preloader,
    Menu,
    Prototype
  ],
  render: {
    // antialias: false,
    pixelArt: true,
    // antialiasGL: false
  },
  pixelArt: true,
  // antialias: false,
  // antialiasGL: false,
  physics: {
    default: 'arcade',
    arcade: {
      debug: DEBUG
    }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.BOTH,
    width: WIDTH,
    height: HEIGHT,
  },
};

let game = new Phaser.Game(config);