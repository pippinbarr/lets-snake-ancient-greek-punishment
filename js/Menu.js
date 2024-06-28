class Menu extends Snake {

  constructor(config) {
    super({
      key: `menu`
    });

    this.SNAKE_TICK = 0.03;
    this.SNAKE_START_X = 0;
    this.SNAKE_START_Y = 8;
  }

  create() {
    super.create();

    this.title = this.strings.title;

    this.games = [];
    let index = 0;
    for (let game of this.strings.ui.games) {
      this.games.push({
        index: index,
        title: this.strings[game].hero,
        state: game
      });
      index++;
    };
    this.selected = 0;

    this.menuButtons = this.add.group();
    this.menuText = this.add.group();
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.createMenu();

    this.setScoreText("");
    this.snakeBitsToAdd = 20;
  }

  tick() {
    this.addSnakeBits();
    this.updateSnakePosition();
  }

  handleKeyboardInput() {
    if (this.transition) return;

    if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      if (this.selected > 0) {
        this.selected--;
        this.snakeHead.y -= this.GRID_SIZE;
      }
    }
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      if (this.selected < this.games.length - 1) {
        this.selected++;
        this.snakeHead.y += this.GRID_SIZE;
      }
    }

    if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.next = new Phaser.Geom.Point(this.GRID_SIZE, 0);
      this.transition = true;
      this.time.addEvent({
        delay: 1500,
        callback: () => {
          this.scene.start(this.games[this.selected].state);
        }
      })
    }
  }

  /**
   * Create stuff
   */

  createMenu() {
    const titleX = 2;
    const titleY = 3
    this.addTextToGrid(titleX, titleY, this.title);

    const menuTop = 8;
    let x = 2;
    let y = menuTop;

    for (let game of this.games) {
      this.addTextToGrid(x, y, [game.title], this.menuText)//, this.menuButtons, this.menuItemTouched);
      y++;
    }

    const menuBottom = menuTop + this.games.length - 1;

    let instructions = "OH NO."
    if (this.sys.game.device.os.desktop) {
      instructions = this.strings.menu.instructions.keyboard;
    }
    else {
      instructions = this.strings.menu.instructions.touch;
    }
    this.addTextToGrid(x, this.NUM_ROWS - 3, instructions);
  }

  createControls() {

  }

  menuItemTouched() {
    this.appleSFX.play();

    if (this.selected) return;

    for (let i = 0; i < this.snake.length; i++) {
      this.snake[i].y = item.y;
    }

    this.selectMenuItem();
  }

  createWalls() {
    this.wallGroup = this.physics.add.group();
  }
}