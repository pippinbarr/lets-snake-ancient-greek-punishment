class Tantalus extends Snake {
    constructor(config) {
        super({
            key: "tantalus"
        });

        this.SNAKE_START_X = 11;
        this.SNAKE_START_Y = 16;

        this.CONTROLS_X = 11;
        this.CONTROLS_Y = 18;

        this.FRUIT_APPLE_RETREAT_Y = 1;
        this.WATER_APPLE_RETREAT_Y = 30;

        this.FRUIT_START_Y = 7;
        this.WATER_START_Y = 24;

        this.TAUNT_THRESHOLD = 6 * this.GRID_SIZE;
    }

    create() {
        super.create();
    }

    startAppleTimer() {

    }

    createApple() {
        this.fruitApple = this.physics.add.image(this.SNAKE_START_X * this.GRID_SIZE, this.FRUIT_START_Y * this.GRID_SIZE, 'apple');
        this.fruitApple.setOrigin(0, 0);

        this.waterApple = this.physics.add.image(this.SNAKE_START_X * this.GRID_SIZE, this.WATER_START_Y * this.GRID_SIZE, 'apple');
        this.waterApple.setOrigin(0, 0);
    }

    checkAppleCollision() {
        const snakeToFruitDistance = Phaser.Math.Distance.Between(this.snakeHead.x, this.snakeHead.y, this.fruitApple.x, this.fruitApple.y);
        if (snakeToFruitDistance < this.TAUNT_THRESHOLD) {
            if (this.fruitApple.y > this.FRUIT_APPLE_RETREAT_Y * this.GRID_SIZE) {
                this.fruitApple.y -= this.GRID_SIZE;
            }
        }
        else if (this.fruitApple.y < this.FRUIT_START_Y * this.GRID_SIZE) {
            this.fruitApple.y += this.GRID_SIZE;
        }

        const snakeToWaterDistance = Phaser.Math.Distance.Between(this.snakeHead.x, this.snakeHead.y, this.waterApple.x, this.waterApple.y);
        console.log(snakeToWaterDistance);
        if (snakeToWaterDistance < this.TAUNT_THRESHOLD) {
            if (this.waterApple.y < this.WATER_APPLE_RETREAT_Y * this.GRID_SIZE) {
                this.waterApple.y += this.GRID_SIZE;
            }
        }
        else if (this.waterApple.y > this.WATER_START_Y * this.GRID_SIZE) {
            this.waterApple.y -= this.GRID_SIZE;
        }

    }

    repositionApple() {

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