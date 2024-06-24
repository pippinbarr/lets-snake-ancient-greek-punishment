class Boot extends Phaser.Scene {

  constructor(config) {
    super({
      key: 'boot'
    });
  }

  preload() {
    console.log(">> Boot.preload()");
    // this.load.image('clown_logo', 'assets/images/clown_logo.png');
  }

  create() {
    console.log(">> Boot.create()")
    this.game.scene.start(`preloader`);
  }
}