/**
 * Constructor for the Year Chart
 *
 * @param yearsData
 */
function YearChart(selector, dimension, group) {
    var self = this;
    self.selector = selector;
    self.dimension = dimension;
    self.group = group;
    self.init();

};

/**
 * Initializes the svg elements required for this chart
 */
YearChart.prototype.init = function () {

    var self = this;
    self.margin = {top: 10, right: 10, bottom: 10, left: 10};

    var divChart = d3.select(self.selector).classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divChart.node().getBoundingClientRect();
    console.log(self.svgBounds)
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 200;

    //creates svg element within the div
    self.svg = divChart.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", self.svgHeight)

    // x scale

    self.xScale = d3.scaleBand()
        .domain(self.group.all().map(function (d) {
            return d.key
        }))
        .rangeRound([0, self.svgWidth - 50])
        .padding(.3);

    self.maxValue = self.group.top(1)[0]["value"];

    console.log(self.group.all())

    // y axis

    self.yScale = d3.scaleLinear()
        .domain([0, self.maxValue])
        .range([self.svgHeight - 20, 0]);

    // Create colorScale
    self.colorScale = d3.scaleLinear()
        .domain([0, self.maxValue])
        .range(['#0099cc', '#003333']);

    // transition time
    self.t = d3.transition()
        .duration(1000);

    self.svg.append('g')
        .attr("transform", "translate(40, 0)")

    // Add the X Axis
    self.svg.select('g').append("g")
        .attr('id', 'xAxis')
        .attr("transform", "translate(0," + (self.svgHeight - 20) + ")")
        .call(d3.axisBottom(self.xScale));

    // Add the Y Axis
    self.svg.select('g').append("g")
        .attr('id', 'yAxis')
        .call(d3.axisLeft(self.yScale).tickFormat(d3.format(".0s")))//.tickFormat(function (d) {return d.value + "%";}))

    self.svg.select('g').append('g')
        .attr('id', 'year-bars')
        .attr("transform", "translate(0, -20)")

    //brush
    self.svg.append("g")
        .attr("class", "brush")
        .attr("transform", "translate(40, 0)")


    self.update();

};


/**
 * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
 */
YearChart.prototype.update = function () {
    var self = this;

    // Create the bars
    self.bars = d3.select("#year-bars").selectAll("rect").data(self.group.all());
    self.bars = self.bars.enter()
        .append('rect')
        .attr('class', 'year-bar')
        .merge(self.bars);

    self.bars.exit().remove();
    self.bars
        .attr('x', function (d) {
            console.log(d)
            return self.xScale(d.key);
        })
        .attr('width', function (d) {
            return self.xScale.bandwidth();
        })
        .transition(self.t)
        .attr('y', function (d) {
            return self.yScale(d.value);
        })
        .attr('height', function (d) {
            return self.svgHeight - self.yScale(d.value);
        })
        .attr('fill', function (d) {
            return self.colorScale(d.value);
        })
        .attr('id', function (d) {
            return d.key
        })
        .attr('class','selected');

    self.svg.select('.brush')
        .call(d3.brushX()
            .extent([[0, 0], [self.svgWidth - 40, self.svgHeight - 20]])
            .on("end", brushed));


    function brushed() {
        if (!d3.event.sourceEvent) return; // Only transition after input.
        if (!d3.event.selection) return; // Ignore empty selections.
        var s = d3.event.selection;
        console.log('s', s)
        var brushSelection = []
        self.bars.each(function (d, i) {
            console.log('d', d.key)
            console.log('scaled', self.xScale(d.key))
            if ((s[0] <= self.xScale(d.key) + 20) && (self.xScale(d.key) + 20 <= s[1])) {
                brushSelection.push(d.key);
            }
        });
        console.log(brushSelection)
        self.dimension.filter(brushSelection)
        self.update()
        self.updateSelection(brushSelection)
        // self.shiftChart.update(brushSelection)
    }

};

YearChart.prototype.updateSelection = function(active){
   console.log('update selection')
   /* self.svg.selectAll('rect')
        .attr('class', function(){
        return 'inactive'
    })*/
}


