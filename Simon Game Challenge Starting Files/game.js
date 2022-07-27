const buttonColours = ["red", "blue", "green", "yellow"]; //criandoum array com as cores dos botões
var gamePattern = [];
let userClickedPattern = [];
const numberOfButtons = document.querySelectorAll(".btn").length;
var started = false;
let level = 0
document.addEventListener('keypress', (event) => {
    if (!started) {
        document.getElementById("level-title").innerHTML = ("Level " + level);
        nextSequence();
        started = true;
    }
});

for (var i = 0; i < numberOfButtons; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function (event) {
        let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    });
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        document.querySelector("body").classList.add("game-over");
        document.getElementById("level-title").innerHTML = ("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            document.querySelector("body").classList.remove("game-over");
        }, 200);
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    document.getElementById("level-title").innerHTML = ("Level " + level);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    const colorSelect = document.getElementById(randomChosenColour);
    colorSelect.classList.add("transparent");
    function removeOpacity() {
        colorSelect.classList.remove("transparent")
    };
    setTimeout(removeOpacity, 100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    const idUser = document.getElementById(currentColor);
    idUser.classList.add("pressed");
    setTimeout(function () {
        idUser.classList.remove("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}