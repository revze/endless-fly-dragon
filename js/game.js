let canvasWidth = 800;
let canvasHeight = 400;

let startBackground;
let startBackground1;
let startBackground2;
let startBackground3;
let btnStart;
let startText;
let guideText;

let background;
let bgForest;
let bgForest2;
let bgMiddle;
let bgMiddle2;
let bgMiddle3;
let bgBottom;
let bgBottom2;
let bgBottom3;
let bgTop;
let bgTop2;
let bgTop3;
let dragon;
let scoreText;
let lifeText;
let life;
let score;
let coin = [];
let obstacles = [];

let gameOverBackground;
let gameOverBackground1;
let gameOverBackground2;
let gameOverBackground3;
let retryBtn;
let retryBtnText;
let finalScore;

let userId;

//Method that use to draw start screen of game
function initGame() {
    if (localStorage.getItem('revUserId') != null) {
    userId = localStorage.getItem('revUserId');
  }
  gameArea.start();
  startBackground = new drawBackground(canvasWidth,canvasHeight,"img/bg_back_B.png",0,0,'background');
  startBackground1 = new drawBackground(canvasWidth,canvasHeight,"img/bg_middle_A.png",0,0,'background');
  startBackground2 = new drawBackground(canvasWidth,canvasHeight,"img/bg_front_ground_C.png",0,0,'background');
  startBackground3 = new drawBackground(canvasWidth,canvasHeight,"img/bg_superfront_C.png",0,0,'background');
  btnStart = new drawBackground(140 , 50, "#60678a", (canvasWidth/2) - (140/2), (canvasHeight/2) - (50/2));
  startText = new drawText('20px', 'Arial', 'white', (canvasWidth/2) - (140/2) + 21, (canvasHeight/2) - (50/2) + 30);
  guideText = new drawText('20px', 'Arial', 'white', (canvasWidth/2) - (140/2) - 120, (canvasHeight/2) - (50/2) - 30);
}

//Method that use to draw play screen of game
function startGame() {
  // gameArea.start();
  background = new drawBackground(canvasWidth,canvasHeight,"gray",0,0);

  bgForest = new drawBackground(canvasWidth,canvasHeight,"img/bg_back_A.png",0,0,'background');
  bgForest2 = new drawBackground(canvasWidth,canvasHeight,"img/bg_back_B.png",0,0,'background');

  bgMiddle = new drawBackground(canvasWidth,canvasHeight,"img/bg_middle_A.png",0,0,'background');
  bgMiddle2 = new drawBackground(canvasWidth,canvasHeight,"img/bg_middle_B.png",0,0,'background');
  bgMiddle3 = new drawBackground(canvasWidth,canvasHeight,"img/bg_middle_C.png",0,0,'background');

  bgBottom = new drawBackground(canvasWidth,canvasHeight,"img/bg_front_ground_A.png",0,0,'background');
  bgBottom2 = new drawBackground(canvasWidth,canvasHeight,"img/bg_front_ground_B.png",0,0,'background');
  bgBottom3 = new drawBackground(canvasWidth,canvasHeight,"img/bg_front_ground_C.png",0,0,'background');

  bgTop = new drawBackground(canvasWidth,canvasHeight,"img/bg_superfront_A.png",0,0,'background');
  bgTop2 = new drawBackground(canvasWidth,canvasHeight,"img/bg_superfront_B.png",0,0,'background');
  bgTop3 = new drawBackground(canvasWidth,canvasHeight,"img/bg_superfront_C.png",0,0,'background');

  dragon = new drawDragon('image', 90, 85, "img/dragon.png", 10, 120, 0, 0, 250, 240);

  lifeText = new drawText('20px', 'Arial', '#fff', 30, 40);
  scoreText = new drawText('20px', 'Arial', '#fff', 110, 40);

  score = 0;
  life = 3;
}

//Method that use to draw retry screen of game
function retryGame() {
  gameOverBackground = new drawBackground(canvasWidth,canvasHeight,"img/bg_back_B.png",0,0,'background');
  gameOverBackground1 = new drawBackground(canvasWidth,canvasHeight,"img/bg_middle_A.png",0,0,'background');
  gameOverBackground2 = new drawBackground(canvasWidth,canvasHeight,"img/bg_front_ground_C.png",0,0,'background');
  gameOverBackground3 = new drawBackground(canvasWidth,canvasHeight,"img/bg_superfront_C.png",0,0,'background');
  retryBtn = new drawBackground(90 , 50, "#60678a", (canvasWidth/2) - (90/2), (canvasHeight/2) - (50/2));
  retryBtnText = new drawText('20px', 'Arial', 'white', (canvasWidth/2) - (90/2) + 20, (canvasHeight/2) - (50/2) + 30);
  finalScore = new drawText('20px', 'Arial', 'white', (canvasWidth/2) - (90/2) - 19, (canvasHeight/2) - (50/2) - 25);
}

