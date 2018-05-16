var sounds = {
    green: new Audio('sounds/simonSound1.mp3'),
    red: new Audio('sounds/simonSound2.mp3'),
    yellow: new Audio('sounds/simonSound3.mp3'),
    blue: new Audio('sounds/simonSound4.mp3'),
    applause: new Audio('sounds/umgawa.wav'),
    boo: new Audio('sounds/sfxboo.wav')
};
// var soundGreen = new Audio('sounds/simonSound1.mp3');
// var soundRed = new Audio('sounds/simonSound2.mp3');
// var soundYellow = new Audio('sounds/simonSound3.mp3');
// var soundRed = new Audio('sounds/simonSound4.mp3');

var colors = document.querySelectorAll('.colors');
var start = document.querySelector('#start');
var counter = document.querySelector('#counter');

var gameboard = {
  green: colors[0],
  red: colors[1],
  yellow: colors[2],
  blue: colors[3]  
};

var colorsPlayed = [];

start.addEventListener('click', function() {
    start.innerHTML = 'Focus!';
    randomColorPicker();
    colorPlayer(colorsPlayed);
});

colors.forEach(function(color) {
    var id = color.id;
    color.addEventListener('click', function() {
        sounds[id].play();
        testMemory(id);
    });
});

function randomColorPlayer () {
    var randomColor = colors[Math.floor(Math.random()*colors.length)].id;
    sounds[randomColor].play();
    console.log(randomColor);
    colorsPlayed.push(randomColor);
    colorLightUp(randomColor);
    return randomColor;
}

function colorLightUp(color) {
    console.log(gameboard[color]);
    gameboard[color].classList.add('lit');
    setTimeout(function() {
        gameboard[color].classList.remove('lit');
    }, 600);
}

function colorPlayer(arr) {
    var i = 0;
    var intervalId = setInterval(function () {
        if (i == arr.length - 1) {
            clearInterval(intervalId);
        }
        sounds[arr[i]].play();
        colorLightUp(arr[i]);
        i++;
    }, 750);
    
}

function randomColorPicker() {
    var randomColor = colors[Math.floor(Math.random()*colors.length)].id;
    //sounds[randomColor].play();
    console.log(randomColor);
    colorsPlayed.push(randomColor);
}

/*
- start
- Simon plays, records
- Player tries, try tested
- if correct, simon plays again, else game over
*/
var indx = 0;
var level = 1;
var testMemory = function(color) {
    if (color == colorsPlayed[indx] && indx <= colorsPlayed.length - 2) {
        console.log('encouraging messege');
        indx++;
        //game();
    } else if (color == colorsPlayed[indx] && indx == colorsPlayed.length - 1) {
        console.log('you passed this level');
        sounds.applause.play();
        sounds.applause.addEventListener('ended', function() {
            console.log('ended, time to move on');
            randomColorPicker();
            colorPlayer(colorsPlayed);
        });
        level++;
        counter.innerHTML = level;
        indx = 0;
        
    } else {
        console.log('you lost?');
        sounds.boo.play();
        level = 1;
        indx = 0;
        colorsPlayed = [];
        counter.innerHTML = level;
        start.innerHTML = 'Try again?';
    }
};

var game = function() {
    randomColorPicker();
    colorPlayer(colorsPlayed);
};

var State = function (old) {
    this.turn = '';

    this.result = 'still running';

    //TODO: answer array? not sure how to format this yet
    this.simonMemory = [];

    if (typeof old !== 'undefined') {
        // moving all old state to new state declaration
        this.result = old.result;
        this.turn = old.turn;
        this.simonMemory = old.simonMemory; // this may break things... 
    }

    this.advanceTurn = function() {
        this.turn = this.turn === 'player' ? 'simon' : 'player';
    };

    // check to see if player answered correctly
    // how to integrate player memory into this... 
    this.isTerminal = function() {
        //var m = this.memory;
        //Temp
        return false;
    };
};

// Game object.. not sure what to add
var Game = function (simon) {
    // init simon for this game
    this.simon = simon;

    // init game current state
    this.currentState = new State();

    // current memory
 

    // simon plays first
    this.currentState.turn = 'simon';

    // only keep this if i end up calling it... 
    this.status = 'beginning';

    //needed to tell simon to play another sound
    this.advanceTo = function (_state) {
        this.currentState = _state;

        if (_state.isTerminal()) {
            this.status = 'ended';
            //how to say you lost here?
        }
        else {
            // ui switch? and simon notify
            if (this.currentState.turn === 'player') {
                // ui switch? to human?
            }
            else {
                // ui switch to simon
                this.currentState.simonMemory = simon.notify();
            }
        }
    };

    this.start = function () {
        if (this.status === 'beginning') {
            // invoke advanceTo with the initial state
            this.advanceTo(this.currentState);
            this.status = 'running';
        }
    };
};
// Later, can input strict or not
var Simon = function () {
    // play/pick random color/sound
    // put info in simon memory
    //advance to player turn
    
    this.notify = function randomColorPlayer () {
        var randomColor = colors[Math.floor(Math.random()*colors.length)].id;
        sounds[randomColor].play();
        console.log(randomColor);
        return randomColor;
    };

    //this.currentState.simonMemory = 
};
/*TODO
-- Study TicTacToe state switching
    - made skelotons of State and Game
        - need to init them somewhere
    - need to program simon to play and record sound
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
