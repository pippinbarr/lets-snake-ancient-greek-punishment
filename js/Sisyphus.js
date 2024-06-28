class Sisyphus extends Snake {
    constructor(config) {
        super({
            key: "sisyphus"
        });

        this.SNAKE_START_X = 4;
        this.SNAKE_START_Y = 6;

        this.CONTROLS_X = 4;
        this.CONTROLS_Y = 8;

        this.NEW_BODY_PIECES_PER_APPLE = 0;
        this.APPLE_DELAY = this.SNAKE_TICK * 1;
    }

    create() {
        this.applePositions = [
            { x: 4, y: 27 },
            { x: 4, y: 27 },
            { x: 5, y: 27 },
            { x: 6, y: 26 },
            { x: 7, y: 25 },
            { x: 8, y: 24 },
            { x: 9, y: 23 },
            { x: 10, y: 22 },
            { x: 11, y: 21 },
            { x: 12, y: 20 },
            { x: 13, y: 19 },
            { x: 14, y: 18 },
            { x: 15, y: 17 },
            { x: 16, y: 16 },
            { x: 17, y: 15 },
            { x: 18, y: 14 },
            { x: 19, y: 13 },
            { x: 20, y: 12 },
        ];
        this.currentApplePosition = 0;

        this.rollDownSFX = this.sound.add(`lost-point`, 0.2);

        super.create();
    }

    repositionApple(apple = undefined, direction = 1) {
        // Need to see that apple!
        apple.setVisible(true);

        // Stop the rollbackTimer (if this was an eating-based reposition)
        if (this.rollbackTimer) this.rollbackTimer.remove();

        // Choose the next position (up or down)
        this.currentApplePosition += direction;
        // Clamp it
        if (this.currentApplePosition < 1) {
            this.currentApplePosition = 1;
        }

        // Check if they reached the top
        if (this.currentApplePosition === this.applePositions.length) {
            // Stay on the last position...
            this.currentApplePosition--;
            // Force a rollback
            direction = -1;
        }

        const pos = this.applePositions[this.currentApplePosition];
        apple.x = pos.x * this.GRID_SIZE;
        apple.y = pos.y * this.GRID_SIZE;

        if (this.currentApplePosition === 2) {
            // We don't roll back from position 2
            return;
        }

        // Delay the rollback based on whether it's already rolling or not
        const delayMultiplier = direction < 0 ? 1 : 10;
        this.rollbackTimer = this.time.addEvent({
            delay: 1000 * this.SNAKE_TICK * delayMultiplier,
            callback: this.repositionApple,
            args: [this.apple, -1],
            callbackScope: this
        });
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
        const WALL_LEFT = 1;
        const WALL_TOP = 3;

        var WALLS = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ]

        this.wallGroup = this.physics.add.group();
        for (let y = 0; y < WALLS.length; y++) {
            for (let x = 0; x < WALLS[y].length; x++) {
                if (WALLS[y][x]) {
                    let wall = this.wallGroup.create((WALL_LEFT + x) * this.GRID_SIZE, (WALL_TOP + y) * this.GRID_SIZE, 'wall')
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