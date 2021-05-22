var GAME = {
    width: 800,
    height: 900,
    fps: 1000 / 60,
    canvasContext: null,
    background: new Image()
}

var PLAYER1 = {
    x: 0,
    y: 0,
    width: 50,
    height: 50,
    xDirection: 0,
    yDirection: 0,
    speed: 50,
    pointerWidth: 50,
    pointerHeight: 25,
    skin: new Image(),
    mirSkin: new Image(),
    up: new Image(),
    down: new Image(),
    right: new Image(),
    left: new Image(),
    turn: "right"
}

var PLAYER2 = {
    x: GAME.width - 50,
    y: GAME.width - 50,
    width: 50,
    height: 50,
    xDirection: 0,
    yDirection: 0,
    speed: 50,
    pointerWidth: 50,
    pointerHeight: 25,
    skin: new Image(),
    mirSkin: new Image(),
    up: new Image(),
    down: new Image(),
    right: new Image(),
    left: new Image(),
    turn: "left"
}

var BULLET1 = {
    x: 50,
    y: GAME.height - 75,
    size: 50,
    xDirection: 0,
    yDirection: 0,
    speed: 25,
    shoot: "no",
    direction: "up",
    img: new Image()
}

var BULLET2 = {
    x: GAME.width - 100,
    y: GAME.height - 75,
    size: 50,
    xDirection: 0,
    yDirection: 0,
    speed: 25,
    shoot: "no",
    direction: "up",
    img: new Image()
}

var score1 = 0;

var score2 = 0;

function init() {
    GAME.background.src = "img/bg.png";
    PLAYER1.skin.src = "img/YelMag.png";
    PLAYER1.mirSkin.src = "img/YelMagMir.png";
    PLAYER1.up.src = "img/up.png";
    PLAYER1.down.src = "img/down.png";
    PLAYER1.left.src = "img/left.png";
    PLAYER1.right.src = "img/right.png";
    PLAYER2.skin.src = "img/bluMag.png";
    PLAYER2.mirSkin.src = "img/bluMagMir.png";
    PLAYER2.up.src = "img/up.png";
    PLAYER2.down.src = "img/down.png";
    PLAYER2.left.src = "img/left.png";
    PLAYER2.right.src = "img/right.png";
    BULLET2.img.src = "img/fireball.png";
    BULLET1.img.src = "img/light.png";

    var canvas = document.getElementById("canvas");
    _initCanvas(canvas);
    _initEventsListeners(canvas)

    GAME.background.onload = function(){
        setInterval(play, GAME.fps); 
    }    
}

function play() {
    draw();
    update();
}

