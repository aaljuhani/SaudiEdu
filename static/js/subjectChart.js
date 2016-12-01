/**
 * Created by asmaa on 11/11/16.
 */
/**
 * Constructor for the subject Chart
 */
function SubjectChart(selector, dispatch, dimension, group) {
    var self = this;
    self.selector = selector;
    self.dispatch = dispatch;
    self.dimension = dimension;
    self.group = group;
    // for interaction with subject bars
    self.activeSubjects = []
    //clicked flag
    self.clickFlag = false;
  //  self.init();

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
    self.svgHeight = 610;

    //creates svg element within the div
    self.svg = divChart.append("svg")
        .attr("width", self.svgWidth)
        .attr("height", self.svgHeight)

    // x scale

    self.xScale = d3.scaleLinear()
        .range([0 , self.svgWidth])

    // y scale
    self.yScale = d3.scaleBand()
        .rangeRound([ 0, self.svgHeight - 20])
        //.padding(.3);

    // color scale

    // Create colorScale
    self.colorScale = d3.scaleLinear()
        .range(['#99cccc', '#336666']);

    // transition time
    self.t = d3.transition()
        .duration(1000);

    self.svg.append('g')
        .attr("transform", "translate(10, 0)")

      self.svg.select('g').append('g')
        .attr('id', 'subject-bars')
        //.attr("transform", "translate(0, -20)")


      // Add the X Axis
    self.xAxis = self.svg.select('g').append("g")
        .attr('id', 'xAxis')
        .attr("transform", "translate(0," + (self.svgHeight - 20) + ")")


    // Add the Y Axis
    self.yAxis = self.svg.select('g').append("g")
        .attr('id', 'yAxis')
        .attr('class', 'bringToFront')
        //.attr("transform", "translate(0,-20)")


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

     // x scale
    self.maxValue = self.group.top(1)[0]["value"];

    //updating domains based on the filtered data
    self.xScale.domain([0 , self.maxValue ])
    self.colorScale.domain([0, self.maxValue])
    self.yScale.domain(self.group.top(Infinity).map(function (d){
            return d.key
        }))

    self.bars = d3.select('#subject-bars').selectAll("rect").data(self.group.top(Infinity));

    self.bars = self.bars.enter()
        .append('rect')
        .attr('class', 'subject-bar active')
        .merge(self.bars);

    self.bars.exit().remove();

    self.bars
        .attr("x", 0)
        .attr("height", self.yScale.bandwidth())
        .attr("y", function(d) { return self.yScale(d.key); })
        .attr("width", function(d) { return self.xScale(d.value); })
        .attr('fill', function (d) {
            return isActive(d.key)? self.colorScale(d.value) : 'lightgray';
        })
        .attr('id', function (d) {
            return d.key
        })
        .attr('class', 'subject-bar')
        .on('click', updateSelection)

    // add axis on top of bars
    self.xAxis.call(d3.axisBottom(self.xScale).tickFormat(d3.format(".0s")));
    self.yAxis.call(d3.axisRight(self.yScale));

    function isActive(elm){
        if (!self.clickFlag)
            return true;
        return self.activeSubjects.indexOf(elm) <= -1 ? false: true;
    }

    /**
 * filter selected subjects and highlight the associated bars
 * by assigning active/inactive classes
 */

function updateSelection (){
    //initially all subject are active
    // on click all subject become inactive
        self.clickFlag = true;


    //1) check if subject is already active
    console.log(this.id)
    var elm = this.id
    var clickedSubjectId = self.svg.selectAll('.subject-bar')
            .filter(function (d) {
            return d.key == elm
            }).attr('id');
    if (self.activeSubjects.indexOf(clickedSubjectId) <= -1 ){
       //2) if not add it to the active array
        self.activeSubjects.push(clickedSubjectId)
        self.svg.select(clickedSubjectId)
            .attr('class', 'subject-bar active')
    } else {
        //remove from the array
        self.activeSubjects.splice(self.activeSubjects.indexOf(clickedSubjectId) , 1)
    }

        // make unselected bars inactive
        self.svg.selectAll('.subject-bar')
            .filter(function (d) {
            return self.activeSubjects.indexOf(d.key) <= -1
            })
            .attr('class', 'subject-bar inactive')

    console.log(self.activeSubjects)
    // filter domain
    self.dimension.filter(function(d){
            return self.activeSubjects.indexOf(d) > -1
        })

     // update all charts
        self.dispatch.call('update')

};
};

