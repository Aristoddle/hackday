var initialChartData = [
  // First series
  {
    label: "Series 1",
    values: [ ]
  },
  //The second series
  {
    label: "Series 2",
    values: [ ]
  },

  {
    label: "Series 3",
    values: [ ]
  },

  {
    label: "Series 4",
    values: [ ]
  }
];

var lineChart = $('#lineChart').epoch({
  type: 'time.line',
  data: initialChartData,
  axes: ['left', 'right', 'bottom'],
  range: [0, 60]
});

setInterval(function() {
  var now = Date.now()
  var newDataPoint = [ {'time': now, 'y': latencies[0]},
                       {'time': now, 'y': latencies[1]},
                       {'time': now, 'y': latencies[2]},
                       {'time': now, 'y': latencies[3]}  ]
  lineChart.push(newDataPoint)
}, 500)


// function appendDataPoint(playerName, time, latency) {
//   var newDataPoint = [{}, {}, {}];
//   var lineId = parseInt(playerName.split("_").pop()) - 1;
//   newDataPoint[lineId] = {"time":time , "y": latency};
//   // lineChartData[lineId].values.push({"time":time , "y": latency})
//   lineChart.push(newDataPoint);
// }
