/**
 * Created by asmaa on 11/11/16.
 */
/**
 * Constructor for the level Chart
 */
function LevelChart(selector, dispatch, dimension, group) {
    var self = this;
    self.selector = selector;
    self.dispatch = dispatch;
    self.dimension = dimension;
    self.group = group;
    //self.init();
    // for interaction with gender bars
    self.activeLevel = 'All'

};

/**
 * Initializes the svg elements required for this chart
 */
LevelChart.prototype.init = function () {
    var self = this;
    self.margin = {top: 30, right: 30, bottom: 30, left: 30};

    var divChart = d3.select(self.selector).classed("fullView", true);

    //Gets access to the div element created for this chart from HTML
    self.svgBounds = divChart.node().getBoundingClientRect();
    self.svgWidth = self.svgBounds.width - self.margin.left - self.margin.right;
    self.svgHeight = 350 - self.margin.top - self.margin.bottom;

     //add reset button
    d3.select('#reset-level')
        .on('click', function(){
            self.dimension.filterAll()
            self.dispatch.call('update')
        })

    //creates svg element within the div
    self.svg = divChart.append("svg")
        .attr('id', 'level-pie')
        .attr("width", self.svgWidth)
        .attr("height", self.svgHeight)
        .append('g')
        .attr("transform", "translate(" + self.svgWidth / 2 + ", " + self.svgHeight / 2 + ") scale(.8,.8)")

    // Create colorScale
    self.colorScale = d3.scaleLinear()
        .range(['#99cccc', '#336666']);


    self.update();

};


/**
 * Creates the  horizontal bar chart
 *
 *
 */
LevelChart.prototype.update = function () {
    var self = this;

    self.maxValue = self.group.top(1)[0]["value"];
    self.colorScale.domain([0, self.maxValue])

    // transition time
    self.t = d3.transition()
        .duration(1000);


    var radius = self.svgWidth / 3;

    self.arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(65);


    self.pie = d3.pie()
        .sort(null)
        .value(function (d) {
            return d.value;
        })


    self.middleText = self.svg.selectAll('.level-middletext').data([self.activeLevel])
    self.middleTextEnter = self.middleText.enter().append('text')
        .attr('class', 'level-middletext')
        .attr("text-anchor", "middle")
        .attr('font-size', '1.7em')
        .attr('y', 10)
    self.middleText = self.middleText.merge(self.middleTextEnter)

self.svg.selectAll('.level-middletext').text(self.activeLevel)


    self.path = self.svg.selectAll('path')
        .data(self.pie(self.group.all()))


    self.pathEnter = self.path
        .enter()
        .append('path')


    self.path = self.path.merge(self.pathEnter)


    self.path
        .attr('d', self.arc)
        .attr('fill', function (d, i) {
            return self.activeLevel == d.data.key || self.activeLevel == 'All' ? self.colorScale(d.data.value) : 'lightgray';
        })
        .on("mouseover", function (d, i) {
            self.svg.selectAll('path')
                .attr("opacity", function (d, j) {
                    return j != i ? 0.6 : 1;
                })
        })
        .on("mouseout", function (d, i) {
            self.svg.selectAll('path')
                .attr("opacity", "1");
        })
        .on("click", function (d, i) {

            var clicked = d3.select(this).data()[0].data.key;
            console.log(clicked)
            console.log(self.activeLevel)
            if (clicked == self.activeLevel) {
                self.dimension.filterAll()
                self.activeLevel = "All"

            } else {
                self.activeLevel = clicked;
                self.dimension.filter(clicked)
                self.svg.selectAll('path')
                    .filter(function(d){
                        console.log(d.data.key )
                        console.log(d.data.key != self.activeLevel)
                        return d.data.key != self.activeLevel
                    })
                    .attr('fill', 'lightgray');
            }
            self.svg.selectAll('.level-middletext').text(self.activeLevel)
            self.dispatch.call('update')
        });


    self.text = self.svg.selectAll('.level-lable')
        .data(self.pie(self.group.all()))

    self.textEnter = self.text
        .enter().append('text')


    self.text = self.text.merge(self.textEnter)

    self.text
        .attr('class','level-lable')
        .attr("transform", function (d) {
            var _d = self.arc.centroid(d);
            _d[0] *= 1.6;	//multiply by a constant factor
            _d[1] *= 1.6;	//multiply by a constant factor
            return "translate(" + _d + ")";
        })
        .attr("dy", ".50em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.value == 0 ? '' : d.data.key;
        });

};

