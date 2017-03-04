$(document).ready(function() {
  Chart.defaults.global.defaultFontColor = 'white';
  var chart = new Chart($('#chart'), {
    type: 'line',
    data: {
      labels: ["", "", "", "", "", "", "", ""],
      datasets: [{
        label: 'Personal Tone',
        fill: false,
        data: [12, 19, 3, 5, 2, 3, 10, 3, 4],
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
});
