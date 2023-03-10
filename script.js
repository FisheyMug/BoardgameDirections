const canvas= document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 1024
canvas.height = 576

const p1Score = document.getElementById("p1Score");
const p2Score = document.getElementById("p2Score");
const rollButton = document.getElementById("rollButton");
const rollModal = document.getElementById("RollModal")

const p1Direction = document.getElementById("p1Direction")
const  p2Direction = document.getElementById("p2Direction");
const p1Container = document.getElementById("p1Container");
const p2Container = document.getElementById("p2Container");
const modalSentence = document.getElementById("modalSentence")

const straightButton = document.getElementsByClassName("straight");
const leftButton = document.getElementsByClassName("left");
const rightButton = document.getElementsByClassName("right");

let ready = false;
let waiting = true;
let readyDirection;

function highlighter() {
    if (turn === 1) {
        p1Container.style.border = "2px solid yellow"
    } else p1Container.style.border = ""
    if (turn === 2) {
        p2Container.style.border = "2px solid yellow"
    } else p2Container.style.border = ""
    
}

// variables for moving 
const scale = 3;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
let up = 1;
let left = 2;
let right = 3;
let down = 0;
let straight;
let turn = 1;

const timer = 1000;

//does the sprite sheet maths for us
// credit/tutorial used to figure this out---https://dev.to/martyhimmel/animating-sprite-sheets-with-javascript-ag3
function drawFrame (frameX, frameY, canvasX, canvasY, img) {
    ctx.drawImage(img, frameX * width, frameY * height, width, height, canvasX, canvasY, scaledWidth, scaledHeight);
}


//images
const map = new Image();
map.src = "./img/Board.png";
const player1Image = new Image();
player1Image.src= "./img/sprite.png";
const player2Image = new Image();
player2Image.src = "./img/player2.png"



class Sprite {
    // variables for animation scaling/maths of player sprite
    constructor({ position, image }) {
        this.position = position
        this.image = image

        this.score = 0;

        this.faceDirection = up;
        this.scale = 3;
        this.width = 16;
        this.height = 18;
        this.scaledWidth = scale * width;
        this.scaledHeight = scale * height;
        this.up = 1;
        this.left = 2;
        this.right = 3;
        this.down = 0;
        this.straight = ""; 
    }

