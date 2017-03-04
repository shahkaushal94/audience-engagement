$(document).ready(function() {
  Chart.defaults.global.defaultFontColor = 'white';
  var chart = new Chart($('#chart'), {
    type: 'line',
    data: {
      labels: ["", "", "", "", "", "", "", ""],
      datasets: [{
        label: 'Personal Tone',
        fill: false,
        data: [20, 91, -30, 52, -21, 35, 80, 34, -64],
        backgroundColor: 'yellow',
        borderColor: 'yellow',
        borderWidth: 1
      }, {
        label: 'Audience Engagement',
        fill: false,
        data: [90, 41, 35, 21, -60, -85, 21, 56, -12],
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            color: 'white',
            display:false
          }
        }],
        yAxes: [{
          gridLines: {
            color: 'white',
            display:false
          },
          ticks: {
            min: -100,
            max: 100
          }
        }]
      },
      legend: {
        position: 'left'
      }
    }
  });

  $('#start-splash-page').on("click", function() {
    controllers.start();
  });
  $('#stop').on("click", function() {
    controllers.stop();
  });
  $('#start-recording-page').on("click", function() {
    controllers.continue();
  });
});

var timer;

var controllers = {
  start: function() {
    view.changeView();
    this.continue();
  },
  continue: function() {
    $('#start-recording-page').css('display', 'none');
    $('#stop').css('display', 'block');
    _this = this;
    timer = setInterval(function() {
      _this.update() 
    }, 5000);
  },
  stop: function() {
    $('#stop').css('display', 'none');
    $('#start-recording-page').css('display', 'block');
    clearInterval(timer);
  },
  update: function() {
    $.get({
      url: "emotions.py"
    }).done(function(data) {

    }).fail(function(err) {
      console.log('Failed:', err);
    });
  }
};

var view = {
  changeView: function() {
    $('#splash-page').css('display', 'none');
    $('#recording-page').css('display', 'block');
  }
}
