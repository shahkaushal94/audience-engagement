var chart;
var info = {};

$(document).ready(function() {
  Chart.defaults.global.defaultFontColor = 'white';
  chart = new Chart($('#chart'), {
    type: 'line',
    data: {
      labels: ["", "", "", "", ""],
      datasets: [{
        fill: false,
        data: [],
        borderColor: 'yellow',
        borderWidth: 3
      }, {
        fill: false,
        data: [],
        borderColor: 'white',
        borderWidth: 3
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
            display: false
          },
          ticks: {
            min: -100,
            max: 100
          }
        }]
      },
      legend: {
        display: false
      }
    }
  });

  var first = chart.data.datasets[0].data;
  var second = chart.data.datasets[1].data;
  first.length = 6;
  second.length = 6;
  first.fill(0);
  second.fill(2);

  $('#start-splash-page').on("click", function() {
    controllers.start();
  });
  $('#pause').on("click", function() {
    controllers.pause();
  });
  $('#start-recording-page').on("click", function() {
    controllers.continue();
  });
  $('#stop').on("click", function() {
    controllers.stop();
  });

  var elem = new Foundation.Reveal($('#modal'));
  $('#chart').on("click", function(e) {
    var activePoint = chart.getElementAtEvent(e);
    controllers.openModal(activePoint);
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
    $('#pause').css('display', 'inline');
    _this = this;
    timer = setInterval(function() {
      _this.update() 
    }, 5000);
  },
  pause: function() {
    $('#pause').css('display', 'none');
    $('#start-recording-page').css('display', 'inline');
    clearInterval(timer);
  },
  stop: function() {
    $('#pause').css('display', 'none');
    $('#start-recording-page').css('display', 'none');
    $('#stop').css('display', 'none');
    clearInterval(timer);
  },
  update: function() {
    // $.get({
    //   url: "emotions.py"
    // }).done(function(data) {

    // }).fail(function(err) {
    //   console.log('Failed:', err);
    // });
    $('#splash-page').css('display', 'none');
    var first = chart.data.datasets[0].data;
    var second = chart.data.datasets[1].data;

    first.push();
    first.shift();

    if( window.sentiStats !== undefined){
      var sentiStats = window.sentiStats;
      console.log(sentiStats, typeof sentiStats) 
    }
    if (sentiStats !== null && sentiStats !== undefined){
      second.push(sentiStats[sentiStats.length- 1]*100);
      second.shift();
    }
    
    chart.update();
  },
  openModal: function(activePoint) {
    if (activePoint.length > 0) {
      $('#modal').foundation('open');
    }
  }
};

var view = {
  changeView: function() {
    $('#splash-page').css('display', 'none');
    $('#recording-page').css('display', 'block');
  }
}
