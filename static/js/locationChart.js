/**
 * Created by asmaa on 11/11/16.
 */
/**
 * Constructor for the location Chart
 */
function LocationChart(selector, dispatch, dimension, group) {
    var self = this;
    self.selector = selector;
    self.dispatch = dispatch;
    self.dimension = dimension;
    self.group = group;
    //self.init();
    // for interaction with gender bars
    self.activeLocation = 'local'

};

/**
 * Initializes the svg elements required for this chart
 */
LocationChart.prototype.init = function () {
    var self = this;
    self.margin = {top: 10, right: 10, bottom: 10, left: 10};

    var divChart = d3.select(self.selector).classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 300 - self.margin.top - self.margin.bottom;

    //creates svg element within the div
    self.svg = divChart.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", self.svgHeight)


    // color scale

    // Create colorScale
    self.colorScale = d3.scaleLinear()
        .range(['#99cccc', '#336666']);

    // transition time
    self.t = d3.transition()
        .duration(1000);

    self.svg.append('g')
        .attr("transform", "translate(" + self.svgWidth / 2 + ", " + self.svgHeight / 2 + ")")


    self.svg.select('g').append('g')
        .attr('id', 'location-pie')
    //.attr("transform", "translate(0, -20)")
    var radius = self.svgWidth / 3;
    self.arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(65);

    self.pie = d3.pie()
        .sort(null)
        .value(function (d) {
            //console.log(d)
            return d.value;
        });

    self.pie = self.svg.select('g').selectAll(".arc")
        .data(self.pie(self.group.all()))
        .enter().append("g");

    self.pie.append("path")
        .attr("d", self.arc)
        .attr('opacity', 1)
        .attr('id', function (d, i) {
            return d.data.key
        })
        .attr('class', 'location-pie')
        .style("fill", function (d, i) {
            return self.colorScale(d.data.value);
        })

    self.pie.append("text")
        .attr("transform", function (d) {
            var _d = self.arc.centroid(d);
            _d[0] *= 1.6;	//multiply by a constant factor
            _d[1] *= 1.6;	//multiply by a constant factor
            return "translate(" + _d + ")";
        })
        .attr("dy", ".50em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.key;
        });

    self.pie.append("text")
        .attr('class', 'loc-middletext')
        .attr("text-anchor", "middle")
        .attr('font-size', '1.7em')
        .attr('y', 10)



    self.update();

};


/**
 * Creates the  horizontal bar chart
 *
 *
 */
LocationChart.prototype.update = function () {
    var self = this;

    //update domains
    self.maxValue = self.group.top(1)[0]["value"];
    self.colorScale.domain([0, self.maxValue])

    self.pie.select("path")
        .attr("d", self.arc)
        .attr('opacity', 1)
        .attr('id', function (d, i) {
            return d.data.key
        })
        .attr('class', 'location-pie')
        .style("fill", function (d, i) {
            return self.activeLocation == d.data.key ? self.colorScale(d.data.value) : 'lightgray';
        })
        .on("mouseover", function (d, i) {

            self.svg.selectAll('path')
                .transition()
                .duration(250)
                .attr("opacity", function (d, j) {
                    return j != i ? 0.6 : 1;
                })

        })
        .on("mouseout", function (d, i) {
            self.svg.selectAll('path')
                .transition()
                .duration(250)
                .attr("opacity", "1");
        })
        .on("click", function (d, i) {

            console.log(d)
            var locclicked = d.data.key;
            if (locclicked == self.activeLocation) {
                self.dimension.filterAll()
                self.activeLocation = "All"

            } else {
                self.activeLocation = locclicked;
                self.dimension.filter(locclicked)

                self.svg.selectAll('.location-pie').transition()
                    .duration(250)
                    .attr("fill", function (d, j) {
                        return j != i ? 'lightgray' : self.colorScale(d.data.value);
                    })
            }
            self.dispatch.call('update')
        });

    self.pie.select("text")
        .attr("transform", function (d) {
            var _d = self.arc.centroid(d);
            _d[0] *= 1.6;	//multiply by a constant factor
            _d[1] *= 1.6;	//multiply by a constant factor
            return "translate(" + _d + ")";
        })
        .attr("dy", ".50em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.key;
        });

    self.svg.select('.loc-middletext').text(self.activeLocation)


};

