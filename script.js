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

//Create random path animation for the monsters
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
    if (offset.top + distance + $monster.height() > $(window).height() ) {
      plusOrMinus = '-';
    }
  //Check if the monster are going right and prevent it
  } else if (topOrLeft === 'left' && plusOrMinus === '+') {
    if (offset.left + distance + $monster.width() > $(window).width() ) {
      plusOrMinus = '-';
    }
  };
  //set the range of speeds to use the data attributes
  var range1 = $currentLevel.data('speed1');
  var range2 = $currentLevel.data('speed2');
  //Make the monsters move
  var animationProperties = {};
  animationProperties[topOrLeft] = plusOrMinus + '=' + distance +'px'; 
  $monster.animate(animationProperties, range(range1,range2), function() {
    path($monster);
  });
};


//Different game screens
var startScreen = function() {
  $('.start').show();
  $('.level').hide();
  $('.time-out, .congratulations').hide();
}

var startLevel = function() {
  $('.start, .time-out, .congratulations').hide();
  $currentLevel.show();
  $currentLevel.find('.monster').show();
  $currentLevel.find('.monster').each(function() {
    path($(this));
  });
  countdown.start();
}

var endLevel = function() {
  $currentLevel.hide();
  $('.monster').stop(true);
}

var congratulationScreen = function() {
  $('.congratulations').show();
  $('.start').hide();
  $('.time-out').hide();
}

var timeoutScreen = function() {
  $('.start, .congratulations').hide();
  $('.time-out').show();
  endLevel();
}

//Make the start button work
var setupStartButtons = function() {
  $('.start-button').click(function() {
    score = 0;
    updateScore();
    $currentLevel = $('.level1');
    startLevel();
  });
}

//check to see if all current level monsters are now display none and then stop countdown, show next level and start countdown again or show congratulations screen
var levelCompleteCheck = function() {
  if ($currentLevel.find('.monster').filter(function() {
    return $(this).css('display') !== 'none';
  }).length === 0) {
    countdown.stop()
    endLevel();
    if ($currentLevel.next().hasClass('level')) {
      $currentLevel = $currentLevel.next();
      startLevel();
    } else {
      congratulationScreen();
    } 
  }
}


$(document).ready(function() {
  $('.raptorButton').raptorize();
  startScreen();
  setupStartButtons();
  $('.monster').mousedown(function(e) {
    e.preventDefault();
	//stop current monster animation
    $(this).stop(true);  
    $(this).effect('explode',levelCompleteCheck);
	//Play audio on monster click
    $('#monster-sound')[0].play();
    score = score + 20;
    updateScore();    
  });
});



