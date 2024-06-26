const EagleState = {
    IDLE: "idle",
    INCOMING: "incoming",
    FLAP_UP: "flap_up",
    HOVERING: "hovering",
    PAUSING: "pausing",
    LEAVING: "leaving"
};

class Prometheus extends Snake {
    constructor(config) {
        super({
            key: "prometheus"
        });

        this.SNAKE_START_X = 13;
        this.SNAKE_START_Y = 20;

        this.EAGLE_START_X = 1;
        this.EAGLE_START_Y = 9;

        this.EAGLE_DELAY = 1;

        this.CONTROLS_X = 4;
        this.CONTROLS_Y = 8;

        this.struggled = false;
    }

    create() {
        super.create();

        this.createEagle();
        this.createNight();

        this.eagleTicker = this.time.addEvent({
            callback: this.eagleTick,
            callbackScope: this,
            delay: 1000 * this.SNAKE_TICK * 2,
            repeat: -1,
        })


    }

    tick() {
        super.tick();
    }

    eagleTick() {
        this.updateEagle();
    }

    updateEagle() {
        switch (this.eagle.state) {
            case EagleState.INCOMING:
                this.eagle.x += this.GRID_SIZE;
                this.eagle.y += this.GRID_SIZE;

                // Check for kill
                if (this.eagle.y === this.SNAKE_START_Y * this.GRID_SIZE) {
                    this.die();
                    this.eagle.state = EagleState.PAUSING;
                    this.time.addEvent({
                        delay: this.SNAKE_TICK * 1000 * 5,
                        callback: () => {
                            this.eagle.state = EagleState.LEAVING;
                        }
                    });
                }
                break;

            case EagleState.FLAP_UP:
                this.eagle.y -= this.GRID_SIZE;

                if (this.eagle.y < this.SNAKE_START_Y * this.GRID_SIZE - 3 * this.GRID_SIZE) {
                    this.eagle.state = EagleState.HOVERING;
                    this.time.addEvent({
                        delay: this.SNAKE_TICK * 1000 * 10,
                        callback: () => {
                            this.eagle.state = EagleState.FLAP_DOWN;
                        }
                    });
                }
                break;

            case EagleState.FLAP_DOWN:
                this.eagle.y += this.GRID_SIZE;
                // Check for kill
                if (this.eagle.y === this.SNAKE_START_Y * this.GRID_SIZE) {
                    this.die();
                    this.eagle.state = EagleState.PAUSING;
                    this.time.addEvent({
                        delay: this.SNAKE_TICK * 1000 * 5,
                        callback: () => {
                            this.eagle.state = EagleState.LEAVING;
                        }
                    });
                }
                break;

            case EagleState.HOVERING:
                break;

            case EagleState.PAUSING:
                break;

            case EagleState.LEAVING:
                this.eagle.x += this.GRID_SIZE;
                this.eagle.y -= this.GRID_SIZE;

                if (this.eagle.x === this.WALL_RIGHT * this.GRID_SIZE) {
                    this.eagle.x = -100;
                    this.eagle.state = EagleState.IDLE;
                    this.time.addEvent({
                        delay: this.SNAKE_TICK * 1000 * 10,
                        callback: () => {
                            this.night.setVisible(true);
                            this.time.addEvent({
                                delay: this.SNAKE_TICK * 1000 * 10,
                                callback: () => {
                                    this.dead = false;
                                    for (let bit of this.snake) {
                                        bit.visible = true;
                                    }
                                    this.night.setVisible(false);
                                    this.time.addEvent({
                                        delay: this.SNAKE_TICK * 1000 * 10,
                                        callback: () => {
                                            this.startEagle();
                                        }
                                    });
                                }
                            });
                        }
                    });

                }

        }
    }

    struggle() {
        if (this.snakeHead.y === this.SNAKE_START_Y * this.GRID_SIZE) {
            this.struggled = true;
            // Check effect on eagle
            if (!this.dead && this.eagle.y === this.snakeHead.y - this.GRID_SIZE) {
                this.eagle.state = EagleState.FLAP_UP;
            }
        }
    }

    die() {
        this.hitSFX.play();
        this.dead = true;
        this.next = new Phaser.Geom.Point(0, 0);
    }

    startAppleTimer() {
        this.startEagleTimer();
    }

    startEagleTimer() {
        // Start the timer
        this.eagleTimer = this.time.addEvent({
            delay: this.EAGLE_DELAY * 1000,
            callback: this.startEagle,
            callbackScope: this
        });
    }

    startEagle() {
        this.eagle.x = this.EAGLE_START_X * this.GRID_SIZE;
        this.eagle.y = this.EAGLE_START_Y * this.GRID_SIZE;

        this.eagle.state = EagleState.INCOMING;
    }

    updateSnakePosition() {
        if (this.struggled) {
            this.snakeHead.y -= this.GRID_SIZE;
            for (let bit of this.snake) {
                if (bit !== this.snakeHead) {
                    bit.x += this.GRID_SIZE;
                }
            }
            this.struggled = false;
        }
        else if (this.snakeHead.y != this.SNAKE_START_Y * this.GRID_SIZE) {
            this.snakeHead.y += this.GRID_SIZE;
            for (let bit of this.snake) {
                if (bit !== this.snakeHead) {
                    bit.x -= this.GRID_SIZE;
                }
            }
        }
    }

    /**
     * Movement
     */

    up() {
        this.struggle();
    }

    down() {
        this.struggle()
    }

    left() {
        this.struggle()
    }

    right() {
        this.struggle()
    }

    /**
     * Create functions
     */

    createEagle() {
        this.eagle = this.physics.add.image(-100, -100, `wall`);
        this.eagle.setOrigin(0, 0);
        this.eagle.state = EagleState.IDLE;
    }

    createNight() {
        this.night = this.add.graphics();
        this.night.fillStyle(0x000000, 0.9);
        this.night.fillRect(0, 0, WIDTH, HEIGHT);
        this.night.setVisible(false);
    }

    createSnake() {
        super.createSnake();

        let x = this.snakeHead.x;
        let y = this.snakeHead.y;
        for (let i = 1; i <= 3; i++) {
            let bit = this.snakeBodyGroup.create(x - i * this.GRID_SIZE, y, 'body');
            bit.setOrigin(0, 0);
            this.snake.unshift(bit)
        }

        this.snakeBitsToAdd = 0;
    }

    createWalls() {
        // Create the walls
        this.WALL_LEFT = 1;
        this.WALL_RIGHT = this.NUM_COLS - 2;
        this.WALL_TOP = 3;
        this.WALL_BOTTOM = this.NUM_ROWS - this.WALL_TOP - 1;

        let WALLS = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
            [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
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
}