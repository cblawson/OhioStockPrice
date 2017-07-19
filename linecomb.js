var formatDate = d3.time.format("%x").parse

var data2 = d3.csv("KrogerData.csv",function(data2) {
    data2.forEach(function(d) {
        d.x = formatDate(d.date);
        d.y = +d.close;
        delete d.open;
        delete d.adjusted;
        delete d.high;
        delete d.low;
        delete d.volume;
        delete d.date
        delete d.close
    });
    console.log(data2);
    addStuff(data2);
});

/*These lines are all chart setup.  Pick and choose which chart features you want to utilize. */
function addStuff(data2) {
nv.addGraph(function() {
  var chart = nv.models.lineChart()
                .margin({left: 75, bottom: 50})  //Adjust chart margins to give the x-axis some breathing room.
                .useInteractiveGuideline(true)  //We want nice looking tooltips and a guideline!
                .showLegend(true)       //Show the legend, allowing users to turn on/off line series.
                .showYAxis(true)        //Show the y-axis
                .showXAxis(true)        //Show the x-axis
  ;

  chart.xAxis     //Chart x-axis settings
      .axisLabel('Dates')
      .tickFormat(function(d) {
                    return d3.time.format('%x')(new Date(d));
      });

  chart.yAxis     //Chart y-axis settings
      .axisLabel('Stock Price')
      .tickFormat(function(d,i){ return '$' + d3.format(',.1f')(d); });

  /* Done setting the chart up? Time to render it!*/
  var myData = sinAndCos(data2);   //You need data...
  console.log(myData);

  d3.select('#b_tab svg')    //Select the <svg> element you want to render the chart in. 
      .datum(myData) //Populate the <svg> element with chart data...
      .call(chart);          //Finally, render the chart!

  //Update the chart when window resizes.
  nv.utils.windowResize(function() { chart.update() });
  return chart;
});
};
/**************************************
 * Simple test data generator
 */
function sinAndCos(data2) {

  //Line chart data should be sent as an array of series objects.
  return [
    {
      values: data2,      //values - represents the array of {x,y} data points
      key: 'Kroger', //key  - the name of the series.
      color: '#4141CA'  //color - optional: choose your own line color.
    }
  ];
}
