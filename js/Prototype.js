const State = {

};

class Prototype extends Phaser.Scene {

  constructor(config) {
    super({
      key: 'prototype'
    });

  }

  create() {
    // Background color
    this.cameras.main.setBackgroundColor(0x000000);
  }

  update() {

  }
}