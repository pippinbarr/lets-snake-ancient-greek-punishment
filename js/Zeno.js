class Zeno extends Snake {
    constructor(config) {
        super({
            key: "zeno"
        });

        this.SNAKE_START_X = 2;
        this.SNAKE_START_Y = 16;

        this.APPLE_START_X = 21;
        this.APPLE_START_Y = 16;

        this.CONTROLS_X = 2;
        this.CONTROLS_Y = 18;

        this.STARTING_SNAKE_TICK = this.SNAKE_TICK;
        this.STARTING_GRID_SIZE = this.GRID_SIZE;
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

        const snakeX = this.SNAKE_START_X * this.GRID_SIZE;
        const appleX = (this.APPLE_START_X - 1) * this.GRID_SIZE;
        this.halfway = this.getHalfWay(snakeX, appleX);
        console.log(this.halfway);
    }

    tick() {
        super.tick();

        if (this.snakeMoving() && !this.dead && this.snakeHead.x >= this.halfway) {
            this.GRID_SIZE /= 2;
            if (this.next.x > 0) {
                this.next.x = this.GRID_SIZE;
            }
            const snakeX = this.snakeHead.x;
            const appleX = this.apple.x - this.STARTING_GRID_SIZE;
            this.halfway = this.getHalfWay(snakeX, appleX);
        } else {
            this.SNAKE_TICK = this.STARTING_SNAKE_TICK;
        }

        this.ticker = this.time.addEvent({
            callback: this.tick,
            callbackScope: this,
            delay: 1000 * this.SNAKE_TICK,
        });
    }

    getHalfWay(a, b) {
        return (b - a) / 2 + a;
    }

    snakeMoving() {
        return (this.next.x !== 0 || this.next.y !== 0);
    }

    updateSnakePosition() {
        if (this.next.x == 0 && this.next.y == 0) {
            return;
        }

        this.moveSFX.play();

        this.snakeHead.x += this.next.x;
        this.snakeHead.y += this.next.y;

        for (let i = this.snake.length - 2; i >= 0; i--) {
            this.snake[i].x = this.snake[i + 1].x - this.STARTING_GRID_SIZE;
            this.snake[i].y = this.snake[i + 1].y;
        }

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
        this.GRID_SIZE = this.STARTING_GRID_SIZE;
        this.target = 0;
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
     * Controls
     */

    createControls() {
        let controlsStrings = [];
        if (this.sys.game.device.os.desktop) {
            controlsStrings = ["RIGHT", "ARROW", "CONTROLS"];
        }
        else {
            controlsStrings = ["RIGHT", "SWIPE", "CONTROLS"];
        }
        controlsStrings.push(this.strings[this.stateName].hero);

        this.addTextToGrid(this.CONTROLS_X, this.CONTROLS_Y, controlsStrings, this.controlsGroup);
        this.controlsVisible = true;
    }

    /**
 * Snake handling (haha)
 */

    left() {
    }

    right() {
        if (this.prev.x == 0) this.next = new Phaser.Geom.Point(this.GRID_SIZE, 0);
    }

    up() {
    }

    down() {
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