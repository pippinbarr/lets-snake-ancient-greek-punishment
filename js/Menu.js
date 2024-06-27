class Menu extends Snake {

  constructor(config) {
    super({
      key: `menu`
    });

    this.SNAKE_START_X = 0;
    this.SNAKE_START_Y = 8;
  }

  create() {
    super.create();

    this.title = this.strings.title;

    this.games = [];
    for (let game of this.strings.ui.games) {
      this.games.push({
        title: this.strings[game].hero,
        state: game
      });
    }

    this.menuButtons = this.add.group();
    this.menuText = this.add.group();

    this.createMenu();

    this.setScoreText("");
  }

  createMenu() {
    const titleX = 2;
    const titleY = 3
    console.log(this.title)
    this.addTextToGrid(titleX, titleY, this.title);

    const menuTop = 8;
    let x = 2;
    let y = menuTop;

    console.log(this.games);
    for (let game of this.games) {
      console.log(game);
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

  update(time, delta) {

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