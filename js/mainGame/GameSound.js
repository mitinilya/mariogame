class GameSound {
  constructor() {
 
    this.coin = new Audio('sounds/coin.wav');
    this.powerUpAppear = new Audio('sounds/power-up-appear.wav');
    this.powerUp = new Audio('sounds/power-up.wav');
    this.marioDie = new Audio('sounds/mario-die.wav');
    this.killEnemy = new Audio('sounds/kill-enemy.wav');
    this.stageClear = new Audio('sounds/stage-clear.wav');
    this.powerDown = new Audio('sounds/power-down.wav');
    this.jump = new Audio('sounds/jump.wav');
    
  }

  play(element) {
    if (element == 'coin') {
      this.coin.pause();
      this.coin.currentTime = 0;
      this.coin.play();
    } else if (element == 'powerUpAppear') {
      this.powerUpAppear.pause();
      this.powerUpAppear.currentTime = 0;
      this.powerUpAppear.play();
    } else if (element == 'powerUp') {
      this.powerUp.pause();
      this.powerUp.currentTime = 0;
      this.powerUp.play();
    } else if (element == 'marioDie') {
      this.marioDie.pause();
      this.marioDie.currentTime = 0;
      this.marioDie.play();
    } else if (element == 'killEnemy') {
      this.killEnemy.pause();
      this.killEnemy.currentTime = 0;
      this.killEnemy.play();
    } else if (element == 'stageClear') {
      this.stageClear.pause();
      this.stageClear.currentTime = 0;
      this.stageClear.play();
    } else if (element == 'powerDown') {
      this.powerDown.pause();
      this.powerDown.currentTime = 0;
      this.powerDown.play();
    } else if (element == 'jump') {
      this.jump.pause();
      this.jump.currentTime = 0;
      this.jump.play();
    }
  }
};