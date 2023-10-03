class Mario {
  constructor() {
    this.gameUI = GameUI.getInstance();
    this.type = 'small';
    this.x;
    this.y;
    this.width = 32;
    this.height = 44;
    this.speed = 3;
    this.velX = 0;
    this.velY = 0;
    this.jumping = false;
    this.grounded = false;
    this.invulnerable = false;
    this.sX = 0;
    this.sY = 4;
    this.frame = 0;
  }

  init() {
    this.x = 10;
    this.y = this.gameUI.getHeight() - 40 - 40;

    this.marioSprite = new Image();
    this.marioSprite.src = 'images/mario-sprites.png';
  }

  draw() {
    this.sX = this.width * this.frame;
    this.gameUI.draw(this.marioSprite, this.sX, this.sY, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  checkMarioType() {
    if (this.type == 'big') {
      this.height = 60;

      if (this.invulnerable) {
        this.sY = 276; 
      } else {
        this.sY = 90;
      }
    } else if (this.type == 'small') {
      this.height = 44;

      if (this.invulnerable) {
        this.sY = 222; 
      } else {
        this.sY = 4;
      }
    } 
  }

  resetPos() {
    this.x = canvas.width / 10;
    this.y = canvas.height - 40;
    this.frame = 0;
  }
}
