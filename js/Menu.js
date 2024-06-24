class Menu extends Phaser.Scene {

  constructor(config) {
    super({
      key: `menu`
    });
  }

  create() {
    this.cameras.main.setBackgroundColor(0xFF112233);

    // Menu items and input
    let titleStyle = {
      fontFamily: 'Commodore',
      fontSize: '100px',
      fill: '#fff',
      wordWrap: true,
      align: 'center'
    };
    let title = this.add.text(this.game.canvas.width / 2, 20, "PONGS", titleStyle);
    title.setOrigin(0.5, 0);
  }

  update(time, delta) {

  }
}