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
    view.openModal(activePoint);
  });
});

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
    }, 5000);
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
    $('#stop').css('display', 'none');
    $('#text-wrapper').html("");
    var maxWidth = Math.max(info.userData.data.length, info.audienceData.data.length);
    $('#text-wrap').css('width', 10 * maxWidth + 'vw');
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

    chart.update();
  },
  updateAudience: function() {
    var audienceData = chart.data.datasets[1].data;

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
  updateImage: function() {
    getSearchImages(info.userData.info[info.userData.info.length - 1].text, view.openImage);
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
      if (type == 0 && info.userData.info.length >= index) {
        console.log('heyyy');
        var userData = info.userData.info[index];
        $('#speech').html(userData.text);
        $('#speech-rating').html(userData.rating);
      } else if (type == 1 && info.audienceData.info_length >- index) {
        var audienceData = info.audienceData.info[index];
        $('#image').html(audienceData.image);
        $('#image-rating').html(audienceData.rating);
      }
      $('#modal').foundation('open');
    }
  },
  openImage: function(source) {
    console.log(source);
    $('#image-rating').innerHTML = source;
    $('#modal').foundation('open');
  }
}
