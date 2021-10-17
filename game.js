var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var gameContinue = true;
var testLog = [];

$(document).keypress(function(){
    
    if (gameStarted == false){  
        gameStarted = true;
        nextSequence()  
    }
});


function nextSequence()
{
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    //** Refactoráltam új funkcióba inkább **//

    //var randomSound = new Audio("sounds/"+randomColor+".mp3");
    //randomSound.play();
    playSound(randomColor);
    level++;
    $("h1").text("Level "+level);
    console.log(gamePattern);
}

$(".btn").on("click", function(){
    // var userChosenColour = $(this).attr("id"); //alternative with Jquery.
    if(gameStarted){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    
    animatePress(userChosenColor);

    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length-1); //ez valszeg nem jó  
    }
});

function playSound(sound)
{
    var soundSelected = new Audio("sounds/"+sound+".mp3");
    soundSelected.play();
}

function animatePress(currentColor)
{
    $("."+currentColor).addClass("pressed");
    setTimeout(function() {
        $("."+currentColor).removeClass("pressed");
    }, 100);
    
}

function checkAnswer(currentLevel)
{
        
        //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    
          console.log("success");
    
          //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
          if (userClickedPattern.length === gamePattern.length){
            if(level == 6){
                gameStarted = false;
                level = 0;
                gamePattern = [];
                $("h1").text("You won! Press Any Keyboard Key to Restart!");
            }else{
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
          }
    
        } else {
            var soundSelected = new Audio("sounds/wrong.mp3");
            soundSelected.play();
            $("body").addClass("game-over");
            setTimeout(function() {
                $("body").removeClass("game-over");
            }, 200);
          console.log("wrong");
          $("h1").text("Game Over, Press Any Keyboard Key to Restart!");
          gamePattern = [];
          level = 0;
          gameStarted = false;
    
}
    
    /*for (var i = 0; i < currentLevel.length; i++) {
            if (currentLevel[i] !== gamePattern[i]){
                testLog.push("Wrong")
                
            }else{
                testLog.push("Right");
            }
        
        console.log(testLog);
        } */    
}