//Initialize object that use to frame and keyboard control in game
let gameArea = {
  canvas: document.createElement('canvas'),
  start: function () {
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;
    this.context = this.canvas.getContext('2d');
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.canvas.focus();
    this.frameNo = 0;
    this.interval = setInterval(startGameArea, 20);
    // this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function (e) {
      gameArea.key = e.keyCode;
    });
    window.addEventListener('keyup', function (e) {
      gameArea.key = false;
    });
    window.addEventListener('mousedown', function (e) {
      gameArea.x = e.pageX;
      gameArea.y = e.pageY;
    });
    window.addEventListener('mouseup', function (e) {
      gameArea.x = false;
      gameArea.y = false;
    });
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    clearInterval(this.interval);
  }
}

// Method that use to draw background in game
function drawBackground(width, height, color, x, y, type) {
  this.gamearea = gameArea;
  this.type = type;
  if (type == 'image' || type == 'background') {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = gameArea.context;
    if (type == 'image' || type == 'background') {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);

        if (type == 'background') {
          ctx.drawImage(this.image,
            this.x + this.width,
            this.y,
            this.width, this.height);
        }
    }
    else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.type == 'background') {
      if (this.x == -(this.width)) {
        this.x = 0;
      }
    }
  }
  this.clicked = function () {
    let myleft = this.x;
    let myright = this.x + (this.width);
    let mytop = this.y;
    let mybottom = this.y + (this.height);
    var clicked = true;
    if ((mybottom < gameArea.y) || (mytop > gameArea.y) || (myright < gameArea.x) || (myleft > gameArea.x)) {
      clicked = false;
    }
    return clicked;
  }
}

