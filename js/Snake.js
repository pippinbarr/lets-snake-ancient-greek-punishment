const State = {

};

class Snake extends Phaser.Scene {

    constructor(config) {
        super({
            key: 'snake'
        });
    }

    init() {
        this.strings = this.cache.json.get(`strings`);
    }

    create() {
        console.log(`>> Snake.create()`);

        // Background color
        this.cameras.main.setBackgroundColor(0x000000);

        // Sound effects
        this.moveSFX = this.game.sound.add(`move`, 0.2);
        this.hitSFX = this.game.sound.add(`hit`, 0.2);
        this.appleSFX = this.game.sound.add(`apple`, 0.2);

        // The snake
        this.head = this.physics.add.image(100, 100, `head`);
        this.snake = [this.head];
    }

    update() {

    }
}