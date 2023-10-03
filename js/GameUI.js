class GameUI {
  constructor() {
    const canvas = document.querySelector('.game-screen');
    const ctx = canvas.getContext('2d');

    this.setWidth = (width) => {
      canvas.width = width;
    };

    this.setHeight = (height) => {
      canvas.height = height;
    };

    this.getWidth = () => {
      return canvas.width;
    };

    this.getHeight = () => {
      return canvas.height;
    };

    this.getCanvas = () => {
      return canvas;
    };

    this.show = () => {
      canvas.style.display = 'block';
    };

    this.hide = () => {
      canvas.style.display = 'none';
    };

    this.clear = (x, y, width, height) => {
      ctx.clearRect(x, y, width, height);
    };

    this.scrollWindow = (x, y) => {
      ctx.translate(x, y);
    };

    this.draw = (image, sx, sy, sWidth, sHeight, x, y, width, height) => {
      ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
    };

    this.makeBox = (x, y, width, height) => {
      ctx.rect(x, y, width, height);
      ctx.fillStyle = 'black';
      ctx.fill();
    };

    this.writeText = (text, x, y) => {
      ctx.font = '20px SuperMario256';
      ctx.fillStyle = 'white';
      ctx.fillText(text, x, y);
    };
  }

  static getInstance() {
    if (!GameUI.instance) {
      GameUI.instance = new GameUI();
    }
    return GameUI.instance;
  }
}


