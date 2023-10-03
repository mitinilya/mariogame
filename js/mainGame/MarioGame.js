class MarioGame {
  constructor() {
    this.gameUI = GameUI.getInstance();
    this.maxWidth = 0;
    this.height = 480;
    this.viewPort = 1280;
    this.tileSize = 32;
    this.map = null;
    this.originalMaps = null;
    this.backgroundMusic = null;
    this.translatedDist = 0;
    this.centerPos = null;
    this.marioInGround = null;
    this.mario = null;
    this.element = null;
    this.gameSound = null;
    this.score = null;
    this.keys = [];
    this.goombas = [];
    this.powerUps = [];
    this.currentLevel = null;
    this.animationID = null;
    this.timeOutId = null;
    this.tickCounter = 0;
    this.maxTick = 25;
  }

  init(levelMaps, level) {
    this.backgroundMusic = new Audio('sounds/music-mario.wav');
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.2;
    this.backgroundMusic.addEventListener('ended', () => {
      this.backgroundMusic.currentTime = 0;
      this.backgroundMusic.play();
    }, false);
    this.backgroundMusic.play();

    this.height = 480;
    this.maxWidth = 0;
    this.viewPort = 1280;
    this.tileSize = 32;
    this.translatedDist = 0;
    this.goombas = [];
    this.powerUps = [];

    this.gameUI.setWidth(this.viewPort);
    this.gameUI.setHeight(this.height);
    this.gameUI.show();

    this.currentLevel = level;
    this.originalMaps = levelMaps;

    this.map = JSON.parse(this.originalMaps[this.currentLevel]);

    if (!this.score) {
      this.score = new Score();
      this.score.init();
    }
    this.score.displayScore();
    this.score.updateLevelNum(this.currentLevel);

    if (!this.mario) {
      this.mario = new Mario();
      this.mario.init();
    } else {
      this.mario.x = 10;
      this.mario.frame = 0;
    }
    this.element = new Element();
    this.gameSound = new GameSound();

    this.calculateMaxWidth();
    this.bindKeyPress();
    this.startGame();
  }

  stopBackgroundMusic() {
    if (this.backgroundMusic) {
      this.backgroundMusic.pause();
    }
  }

  calculateMaxWidth() {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        if (this.maxWidth < this.map[row].length) {
          this.maxWidth = this.map[column].length * 32;
        }
      }
    }
  }

  bindKeyPress() {
    const canvas = this.gameUI.getCanvas();

    document.body.addEventListener('keydown', (e) => {
      this.keys[e.keyCode] = true;
    });

    document.body.addEventListener('keyup', (e) => {
      this.keys[e.keyCode] = false;
    });
  };

  startGame() {
    this.animationID = window.requestAnimationFrame(this.startGame.bind(this));

    this.gameUI.clear(0, 0, this.maxWidth, this.height);

    this.renderMap();

    for (let i = 0; i < this.powerUps.length; i++) {
      this.powerUps[i].draw();
      this.powerUps[i].update();
    }

    for (let i = 0; i < this.goombas.length; i++) {
      this.goombas[i].draw();
      this.goombas[i].update();
    }

    this.checkPowerUpMarioCollision();
    this.checkEnemyMarioCollision();
    this.mario.draw();
    this.updateMario();
    this.wallCollision();
    this.marioInGround = this.mario.grounded;
  }

  renderMap() {
    this.mario.grounded = false;

    for (let i = 0; i < this.powerUps.length; i++) {
      this.powerUps[i].grounded = false;
    }
    for (let i = 0; i < this.goombas.length; i++) {
      this.goombas[i].grounded = false;
    }

    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        switch (this.map[row][column]) {
          case 1:
            this.element.x = column * this.tileSize;
            this.element.y = row * this.tileSize;
            this.element.platform();
            this.element.draw();

            this.checkElementMarioCollision(this.element, row, column);
            this.checkElementPowerUpCollision(this.element);
            this.checkElementEnemyCollision(this.element);

            break;

          case 2:
            this.element.x = column * this.tileSize;
            this.element.y = row * this.tileSize;
            this.element.coinBox();
            this.element.draw();

            this.checkElementMarioCollision(this.element, row, column);
            this.checkElementPowerUpCollision(this.element);
            this.checkElementEnemyCollision(this.element);

            break;

          case 3:
            this.element.x = column * this.tileSize;
            this.element.y = row * this.tileSize;
            this.element.powerUpBox();
            this.element.draw();

            this.checkElementMarioCollision(this.element, row, column);
            this.checkElementPowerUpCollision(this.element);
            this.checkElementEnemyCollision(this.element);

            break;

          case 4:
            this.element.x = column * this.tileSize;
            this.element.y = row * this.tileSize;
            this.element.uselessBox();
            this.element.draw();

            this.checkElementMarioCollision(this.element, row, column);
            this.checkElementPowerUpCollision(this.element);
            this.checkElementEnemyCollision(this.element);

            break;

          case 5:
            this.element.x = column * this.tileSize;
            this.element.y = row * this.tileSize;
            this.element.flagPole();
            this.element.draw();

            this.checkElementMarioCollision(this.element, row, column);
            break;

          case 6:
            this.element.x = column * this.tileSize;
            this.element.y = row * this.tileSize;
            this.element.flag();
            this.element.draw();
            break;

          case 7:
            this.element.x = column * this.tileSize;
            this.element.y = row * this.tileSize;
            this.element.pipeLeft();
            this.element.draw();

            this.checkElementMarioCollision(this.element, row, column);
            this.checkElementPowerUpCollision(this.element);
            this.checkElementEnemyCollision(this.element);

            break;

          case 8:
            this.element.x = column * this.tileSize;
            this.element.y = row * this.tileSize;
            this.element.pipeRight();
            this.element.draw();

            this.checkElementMarioCollision(this.element, row, column);
            this.checkElementPowerUpCollision(this.element);
            this.checkElementEnemyCollision(this.element);

            break;

          case 9:
            this.element.x = column * this.tileSize;
            this.element.y = row * this.tileSize;
            this.element.pipeTopLeft();
            this.element.draw();

            this.checkElementMarioCollision(this.element, row, column);
            this.checkElementPowerUpCollision(this.element);
            this.checkElementEnemyCollision(this.element);

            break;

          case 10:
            this.element.x = column * this.tileSize;
            this.element.y = row * this.tileSize;
            this.element.pipeTopRight();
            this.element.draw();

            this.checkElementMarioCollision(this.element, row, column);
            this.checkElementPowerUpCollision(this.element);
            this.checkElementEnemyCollision(this.element);

            break;

          case 20:
            const enemy = new Enemy();
            enemy.x = column * this.tileSize;
            enemy.y = row * this.tileSize;
            enemy.goomba();
            enemy.draw();

            this.goombas.push(enemy);
            this.map[row][column] = 0;
        }
      }
    }
  }

  collisionCheck(objA, objB) {
    //векторы будут использоваться для определения, насколько близко находятся объекты друг к другу.
    var vX = objA.x + objA.width / 2 - (objB.x + objB.width / 2);
    var vY = objA.y + objA.height / 2 - (objB.y + objB.height / 2);

    //вычисляются половины ширины (hWidths) и высоты (hHeights) каждого из объектов. Эти значения также используются для определения столкновений.
    var hWidths = objA.width / 2 + objB.width / 2;
    var hHeights = objA.height / 2 + objB.height / 2;
    var collisionDirection = null; //для определения направления столкновения

    //условие проверяет, находятся ли объекты настолько близко друг к другу, что возможно столкновение.
    //Если разница между vX и vY меньше половины ширины и высоты обоих объектов (hWidths и hHeights), 
    //то это означает возможное столкновение.
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      
      var offsetX = hWidths - Math.abs(vX);
      var offsetY = hHeights - Math.abs(vY);

      if (offsetX >= offsetY) {//(разница по X больше или равна разнице по Y), то проверяется, в какой части объекта произошло столкновение:
       //Если vY > 0 (объект objA находится выше объекта objB) и vY меньше 37 (значение выбрано мнобю), то произошло столкновение с верхней стороны ('t' - top).
      //Если vY < 0 (объект objA находится ниже объекта objB), то произошло столкновение с нижней стороны ('b' - bottom).
        if (vY > 0 && vY < 37) {
          collisionDirection = 't';
          if (objB.type != 5) {
           
            objA.y += offsetY;
          }
        } else if (vY < 0) {
          collisionDirection = 'b';
          if (objB.type != 5) { //objB - это объект, с которым проверяется столкновение, а objB.type представляет тип этого объекта. 
            //В данном контексте используется проверка, что тип объекта objB не равен 5.
            
            objA.y -= offsetY;
          }
        }
      } else {
        //Если offsetX < offsetY, то объекты сталкиваются с боковой стороны:
        //Если vX > 0, то произошло столкновение с левой стороны ('l' - left).
        //Если vX < 0, то произошло столкновение с правой стороны ('r' - right).
        if (vX > 0) {
          collisionDirection = 'l';
          objA.x += offsetX;
        } else {
          collisionDirection = 'r';
          objA.x -= offsetX;
        }
      }
    }
    return collisionDirection;
  };

  checkElementMarioCollision(element, row, column) {
    const collisionDirection = this.collisionCheck(this.mario, element);

    if (collisionDirection === 'l' || collisionDirection === 'r') {
      this.mario.velX = 0;
      this.mario.jumping = false;

      if (element.type === 5) {
        this.levelFinish(collisionDirection);
      }
    } else if (collisionDirection === 'b') {
      if (element.type !== 5) {
        this.mario.grounded = true;
        this.mario.jumping = false;
      }
    } else if (collisionDirection === 't') {
      if (element.type !== 5) {
        this.mario.velY *= -1;

        if (element.type === 3) {
          const powerUp = new PowerUp();

          if (this.mario.type === 'small') {
            powerUp.mushroom(element.x, element.y);
            this.powerUps.push(powerUp);
          } else {
            powerUp.flower(element.x, element.y);
            this.powerUps.push(powerUp);
          }

          this.map[row][column] = 4;
          this.gameSound.play('powerUpAppear');
        }

        if (element.type === 11) {
          const powerUp = new PowerUp();
          powerUp.flower(element.x, element.y);
          this.powerUps.push(powerUp);
          this.map[row][column] = 4;
          this.gameSound.play('powerUpAppear');
        }

        if (element.type === 2) {
          this.score.coinScore++;
          this.score.totalScore += 100;
          this.score.updateCoinScore();
          this.score.updateTotalScore();
          this.map[row][column] = 4;
          this.gameSound.play('coin');
        }
      }
    }
  }

  checkElementPowerUpCollision(element) {
    for (let i = 0; i < this.powerUps.length; i++) {
      const collisionDirection = this.collisionCheck(this.powerUps[i], element);

      if (collisionDirection === 'l' || collisionDirection === 'r') {
        this.powerUps[i].velX *= -1;
      } else if (collisionDirection === 'b') {
        this.powerUps[i].grounded = true;
      }
    }
  }

  checkElementEnemyCollision(element) {
    for (let i = 0; i < this.goombas.length; i++) {
      const collisionDirection = this.collisionCheck(this.goombas[i], element);

      if (collisionDirection === 'l' || collisionDirection === 'r') {
        this.goombas[i].velX *= -1;
      } else if (collisionDirection === 'b') {
        this.goombas[i].grounded = true;
      }
    }
  };



  checkPowerUpMarioCollision() {
    for (let i = 0; i < this.powerUps.length; i++) {
      const collWithMario = this.collisionCheck(this.powerUps[i], this.mario);
      if (collWithMario) {
        if (this.powerUps[i].type === 30 && this.mario.type === 'small') {
          this.mario.type = 'big';
        }
        this.powerUps.splice(i, 1);
        this.score.totalScore += 1000;
        this.score.updateTotalScore();
        this.gameSound.play('powerUp');
      }
    }
  }

  checkEnemyMarioCollision() {
    for (let i = 0; i < this.goombas.length; i++) {
      if (!this.mario.invulnerable && this.goombas[i].state !== 'dead') {
        let collWithMario = this.collisionCheck(this.goombas[i], this.mario);
  
        if (collWithMario === 't') {
          this.goombas[i].state = 'dead';
          this.mario.velY = -this.mario.speed;
          this.score.totalScore += 1000;
          this.score.updateTotalScore();
          this.gameSound.play('killEnemy');
        } else if (collWithMario === 'r' || collWithMario === 'l' || collWithMario === 'b') {
          this.goombas[i].velX *= -1;
  
          if (this.mario.type === 'big') {
            this.mario.type = 'small';
            this.mario.invulnerable = true;
            collWithMario = undefined;
  
            this.gameSound.play('powerDown');
  
            setTimeout(() => {
              this.mario.invulnerable = false;
            }, 1000);
          } else if (this.mario.type === 'small') {
            this.pauseGame();
            this.mario.frame = 13;
            collWithMario = undefined;
            this.score.lifeCount--;
            this.score.updateLifeCount();
            this.backgroundMusic.pause();
            this.gameSound.play('marioDie');
  
            this.timeOutId = setTimeout(() => {
              if (this.score.lifeCount === 0) {
                this.gameOver();
              } else {
                this.resetGame();
              }
            }, 3000);
            break;
          }
        }
      }
    }
  };
  
  wallCollision() {
    if (this.mario.x >= this.maxWidth - this.mario.width) {
      this.mario.x = this.maxWidth - this.mario.width;
    } else if (this.mario.x <= this.translatedDist) {
      this.mario.x = this.translatedDist + 1;
    }

    if (this.mario.y >= this.height) {
      this.pauseGame();
      this.backgroundMusic.pause();
      this.gameSound.play('marioDie');
      this.score.lifeCount--;
      this.score.updateLifeCount();
      this.timeOutId = setTimeout(() => {
        if (this.score.lifeCount === 0) {
          this.gameOver();
        } else {
          this.resetGame();
        }
      }, 3000);
    }
  }

  updateMario() {
    const friction = 0.9;
    const gravity = 0.2;
    this.mario.checkMarioType();

    if (this.keys[87] || this.keys[32]) {
      if (!this.mario.jumping && this.mario.grounded) {
        this.mario.jumping = true;
        this.mario.grounded = false;
        this.mario.velY = -(this.mario.speed / 2 + 5.5);

        if (this.mario.frame === 0 || this.mario.frame === 1) {
          this.mario.frame = 3;
        } else if (this.mario.frame === 8 || this.mario.frame === 9) {
          this.mario.frame = 2;
        }

        this.gameSound.play('jump');
      }
    }

    if (this.keys[68]) {
      this.checkMarioPos();

      if (this.mario.velX < this.mario.speed) {
        this.mario.velX++;
      }

      if (!this.mario.jumping) {
        this.tickCounter += 1;

        if (this.tickCounter > this.maxTick / this.mario.speed) {
          this.tickCounter = 0;

          if (this.mario.frame !== 1) {
            this.mario.frame = 1;
          } else {
            this.mario.frame = 0;
          }
        }
      }
    }

    if (this.keys[65]) {
      if (this.mario.velX > -this.mario.speed) {
        this.mario.velX--;
      }

      if (!this.mario.jumping) {
        this.tickCounter += 1;

        if (this.tickCounter > this.maxTick / this.mario.speed) {
          this.tickCounter = 0;

          if (this.mario.frame !== 9) {
            this.mario.frame = 9;
          } else {
            this.mario.frame = 8;
          }
        }
      }
    }

    if (this.keys[16]) {
      this.mario.speed = 8;
    } else {
      this.mario.speed = 5;
    }

    if (this.mario.velX > 0 && this.mario.velX < 1 && !this.mario.jumping) {
      this.mario.frame = 0;
    } else if (this.mario.velX > -1 && this.mario.velX < 0 && !this.mario.jumping) {
      this.mario.frame = 8;
    }

    if (this.mario.grounded) {
      this.mario.velY = 0;

      if (this.mario.frame === 3) {
        this.mario.frame = 0;
      } else if (this.mario.frame === 2) {
        this.mario.frame = 8;
      }
    }

    this.mario.velX *= friction;
    this.mario.velY += gravity;

    this.mario.x += this.mario.velX;
    this.mario.y += this.mario.velY;
  }

  checkMarioPos() {
    this.centerPos = this.translatedDist + this.viewPort / 2;

    if (this.mario.x > this.centerPos && this.centerPos + this.viewPort / 2 < this.maxWidth) {
      this.gameUI.scrollWindow(-this.mario.speed, 0);
      this.translatedDist += this.mario.speed;
    }
  }

  levelFinish(collisionDirection) {
    if (collisionDirection === 'r') {
      this.mario.x += 10;
      this.mario.velY = 2;
      this.mario.frame = 11;
    } else if (collisionDirection === 'l') {
      this.mario.x -= 32;
      this.mario.velY = 2;
      this.mario.frame = 10;
    }

    if (this.marioInGround) {
      this.mario.x += 20;
      this.mario.frame = 10;
      this.tickCounter += 1;
      if (this.tickCounter > this.maxTick) {
        this.pauseGame();
        this.mario.x += 10;
        this.tickCounter = 0;
        this.mario.frame = 12;
        this.gameSound.play('stageClear');
        this.backgroundMusic.pause();

        this.timeOutId = setTimeout(() => {
          this.currentLevel++;
          if (this.originalMaps[this.currentLevel]) {
            this.init(this.originalMaps, this.currentLevel);
            this.score.updateLevelNum(this.currentLevel);
          } else {
            this.gameOver();
          }
        }, 5000);
      }
    }
  };
  pauseGame() {
    window.cancelAnimationFrame(this.animationID);
  }

  gameOver() {
    this.backgroundMusic.pause();
    this.score.gameOverView();
    this.gameUI.makeBox(0, 0, this.maxWidth, this.height);
    this.gameUI.writeText('Game Over', this.centerPos - 80, this.height - 300);
    this.gameUI.writeText('Thanks For Playing', this.centerPos - 122, this.height / 2);
  }

  resetGame() {
    this.clearInstances();
    this.init(this.originalMaps, this.currentLevel);
  }

  clearInstances() {
    this.mario = null;
    this.element = null;
    this.gameSound = null;
    this.goombas = [];
    this.powerUps = [];
  }

  clearTimeOut() {
    clearTimeout(this.timeOutId);
  }

  removeGameScreen() {
    this.gameUI.hide();

    if (this.score) {
      this.score.hideScore();
    }
  }

  showGameScreen() {
    this.gameUI.show();
  }
}