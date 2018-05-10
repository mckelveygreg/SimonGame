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

var gameboard = document.querySelectorAll('.colors');

gameboard.forEach(function(color) {
    var id = color.id;
    console.log(sounds[id]);
    color.addEventListener('click', function() {
        sounds[id].play();
    });
});

