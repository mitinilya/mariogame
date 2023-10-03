class Score {
  constructor() {
    this.coinScore = 0;
    this.totalScore = 0;
    this.lifeCount = 10;
    this.view = new View();
  }

  init() {
    this.mainWrapper = View.getInstance().getMainWrapper();

    this.scoreWrapper = this.view.create('div');
    this.coinScoreWrapper = this.view.create('div');
    this.totalScoreWrapper = this.view.create('div');
    this.lifeCountWrapper = this.view.create('div');
    this.levelWrapper = this.view.create('div');


    this.view.addClass(this.scoreWrapper, 'score-wrapper');
    this.view.addClass(this.coinScoreWrapper, 'coin-score');
    this.view.addClass(this.totalScoreWrapper, 'total-score');
    this.view.addClass(this.lifeCountWrapper, 'life-count');
    this.view.addClass(this.levelWrapper, 'level-num');
   


    this.view.append(this.scoreWrapper, this.levelWrapper);
    this.view.append(this.scoreWrapper, this.lifeCountWrapper);
    this.view.append(this.scoreWrapper, this.coinScoreWrapper);
    this.view.append(this.scoreWrapper, this.totalScoreWrapper);
    this.view.append(this.mainWrapper, this.scoreWrapper);

    this.updateCoinScore();
    this.updateTotalScore();
    this.updateLifeCount();
    this.updateLevelNum(1);
}


updateCoinScore() {
  if (this.coinScore === 100) {
    this.coinScore = 0;
    this.lifeCount++;
    this.updateLifeCount();
  }

  this.view.setHTML(this.coinScoreWrapper, `Coins: ${this.coinScore}`);
}

updateTotalScore() {
  this.view.setHTML(this.totalScoreWrapper, `Score: ${this.totalScore}`);
}

updateLifeCount() {
  this.view.setHTML(this.lifeCountWrapper, `x ${this.lifeCount}`);
}

updateLevelNum(level) {
  this.view.setHTML(this.levelWrapper, `Level: ${level}`);
}

displayScore() {
  this.view.style(this.scoreWrapper, { display: 'block', background: '#F0E68C' });
}

hideScore() {
  this.view.style(this.scoreWrapper, { display: 'none' });

  this.coinScore = 0;
  this.lifeCount = 10;
  this.totalScore = 0;
  this.updateCoinScore();
  this.updateTotalScore();
  this.updateLifeCount();
}

gameOverView() {
  this.view.style(this.scoreWrapper, { background: 'black' });
}
}