    draw() {
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

const player1 = new Sprite({
    position: {
        x: 455,
        y: 520
    },
    image: player1Image
})

const player2 = new Sprite({
    position: {
        x: 519,
        y: 520
    },
    image: player2Image
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
        ctx.fillStyle = "rgba(255, 0, 0, 0)"
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

// //function to help figure out canvas coordinates
// const getCursorPosition = (canvas, event) => {
// const x = event.offsetX
// const y = event.offsetY
// console.log(x, y)
// }
// canvas.addEventListener('mousedown', (e) => {
// getCursorPosition(canvas, e)
// })

document.addEventListener("keydown", function(event){
    if (ready) {
        if (readyDirection === straight && event.key === "ArrowUp") {
            move(straight);
            ready = false;
            waiting = true;
            p1Direction.innerHTML= ""
            p2Direction.innerHTML= ""
            rollModal.style.display = "flex"
        } else if (readyDirection=== left && event.key === "ArrowLeft") {
            move(left)
            ready = false;
            waiting = true;
            p1Direction.innerHTML= ""
            p2Direction.innerHTML= ""
            rollModal.style.display = "flex"
        } else if (readyDirection === right && event.key === "ArrowRight") {
            move(right)
            ready = false;
            waiting = true;
            p1Direction.innerHTML= ""
            p2Direction.innerHTML= ""
            rollModal.style.display = "flex"
        }
    }

    if (!ready) {
        if ((event.key === " " || event.key === "Enter") && rollButton.style.display != "none") {
            roll();
            rollButton.style.display = "none"
         
            if (turn === 1 && readyDirection !=stop) {
                modalSentence.innerHTML = p2Direction.innerHTML
            } else if (turn === 2 && readyDirection !=stop) {
                modalSentence.innerHTML = p1Direction.innerHTML
            } else modalSentence.innerHTML = "Stop, Change Player!"

            setTimeout(() => {
                if (readyDirection != stop) {
                    ready = true;
                    waiting = false;
                }
                rollButton.style.display = "block"
                rollModal.style.display = "none"
                modalSentence.innerHTML = " "
            }, timer);
    
        }
    }
});


for (i = 0; i< straightButton.length; i++) {
    straightButton[i].addEventListener("click", () => {
        if (ready) {
            if (readyDirection === straight) {
                move(straight);
                ready = false;
                waiting = true;
                p1Direction.innerHTML= ""
                p2Direction.innerHTML= ""
                rollModal.style.display = "flex"
            }
        }
    }); 
}

for (i = 0; i< leftButton.length; i++) {
    leftButton[i].addEventListener("click", () => {
        if (ready) {
            if (readyDirection === left) {
                move(left);
                ready = false;
                waiting = true;
                p1Direction.innerHTML= ""
                p2Direction.innerHTML= ""
                rollModal.style.display = "flex"
            }
        }
    }); 
}


for (i = 0; i< rightButton.length; i++) {
    rightButton[i].addEventListener("click", () => {
        if (ready) {
            if (readyDirection === right) {
                move(right);
                ready = false;
                waiting = true;
                p1Direction.innerHTML= ""
                p2Direction.innerHTML= ""
                rollModal.style.display = "flex"
            }
        }
    }); 
}


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
    if (readyDirection === stop) {
        rollModal.style.display = "flex"
    }
    board.draw();
    // ctx.drawImage(map, 0, 0, canvas.width, canvas.height)

    boundaries.forEach( point => {
        point.draw()
    })
    chestBoundaries.forEach( point => {
        point.draw()
    })

    if(turn === 1) {
        drawFrame(0, player1.faceDirection, player1.position.x, player1.position.y, player1Image)
        drawFrame(0, player2.faceDirection, player2.position.x, player2.position.y, player2Image)
    }
    if (turn === 2) {
        drawFrame(0, player2.faceDirection, player2.position.x, player2.position.y, player2Image)
        drawFrame(0, player1.faceDirection, player1.position.x, player1.position.y, player1Image)
    }
    p1Score.innerHTML = player1.score;
    p2Score.innerHTML = player2.score;
    highlighter()
}

function move(direction) {
    //right
    if (direction ==right) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (turn === 1) {
            if (player1.faceDirection == up) {
                player1.faceDirection = right;
            }
            else if (player1.faceDirection == right) {
                player1.faceDirection = down;
            }
            else if (player1.faceDirection == down) {
                player1.faceDirection =left;
            }
            else if (player1.faceDirection == left) {
                player1.faceDirection =up;
            }
        }
        else if (turn === 2) {
            if (player2.faceDirection == up) {
                player2.faceDirection = right;
            }
            else if (player2.faceDirection == right) {
                player2.faceDirection = down;
            }
            else if (player2.faceDirection == down) {
                player2.faceDirection =left;
            }
            else if (player2.faceDirection == left) {
                player2.faceDirection =up;
            }
        }
    }

    // left
    if (direction == left) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (turn === 1) {
            if (player1.faceDirection == up) {
                player1.faceDirection = left;
                }
            else if (player1.faceDirection == right) {
                player1.faceDirection =up;
                }
            else if (player1.faceDirection == down) {
                player1.faceDirection =right;
                }
            else if (player1.faceDirection == left) {
                player1.faceDirection =down;
                  }
        }
        else if (turn === 2) {
            if (player2.faceDirection == up) {
                player2.faceDirection = left;
                }
            else if (player2.faceDirection == right) {
                player2.faceDirection =up;
                }
            else if (player2.faceDirection == down) {
                player2.faceDirection =right;
                }
            else if (player2.faceDirection == left) {
                player2.faceDirection =down;
                  }
        }
       
    }

    if (direction == straight) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (turn === 1) {
            switch (player1.faceDirection) {
                case up:
                    player1.position.y -= 64;
                    if (player1.position.y < 0) {
                        player1.position.y = 520;
                    }
                    
                    break;
                case right:
                    player1.position.x += 64;
                    if (player1.position.x > 967) {
                        player1.position.x = 7
                    }
                    break;
                case down:
                    player1.position.y += 64;
                    if (player1.position.y > 520) {
                        player1.position.y = 8
                    }
                    break;
                case left:
                    player1.position.x -= 64;
                    if (player1.position.x < 7) {
                        player1.position.x = 967;
                    }
                    break;
            }
            for (let i=0; i<boundaries.length; i++) {
                const boundary = boundaries[i];
                if (rectangularCollision({
                    rectangl1: player1,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y
                    }}
                })) {
                    player1.score -= 2;
                }
            }

