class Sisyphus extends Snake {
    constructor(config) {
        super({
            key: "sisyphus"
        });
    }

    create() {
        this.applePositions = [
            { x: 4, y: 27 },
            { x: 5, y: 27 },
            { x: 6, y: 26 },
            // { x: 7, y: 25 },
            // { x: 8, y: 24 },
            // { x: 9, y: 23 },
            // { x: 10, y: 22 },
            // { x: 11, y: 21 },
            // { x: 12, y: 20 },
            // { x: 13, y: 19 },
            // { x: 14, y: 18 },
            // { x: 15, y: 17 },
            // { x: 16, y: 16 },
            // { x: 17, y: 15 },
            // { x: 18, y: 14 },
            // { x: 19, y: 13 },
            // { x: 20, y: 12 },
        ];
        this.currentApplePosition = 0;

        super.create();
    }

    startAppleTimer() {
        this.appleTimer = this.time.addEvent({
            delay: this.SNAKE_TICK,
            callback: this.repositionApple,
            args: [this.apple, 1],
            callbackScope: this
        });
    }

    repositionApple(apple, direction) {
        this.currentApplePosition += direction;
        if (this.currentApplePosition < 0) this.currentApplePosition = 0;

        apple.setVisible(true);

        let pos = this.applePositions[this.currentApplePosition];

        if (pos) {
            // if (this.noPushTimer) this.noPushTimer.remove();

            apple.x = pos.x * this.GRID_SIZE;
            apple.y = pos.y * this.GRID_SIZE;

            // this.noPushTimer = this.time.addEvent({
            //     delay: this.SNAKE_TICK * 20,
            //     callback: this.repositionApple,
            //     args: [this.apple, -1],
            //     callbackScope: this
            // });
            return true;
        }
        else {
            // Run out of positions, time to reset!
            // Reset the list of apple positions
            this.currentApplePosition = 0;
            // Get the first one
            let pos = this.applePositions[this.currentApplePosition];
            // Position the apple
            apple.x = pos.x * this.GRID_SIZE;
            apple.y = pos.y * this.GRID_SIZE;
            // Reset the snake
            this.snake = [];
            this.snake.unshift(this.snakeHead);
            this.snakeBodyGroup.clear(true, true);
            this.snakeBitsToAdd = 3;
            this.score = 0;
            this.setScoreText(this.score.toString());
            return true;
        }
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
}