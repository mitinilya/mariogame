class PowerUp {
  constructor() {
    this.gameUI = GameUI.getInstance();

    this.element = new Image();
    this.element.src = 'images/powerups.png';

    this.type; // тип
    this.x; // координаты
    this.y;
    this.velX = 2; // скорость по горизонтали
    this.velY = 0; // .. по вертикали
    this.grounded = false;
    this.sX; // координаты отображаемой части
    this.sY = 0;
    this.width = 32;
    this.height = 32;
  }

  mushroom(x, y) {
    this.x = x;
    this.y = y - this.height;
    this.type = 30;
    this.sX = 0;
  }

  flower(x, y) {
    this.x = x;
    this.y = y - this.height;
    this.type = 31;
    this.sX = 32;
  }

  draw() {
    this.gameUI.draw(this.element, this.sX, this.sY, this.width, this.height, this.x, this.y, this.width, this.height); // используем draw для отрисовки
  }

  update() {
    if (this.type == 30) {
      const gravity = 0.2;

      if (this.grounded) {
        this.velY = 0; // вертикальная скорость
      }

      this.velY += gravity; // считаем вертикальную скорость

      this.x += this.velX; // обновляем координаты
      this.y += this.velY;
    }
  }
}
