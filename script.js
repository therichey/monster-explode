// Add your JavaScript below!
var score = 0;

var $currentLevel;

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

//check to see if all current level monsters are now display none and then stop countdown, show level2 and start countdown again
var levelComplete = function() {
  if (($currentLevel.find('.monster')).filter(function() {
    return $(this).css('display') !== 'none';
  }).length === 0) {
    countdown.stop()
    $currentLevel.hide();
    $('.level2').show();
    countdown.start();
  }
}


$(document).ready(function() {
  $currentLevel = $('.level1');
  $('.level2').hide();
  startScreen();
  setupStartButtons();
  $('.monster').click(function() {
	//stop all animations
    $(this).stop(true);  
    $(this).effect('explode',levelComplete);
	//Play audio on monster click
    $('#monster-sound')[0].play();
    score = score + 20;
    updateScore();    
  });
});
