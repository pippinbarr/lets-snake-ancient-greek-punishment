class Tantalus extends Snake {
    constructor(config) {
        super({
            key: "tantalus"
        });

        this.SNAKE_START_X = 4;
        this.SNAKE_START_Y = 6;

        this.CONTROLS_X = 4;
        this.CONTROLS_Y = 8;
    }

    create() {
        super.create();
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