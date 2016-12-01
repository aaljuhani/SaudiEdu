/*
 * Root file that handles instances of all the charts and loads the visualization
 */
(function () {
    var instance = null;

    /**
     * Creates instances for every chart (classes created to handle each chart;
     * the classes are defined in the respective javascript files.
     */
    function init() {
        // array of all charts
        self.charts = [];
        self.overviews = [];
        //d3 dispatcher
        self.dispatch = d3.dispatch('update', 'filter', 'filterGraph', 'addGraph', 'deleteGraph');
        queue()
            .defer(d3.csv, '/data')
            .await(makeCharts);

        handelGraphEvents()

    }

    /**
     * handel adding/duplicate/removing overview chart
     */
    function handelGraphEvents() {


        //handel delete event
        d3.selectAll('.glyphicon-remove')
            .on('click', function () {
                d3.select(this.parentNode.parentNode.parentNode).remove()
                //self.dispatch.call('deleteGraph')
            })

        d3.selectAll('.glyphicon-plus')
            .on('click', function () {
                self.overviews.push(new OverviewChart(self.dispatch, self.overviews.length))
            })


    }

    /**
     *
     * @param error from queue function
     * @param records of data file
     */
    function makeCharts(error, records) {
        console.log(error)
        console.log(records)

        //Create a Crossfilter instance
        var ndx = crossfilter(records);

        //Define Dimensions



        //test year gender dimension
        var yeargenderDim = ndx.dimension(function (d) {
            return d['year'];
        })
/*
        var yeargenderGroup = d3.nest()
            .key(function(d){return d.gender})
            //.key(function(d){return d.year}).sortKeys(d3.ascending)
            .rollup(function(leaves){return {'value':d3.sum(leaves, function(d){return d.value})}})
            .entries(yeargenderDim.top(Infinity))
*/



        var yeargenderGroup = yeargenderDim.group().reduce(reduceAddgender, reduceRemovegender, reduceInitialgender).order(orderGender);//.all();

        function reduceAddgender(p, v) {
            //console.log(p,v)
            //p.value +=  +v['value']
            p.female += (v['gender'] == 'female')? +v['value']: 0;
            p.male += (v['gender'] == 'male')? +v['value']: 0;
            p.total +=  +v['value'];
            return p;
        }

        function reduceRemovegender(p, v) {

           // p.value +=  +v['value']
            p.female -= (v['gender'] == 'female')? +v['value']: 0;
            p.male -= (v['gender'] == 'male')? +v['value']: 0;
            p.total -=  +v['value'];
            return p;
        }

        function reduceInitialgender() {
            return {
               // year: 0,
               // value:0
                female: 0,
                male:0,
                total:0
            };
        }

        function orderGender(p) {
            return p.total;
        }


        console.log('yearGender', yeargenderDim.top(Infinity))
        console.log('yearGender', yeargenderGroup.all())



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
        var numRecordsByYear = yearDim.group()
            .reduceSum(function (fact) {
                return fact.value;
            });

        var genderGroup = genderDim.group()
            .reduceSum(function (fact) {
                return fact.value
            });

        var subjectGroup = subjectDim.group()
            .reduceSum(function (fact) {
                return fact.value
            });

        var levelGroup = levelDim.group();
        var locationGroup = locationDim.group();
        var valueGroup = valueDim.group();
        var allGroups = allDim.group();
        var all = ndx.groupAll();


        //Define values (to be used in charts)
        var minYear = yearDim.bottom(2)[1]["year"];
        var maxYear = yearDim.top(1)[0]["year"];


        //yearDim.filter([2014, 2006,2010,2004,2007])


        //genderDim.filter('female')
        //subjectDim.filter('Information Technology')
        //console.log('year', numRecordsByYear.all())

        //Creating instances for each visualization then add it to the charts array
        var yeargenderChart = new YearGenderChart("#yeargender-chart", self.dispatch, yearDim,genderDim, numRecordsByYear, yeargenderDim, yeargenderGroup);
        self.charts.push(yeargenderChart);
        //var yearChart = new YearChart("#year-chart", self.dispatch, yearDim, numRecordsByYear);
        //self.charts.push(yearChart);
        var subjectChart = new SubjectChart("#subject-chart", self.dispatch, subjectDim, subjectGroup);
        self.charts.push(subjectChart);
        var genderChart = new GenderChart("#gender-chart", self.dispatch, genderDim, genderGroup);
        self.charts.push(genderChart);
        var levelChart = new LevelChart("#level-chart", self.dispatch, levelDim, levelGroup);
        self.charts.push(levelChart);


        charts.forEach(function (chart) {
            allDim.filterAll()
            chart.init()

        })

        self.dispatch.on('update', function () {
            charts.forEach(function (chart) {
                chart.update();
            })

        })

        self.dispatch.on('filter', function () {
            alert('filter')

                yearChart.update();
                subjectChart.update();
                genderChart.update();


        })

    }

    /**
     *
     * @constructor
     */
    function Main() {
        if (instance !== null) {
            throw new Error("Cannot instantiate more than one Class");
        }
    }

    /**
     *
     * @returns {Main singleton class |*}
     */
    Main.getInstance = function () {
        var self = this
        if (self.instance == null) {
            self.instance = new Main();

            //called only once when the class is initialized
            init();
        }
        return instance;
    }

    Main.getInstance();
})();