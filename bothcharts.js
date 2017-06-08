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
	data1 = [{values: data1}];
	console.log(data1);
	addStuff(data1);
});

function addStuff(data1) {
	nv.addGraph(function() {
		var chart = nv.models.ohlcBarChart()
			.x(function(d) { return d['date'] })
			.y(function(d) { return d['close'] })
			.duartion(250)
			.margin({left: 75, bottom: 50});

		chart.xAxis
			.axisLabel("Dates")
			.tickFormat(function(d) {
				return d3.time.format('%x')(new Date(d));
			});

		chart.yAxis
			.axisLabel("Stock Price")
			.tickFormat(function(d,i) {return '$' + d3.format(',.1f')(d); });

		d3.select("#chart1 svg")
			.datum(data1)
			.transition().duration(500)
			.call(chart);

		nv.utils.windowResize(chart.update);
		return chart;
	});
};

var data2 = d3.csv("KrogerData.csv",function(data2) {
	data2.forEach(function(d) {
		d.x = formatDate(d.date);
		d.y = +d.close;
		delete d.open;
		delete d.close;
		delete d.high;
		delete d.low;
		delete d.volume;
		delete d.adjusted;
	});
	console.log(data2);
	addStuff2(data2);
});

function addStuff2(data2) {
	nv.addGraph(function() {
		var chart = nv.models.lineChart()
			.margin({left: 75})
			.useInteractiveGuideline(true)
			.showLegend(true)
			.showYAxis(true)
			.showXAxis(true);

		chart.xAxis
			.axisLabel("Days")
			.ticFormat(function(d) {
				return d3.time.format('%x')(new Date(d));
			});

		chart.yAxis
			.axisLabel("Price")
			.tickFormat(function(d,i) { return '$' + d3.format(',.1f')(d); });

		var myData = formattingStuff(data2);
		console.log(myData);

		d3.select('#chart2 svg')
			.datum(myData)
			.call(chart);

		nv.utils.windowResize(function() { chart.update() });
		return chart;
	});
};

function formattingStuff(data2) {
	return [
		{
			values:data2,
			key: 'Kroger',
			color: '#4141CA'
		}
	]
};