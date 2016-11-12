/**
 * Created by asmaa on 11/11/16.
 */
/**
 * Constructor for the subject Chart
 */
function SubjectChart() {

    var self = this;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
SubjectChart.prototype.init = function () {
    var self = this;
    self.margin = {top: 30, right: 20, bottom: 30, left: 50};
    var subject_vis = d3.selectAll(".subject-vis").classed("content", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = subject_vis.node().getBoundingClientRect();
    self.svgWidth = (self.svgBounds.width - self.margin.left - self.margin.right)*3;
    self.svgHeight = 225;

    //creates svg element within the div
    self.svg = subject_vis.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", self.svgHeight)
};



/**
 * Creates the linechart
 *
 *
 */
SubjectChart.prototype.update = function () {
    var self = this;

    var padding = 25;

        //var data = [2056,73,2592,26];
      var data = [-44.23,26, 73,-55.76 ]

        var spacing = self.svgHeight / 2;

        var xScale = d3.scaleLinear()
                .domain([-100,100])
                .range([0, 300]);

        // here we define a color scale
        var colorScale = d3.scaleBand()
                // notice the three interpolation points
                .domain(['female','male'])
                // each color matches to an interpolation point
                .range(["darkred", "steelblue"]);

        var xAxis = d3.axisBottom();
                // try manually seting the ticks
                //.ticks(40);
        xAxis.scale(xScale);


        self.svg.selectAll("rect")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", function (d) {
                    // start at d if d is negative, else start at 0
                    // this goes through the scale function
                    return xScale(Math.min(0, d));
                })
                .attr("y", function (d, i) {
                    console.log(spacing)
                    return i%2== 0? 25:0// spacing
                })
                .attr("width", function (d, i) {
                    // the width is the absolute difference of d and 0
                    // this is scaled
                    return Math.abs(xScale(d) - xScale(0));
                })
                .attr("height", 20)
                .attr("id", function(d){return d})
                .attr("class", function (d,i) {
                    // here we apply the color scale
                    return i%2==0? 'female': 'male';
                })

        self.svg.append("g")
                // css class for the axis
                .classed("axis", true)
                // moving the axis to the right place
                .attr("transform", "translate(" + 0 + "," + 50 + ")")
                .call(xAxis);

};

