document.addEventListener("DOMContentLoaded", function () {
  var direction = "right";
  var speed = 10;
  var snakeHead = document.getElementById("snake0");
  var bit = document.getElementById("bit");
  var snakePieces = [snakeHead];
  var hasLost = false;
  var score = 0;

  snakeHead.style.left = "90px";
  snakeHead.style.top = "10px";

  bit.style.left = "100px";
  bit.style.top = "10px";
  
  function moveSnake () {
    
    for(var i = (snakePieces.length - 1); i > 0; i--) {
      var snakeId = "snake" + i;
      var toMove = document.getElementById(snakeId);
      snakeId = "snake" + (i - 1);
      var toMoveTo = document.getElementById(snakeId);

      toMove.style.left = toMoveTo.style.left;
      toMove.style.top = toMoveTo.style.top;
    }

    var topStr = document.getElementById("snake0").style.top;
    var leftStr = document.getElementById("snake0").style.left;
    
    var topPos = parseInt(topStr.substring(0, (topStr.length - 2)));
    var leftPos = parseInt(leftStr.substring(0, (leftStr.length - 2)));

    switch (direction) {
      case "left" : {
        var val = leftPos - speed;
        snakeHead.style.left = val + "px";
        break;
      }
      case "right": {
        var val = leftPos + speed;
        snakeHead.style.left = val + "px";
        break;
      }
      case "up" : {
        var val = topPos - speed;
        snakeHead.style.top = val  + "px";
        break;
      }
      case "down" : {
        var val = topPos + speed;
        snakeHead.style.top = val + "px";
        break;
      }
    }
  }

  document.addEventListener("keyup", function (event){
    if(event.keyCode === 37 && direction != "right") {//left
      direction = "left";
    }
    else if(event.keyCode === 39 && direction != "left"){//right
      direction = "right";
    }
    else if(event.keyCode === 38 && direction != "down") {//up
      direction = "up";
    }
    else if(event.keyCode === 40 && direction != "up") {//down
      direction = "down";
    }
  });

function addSnakeBit() {
  var idString = "snake" + snakePieces.length;
  var snakeBit = document.createElement("div");
  snakeBit.setAttribute("id",idString);
  snakeBit.setAttribute("class","snake");
  snakeBit.style.left = "-1000px";
  snakeBit.style.top = "-1000px";

  document.body.appendChild(snakeBit);
  snakePieces.push(snakeBit);
}

function doesOverlap(e1,e2) {
  console.log(e1.style.top);
  console.log(e2.style.top);
  if(e1.style.top == e2.style.top && e1.style.left == e2.style.left) {
    return true;
  }
  return false;
}

function checkCollisions() {
  if(doesOverlap(snakeHead, bit)) {
    var newBitTop = Math.floor(Math.random() * 40) * 10;
    var newBitLeft = Math.floor(Math.random() * 40) * 10;
    bit.style.top = newBitTop + "px";
    bit.style.left = newBitLeft + "px";
    addSnakeBit();
    score += 100;
    document.getElementById("score").innerHTML = "Your Score is " + score;
  }
  for ( var i = 1; i < snakePieces.length; i++) {
    if (doesOverlap(snakeHead,snakePieces[i])) {
      hasLost = true;
    }
  }
    
  var snakeHeadLeft =  parseInt(snakeHead.style.left.substr(0,snakeHead.style.left.length-2));
  var snakeHeadTop = parseInt(snakeHead.style.top.substr(0,snakeHead.style.top.length-2));
  if(snakeHeadLeft > 390 || snakeHeadLeft < 0 || snakeHeadTop > 390 || snakeHeadTop < 0) {
    hasLost = true;
  }
}

function tick() {
  if (!hasLost) {
    checkCollisions();
    if (!hasLost) {
      moveSnake();
    }
  }
}

var interval = window.setInterval(function () {
  if (!hasLost) {
    checkCollisions();
    if (!hasLost) {
      moveSnake();
    } else {
      window.clearInterval(interval);
      location.reload(); 
    }
  }
} , 200);

});