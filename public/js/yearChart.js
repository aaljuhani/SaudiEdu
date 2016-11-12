/**
 * Constructor for the Year Chart
 *
 * @param yearsData
 */
function YearChart(overviewChart,subjectChart, yearsData) {
    var self = this;
    self.overviewChart = overviewChart;
    self.subjectChart = subjectChart;
    self.yearsData = yearsData;
    self.init();

};

/**
 * Initializes the svg elements required for this chart
 */
YearChart.prototype.init = function(){

    var self = this;
    self.margin = {top: 10, right: 20, bottom: 30, left: 50};
    var divyearChart = d3.select("#year-chart").classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divyearChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 100;

    //creates svg element within the div
    self.svg = divyearChart.append("svg")
        .attr("width",self.svgWidth)
        .attr("height",self.svgHeight)

};



/**
 * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
 */
YearChart.prototype.update = function(){
    var self = this;

    //Domain definition for global color scale
    var domain = [-60,-50,-40,-30,-20,-10,0,10,20,30,40,50,60 ];

    //Color range for global color scale
    var range = ["#0066CC", "#0080FF", "#3399FF", "#66B2FF", "#99ccff", "#CCE5FF", "#ffcccc", "#ff9999", "#ff6666", "#ff3333", "#FF0000", "#CC0000"];

    //Global colorScale to be used consistently by all the charts
    self.colorScale = d3.scaleQuantile()
        .domain(domain).range(range);

    
    var radius = 5;
    yearScale = d3.scaleBand()
        .domain(self.yearsData.map(function (d) {
            return d.year;
        })).range([0, self.svgWidth]).padding(0.5);

    var lineScale = self.svg.selectAll(".lineChart").data([self.svgWidth]);

    lineScale = lineScale.enter().append("line")
        .classed("lineChart", true).merge(lineScale);
    lineScale.exit().remove();

    lineScale
        .attr("x1", 0)
        .attr("y1",radius + self.margin.top)
        .attr("x2", self.svgWidth)
        .attr("y2", radius + self.margin.top);

    var yearChart = self.svg.selectAll(".yearChart").data(self.yearsData);

    yearChart = yearChart.enter().append("circle")
        .classed("yearChart", true).merge(yearChart);

    yearChart.exit().remove();

    yearChart
        .attr('cx', function (d, i) {
            return (yearScale(d.year));
        })
        .attr('cy', radius + self.margin.top)
        .attr('r', radius)
        .attr("class", function (d) {
            return "yearChart"
        })
        .on("mouseover", function (d) {
            d3.select(this).classed(" highlighted", true);
             d3.select(this).attr('r', radius+5)
        })
        .on("mouseout", function (d) {
            d3.select(this).classed("highlighted", false);
            d3.select(this).attr('r', radius)
        })
        .on("click", function (d) {
            self.createOtherCharts(d.year);
        });

     self.createOtherCharts(2012);

};

YearChart.prototype.createOtherCharts = function(Year){
    var self = this;
    d3.csv("data/" + Year + ".csv", function (error, subjectData) {
         self.overviewChart.update(subjectData,yearScale);
         self.subjectChart.update(subjectData);

    });
     //Highlight selected node
        d3.selectAll(".yearChart").classed("selected", false);
        d3.selectAll('.yearChart').filter(function(d){return d.year==Year}).classed("selected",true);
};
