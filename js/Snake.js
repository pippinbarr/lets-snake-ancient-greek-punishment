class Snake extends Phaser.Scene {

    constructor(config = {}) {
        super({
            key: config.key ? config.key : `snake`
        });

        this.stateName = config.key ? config.key : `snake`;

        this.GRID_SIZE = 20;
        this.NUM_ROWS = 0;
        this.NUM_COLS = 0;
        this.FONT_SIZE = 24;
        this.SNAKE_START_LENGTH = 4;
        this.SNAKE_START_X = 11;
        this.SNAKE_START_Y = 11;
        this.SNAKE_TICK = 0.2;
        this.NEW_BODY_PIECES_PER_APPLE = 3;
        this.SNAKE_FLICKER_SPEED = 0.2;
        this.APPLE_SCORE = 10;
        this.MAX_SCORE = 9999999990;
        this.APPLE_DELAY = 1500;
        this.DEATH_DELAY = 3;

        this.CONTROLS_X = 8;
        this.CONTROLS_Y = 7;

        this.textGrid = [];

        this.score = 0;
        this.next = undefined;
        this.prev = undefined;
        this.bodyPiecesToAdd = 0;
        this.dead = false;

        this.snakeHead = undefined;
        this.snakeBodyGroup = undefined;
        this.wallGroup = undefined;
        this.apple = undefined;
    }

    init() {
        this.strings = this.cache.json.get(`strings`);
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);

        this.textGrid = [];
        this.dead = false;
        this.inputEnabled = true;

        this.NUM_ROWS = HEIGHT / this.GRID_SIZE;
        this.NUM_COLS = WIDTH / this.GRID_SIZE;


        this.instructionsButtonGroup = this.add.group();

        this.createWalls();
        this.createApple();
        this.createTexts();
        this.createSnake();
        this.createInput();

        this.moveSFX = this.sound.add('move', 0.2);
        this.hitSFX = this.sound.add('hit', 0.2);
        this.appleSFX = this.sound.add('apple', 0.2);

        // Set up for score
        this.score = 0;
        this.scoreX = this.NUM_COLS - 2;
        this.scoreY = 1;
        this.setScoreText(this.score.toString());

        // Set up for game over
        this.OVER_X = 4;
        this.OVER_Y = Math.floor(this.NUM_ROWS / 2) - 2;

        this.appleTimer = undefined;

        // Create the update tick
        this.ticker = this.time.addEvent({
            callback: this.tick,
            callbackScope: this,
            delay: 1000 * this.SNAKE_TICK,
            repeat: -1,
        })
    }

    update() {
        if (this.sys.game.device.os.desktop) {
            this.handleKeyboardInput();
        }
        else {
            this.handleTouchInput();
        }
    }

    tick() {
        this.prev = new Phaser.Geom.Point(this.next.x, this.next.y);

        if (this.dead) {
            this.flashSnake();
            return;
        }

        this.addSnakeBits();
        this.checkAppleCollision();
        this.checkBodyCollision();
        this.checkWallCollision();

        if (!this.dead) {
            this.updateSnakePosition();
        }
    }

    /**
     * Large-scale gameplay handling
     */


    gameOver() {
        this.setGameOverText(this.strings.ui.gameover, "", this.score + ` ${this.strings.ui.points}`, "", "");
    }

    gotoMenu() {
        // this.scene.start('Menu');
    }

    restart() {
        // this.scene.start(this.stateName);
    }

    startAppleTimer() {
        this.appleTimer = this.time.addEvent({
            delay: this.APPLE_DELAY,
            callback: this.repositionApple,
            args: [this.apple],
            callbackScope: this
        });
    }

    /**
     * Input handling
     */

    handleKeyboardInput() {
        if (this.rKey.isDown) {
            this.restart();
        }
        else if (this.mKey.isDown) {
            this.gotoMenu();
        }

        if (this.dead) return;
        if (!this.inputEnabled) return;

        if (this.controlsVisible && (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown)) {
            this.hideControls();
            this.startAppleTimer();
        }

        // Check which key is down and set the next direction appropriately
        if (this.cursors.left.isDown) {
            this.left();
        }
        else if (this.cursors.right.isDown) {
            this.right();
        }
        if (this.cursors.up.isDown) {
            this.up();
        }
        else if (this.cursors.down.isDown) {
            this.down();
        }
    }

    handleTouchInput() {
        // if (this.dead) return;
        // if (!this.inputEnabled) return;

        // let d = this.swipe.check();
        // if (!d) return;

        // if (this.controlsVisible) {
        //     this.hideControls();
        //     this.startAppleTimer();
        // }

        // switch (d.direction) {
        //     case this.swipe.DIRECTION_LEFT:
        //         this.left();
        //         break;

        //     case this.swipe.DIRECTION_RIGHT:
        //         this.right();
        //         break;

        //     case this.swipe.DIRECTION_UP:
        //         this.up();
        //         break;

        //     case this.swipe.DIRECTION_DOWN:
        //         this.down();
        //         break;
        // }
    }

    /**
     * Snake handling (haha)
     */

    left() {
        if (this.prev.x == 0) this.next = new Phaser.Geom.Point(-this.GRID_SIZE, 0);
    }

    right() {
        if (this.prev.x == 0) this.next = new Phaser.Geom.Point(this.GRID_SIZE, 0);
    }

    up() {
        if (this.prev.y == 0) this.next = new Phaser.Geom.Point(0, -this.GRID_SIZE);
    }

    down() {
        if (this.prev.y == 0) this.next = new Phaser.Geom.Point(0, this.GRID_SIZE);
    }

    die() {
        this.hitSFX.play();
        this.dead = true;
        this.lastNext = new Phaser.Geom.Point(this.next.x, this.next.y);
        this.next = new Phaser.Geom.Point(0, 0);
        this.time.addEvent({
            delay: 1000 * this.DEATH_DELAY,
            callback: this.gameOver,
            callbackScope: this
        });
    }

    flashSnake() {
        for (let bit of this.snake) {
            bit.visible = !bit.visible;
        }
    }

    addSnakeBits() {
        if (this.next.x == 0 && this.next.y == 0) return;

        if (this.snakeBitsToAdd > 0) {
            let bit = this.snakeBodyGroup.create(0, 0, 'body');
            bit.setOrigin(0, 0);
            this.snake.unshift(bit)
            this.snakeBitsToAdd = Math.max(0, this.snakeBitsToAdd - 1);
        }
    }

    updateSnakePosition() {
        if (this.next.x == 0 && this.next.y == 0) {
            return;
        }

        this.moveSFX.play();

        for (let i = 0; i < this.snake.length - 1; i++) {
            this.snake[i].x = this.snake[i + 1].x;
            this.snake[i].y = this.snake[i + 1].y;
        }
        this.snakeHead.x += this.next.x;
        this.snakeHead.y += this.next.y;

        if (this.snakeHead.x >= this.width) {
            this.snakeHead.x = this.GRID_SIZE;
        }
        else if (this.snakeHead.x < 0) {
            this.snakeHead.x = this.width - this.GRID_SIZE;
        }
        if (this.snakeHead.y >= this.height) {
            this.snakeHead.y = this.GRID_SIZE;
        }
        else if (this.snakeHead.y < 0) {
            this.snakeHead.y = this.height - this.GRID_SIZE;
        }
    }

    checkAppleCollision() {
        if (this.snakeHead.body.position.equals(this.apple.body.position)) {
            this.appleSFX.play();

            this.apple.x = -1000;
            this.apple.y = -1000;
            this.apple.visible = false;
            this.startAppleTimer();
            this.snakeBitsToAdd += this.NEW_BODY_PIECES_PER_APPLE;
            this.addToScore(this.APPLE_SCORE);
        }
    }

    checkBodyCollision() {
        this.snakeBodyGroup.children.each((bit) => {
            if (this.snakeHead.body.position.equals(bit.body.position)) {
                this.die();
                return;
            }
        }, this);
    }

    checkWallCollision() {
        this.wallGroup.children.each((wall) => {
            if (this.snakeHead.body.position.equals(wall.body.position)) {
                this.die();
                return;
            }
        }, this);
    }

    /**
     * Apple handling
     */

    repositionApple(apple) {
        if (!this.apple) return;
        if (!apple) apple = this.apple;

        apple.setVisible(true);

        let x = this.getRandomLocationWithin(this.WALL_LEFT + 1, this.WALL_RIGHT);
        let y = this.getRandomLocationWithin(this.WALL_TOP + 1, this.WALL_BOTTOM);

        let collisionCount = 0;
        let foundLocation = false;
        while (!foundLocation) {
            if (this.locationHasCollisionWithGroup(x * this.GRID_SIZE, y * this.GRID_SIZE, this.snakeBodyGroup)) {
                collisionCount++;
                if (collisionCount > 5) {
                    break;
                }
            }
            else {
                foundLocation = true;
                break;
            }
        }

        if (foundLocation) {
            apple.x = x * this.GRID_SIZE;
            apple.y = y * this.GRID_SIZE;
            return true;
        }
        else {
            this.appleTimer = this.time.addEvent({
                delay: this.APPLE_DELAY,
                callback: this.repositionApple,
                args: [this.apple],
                callbackScope: this
            });
            return false;
        }
    }

    locationHasCollisionWithGroup(x, y, group) {
        let collision = false;
        group.children.each((element) => {
            if (element.x == x && element.y == y) {
                collision = true;
                return;
            }
        });
        return collision;
    }

    getRandomLocationWithin(min, max) {
        return min + (Math.floor(Math.random() * (max - min)));
    }

    /**
     * UI handling
     */

    hideControls() {
        if (this.next.x == 0 && this.next.y == 0) {
            this.controlsGroup.children.each((letter) => {
                letter.text = '';
            });
            this.controlsVisible = false;
        }
    }

    addToScore(amount) {
        this.score = Math.min(this.score + amount, this.MAX_SCORE);
        this.setScoreText(this.score.toString());
    }

    setScoreText(scoreString) {
        if (scoreString.length < this.MAX_SCORE.toString().length) {
            let spacesToAdd = (this.MAX_SCORE.toString().length - scoreString.length) + 1;
            scoreString = Array(spacesToAdd).join(" ") + scoreString;
        }
        this.addTextToGrid(this.scoreX - scoreString.length, this.scoreY, [scoreString]);
    }

    setGameOverText(gameOverString, spacing, gameOverPointsString, spacing2, gameOverResultString) {
        this.addTextToGrid(this.OVER_X, this.OVER_Y, [gameOverString, spacing, gameOverPointsString, spacing2, gameOverResultString]);
    }

    addTextToGrid(startX, startY, text, group, buttonGroup, callback) {
        let x = startX;
        let y = startY;

        for (let i = 0; i < text.length; i++) {
            x = startX;
            for (let j = 0; j < text[i].length; j++) {
                this.textGrid[y][x].text = text[i].charAt(j);
                if (group) {
                    group.add(this.textGrid[y][x]);
                }
                if (buttonGroup) {
                    let sprite = buttonGroup.create(x * this.GRID_SIZE, y * this.GRID_SIZE, 'black');
                    sprite.inputEnabled = true;
                    sprite.name = text;
                    sprite.events.onInputDown.add(callback, this);
                }
                x++;
            }
            y++;
        }
    }




    /**
     * create() helpers
     */

    createWalls() {
        // Create the walls
        this.WALL_LEFT = 1;
        this.WALL_RIGHT = this.NUM_COLS - 2;
        this.WALL_TOP = 3;
        this.WALL_BOTTOM = this.NUM_ROWS - this.WALL_TOP - 1;

        this.wallGroup = this.physics.add.group();
        for (let y = this.WALL_TOP; y <= this.WALL_BOTTOM; y++) {
            for (let x = this.WALL_LEFT; x <= this.WALL_RIGHT; x++) {
                if (y == this.WALL_TOP || y == this.WALL_BOTTOM || x == this.WALL_LEFT || x == this.WALL_RIGHT) {
                    let wall = this.wallGroup.create(x * this.GRID_SIZE, y * this.GRID_SIZE, 'wall')
                    wall.setOrigin(0, 0);
                }
            }
        }
    }

    createApple() {
        this.apple = this.physics.add.image(-100, -100, 'apple');
        this.apple.setOrigin(0, 0);
    }

    createTexts() {
        this.instructionsGroup = this.add.group();
        this.controlsGroup = this.add.group();

        this.createTextGrid();
        // this.createInstructions();
        this.createControls();
    }

    createTextGrid() {
        this.textGroup = this.add.group();
        for (let y = 0; y < this.NUM_ROWS; y++) {
            this.textGrid.push([]);
            for (let x = 0; x < this.NUM_COLS; x++) {
                let char = this.add.text(this.GRID_SIZE * 0.5 + x * this.GRID_SIZE, y * this.GRID_SIZE, ' ', {
                    fill: `white`,
                    fontSize: this.FONT_SIZE * 0.75,
                    textAlign: `center`
                });
                this.textGroup.add(char);
                char.setOrigin(0.5, 0);
                char.tint = 0xffffff;
                char.scaleY = 24 / this.FONT_SIZE;
                this.textGrid[y].push(char);
            }
        }
    }

    createInstructions() {
        let instructionsY = this.NUM_ROWS - 2;
        let instructionsX = 1;

        if (this.sys.game.device.os.desktop) {
            this.addTextToGrid(instructionsX, instructionsY, this.strings.ui.reset.keyboard, this.textGroup);
        }
        else {
            this.addTextToGrid(instructionsX, instructionsY, this.strings.ui.reset.touch.restart, this.textGroup, this.instructionsButtonGroup, this.restart);
            this.addTextToGrid(instructionsX + 9, instructionsY, this.strings.ui.reset.touch.menu, this.textGroup, this.instructionsButtonGroup, this.gotoMenu);
        }
    }

    createControls() {
        let controlsStrings = [];
        if (this.sys.game.device.os.desktop) {
            controlsStrings = this.strings.ui.controls.keyboard;
        }
        else {
            controlsStrings = this.strings.ui.controls.touch;
        }
        controlsStrings.push(this.strings[this.stateName].hero);

        this.addTextToGrid(this.CONTROLS_X, this.CONTROLS_Y, controlsStrings, this.controlsGroup);
        this.controlsVisible = true;
    }

    createSnake() {
        this.snake = [];
        this.snakeBodyGroup = this.physics.add.group();
        this.snakeHead = this.physics.add.image(this.SNAKE_START_X * this.GRID_SIZE, this.SNAKE_START_Y * this.GRID_SIZE, 'head');
        this.snakeHead.setOrigin(0, 0);
        this.snake.unshift(this.snakeHead);

        this.snakeBitsToAdd = 3;
    }

    createInput() {
        if (this.sys.game.device.os.desktop) {
            this.cursors = this.input.keyboard.createCursorKeys();
            this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
            this.mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
            // this.input.keyboard.removeCapture(Phaser.Input.Keyboard.R)
            // this.input.keyboard.removeCapture(Phaser.Input.Keyboard.M)
        }
        else {
            // this.swipe = new Swipe(this.;
            // this.swipe.diagonalDisabled = true;
        }
        this.next = new Phaser.Geom.Point(0, 0);
    }
}