class Zeno extends Snake {
    constructor(config) {
        super({
            key: "zeno"
        });

        this.SNAKE_START_X = 2;
        this.SNAKE_START_Y = 16;

        this.APPLE_START_X = 21;
        this.APPLE_START_Y = 16;

        this.CONTROLS_X = 11;
        this.CONTROLS_Y = 18;

        this.STARTING_SNAKE_TICK = this.SNAKE_TICK;

        this.halfways = [
            11,
            16,
            18,
            20
        ];
        this.target = 0;
    }

    create() {
        super.create();

        this.ticker.remove();
        this.ticker = this.time.addEvent({
            callback: this.tick,
            callbackScope: this,
            delay: 1000 * this.SNAKE_TICK,
        });

        this.repositionApple(this.apple);
    }

    tick() {
        super.tick();

        if (this.snakeMoving() && !this.dead) {
            this.SNAKE_TICK *= 2;
            console.log(this.SNAKE_TICK);
        } else {
            this.SNAKE_TICK = this.STARTING_SNAKE_TICK;
        }

        this.ticker = this.time.addEvent({
            callback: this.tick,
            callbackScope: this,
            delay: 1000 * this.SNAKE_TICK,
        });
    }

    snakeMoving() {
        return (this.next.x !== 0 || this.next.y !== 0);
    }

    repositionApple(apple) {
        apple.setVisible(true);
        apple.x = this.APPLE_START_X * this.GRID_SIZE;
        apple.y = this.APPLE_START_Y * this.GRID_SIZE;
        return true;
    }

    startAppleTimer() {

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

    createWalls() {
        // Create the walls
        this.WALL_LEFT = 1;
        this.WALL_RIGHT = this.NUM_COLS - 2;
        this.WALL_TOP = 3;
        this.WALL_BOTTOM = this.NUM_ROWS - this.WALL_TOP - 1;

        let WALLS = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]

        this.wallGroup = this.physics.add.group();
        for (let y = 0; y < WALLS.length; y++) {
            for (let x = 0; x < WALLS[y].length; x++) {
                if (WALLS[y][x]) {
                    let wall = this.wallGroup.create((this.WALL_LEFT + x) * this.GRID_SIZE, (this.WALL_TOP + y) * this.GRID_SIZE, 'wall')
                    wall.setOrigin(0, 0);
                }
            }
        }
    }

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