// Method that use to draw dragon in game
function drawDragon(type, width, height, color, x, y, spriteX, spriteY, spriteWidth, spriteHeight) {
  this.gamearea = gameArea;
  this.type = type;
  if (type == 'image') {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.spriteX = spriteX;
  this.spriteY = spriteY;
  this.spriteWidth = spriteWidth;
  this.spriteHeight = spriteHeight;
  this.layer = 'top';
  this.update = function() {
    ctx = gameArea.context;
    if (this.type == 'image') {
      ctx.drawImage(this.image, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.hitCoin = function (coinobj) {
    let myleft = this.x;
    let myright = this.x + (this.width);
    let mytop = this.y;
    let mybottom = this.y + (this.height);
    let otherleft = coinobj.x;
    let otherright = coinobj.x + (coinobj.width);
    let othertop = coinobj.y;
    let otherbottom = coinobj.y + (coinobj.height);
    let hit = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      hit = false;
    }
    return hit;
  }
  this.hitObstacle = function (obstacleobj) {
    let myleft = this.x;
    let myright = this.x + (this.width);
    let mytop = this.y;
    let mybottom = this.y + (this.height);
    let otherleft = obstacleobj.x;
    let otherright = obstacleobj.x + (obstacleobj.width);
    let othertop = obstacleobj.y;
    let otherbottom = obstacleobj.y + (obstacleobj.height);
    let hit = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      hit = false;
    }
    return hit;
  }
}

// Method that use to draw obstacles in game
function drawObstacle(width, height, color, x, y, status, type) {
  this.gamearea = gameArea;
  this.type = type;
  if (type == 'image') {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.status = status;
  this.update = function() {
    ctx = gameArea.context;
    if (type == 'image') {
      ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height);
    }
    else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.hit = function() {
    this.status = 'hit';
  }
}

// Method that use to draw coins in game
function drawCoin(type, width, height, color, x, y, spriteX, spriteY, spriteWidth, spriteHeight) {
  this.gamearea = gameArea;
  this.type = type;
  if (type == 'image') {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.spriteX = spriteX;
  this.spriteY = spriteY;
  this.spriteWidth = spriteWidth;
  this.spriteHeight = spriteHeight;
  this.update = function() {
    ctx = gameArea.context;
    if (this.type == 'image') {
      ctx.drawImage(this.image, this.spriteX, this.spriteY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
    else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.clear = function () {
    this.width = 0;
    this.height = 0;
    this.x = 0;
    this.y = 0;
  }
}

// Method that use to draw text in game
function drawText(width, height, color, x, y) {
  this.gamearea = gameArea;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = gameArea.context;
    ctx.font = this.width + ' ' + this.height;
    ctx.fillStyle = color;
    ctx.fillText(this.text, this.x, this.y);
  }
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

// Method that use to draw start screen in game
function startGameArea() {
  gameArea.clear();
  if (gameArea.x && gameArea.y) {
    if (btnStart.clicked()) {
      clearInterval(gameArea.interval);
      setTimeout(function () {
        startGame();
        gameArea.interval = setInterval(updateGameArea, 20);
      },250);
    }
  }
  startBackground.newPos();
  startBackground.update();
  startBackground1.newPos();
  startBackground1.update();
  startBackground2.newPos();
  startBackground2.update();
  startBackground3.newPos();
  startBackground3.update();
  btnStart.newPos();
  btnStart.update();
  startText.text = 'Play Game';
  startText.update();
  guideText.text = 'Use arrow up and down to move dragon.';
  guideText.update();
}

// Method that use to draw play screen and interaction in game
function updateGameArea() {
  gameArea.clear();
  gameArea.frameNo += 1;
  // background.newPos();
  // background.update();

  bgForest.speedX = -1;;
  bgForest.newPos();
  bgForest.update();
  bgForest2.speedX = -1;;
  bgForest2.newPos();
  bgForest2.update();

  bgMiddle.speedX = -1;;
  bgMiddle.newPos();
  bgMiddle.update();
  bgMiddle2.speedX = -1;;
  bgMiddle2.newPos();
  bgMiddle2.update();
  bgMiddle3.speedX = -1;;
  bgMiddle3.newPos();
  bgMiddle3.update();

  bgBottom.speedX = -5;
  bgBottom.newPos();
  bgBottom.update();
  bgBottom2.speedX = -5;
  bgBottom2.newPos();
  bgBottom2.update();
  bgBottom3.speedX = -5;
  bgBottom3.newPos();
  bgBottom3.update();

  initObstacle();

  bgTop.speedX = -4;
  bgTop.newPos();
  bgTop.update();
  bgTop2.speedX = -4;
  bgTop2.newPos();
  bgTop2.update();
  bgTop3.speedX = -4;
  bgTop3.newPos();
  bgTop3.update();

  initCoin();
  initDragon();
  initGameStatus();
}

// Method that use to draw retry screen in game
function retryGameArea() {
  gameArea.clear();
  gameOverBackground.newPos();
  gameOverBackground.update();
  gameOverBackground1.newPos();
  gameOverBackground1.update();
  gameOverBackground2.newPos();
  gameOverBackground2.update();
  gameOverBackground3.newPos();
  gameOverBackground3.update();
  if (gameArea.x && gameArea.y) {
    if (retryBtn.clicked()) {
      clearInterval(gameArea.interval);
      setTimeout(function () {
        startGame();
        gameArea.frameNo = 0;
        coin = [];
        obstacles = [];
        gameArea.interval = setInterval(updateGameArea, 20);
      },250);
    }
  }
  retryBtn.newPos();
  retryBtn.update();
  retryBtnText.text = 'Retry';
  retryBtnText.update();
  finalScore.text = 'Your score: ' + score;
  finalScore.update();
}

// Method that use to init game obstacles
function initObstacle() {
  let x = gameArea.canvas.width;
  let y = gameArea.canvas.height;

  if (gameArea.frameNo == 1 || everyInterval(450)) {
    obstacles.push(new drawObstacle(40, 120, "img/obs_btm_A.png", x, y - 210, '', 'image'));
    obstacles.push(new drawObstacle(40, 150, "img/obs_top_A.png", x + 300, 0,'', 'image'));
    obstacles.push(new drawObstacle(40, 120, "img/obs_btm_B.png", x + 600, y - 210, '', 'image'));
    obstacles.push(new drawObstacle(40, 150, "img/obs_top_B.png", x + 900, 0,'', 'image'));
  }

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].speedX = -3;
    obstacles[i].newPos();
    obstacles[i].update();
  }

  for (let i = 0; i < obstacles.length; i++) {
    if (dragon.hitObstacle(obstacles[i]) && obstacles[i].status == '') {
      life -= 1;
      obstacles[i].hit();
    }
  }
}

// Method that use to init game coin
function initCoin() {
  if (gameArea.frameNo == 1 || everyInterval(450)) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        coin.push(new drawCoin('image', 30, 30, "img/spinning_coin_gold.png", (j * 35) + (canvasWidth - 30), (i * 35)  + (canvasHeight - 280), 0, 0, 30, 35));
      }
    }
  }

  for (let i = 0; i < coin.length; i++) {
    if (coin[i].spriteX == 0) {
      setTimeout(function () {
        coin[i].spriteX = 34;
        coin[i].spriteWidth = 30;
      },120);
    }
    else if (coin[i].spriteX == 34) {
      setTimeout(function () {
        coin[i].spriteX = 68;
        coin[i].spriteWidth = 30;
      },120);
    }
    else if (coin[i].spriteX == 68) {
      setTimeout(function () {
        coin[i].spriteX = 134;
        coin[i].spriteWidth = 30;
      },120);
    }
    else if (coin[i].spriteX == 134) {
      setTimeout(function () {
        coin[i].spriteX = 164;
        coin[i].spriteWidth = 30;
      },120);
    }
    else if (coin[i].spriteX == 164) {
      setTimeout(function () {
        coin[i].spriteX = 194;
        coin[i].spriteWidth = 30;
      },120);
    }
    else if (coin[i].spriteX == 194) {
      setTimeout(function () {
        coin[i].spriteX = 227;
        coin[i].spriteWidth = 30;
      },120);
    }
    else if (coin[i].spriteX == 227) {
      setTimeout(function () {
        coin[i].spriteX = 0;
        coin[i].spriteWidth = 30;
      },120);
    }

    coin[i].speedX = -2;
    coin[i].newPos();
    coin[i].update();

  }

  for (let i = 0; i < coin.length; i++) {
    if (dragon.hitCoin(coin[i])) {
      coin[i].clear();
      score += 10;
    }
  }
}

// Method that use to init game dragon
function initDragon() {
  dragon.speedX = 0;
  dragon.speedY = 0;
  if (gameArea.key && gameArea.key == 38) {
    dragon.speedY = -2;
    if (dragon.y <= 10) {
      dragon.speedY = 0;
    }
  }
  if (gameArea.key && gameArea.key == 40) {
    dragon.speedY = 2;
    if (dragon.y >= 300 - dragon.height) {
      dragon.speedY = 0;
    }
  }

  // For sprite 2
  // if (dragon.spriteX == 0) {
  //   setTimeout(function () {
  //     dragon.spriteX = 0;
  //     dragon.spriteY = 240;
  //     dragon.spriteWidth = 250;
  //     dragon.spriteHeight = 246;
  //   },250);
  // }

  if (dragon.spriteX == 0 && dragon.layer == 'top') {
    setTimeout(function () {
      dragon.spriteX = 250;
      dragon.spriteWidth = 250;
    },80);
  }
  else if (dragon.spriteX == 250 && dragon.layer == 'top') {
    setTimeout(function () {
      dragon.spriteX = 502;
      dragon.spriteWidth = 262;
    },80);
  }
  else if (dragon.spriteX == 502 && dragon.layer == 'top') {
    setTimeout(function () {
      dragon.spriteX = 764;
      dragon.spriteWidth = 254;
    },80);
  }
  else if (dragon.spriteX == 764 && dragon.layer == 'top') {
    setTimeout(function () {
      dragon.spriteX = 1016;
      dragon.spriteWidth = 258;
    },80);
  }
  else if (dragon.spriteX == 1016 && dragon.layer == 'top') {
    setTimeout(function () {
      dragon.spriteX = 0;
      dragon.spriteY = 240;
      dragon.spriteWidth = 250;
      dragon.spriteHeight = 246;
      dragon.layer = 'bottom';
    },80);
  }
  else if (dragon.spriteX == 0 && dragon.layer == 'bottom') {
    setTimeout(function () {
      dragon.spriteX = 250;
      dragon.spriteWidth = 250;
    },80);
  }
  else if (dragon.spriteX == 250 && dragon.layer == 'bottom') {
    setTimeout(function () {
      dragon.spriteX = 502;
      dragon.spriteWidth = 256;
    },80);
  }
  else if (dragon.spriteX == 502 && dragon.layer == 'bottom') {
    setTimeout(function () {
      dragon.spriteX = 764;
      dragon.spriteWidth = 256;
    },80);
  }
  else if (dragon.spriteX == 764 && dragon.layer == 'bottom') {
    setTimeout(function () {
      dragon.spriteX = 1016;
      dragon.spriteWidth = 256;
    },80);
  }
  else if (dragon.spriteX == 1016 && dragon.layer == 'bottom') {
    setTimeout(function () {
      dragon.spriteX = 0;
      dragon.spriteY = 0;
      dragon.spriteWidth = 250;
      dragon.spriteHeight = 240;
      dragon.layer = 'top';
    },80);
  }

  dragon.newPos();
  dragon.update();
}

// Method that use to init game status
function initGameStatus() {
  scoreText.text = 'Score: ' + score;
  scoreText.update();

  lifeText.text = 'Life: ' + life;
  lifeText.update();

  if (life == 0) {
    clearInterval(gameArea.interval);
    setTimeout(function () {
      retryGame();
      if (localStorage.getItem('revUserId') != null) {
        //save score
      }
      gameArea.interval = setInterval(retryGameArea, 20);
    },250);
    // gameArea.stop();
  }
}

// Method that use to check frame in game
function everyInterval(n) {
  if ((gameArea.frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}
