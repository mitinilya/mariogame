class Enemy {
  constructor() {
    this.gameUI = GameUI.getInstance();
    this.tickCounter = 0;
    this.maxTick = 10;
    this.element = new Image();
    this.element.src = 'images/enemies.png';

    this.x;
    this.y;
    this.velX = 1;
    this.velY = 0;
    this.grounded = false;
    this.type;
    this.state;

    this.sX;
    this.sY = 0;
    this.width = 32;
    this.height = 32;

    this.frame = 0;
  }

  goomba() {
    this.type = 20;
    this.sX = 0;
  }

  draw() {
    this.sX = this.width * this.frame;
    this.gameUI.draw(this.element, this.sX, this.sY, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  update() {
    const gravity = 0.2;

    if (this.grounded) {
      this.velY = 0;
    }

    if (this.state === 'dead') {
      this.frame = 2;
      this.tickCounter++;

      if (this.tickCounter >= 60) {
        this.frame = 4;
      }
    } else {
      this.velY += gravity;
      this.x += this.velX;
      this.y += this.velY;

      this.tickCounter++;

      if (this.tickCounter > this.maxTick) {
        this.tickCounter = 0;
        this.frame = this.frame === 0 ? 1 : 0;
      }
    }
  }
}
