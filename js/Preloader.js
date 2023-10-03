class Preloader {
  constructor() {
    this.view = View.getInstance();
    this.loadingPercentage = null;
    this.imageSources = {
      1: 'images/back-btn.png',
      2: 'images/bg.png',
      3: 'images/elements.png',
      4: 'images/enemies.png',
      5: 'images/flag-pole.png',
      6: 'images/flag.png',
      7: 'images/start-screen.png',
      8: 'images/grid.png',
      9: 'images/mario-head.png',
      10: 'images/mario-sprites.png',
      11: 'images/powerups.png',
      12: 'images/start-btn.png'
    };
  }

  init() {
    this.loadingPercentage = this.view.create('div');
    this.view.addClass(this.loadingPercentage, 'loading-percentage');
    this.view.setHTML(this.loadingPercentage, '0%');
    this.view.appendToBody(this.loadingPercentage);

    this.loadImages().then(() => {
      this.view.removeFromBody(this.loadingPercentage);
      this.initMainApp();
    });
  }

  loadImages() {
    const images = {}; 
    const imagePromises = [];

    for (const key in this.imageSources) {
      const image = new Image();
      const src = this.imageSources[key];

      const imagePromise = new Promise((resolve, reject) => {
        image.onload = () => resolve(key);
        image.onerror = () => reject(key);
      });

      image.src = src;
      images[key] = image;

      imagePromises.push(imagePromise);
    }

    const totalImages = imagePromises.length;

    Promise.all(imagePromises)
      .then((keys) => {
        const loadedImages = keys.length;
        const percentage = Math.floor((loadedImages / totalImages) * 100);
        this.view.setHTML(this.loadingPercentage, percentage + '%');
      })
      .catch((errorKey) => {
        console.error(`Failed to load image with key: ${errorKey}`);
      });

    return Promise.all(imagePromises);
  }

  initMainApp() {
    const marioMakerInstance = MarioMaker.getInstance();
    marioMakerInstance.init();
  }
}

window.onload = () => {
  const preloader = new Preloader();
  preloader.init();
};
