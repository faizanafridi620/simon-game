let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let started = false;



$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " +level);
        nextsequence();
        started = true;
    }
});


function nextsequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    let randomNumber = Math.floor((Math.random()*4));
    // console.log(randomNumber);
    let randomChosenColours = buttonColours[randomNumber];
    gamePattern.push(randomChosenColours);
    // console.log(gamePattern);
    $("#" + randomChosenColours).fadeOut(100).fadeIn(100);
    playSound(randomChosenColours);
    
}

// nextsequence();

$(".btn").click(function (){
    let userChoosenColour = $(this).attr("id");
    // console.log(userChoosenColour);
    userClickedPattern.push(userChoosenColour);
    // console.log(userClickedPattern);
    playSound(userChoosenColour);
    animatePress(userChoosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log("Success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextsequence();
            },1000);
        }
    }else{
        // console.log("FAILED");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}


function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};


function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    },100);
};





