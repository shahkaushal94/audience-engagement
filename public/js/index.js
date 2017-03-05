var chart;

$(document).ready(function() {
  Chart.defaults.global.defaultFontColor = 'white';
  chart = new Chart($('#chart'), {
    type: 'line',
    data: {
      labels: ["", "", "", "", "", ""],
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
    // $.get({
    //   url: "emotions.py"
    // }).done(function(data) {

    // }).fail(function(err) {
    //   console.log('Failed:', err);
    // });
    $('#splash-page').css('display', 'none');
    var first = chart.data.datasets[0].data;
    var second = chart.data.datasets[1].data;
    first.push(30);
    first.shift();
    second.push(54);
    second.shift();
    chart.update();
  }
};

var view = {
  changeView: function() {
    $('#splash-page').css('display', 'none');
    $('#recording-page').css('display', 'block');
  }
}
