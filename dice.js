//this function will generate a random number between 1 and 6 (or whatever value you send it)
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
  
let currentClass;
let cube = document.querySelector('.cube');
let randNum;


//our main roll dice function on click
function rollDice() {
  //genberate a random number between 1 and 6 with out getRandomInt function
    randNum =getRandomInt(1,7); 
    console.log(randNum )
    //generate a class with the random number between 1 - 6 called showClass
    var showClass = 'show-' + randNum;
    console.log(showClass)
  // if there is a class already selected remove it
    if ( currentClass ) {
      cube.classList.remove( currentClass );
    }
  // add the new showclass with the generated number
    cube.classList.add( showClass );
  //set the current class to the randomly generated number
    currentClass = showClass;
}

// set initial side
rollDice();