function draw() {
    GAME.canvasContext.clearRect(0, 0, GAME.width, GAME.height);
    GAME.canvasContext.drawImage(GAME.background, 0, 0, GAME.width, GAME.width);  //Рисуем фон

    //loadImages(["img/YelMag.png", "img/BluMag.png"], drawImages);

    GAME.canvasContext.drawImage(BULLET1.img, 50, GAME.height - 75, BULLET1.size, BULLET1.size); //Рисуем пулю1

    GAME.canvasContext.drawImage(BULLET2.img, GAME.width - 100, GAME.height - 75, BULLET2.size, BULLET2.size); //Рисуем пулю2

    GAME.canvasContext.drawImage(BULLET1.img, BULLET1.x, BULLET1.y, BULLET1.size, BULLET1.size); //Рисуем пулю1

    GAME.canvasContext.drawImage(BULLET2.img, BULLET2.x, BULLET2.y, BULLET2.size, BULLET2.size); //Рисуем пулю2
    
    //Рисуем игрока1
    if (PLAYER1.turn == "right") {
        GAME.canvasContext.drawImage(PLAYER1.skin, PLAYER1.x, PLAYER1.y, PLAYER1.width, PLAYER1.height);
    } else if (PLAYER1.turn == "left") {
        GAME.canvasContext.drawImage(PLAYER1.mirSkin, PLAYER1.x, PLAYER1.y, PLAYER1.width, PLAYER1.height);
    }

    if (BULLET1.direction == "up") {
        GAME.canvasContext.drawImage(PLAYER1.up, PLAYER1.x, PLAYER1.y - PLAYER1.pointerHeight, PLAYER1.pointerWidth, PLAYER1.pointerHeight)
    } else if (BULLET1.direction == "down") {
        GAME.canvasContext.drawImage(PLAYER1.down, PLAYER1.x, PLAYER1.y + PLAYER1.height, PLAYER1.pointerWidth, PLAYER1.pointerHeight)
    } else if (BULLET1.direction == "left") {
         GAME.canvasContext.drawImage(PLAYER1.left, PLAYER1.x - PLAYER1.pointerHeight, PLAYER1.y, PLAYER1.pointerHeight, PLAYER1.pointerWidth)
    } else if (BULLET1.direction == "right") {
        GAME.canvasContext.drawImage(PLAYER1.right, PLAYER1.x + PLAYER1.width, PLAYER1.y, PLAYER1.pointerHeight, PLAYER1.pointerWidth)
    }

    //Рисуем игрока2
    if (PLAYER2.turn == "right") {
        GAME.canvasContext.drawImage(PLAYER2.skin, PLAYER2.x, PLAYER2.y, PLAYER2.width, PLAYER2.height);
    } else if (PLAYER2.turn == "left") {
        GAME.canvasContext.drawImage(PLAYER2.mirSkin, PLAYER2.x, PLAYER2.y, PLAYER2.width, PLAYER2.height);
    }

    if (BULLET2.direction == "up") {
        GAME.canvasContext.drawImage(PLAYER2.up, PLAYER2.x, PLAYER2.y - PLAYER2.pointerHeight, PLAYER2.pointerWidth, PLAYER2.pointerHeight)
    } else if (BULLET2.direction == "down") {
        GAME.canvasContext.drawImage(PLAYER2.down, PLAYER2.x, PLAYER2.y + PLAYER2.height, PLAYER2.pointerWidth, PLAYER2.pointerHeight)
    } else if (BULLET2.direction == "left") {
         GAME.canvasContext.drawImage(PLAYER2.left, PLAYER2.x - PLAYER2.pointerHeight, PLAYER2.y, PLAYER2.pointerHeight, PLAYER2.pointerWidth)
    } else if (BULLET2.direction == "right") {
        GAME.canvasContext.drawImage(PLAYER2.right, PLAYER2.x + PLAYER2.width, PLAYER2.y, PLAYER2.pointerHeight, PLAYER2.pointerWidth)
    }

    GAME.canvasContext.font = "50px sans-serif";
    GAME.canvasContext.fillStyle = "#FFD600";
    GAME.canvasContext.fillText("Yellow: " + score1, 200, GAME.height - 25);

    GAME.canvasContext.font = "50px sans-serif";
    GAME.canvasContext.fillStyle = "#0000FF";
    GAME.canvasContext.fillText("Blue: " + score2, GAME.width - 350, GAME.height - 25);
}

function _initCanvas(canvas) {
    canvas.width = GAME.width;
    canvas.height = GAME.height;
    GAME.canvasContext = canvas.getContext("2d");
}

