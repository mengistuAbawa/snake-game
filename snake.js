const canvas=document.querySelector(".canvas")
const ctx =canvas.getContext("2d")
const scoreElement = document.getElementById("scoreGame");
const speedElement = document.getElementById("gameSpeedDisplay");
console.log(ctx)
// to divided cnvas contener in 20 scale (squer) 
const scale=20
 let score = 0;
 let speed=300;
const row= canvas.height/scale
const columun =canvas.width/scale 

let snake=[];
snake[0] = {
    // random () method used to start snake[0] at any where
  x: Math.floor(Math.random() * columun) * scale,
  y: Math.floor(Math.random() * row) * scale,
};
// food is  constat so is not used array
let food = {
  x: Math.floor(Math.random() * columun) * scale,
  y: Math.floor(Math.random() * row) * scale,
};
//direction when i use  any key the snake is change to different direction
let d="left"
document.onkeydown=direction

function direction(event){
  let key=event.keyCode;
  if (key==37 && d!="right") {
    d="left"
  }
  if (key == 38 && d != "down") {
    d = "up";
  }
  if (key == 39 && d != "left") {
    d = "right";
  }
  if (key == 40 && d != "up") {
    d = "down";
  }
}
// Function to start or restart the game loop
function startGameLoop() {
  if (playGame) clearInterval(playGame);
  playGame = setInterval(draw, speed);
  speedElement.innerText = `${speed}ms`;
}
 // Check if the snake head collides with its own body
        function checkCollision(head, array) {
            for (let i = 1; i < array.length; i++) {
                if (head.x == array[i].x && head.y == array[i].y) {
                    return true;
                }
            }
            return false;
        }
//direction();
// how to move the snake to the right
// setInterval() used to to run the code bsed on the given time
let playGame = setInterval(draw, speed); 
function draw(){
  // Clears the entire canvas, erasing all previous drawings.
  // The area cleared is from (0, 0) up to the full width and height of the canvas.
ctx.clearRect(0, 0, canvas.width, canvas.height);
  //drow squre
  for ( let i = 0;  i < snake.length;  i++) {
    ctx.fillStyle= "#ffffffff";
    ctx.strokeStyle = "#dd0c5cff";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }
  //drow the food
  ctx.fillStyle = "#e9da0aff";
  ctx.strokeStyle = "#3452ffff";
  ctx.fillRect(food.x, food.y, scale, scale);
  ctx.strokeRect(food.x, food.y, scale, scale);
 //old head
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  // if the snake want to move up it minus by 20 or scale and othre is the same
if (d == "up") snakeY -= scale;
if (d == "down") snakeY += scale;
if (d == "right") snakeX += scale;
if (d == "left") snakeX -= scale; // new head
if (snakeX>canvas.width) {
  snakeX=0
}

if (snakeY > canvas.height) {
  snakeY = 0;
}
if (snakeX < 0) {
  snakeX = canvas.width;
}
if (snakeY < 0) {
  snakeY = canvas.height;
}
// this is my work
if (snakeX < 0 || snakeX >= canvas.width || 
 snakeY < 0 || snakeY >= canvas.height) {
 gameOver();
return; // Stop drawing and movement for this frame
}
let newHed = {
  x: snakeX,
  y: snakeY,
};
if (snakeX==food.x && snakeY==food.y) {
// is true or falss
score += 10;
scoreElement.innerText = score;

// 2. SPEED BOOST: Check if score hits 100
if (score >= 100 && speed > 100) {
  speed = 150;
   // Set new, faster speed
   
  startGameLoop(); // Restart the interval with the new speed
  //document.writeln(" you are grate  ");
}


  food={
    x:Math.floor(Math.random()*columun)*scale,
    y:Math.floor( Math.random()*row)*scale
  }
}
 else{
snake.pop();
 }
  // it is my work
// 5. **NEW FUNCTION TO HANDLE GAME OVER**
function gameOver() {
 // A. Stop the game loop
 clearInterval(playGame);

 // B. Center and style the text
 ctx.fillStyle = "red"; 
 ctx.font = "50px Arial";
ctx.textAlign = "center";

 // C. Calculate the center coordinates
 let centerX = canvas.width / 2;
 let centerY = canvas.height / 2;

 // D. Draw the "GAME OVER" text once





 ctx.fillText("GAME OVER", centerX, centerY - 25);
 ctx.font = "20px Inter";
 ctx.fillText(`Final Score: ${score}`, centerX, centerY + 15);
}
   snake.unshift(newHed);
}
 window.onload = startGameLoop;