            for (let i=0; i< chestBoundaries.length; i++) {
                const chest = chestBoundaries[i];
                if (rectangularCollision({
                    rectangl1: player1,
                    rectangle2: {...chest, position: {
                        x: chest.position.x,
                        y: chest.position.y
                    }}
                })) {
                    player1.score += 3;
                }
            }

        } else if (turn === 2) {
            switch (player2.faceDirection) {
                case up:
                    player2.position.y -= 64;
                    if (player2.position.y < 0) {
                        player2.position.y = 520;
                    }
                break;
                case right:
                    player2.position.x +=64;
                        if (player2.position.x > 967) {
                            player2.position.x = 7
                        }                    
                break;
                case down:
                    player2.position.y +=64;
                        if (player2.position.y > 520) {
                            player2.position.y = 8
                        }
                break;
                case left:
                    player2.position.x -=64;
                        if (player2.position.x < 7) {
                            player2.position.x = 967;
                        }
                break;
            }

            for (let i=0; i<boundaries.length; i++) {
                const boundary = boundaries[i];
                if (rectangularCollision({
                    rectangl1: player2,
                    rectangle2: {...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y
                    }}
                })) {
                    player2.score -= 2;
                }
            }

            for (let i=0; i< chestBoundaries.length; i++) {
                const chest = chestBoundaries[i];
                if (rectangularCollision({
                    rectangl1: player2,
                    rectangle2: {...chest, position: {
                        x: chest.position.x,
                        y: chest.position.y
                    }}
                })) {
                    player2.score += 3;
                }
            }
        }
        
    }
}

let currentClass;
let cube = document.querySelector('.cube');
function roll() {
    if (waiting) {
        let result = Math.round(Math.random() * (6-1) + 1);
            //console.log(randNum )
            //generate a class with the random number between 1 - 6 called showClass
            let showClass = 'show-' + result;
          // if there is a class already selected remove it
            if ( currentClass ) {
              cube.classList.remove( currentClass );
            }
          // add the new showclass with the generated number
            cube.classList.add( showClass );
          //set the current class to the randomly generated number
            currentClass = showClass;
    
        switch (result) {
            case 1:
            case 2:
                readyDirection = stop;
                if (turn === 1) {
                    p2Direction.innerHTML = "Stop, Change Player";
                }
                if (turn ===2) {
                    p1Direction.innerHTML = "Stop, Change Player";
                }
                if (turn === 1) turn = 2;
                else if (turn === 2) turn = 1;
                waiting = true;
                ready = false;
                break;
            case 3:
                readyDirection = left;
                if (turn=== 1) {
                p2Direction.innerHTML = "Turn Left"
                }
                if (turn ===2) {
                    p1Direction.innerHTML = "Turn Left";
                }
                break;
            case 4:
                readyDirection = right
                if (turn === 1) {
                    p2Direction.innerHTML = "Turn Right"
                }
                if (turn === 2) {
                    p1Direction.innerHTML = "Turn Right";
                }
                break;
            case 5:
            case 6:
                readyDirection = straight
                if (turn === 1) {
                    p2Direction.innerHTML =  "Go Straight"
                }
                if (turn === 2) {
                    p1Direction.innerHTML = "Go Straight";
                }
                break;
        }   
        
    }
    
}

rollButton.addEventListener("click", ()=>{
    roll();
    rollButton.style.display = "none"
    
            if (turn === 1 && readyDirection !=stop) {
                modalSentence.innerHTML = p2Direction.innerHTML
            } else if (turn === 2 && readyDirection !=stop) {
                modalSentence.innerHTML = p1Direction.innerHTML
            } else modalSentence.innerHTML = "Stop, Change Player!"

            setTimeout(() => {
                if (readyDirection != stop) {
                    ready = true;
                    waiting = false;
                }
                rollButton.style.display = "block"
                rollModal.style.display = "none"
                modalSentence.innerHTML = " "
            }, timer);
    
})


animate();