function update() {

    //Двигаем игрока на его скорость
    PLAYER1.y += PLAYER1.yDirection;
    PLAYER1.x += PLAYER1.xDirection;
    PLAYER1.yDirection = 0;
    PLAYER1.xDirection = 0;

    PLAYER2.y += PLAYER2.yDirection;
    PLAYER2.x += PLAYER2.xDirection;
    PLAYER2.yDirection = 0;
    PLAYER2.xDirection = 0;
    
    if (BULLET1.shoot == "no") {
        BULLET1.x = 50;
        BULLET1.y = GAME.height - 75
    } else if (BULLET1.shoot == "yes") {
        if (BULLET1.direction == "up") {
            BULLET1.y -= BULLET1.yDirection
        }
        if (BULLET1.direction == "down") {
            BULLET1.y += BULLET1.yDirection
        }
        if (BULLET1.direction == "right") {
            BULLET1.x += BULLET1.xDirection
        }
        if (BULLET1.direction == "left") {
            BULLET1.x -= BULLET1.xDirection
        }
        if ((BULLET1.x == 0 - BULLET1.size) || (BULLET1.x == GAME.width) || (BULLET1.y == 0 - BULLET1.size) || (BULLET1.y == GAME.width)) {
            BULLET1.shoot = "no"
        }
    }

    if (BULLET2.shoot == "no") {
        BULLET2.x = GAME.width - 100;
        BULLET2.y = GAME.height - 75
    } else if (BULLET2.shoot == "yes") {
        if (BULLET2.direction == "up") {
            BULLET2.y -= BULLET2.yDirection
        }
        if (BULLET2.direction == "down") {
            BULLET2.y += BULLET2.yDirection
        }
        if (BULLET2.direction == "right") {
            BULLET2.x += BULLET2.xDirection
        }
        if (BULLET2.direction == "left") {
            BULLET2.x -= BULLET2.xDirection
        }
        if ((BULLET2.x == 0 - BULLET2.size) || (BULLET2.x == GAME.width) || (BULLET2.y == 0 - BULLET2.size) || (BULLET2.y == GAME.width)) {
            BULLET2.shoot = "no"
        }

    }

    if ((BULLET1.x == PLAYER2.x) && (BULLET1.y == PLAYER2.y)) {
        PLAYER2.x = GAME.width - 50;
        PLAYER2.y = GAME.width - 50;
        _inclicks1()
    } 

    if ((BULLET2.x == PLAYER1.x) && (BULLET2.y == PLAYER1.y)) {
        PLAYER1.x = 0;
        PLAYER1.y = 0;
        _inclicks2()
    } 

    if ((score1 == 10) || (score2 == 10)) {
        if (score1 == 10) {
            alert("YELLOW WIN")
        } else if (score2 == 10) {
            alert("BLUE WIN")
        }
        document.location.reload();
        clearInterval(interval);
        score1 = 0;
        score2 = 0
    }
}

function _initEventsListeners(canvas) {
    document.addEventListener("keydown", _onDocumentKeyDown);
    
}

