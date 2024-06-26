const DEBUG = false;
const START_SCENE = "tantalus";
const WIDTH = 480;
const HEIGHT = 640;
const LANG = "en";

let config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  backgroundColor: "#ff00ff",
  scene: [
    Boot,
    Preloader,
    Menu,
    Snake,
    Sisyphus,
    Prometheus,
    Tantalus
  ],
  render: {
    pixelArt: true,
  },
  pixelArt: true,
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