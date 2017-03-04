$(document).ready(function() {
<<<<<<< HEAD
  setTimeout (function() { chartUpdate(20); }, 1000);
})

var chartUpdate = function(value) {
        console.log("Updating Chart: ", value);
        
        // Replace the chart canvas element
        $('#chart').replaceWith('<canvas id="chart" width="400" height="100"></canvas>');
        Chart.defaults.global.defaultFontColor = 'white';
        

        var chart = new Chart($('#chart'), {
        type: 'line',
        data: {
          labels: ["", "", "", "", "", "", "", ""],
          datasets: [{
            label: 'Personal Tone',
            fill: false,
            data: [value, 9, 3, 5, 2, 3, 10, 3, 4],
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            borderWidth: 1
          }, {
            label: 'Audience Engagement',
            fill: false,
            data: [10, 14, 3, 15, 2, 13, 1, 31, 1],
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
                beginAtZero: true
              }
            }]
          },
          legend: {
            position: 'left'
          }
        }
      });
        
        // Schedule next chart update tick
        setTimeout (function() { chartUpdate(value - 1); }, 1000);
}
=======
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

>>>>>>> b60ebfd99ea183fa5723387cdfa1bc17cb1018fa
