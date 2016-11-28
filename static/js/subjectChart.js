/**
 * Created by asmaa on 11/11/16.
 */
/**
 * Constructor for the subject Chart
 */
function SubjectChart(selector, dimension, group) {
    var self = this;
    self.selector = selector;
    self.dimension = dimension;
    self.group = group;
    self.init();

};

/**
 * Initializes the svg elements required for this chart
 */
SubjectChart.prototype.init = function () {
    var self = this;
    self.margin = {top: 10, right: 10, bottom: 10, left: 10};

    var divChart = d3.select(self.selector).classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divChart.node().getBoundingClientRect();
    console.log(self.svgBounds)
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 600;

    //creates svg element within the div
    self.svg = divChart.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", self.svgHeight)

    // x scale
    self.maxValue = self.group.top(1)[0]["value"];

    self.xScale = d3.scaleLinear()
        .domain([0 , self.maxValue ])
        .range([0 , self.svgWidth])


    // y scale

    self.yScale = d3.scaleBand()
        .domain(self.group.top(Infinity).map(function (d){
            console.log(d)
            return d.key
        }))
        .range([ 0, self.svgHeight - 20]);

    // color scale

    // Create colorScale
    self.colorScale = d3.scaleLinear()
        .domain([0, self.maxValue])
        .range(['#0099cc', '#003333']);

    // transition time
    self.t = d3.transition()
        .duration(1000);

    self.svg.append('g')
        .attr("transform", "translate(10, 0)")


    self.svg.select('g').append('g')
        .attr('id', 'subject-bars')
        //.attr("transform", "translate(0, -20)")

    //brush
    self.svg.append("g")
        .attr("class", "brush")
        .attr("transform", "translate(40, 0)")

self.update();

};



/**
 * Creates the  horizontal bar chart
 *
 *
 */
SubjectChart.prototype.update = function () {
    var self = this;

    self.bars = d3.select('#subject-bars').selectAll("rect").data(self.group.top(Infinity));
    self.bars = self.bars.enter()
        .append('rect')
        .attr('class', 'subject-bar')
        .merge(self.bars);

    self.bars.exit().remove();

    self.bars
        .attr("x", 0)
        .attr("height", self.yScale.bandwidth())
        .attr("y", function(d) { return self.yScale(d.key); })
        .attr("width", function(d) { return self.xScale(d.value); })
    .attr('fill', function (d) {
            return self.colorScale(d.value);
        })
        .attr('id', function (d) {
            return d.key
        })

    // Add the X Axis
    self.svg.select('g').append("g")
        .attr('id', 'xAxis')
        .attr("transform", "translate(0," + (self.svgHeight - 20) + ")")
        .call(d3.axisBottom(self.xScale).tickFormat(d3.format(".0s")));

    // Add the Y Axis
    self.svg.select('g').append("g")
        .attr('id', 'yAxis')
        .attr('class', 'bringToFront')
        //.attr("transform", "translate(0,-20)")
        .call(d3.axisRight(self.yScale))





};

