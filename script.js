const canvas= document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576;

// variables for animation scaling/maths
const scale = 3;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;


// variables for moving
let spriteX = 455;
let spriteY = 520;
let up = 1;
let left= 2
let right = 3;
let down = 0;
let faceDirection = up;




const map = new Image();
map.src = "./img/Board.png";
const player1Image = new Image();
player1Image.src= "./img/sprite.png";

//does the sprite sheet maths for us
// credit/tutorial used to figure this out---https://dev.to/martyhimmel/animating-sprite-sheets-with-javascript-ag3
function drawFrame (frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(player1Image, frameX * width, frameY*height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
}

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw () {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }
}

const board = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: map
})

//function to help figure out canvas coordinates
const getCursorPosition = (canvas, event) => {
    const x = event.offsetX
    const y = event.offsetY
    console.log(x, y)
  }

function animate() {
    requestAnimationFrame(animate)
    board.draw();
    drawFrame(0, faceDirection, spriteX, spriteY)
}

function move(direction) {
    //right
    if (direction ==right) {
        if (faceDirection == up) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection = right;
        drawFrame (0, right, spriteX, spriteY);
        }
        else if (faceDirection == right) {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
            faceDirection = down;
        drawFrame (0, down, spriteX, spriteY); 
        }
        else if (faceDirection == down) {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
            faceDirection =left;
        drawFrame (0, left, spriteX, spriteY); 
        }
        else if (faceDirection == left) {
             ctx.clearRect(0, 0, canvas.width, canvas.height);
            faceDirection =up;
        drawFrame (0, faceDirection, spriteX, spriteY); 
        }
    }

    // left
    if (direction == left) {
        if (faceDirection == up) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection = left;
        // drawFrame (0, left, spriteX, spriteY);
        }
        else if (faceDirection == right) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection =up;
        // drawFrame (0, up, spriteX, spriteY);
        }
        else if (faceDirection == down) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection =right;
        // drawFrame (0, right, spriteX, spriteY);
        }
        else if (faceDirection == left) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection =down;
        // drawFrame (0, down, spriteX, spriteY);
        }
    }
}

animate();

canvas.addEventListener('mousedown', (e) => {
    getCursorPosition(canvas, e)
  })

  document.addEventListener("keydown", function(event){
    if(event.key === "ArrowUp"){
      move(straight);
    }
    else if (event.key === "ArrowLeft") {
        move(left)
    }
    else if (event.key === "ArrowRight") {
        move(right)
    }
  });