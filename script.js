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
let spriteX = 500;
let spriteY = 500;
let faceDirection;
let up = 1;
let left= 2
let right = 3;
let down = 0;



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



function animate() {
    requestAnimationFrame(animate)
    board.draw();
    drawFrame(0, up, spriteX, spriteY)
}

animate();