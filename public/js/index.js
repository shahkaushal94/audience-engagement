var chart;
var info = {
  userData: {
    data: [],
    info: []
  },
  audienceData: {
    data: [],
    info: []
  }
};

$(document).ready(function() {
  Chart.defaults.global.defaultFontColor = 'white';
  chart = new Chart($('#chart'), {
    type: 'line',
    data: {
      labels: ["", "", "", "", ""],
      datasets: [{
        fill: false,
        data: [],
        borderColor: 'white',
        borderWidth: 3
      }, {
        fill: false,
        data: [],
        borderColor: 'yellow',
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

  var userData = chart.data.datasets[0].data;
  var audienceData = chart.data.datasets[1].data;
  userData.length = 6;
  audienceData.length = 6;
  userData.fill(0);
  audienceData.fill(2);

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
    chart.data.labels.length = info.userData.data.length;
    chart.data.labels.fill("");
    chart.data.datasets[0].data = info.userData.data;
    chart.data.datasets[1].data = info.audienceData.data;
    chart.update();
  },
  update: function() {
    $('#splash-page').css('display', 'none');
    var userData = chart.data.datasets[0].data;
    var audienceData = chart.data.datasets[1].data;

    if (window.sentiStats !== undefined) {
      var sentiStats = window.sentiStats;
      console.log(sentiStats, typeof sentiStats);
    }
    if (sentiStats !== null && sentiStats !== undefined) {
      var returnInfo = sentiStats[sentiStats.length - 1];
      info.userData.data.push(returnInfo.rating);
      info.userData.info.push(returnInfo);
      userData.push(returnInfo.rating);
      userData.shift();
      console.log("User: " + info.userData.info);
    }

    info.audienceData.data.push(0);
    info.audienceData.info.push({
      image: "",
      rating: 0
    });
    audienceData.push(0);
    audienceData.shift();
    console.log("Audience: " + info.audienceData.info);
    
    chart.update();
  },
  openModal: function(activePoint) {
    if (activePoint.length > 0) {
      var index = activePoint[0]._index + 1;
      if (info.userData.info.length >= index) {
        var userData = info.userData.info[index];
        var audienceData = info.audienceData.info[index];
        $('#speech').innerHTML = userData.text;
        $('#speech-rating').innerHTML = userData.rating;
        $('#image').innerHTML = audienceData.image;
        $('#image-rating').innerHTML = audienceData.rating;
        $('#modal').foundation('open');
      }
    }
  }
};

var view = {
  changeView: function() {
    $('#splash-page').css('display', 'none');
    $('#recording-page').css('display', 'block');
  }
}
