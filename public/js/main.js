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
        //Creating instances for each visualization
        var overviewChart = new OverviewChart();
        var subjectChart = new SubjectChart();
        //load the data corresponding to all the years
        //pass this data and instances of all the charts that update on year selection to yearChart's constructor
        d3.csv("data/years.csv", function (error, yearsData) {
            //convert numbers to numeric
            yearsData.forEach(function(d){
                d.male = +d.male
                d.female = +d.female
            })

            //pass the instances of all the charts that update on selection change in YearChart
            var yearChart = new YearChart(overviewChart,subjectChart, yearsData);
            yearChart.update();
        });
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