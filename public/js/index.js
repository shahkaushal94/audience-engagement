var chart;
var info = {};
window.scores = [];
var startTime = Date();

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
    view.openModal(activePoint);
  });
});

var timerUser;
var timerAudience;
var timerImage;

var controllers = {
  start: function() {
    view.changeView();
    this.continue();
  },
  continue: function() {
    $('#start-recording-page').css('display', 'none');
    $('#pause').css('display', 'inline');
    _this = this;
    timerUser = setInterval(function() {
      _this.updateUser() 
    }, 5000);
    timerAudience = setInterval(function() {
      _this.updateAudience() 
    }, 5000);
    timerImage = setInterval(function() {
      _this.updateImage()
    }, 15000);
  },
  pause: function() {
    $('#pause').css('display', 'none');
    $('#start-recording-page').css('display', 'inline');
    clearInterval(timerUser);
    clearInterval(timerAudience);
    clearInterval(timerImage);
  },
  stop: function() {
    this.pause();
    $('#start-recording-page').css('display', 'none');
    $('#stop').css('display', 'none');
    $('#text-wrapper').html("");
    // var maxWidth = Math.max(info.userData.data.length, info.audienceData.data.length);
    // $('#text-wrap').css('width', 10 * maxWidth + 'vw');
    chart.data.labels.length = info.userData.data.length;
    chart.data.labels.fill("");
    chart.data.datasets[0].data = info.userData.data;
    chart.data.datasets[1].data = info.audienceData.data;
    chart.update();
  },
  updateUser: function() {
    var userData = chart.data.datasets[0].data;

    if (window.sentiStats !== undefined) {
      var sentiStats = window.sentiStats;
    }
    if (sentiStats !== null && sentiStats !== undefined) {
      var returnInfo = sentiStats[sentiStats.length - 1];
      info.userData.data.push(returnInfo.rating);
      info.userData.info.push(returnInfo);
      userData.push(returnInfo.rating);
      userData.shift();
    }

    chart.update();
  },
  updateAudience: function() {
    var audienceData = chart.data.datasets[1].data;

    setInterval(function() {
      getImageScores()
    }, 5000);

    console.log(window.scores)
    var scores = window.scores;
    if (scores !== null && scores[scores.length - 1] !== undefined) {
      info.audienceData.data.push(scores[scores.length - 1]);
      info.audienceData.info.push({
        rating: scores[scores.length - 1]
      });
      audienceData.push(scores[scores.length - 1]);
      audienceData.shift();
    }

    chart.update();
  },
  updateImage: function() {
    getSearchImages(info.userData.info.length == 0 ? "" : info.userData.info[info.userData.info.length - 1].text, view.openImage);
  }
};

var view = {
  changeView: function() {
    $('#splash-page').css('display', 'none');
    $('#recording-page').css('display', 'block');
  },
  openModal: function(activePoint) {
    if (activePoint.length > 0) {
      var type = activePoint[0]._datasetIndex;
      var index = activePoint[0]._index + 1;
      console.log(activePoint);
      if (type == 0 && info.userData.info.length >= index) {
        var userData = info.userData.info[index];
        $('#modal').html("<h3>Speech: " + userData.text + "<br>Rating: " + userData.rating + "</h3>");
      } else if (type == 1 && info.audienceData.info_length >= index) {
        var audienceData = info.audienceData.info[index];
        $('#modal').html("<img src='" + audienceData.image + "'><h3><br>Rating: " + audienceData.rating + "</h3>");
      }
      $('#modal').foundation('open');
    }
  },
  openImage: function(source) {
    $('#modal').html("<img src='" + source + "'>");
    $('#modal').foundation('open');
    setTimeout(function() {
      $('#modal').foundation('close');
    }, 1500);
  }
}

function getImageScores() {
  axios.get('/getImage')
  .then(function(data){
    var score = parseInt(data.data) * 10.56 || 0;
    console.log(score);
    window.scores.push(score);
  })
}
