var formatDate = d3.time.format("%x").parse

var data1 = d3.csv("KrogerData.csv",function(data1) {
    data1.forEach(function(d) {
        d.date = formatDate(d.date);
        d.open = +d.open;
        d.close = +d.close;
        d.high = +d.high;
        d.low = +d.low;
        d.volume = +d.volume;
        d.adjusted = +d.adjusted;
    });
    data1 = [{values: data1}]
    console.log(data1);
    addStuff(data1);
});

function addStuff(data1) {
    nv.addGraph(function() {
        var chart = nv.models.ohlcBarChart()
            .x(function(d) { return d['date'] })
            .y(function(d) { return d['close'] })
            .duration(250)
            .margin({left: 75, bottom: 50});

        // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
        chart.xAxis
                .axisLabel("Dates")
                .tickFormat(function(d) {
                    return d3.time.format('%x')(new Date(d));
                });

        chart.yAxis
                .axisLabel('Stock Price')
                .tickFormat(function(d,i){ return '$' + d3.format(',.1f')(d); });

        d3.select("#a_tab svg")
                .datum(data1)
                .transition().duration(500)
                .call(chart);

        nv.utils.windowResize(chart.update);
        return chart;
    });
};
