class Danaids extends Snake {
    constructor(config) {
        super({
            key: "danaids"
        });

        this.SNAKE_START_X = 11;
        this.SNAKE_START_Y = 16;

        this.CONTROLS_X = 11;
        this.CONTROLS_Y = 18;
    }

    create() {
        super.create();
    }

    startAppleTimer() {

    }

    createApple() {

    }

    checkAppleCollision() {

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