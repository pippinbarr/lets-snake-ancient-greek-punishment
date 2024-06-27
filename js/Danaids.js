class Danaids extends Snake {
    constructor(config) {
        super({
            key: "danaids"
        });

        this.SNAKE_START_X = 11;
        this.SNAKE_START_Y = 16;

        this.CONTROLS_X = 11;
        this.CONTROLS_Y = 18;

        this.APPLE_DELAY = this.SNAKE_TICK * 1000 * 20;

        this.growing = false;
        this.shrinking = false;

    }

    create() {
        super.create();

        this.lostPointSFX = this.sound.add(`lost-point`, 0.2);
    }

    checkAppleCollision() {
        const ate = super.checkAppleCollision();

        if (ate) {
            this.growing = true;
        }
    }

    addSnakeBits() {
        super.addSnakeBits();
        if (this.snakeBitsToAdd === 0 && this.growing) {
            this.growing = false;
            this.time.addEvent({
                delay: this.SNAKE_TICK * 1000 * 10,
                callback: () => {
                    this.snakeBitsToSubtract = 3;
                    this.time.addEvent({
                        delay: (this.SNAKE_TICK * 1000 * 3) / 10,
                        callback: () => {
                            this.lostPointSFX.play();
                            this.addToScore(-1);
                        },
                        repeat: 9
                    });
                }
            });
        }
        else if (this.snakeBitsToSubtract > 0) {
            let bit = this.snake.shift();
            bit.destroy();
            this.snakeBitsToSubtract--;
        }
    }

    gameOver() {
        this.dead = false;
        this.snakeHead.setVisible(true);
        this.snakeBodyGroup.clear(true, true);
        this.snake = [this.snakeHead];
        this.snakeHead.x = this.SNAKE_START_X * this.GRID_SIZE;
        this.snakeHead.y = this.SNAKE_START_Y * this.GRID_SIZE;
        this.snakeBitsToAdd = 3;
    }

    /**
     * Create functions
     */



    /**
     * Disabling the exits!
     */

    restart() {
        // No
    }

    gotoMenu() {
        // No
    }
}