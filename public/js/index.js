$(document).ready(function() {
  var chart = new Chart($('#chart'), {
    type: 'line',
    data: {
      labels: ["", "", "", "", "", "", "", ""],
      datasets: [{
        label: 'Personal Tone',
        fill: false,
        data: [12, 19, 3, 5, 2, 3, 10, 3, 4],
        borderColor: '#f39c12',
        borderWidth: 1
      }, {
        label: 'Audience Engagement',
        fill: false,
        data: [10, 14, 3, 15, 2, 13, 1, 31, 1],
        borderColor: '#2980b9',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
            display:false
          }
        }],
        yAxes: [{
          gridLines: {
            display:false
          },
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
});
