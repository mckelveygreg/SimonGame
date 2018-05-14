var sounds = {
    green: new Audio('sounds/simonSound1.mp3'),
    red: new Audio('sounds/simonSound2.mp3'),
    yellow: new Audio('sounds/simonSound3.mp3'),
    blue: new Audio('sounds/simonSound4.mp3')
};

// var soundGreen = new Audio('sounds/simonSound1.mp3');
// var soundRed = new Audio('sounds/simonSound2.mp3');
// var soundYellow = new Audio('sounds/simonSound3.mp3');
// var soundRed = new Audio('sounds/simonSound4.mp3');

var colors = document.querySelectorAll('.colors');
var gameboard = {}; // do i need this?

colors.forEach(function(color) {
    var id = color.id;
    color.addEventListener('click', function() {
        sounds[id].play();
    });
    gameboard = {id: id}; // doesn't add each to gameboard
});

var randomColorPlayer = function() {
    var randomColor = colors[Math.floor(Math.random()*colors.length)].id;
    sounds[randomColor].play();
    console.log(randomColor);
}


/*TODO
-- Study TicTacToe state switching
 -- AI
    - Make random color player
    - Record action in array
    - Game state switch
-- Player
    - Vet each choice against answer array
    - While in answer array
    - If correct choice, move to next index
    - 
*/
