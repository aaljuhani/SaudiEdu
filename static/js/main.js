/*
 * Root file that handles instances of all the charts and loads the visualization
 */
(function(){
    var instance = null;

    /**
     * Creates instances for every chart (classes created to handle each chart;
     * the classes are defined in the respective javascript files.
     */
    function init() {
        // array of all charts
        self.charts = [];

        queue()
        .defer(d3.csv, '/data')
        .await(makeCharts);

    }

    /**
     *
     * @param error from queue function
     * @param records of data file
     */
    function makeCharts(error, records){
        console.log(error)
    console.log(records)

    //Create a Crossfilter instance
    var ndx = crossfilter(records);

    //Define Dimensions
    var yearDim = ndx.dimension(function (d) {
        return d["year"];
    });
    var subjectDim = ndx.dimension(function (d) {
        return d["subject"];
    });
    var genderDim = ndx.dimension(function (d) {
        return d["gender"];
    });
    var locationDim = ndx.dimension(function (d) {
        return d["location"];
    });
    var levelDim = ndx.dimension(function (d) {
        return d["level"];
    });
    var valueDim = ndx.dimension(function (d) {
        return d["value"];
    });
    var allDim = ndx.dimension(function (d) {
        return d;
    });

    //Group Data
    var numRecordsByYear = yearDim.group().reduceSum(function (fact) { return fact.value; });
    var genderGroup = genderDim.group().reduceSum(function(fact){return fact.value});
    var subjectGroup = subjectDim.group()
        .reduceSum(function(fact){return fact.value});
    var levelGroup = levelDim.group();
    var locationGroup = locationDim.group();
    var valueGroup = valueDim.group();
    var all = ndx.groupAll();


    //Define values (to be used in charts)
    var minYear = yearDim.bottom(2)[1]["year"];
    var maxYear = yearDim.top(1)[0]["year"];


        //genderDim.filter('female')
        //subjectDim.filter('Information Technology')
    //Creating instances for each visualization then add it to the charts array
        var yearChart = new YearChart("#year-chart", yearDim, numRecordsByYear);
        self.charts.push(yearChart);
        var subjectChart = new SubjectChart("#subject-chart", subjectDim, subjectGroup);
        self.charts.push(subjectChart);

    }
    /**
     *
     * @constructor
     */
    function Main(){
        if(instance  !== null){
            throw new Error("Cannot instantiate more than one Class");
        }
    }

    /**
     *
     * @returns {Main singleton class |*}
     */
    Main.getInstance = function(){
        var self = this
        if(self.instance == null){
            self.instance = new Main();

            //called only once when the class is initialized
            init();
        }
        return instance;
    }

    Main.getInstance();
})();