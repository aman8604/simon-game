var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level;
var started=false;




$(document).on("keydown", function () {
    if(!started){
        started=true;
        startGame();
    }
});

$('#start-game').on("click",function(){
    if(!started){
        started=true;
        startGame();
    }
})

function startGame() {
    level = 0;
    $('#level-title').text("Level : " + level);
    nextSequence();
}




$('.btn').on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    if (checkAnswer()) {
        if (userClickedPattern.length == gamePattern.length) {
            userClickedPattern = [];
            setTimeout(function () {
                nextSequence();
            }, 1000)
        }
    }
    else {
        var wrongAnswerAudio = new Audio("sounds/wrong.mp3");
        wrongAnswerAudio.play();
        $('body').addClass("game-over");
        setTimeout(function () {
            $('body').removeClass("game-over");
        }, 200)
        $('#level-title').text("Game Over :Press Any key To restart");
        startOver();
    }
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#' + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $('#level-title').text("Level : " + level);
}

function playSound(color) {
    var buttonSound = new Audio("sounds/" + color + ".mp3");
    buttonSound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    var userEnterColor = userClickedPattern.length-1;
    if(gamePattern[userEnterColor]==userClickedPattern[userEnterColor]){
        return true;
    }
    else{
        return false;
    }
}

function startOver() {
        gamePattern = [];
        userClickedPattern = [];
        started=false;
}