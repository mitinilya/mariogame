class Element {
  constructor() {
    this.gameUI = GameUI.getInstance();
    this.element = new Image();
    this.element.src = 'images/elements.png';
    this.type = undefined;
    this.sX = 0;
    this.sY = 0;
    this.x = undefined;
    this.y = undefined;
    this.width = 32;
    this.height = 32;
  }

  setElementProperties(type, sX) {
    this.type = type;
    this.sX = sX * this.width;
  }

  platform() {
    this.setElementProperties(1, 0);
  }

  coinBox() {
    this.setElementProperties(2, 1);
  }

  powerUpBox() {
    this.setElementProperties(3, 2);
  }

  uselessBox() {
    this.setElementProperties(4, 3);
  }

  flagPole() {
    this.setElementProperties(5, 4);
  }

  flag() {
    this.setElementProperties(6, 5);
  }

  pipeLeft() {
    this.setElementProperties(7, 6);
  }

  pipeRight() {
    this.setElementProperties(8, 7);
  }

  pipeTopLeft() {
    this.setElementProperties(9, 8);
  }

  pipeTopRight() {
    this.setElementProperties(10, 9);
  }

  draw() {
    this.gameUI.draw(this.element, this.sX, this.sY, this.width, this.height, this.x, this.y, this.width, this.height);
  }
}
