/**
 * Created by asmaa on 11/30/16.
 */
/**
 * Constructor for the YearGender Chart
 *
 * @param yearsData
 */
function YearGenderChart(selector, dispatch, yeardimension, genderdimension , yearGroup ,yeargenderDim ,group) {
    console.log('yeargender')
    console.log(group.all())
    var self = this;
    self.selector = selector;
    self.dispatch = dispatch;
    self.yeardimension = yeardimension;
    self.genderdimension = genderdimension;
   // self.dimension = dimension;
    self.yeargenderDim = yeargenderDim;
    self.yeargroup = yearGroup;
    self.group = group;

    //for filtiring
    self.activeGender = 'both'
    self.activeYears = []
    //self.init();

};

/**
 * Initializes the svg elements required for this chart
 */
YearGenderChart.prototype.init = function () {

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

    self.svgYear = divChart.append('svg')
        .attr('id','#year-chart')
        .attr("width", self.svgWidth)
        .attr("height", self.svgHeight/3)
        .attr("transform", "translate(20, 0)")

    // x scale
    self.xScale = d3.scaleBand()
        .domain(self.yeargroup.all().map(function (d) {
            return d.key
        }))
        .range([0, self.svgWidth - 30])
        //.padding(.3);

    // y axis
    self.yScale = d3.scaleLinear()
        .range([0, self.svgHeight]);

    self.yScale0 = d3.scaleLinear()
        .range([self.svgHeight, 0]);

    // Create colorScale
    self.colorScale = d3.scaleOrdinal()
        .domain(["female","male"])
        .range(['#cc9999', '#99B3CC']);

    // Create colorScale
    self.YcolorScale = d3.scaleLinear()
        .range(['#99cccc', '#336666']);

    // transition time
    self.t = d3.transition()
        .duration(1000);

    self.svg.append('g')
        .attr("transform", "translate(20, 0)")

    self.svgYear.append('g')
        .attr("transform", "translate(50, 0)")

    // Add the X Axis
    self.xAxis = self.svg.select('g').append("g")
        .attr('id', 'xAxis')
        .attr("transform", "translate(0," + (self.svgHeight - 20) + ")")
       // .call(d3.axisBottom(self.xScale));

    // Add the Y Axis
    self.yAxis = self.svg.select('g').append("g")
        .attr('id', 'yAxis')
        .call(d3.axisLeft(self.yScale0))//.tickFormat(d3.format(".0s")))//.tickFormat(function (d) {return d.value + "%";}))


    self.svg.select('g').append('g')
        .attr('id', 'yeargender-area')
        .attr("transform", "translate(35, 30)scale(1,.8)")



    //brush
     self.svgYear.append("g")
        .attr("class", "brush")
        .attr("transform", "translate(40, 0)")

     // year chart
    var dashLine = self.svgYear
        .append('line')
    .attr("x1", 0)     // x position of the first end of the line
    .attr("y1", 20)      // y position of the first end of the line
    .attr("x2", self.svgWidth)     // x position of the second end of the line
    .attr("y2", 20) // y position of the second end of the line
    .attr('class', 'lineChart');

    //create a g element that holds circle and text
    self.elemYear = self.svgYear.select('g').selectAll('g').data(self.yeargroup.all())

    var elemYearEnter = self.elemYear.enter().append('g')
        .attr("transform", function(d, i){
            return "translate("+ self.xScale(d.key)+",20)"})


    self.elemYear = elemYearEnter.merge(self.elemYear)

    //create circle for each year
    self.circle = self.elemYear.append('circle')
        .transition()
        .duration(1000)
        .attr("r", 9)
        .attr('fill', '#336666')
        .attr('class','year-circle active')
        .style("opacity", 1)


    //Append text information of each year right below the corresponding circle
    //HINT: Use .yeartext class to style your text elements
    //create text for each year
    var textYear = self.elemYear.append('text')
        .attr("dx", function(d, i){return -15})
        .attr("dy", function(d, i){return 30})
        .attr("class","yeartext")
        .text(function(d){return d.key})




   self.update();

};


/**
 * Creates a chart with area representing each gender, populates text content and other required elements for the YearGender Chart
 */
YearGenderChart.prototype.update = function () {
    var self = this;

    console.log(self.group.all())

       //updating domains based on filtered data
    self.maxValue = self.yeargroup.top(1)[0]["value"];
   // console.log(self.maxValue)
    self.yScale0.domain([0, self.maxValue])
     self.YcolorScale.domain([0, self.maxValue])



    var stack = d3.stack()
        .keys(["female", 'male'])
        .value(function (d, key) {
            return d.value[key]
        })
        .order(d3.stackOrderNone)
        .offset(d3.stackOffsetNone);

    var series = stack(self.group.all())


    self.yScale.domain([ d3.max(series, function (layer) {
        return d3.max(layer, function (d) {
            return d[1];
        });
    }), 0])

    var area = d3.area()
        .x(function (d) {
            return self.xScale(d.data.key)
        })
        .y0(function (d) {
            return self.yScale(d[0])
        })
        .y1(function (d) {
            return self.yScale(d[1])
        });


    // creat areas
    self.areas = d3.select('#yeargender-area').selectAll('path').data(series);

    self.areas = self.areas.enter()
        .append('path')
        .attr('class', 'gender-area active')
        .merge(self.areas);

    self.areas.exit().remove();

    self.areas.attr("d", area)
        .attr('id', function (d, i) {
            return i == 0 ? "female" : "male"
        })
        .attr('fill', function (d, i) {
            return self.colorScale(i)
        })
        .attr("opacity", 1)
        .on('mouseover', function (d,i) {
            console.log('clicked')
            self.svg.selectAll('.gender-area').transition()
      .duration(250)
      .attr("opacity", function(d, j) {
        return j != i ? 0.6 : 1;
    })
        .attr("strok", "#336666")
        .attr("stroke-width", "10px")})

    .on("mouseout", function(d, i) {
     self.svg.selectAll(".gender-area")
      .transition()
      .duration(250)
      .attr("opacity", "1");
      d3.select(this)
      .attr("stroke-width", "0px")
  })
        .on("click", function(d,i){
            console.log(d)
            console.log(i)
            var clicked = i == 0?'female':'male'
            console.log(clicked)
            if(clicked == self.activeGender){
                self.genderdimension.filterAll()
                self.activeGender = "both"
            } else {
                self.activeGender = clicked;
                self.genderdimension.filter(clicked)
            }


            self.dispatch.call('update')
        })



        self.svgYear.select('.brush')
        .call(d3.brushX()
            .extent([[0, 0], [self.svgWidth - 40, self.svgHeight ]])
            .on("brush", brushed));

     function brushed() {
         self.activeYears = []
        if (!d3.event.sourceEvent) return; // Only transition after input.
        if (!d3.event.selection) return; // Ignore empty selections.
        var s = d3.event.selection;
        console.log('s', s)

        self.elemYear.each(function (d, i) {
               if ((s[0] <= self.xScale(d.key) + 20) && (self.xScale(d.key) + 20 <= s[1])) {
                self.activeYears.push(d.key);
            }
        });

        // self.shiftChart.update(brushSelection)
         //update year filter
         self.yeardimension.filter(function(d){
             return self.activeYears.indexOf(d) > -1
         })

          // update all charts
        self.dispatch.call('update')
    }

    YearGenderChart.prototype.updateSelection = function () {


    }


};