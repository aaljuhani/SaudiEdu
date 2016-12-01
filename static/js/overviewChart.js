/**
 * Created by asmaa on 11/11/16.
 */
/**
 * Constructor for the overview Chart
 */

function OverviewChart( dispatch, newid) {

    var self = this;

    self.dispatch = dispatch;
    self.newid = newid;
    self.init();
};

/**
 * Initializes the svg elements required for this chart
 */
OverviewChart.prototype.init = function () {
    var self = this;

    var container = document.getElementById('dynamic-charts' )
    var newgraph = document.createElement('div');
    newgraph.setAttribute('id', 'overviewGraph-' + self.newid)
    newgraph.setAttribute('class', 'chart-wrapper overview-graph active');
    var htmlAddition = "<div class=\"chart-title\">";
    htmlAddition += "<div class=\"chart-title\">Overview"
    htmlAddition += "<div class=\"chart-tools\">"
    //htmlAddition += "<span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span>"
    //htmlAddition += "<span class=\"glyphicon glyphicon-duplicate\" aria-hidden=\"true\"></span>"
    //htmlAddition += "<span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span>"
    htmlAddition += "</div></div>"
    htmlAddition += "<div class=\"chart-stage\">"
    htmlAddition += "<div id=\"overview-"+ self.newid + "\" style=\"width: 400px; height: 380px\"></div>"
    htmlAddition += "</div></div>"
    newgraph.innerHTML = htmlAddition;
    container.appendChild(newgraph)




};


/**
 * Creates the linechart
 *
 *
 */
OverviewChart.prototype.update = function (yData, yearScale) {
    var self = this;

/*

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
*/


}


