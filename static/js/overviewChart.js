/**
 * Created by asmaa on 11/11/16.
 */
/**
 * Constructor for the overview Chart
 */

var data = [{
    "male": "202",
    "female": "102",
    "year": "2000"
}, {
    "male": "215",
    "female": "315",
    "year": "2001"
}, {
    "male": "179",
    "female": "279",
    "year": "2002"
}, {
    "male": "199",
    "female": "499",
    "year": "2003"
}, {
    "male": "134",
    "female": "134",
    "year": "2004"
}, {
    "male": "176",
    "female": "276",
    "year": "2005"
}];
function OverviewChart() {

    var self = this;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
OverviewChart.prototype.init = function () {
    var self = this;
    self.margin = {top: 30, right: 20, bottom: 30, left: 50};
    var divOverview = d3.select("#chart-vis").classed("content", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divOverview.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 500;

    //creates svg element within the div
    self.svg = divOverview.append("svg")
        .attr("width", self.svgWidth + self.margin.left + self.margin.right)
        .attr("height", self.svgHeight + self.margin.top + self.margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + self.margin.left + "," + self.margin.top + ")");


};


/**
 * Creates the linechart
 *
 *
 */
OverviewChart.prototype.update = function (yData, yearScale) {
    var self = this;


// set the ranges
    var x = d3.scaleBand().range([0, self.svgWidth]);
    var y = d3.scaleLinear().range([self.svgHeight, 0]);

// define the 1st line
    var valueline = d3.line()
        .curve(d3.curveMonotoneX)
        .x(function (d) {
            return x(d.year);
        })
        .y(function (d) {
            return y(d.male_percentage);
        });

// define the 2nd line
    var valueline2 = d3.line()
        .curve(d3.curveMonotoneX)
        .x(function (d) {
            return x(d.year);
        })
        .y(function (d) {
            return y(d.female_percentage);
        });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin

    // format the data
    data.forEach(function (d) {
        d.year = +d.year;
        d.male = +d.male;
        d.female = +d.female;
        d.total = d.male + d.female;
        d.male_percentage = d.male / d.total * 100
        d.female_percentage = d.female / d.total * 100
    });

    // Scale the range of the data
    x.domain(data.map(function (d) {
        return d.year
    }))
    y.domain([0, 100]); //percentage

    // Add the valueline path.
    self.svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "blue")
        .attr("d", valueline);

    // Add the valueline2 path.
    self.svg.append("path")
        .data([data])
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", valueline2);

    // Add the X Axis
    self.svg.append("g")
        .attr("transform", "translate(0," + self.svgHeight + ")")
        .call(d3.axisBottom(x));

    // Add the Y Axis
    self.svg.append("g")
        .call(d3.axisLeft(y).tickFormat(function (d) {
            return d + "%";
        }))


}


