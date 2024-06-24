class Preloader extends Phaser.Class {
  constructor(config) {
    super({
      key: `preloader`
    });
  }

  preload() {
    // this.load.image(`i-block`, `assets/blocks/IBlock.png`);
    // this.load.audio('asharp', `assets/sounds/Asharp.mp3`);

    // Loading screen visuals

    let style = {
      fontFamily: 'Commodore',
    };
    let invisible = this.add.text(0, 0, "123456", style);
    invisible.visible = false;

    this.cameras.main.setBackgroundColor(0x000000);

    this.clown = this.add.sprite(this.game.canvas.width / 2, this.game.canvas.height / 2, `clown_logo`);

    let progressBar = this.add.graphics();

    this.load.on('progress', (value) => {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(this.clown.x - this.clown.width / 2, this.clown.y + this.clown.height / 2, this.clown.width * value, 5);
      if (value === 1) {
        this.scene.start(START_SCENE);
      }
    });
  }

}
