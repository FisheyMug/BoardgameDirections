const canvas= document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576;

// variables for animation scaling/maths of player sprite
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
let straight;

let player1Score = 0;


const map = new Image();
map.src = "./img/Board.png";
const player1Image = new Image();
player1Image.src= "./img/sprite.png";

//does the sprite sheet maths for us
// credit/tutorial used to figure this out---https://dev.to/martyhimmel/animating-sprite-sheets-with-javascript-ag3
function drawFrame (frameX, frameY, canvasX, canvasY, img) {
    ctx.drawImage(img, frameX * width, frameY*height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
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

const collisionsMap = []
for (let i = 0; i < holes.length; i+=16) {
    collisionsMap.push(holes.slice(i, 16 + i))
}

const chestCollisionMap = []
for (let i = 0; i < chests.length; i+=16) {
    chestCollisionMap.push(chests.slice(i, 16 + i))
}

class Boundary {
    static width = 64
    static height = 64
    constructor({position}) {
        this.position = position
        this.width = 64
        this.height = 64
    }

    draw() {
        ctx.fillStyle = "red"
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const boundaries = []

collisionsMap.forEach ((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 23) {
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
            }}))
        }
       
    })
})

const chestBoundaries = []

chestCollisionMap.forEach ((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 49) {
            chestBoundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
            }}))
        }
       
    })
})

//function to help figure out canvas coordinates
const getCursorPosition = (canvas, event) => {
const x = event.offsetX
const y = event.offsetY
console.log(x, y)
}

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

//collision detection for points;
function rectangularCollision({rectangl1, rectangle2}) {
    return (
        rectangl1.position.x + rectangl1.width >= rectangle2.position.x &&
        rectangl1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangl1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangl1.position.y + rectangl1.height >= rectangle2.position.y
    )
 }

function animate() {
    requestAnimationFrame(animate)
    board.draw();
    boundaries.forEach( point => {
        point.draw()
    })
    chestBoundaries.forEach( point => {
        point.draw()
    })
    drawFrame(0, faceDirection, spriteX, spriteY, player1Image)
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
        }
        else if (faceDirection == right) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection =up;
        }
        else if (faceDirection == down) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection =right;
        }
        else if (faceDirection == left) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceDirection =down;
          }
    }

    if (direction == straight) {
        switch (faceDirection) {
            case up: 
                spriteY -= 64;
                if (spriteY < 0) {
                    spriteY = 520;
                }
            break;
            case right:
                spriteX +=64;
                if (spriteX > 967) {
                    spriteX = 7
                }
            break;
            case down:
                spriteY +=64;
                if (spriteY > 520) {
                    spriteY = 8
                }
            break;
            case left:
                spriteX -=64;
                if (spriteX < 7) {
                    spriteX = 967;
                }
            break;
        }
    }
}

animate();