function _onDocumentKeyDown(event) {

    if (event.keyCode == 87) {
        if (PLAYER1.y == 0) {
            PLAYER1.yDirection = 0     
        } else {
             PLAYER1.yDirection = -PLAYER1.speed      
         }
    } else if (event.keyCode == 83) {
        if (PLAYER1.y == (GAME.width - PLAYER1.height)) {
            PLAYER1.yDirection = 0     
        } else {
            PLAYER1.yDirection = PLAYER1.speed  
        }
    } else if (event.keyCode == 65) {
        if (PLAYER1.x == 0) {
            PLAYER1.xDirection = 0     
        } else {
            PLAYER1.xDirection = -PLAYER1.speed;
            PLAYER1.turn = "left"  
        }
    } else if (event.keyCode == 68) {
        if (PLAYER1.x == (GAME.width - PLAYER1.width)) {
            PLAYER1.xDirection = 0     
        } else {
            PLAYER1.xDirection = PLAYER1.speed;
            PLAYER1.turn = "right"   
        }
    }
 
    if (event.keyCode == 38) {
        if (PLAYER2.y == 0) {
            PLAYER2.yDirection = 0     
        } else {
            PLAYER2.yDirection = -PLAYER2.speed
        }
    } else if (event.keyCode == 40) {
        if (PLAYER2.y == (GAME.width - PLAYER2.height)) {
            PLAYER2.yDirection = 0     
        } else {
            PLAYER2.yDirection = PLAYER2.speed
        }
    } else if (event.keyCode == 37) {
        if (PLAYER2.x == 0) {
            PLAYER2.xDirection = 0     
        } else {
            PLAYER2.xDirection = -PLAYER2.speed;
            PLAYER2.turn = "left"  
        }
    } else if (event.keyCode == 39) {
        if (PLAYER2.x == (GAME.width - PLAYER2.width)) {
            PLAYER2.xDirection = 0    
        } else {
            PLAYER2.xDirection = PLAYER2.speed;
            PLAYER2.turn = "right" 
        }
    }
 
    if ((event.keyCode == 81) && (BULLET1.shoot == "no")) {
        if (BULLET1.direction == "up") {
            BULLET1.direction = "left"
        } else if (BULLET1.direction == "left") {
            BULLET1.direction = "down"
        } else if (BULLET1.direction == "down") {
            BULLET1.direction = "right"
        } else if (BULLET1.direction == "right") {
            BULLET1.direction = "up"
        }
    } else if ((event.keyCode == 69) && (BULLET1.shoot == "no")) {
        if (BULLET1.direction == "up") {
            BULLET1.direction = "right"
        } else if (BULLET1.direction == "right") {
            BULLET1.direction = "down"
        } else if (BULLET1.direction == "down") {
            BULLET1.direction = "left"
        } else if (BULLET1.direction == "left") {
            BULLET1.direction = "up"
        }
    } else if ((event.keyCode == 82) && (BULLET1.shoot == "no")) {
        BULLET1.xDirection = BULLET1.speed;
        BULLET1.yDirection = BULLET1.speed;
        BULLET1.shoot = "yes";
        BULLET1.x = PLAYER1.x;
        BULLET1.y = PLAYER1.y
    }

    if ((event.keyCode == 188) && (BULLET2.shoot == "no")) {
        if (BULLET2.direction == "up") {
            BULLET2.direction = "left"
        } else if (BULLET2.direction == "left") {
            BULLET2.direction = "down"
        } else if (BULLET2.direction == "down") {
            BULLET2.direction = "right"
        } else if (BULLET2.direction == "right") {
            BULLET2.direction = "up"
        }
    } else if ((event.keyCode == 190) && (BULLET2.shoot == "no")) {
        if (BULLET2.direction == "up") {
            BULLET2.direction = "right"
        } else if (BULLET2.direction == "right") {
            BULLET2.direction = "down"
        } else if (BULLET2.direction == "down") {
            BULLET2.direction = "left"
        } else if (BULLET2.direction == "left") {
            BULLET2.direction = "up"
        }
    } else if ((event.keyCode == 77) && (BULLET2.shoot == "no")) {
        BULLET2.xDirection = BULLET2.speed;
        BULLET2.yDirection = BULLET2.speed;
        BULLET2.shoot = "yes"
        BULLET2.x = PLAYER2.x;
        BULLET2.y = PLAYER2.y
    }
}

function _inclicks1() {
    score1++
}

function _inclicks2() {
    score2++
}

//function loadImages(pathes, cb) {
    //var images = [];
    //var imagesToLoad = pathes.length;
    //function onImageLoadded() {
     //if(!--imagesToLoad) {
       //cb(images);
     //}
    //}
    //for(var i=0; i<pathes.length; ++i) {
     //var img = new Image();
     //images.push(img);
     //img.src = pathes[i];
     //img.onload = onImageLoadded;
    //}
   //}

   //function drawImages(array) {
    //for (var i = 0; i < array.length; i++) { 
     //GAME.canvasContext.drawImage(array[i], i*50, i*50);
    //}
   //}

   function shuffle(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
      current = Math.floor(Math.random() * (top + 1));
      tmp = array[current];
      array[current] = array[top];
      array[top] = tmp;
    }
    return array;
  }
