//DONE - var count, counter;

//set counter number and start it

var countdown = {
  count: 0,
  counter: null,
  
  start: function() {
    $('#timer').show();
    this.count = 15;
    //As setInterval is stupid you should not use 'this.timer' you need to wrap the function within another function setTimeout is the same 
    this.counter = setInterval(function(){
      countdown.timer()
    }, 1000);
    this.updateTimer();
  },
  //update the timer to show within the html
  updateTimer: function() {
    $('#timer').text(this.count); 
  },
  //counting down and stopping the timer when it reaches 0
  timer: function() {
    this.count = this.count - 1;
    this.updateTimer();
    if (this.count <= 0) {
      this.stop();
      timeoutScreen();
    }
  },
  stop: function() {
    clearInterval(this.counter);
    $('#timer').hide();
  }
}