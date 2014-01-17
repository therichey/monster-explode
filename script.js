// Add your JavaScript below!
var score = 0;
var updateScore = function() {
  $('#score-value').text(score);    
};

//A function that allows me to put in a range
var range = function(a, b) {
  return (Math.random() * (b - a) + a);
};

//Create a function that gives binary results
var oneOf = function(x, y) {
  if (Math.random() < 0.5) {
    return x;
  } else {
    return y;
  }
};

var path = function($monster) {
  var topOrLeft = oneOf('top','left');
  var plusOrMinus = oneOf('+','-');
  var distance = range(50, 350);
  var offset = $monster.offset();
  //Check if the monsters are going to go above the top and prevent it if they are
  if (topOrLeft === 'top' && plusOrMinus === '-') {
    if (offset.top - distance < 0) {
      plusOrMinus = '+';
    } 
  //Check if the monsters are going left and prevent it
  } else if (topOrLeft === 'left' && plusOrMinus === '-') {
    if (offset.left - distance < 0) {
      plusOrMinus = '+';
    }
  //Check if the monsters are going down and prevent it  
  } else if (topOrLeft === 'top' && plusOrMinus === '+') {
    if (offset.top + distance > $(window).height() ) {
      plusOrMinus = '-';
    }
  //Check if the monster are going right and prevent it
  } else if (topOrLeft === 'left' && plusOrMinus === '+') {
    if (offset.left + distance > $(window).width() ) {
      plusOrMinus = '-';
    }
  };
  //Make the monsters move
  var animationProperties = {};
  animationProperties[topOrLeft] = plusOrMinus + '=' + distance +'px'; 
  $monster.animate(animationProperties, range(1000, 3000), function() {
    path($monster);
  });
};

//Different game screens
var startScreen = function() {
  $('.start').show();
  $('.monster').hide();
  $('.congratulations').hide();
  $('.time-out').hide();
}
var playingScreen = function() {
  $('.start').hide();
  $('.monster').show();
  $('.congratulations').hide();
  $('.time-out').hide();
}
var congratulationScreen = function() {
  $('.congratulations').show();
  $('.start').hide();
  $('.time-out').hide();
}
var timeoutScreen = function() {
  $('.start').hide();
  $('.monster').hide();
  $('.monster').stop(true);
  $('.congratulations').hide();
  $('.time-out').show();
}

//Make the start button work
var setupStartButtons = function() {
  $('.start-button').click(function() {
    score = 0;
    updateScore();
    countdown.start();
    playingScreen();
    $('.monster').each(function() {
      path($(this));
    });
  });
}
  
$(document).ready(function() {
  startScreen();
  setupStartButtons();
  $('.monster').click(function() {
	//stop all animations
    $(this).stop(true);  
    $(this).effect('explode');
	//Play audio on monster click
    $('#monster-sound')[0].play();
    score = score + 20;
    updateScore();
    if (score === 80) {
      countdown.stop()
      congratulationScreen();
    }
  });
});
