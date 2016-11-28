/**
 * Created by asmaa on 11/24/16.
 */
queue()
    .defer(d3.csv, '/data')
    .await(makeCharts);

function makeCharts(error, records) {
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
    var numRecordsByYear = yearDim.group();
    var genderGroup = genderDim.group();
    var subjectGroup = subjectDim.group();
    var levelGroup = levelDim.group();
    var locationGroup = locationDim.group();
    var valueGroup = valueDim.group();
    var all = ndx.groupAll();


    //Define values (to be used in charts)
    var minYear = yearDim.bottom(2)[1]["year"];
    var maxYear = yearDim.top(1)[0]["year"];

/*

    //Charts
    var numberRecordsND = dc.numberDisplay("#number-records-nd");
    var timeChart = dc.barChart("#time-chart");
    var genderChart = dc.rowChart("#gender-row-chart");
    var levelChart = dc.rowChart("#level-row-chart");
    var subjectChart = dc.rowChart("#subject-row-chart");
    var locationChart = dc.rowChart("#location-row-chart");

/*
    numberRecordsND
        .formatNumber(d3.format("d"))
        .valueAccessor(function (d) {
            return d;
        })
        .group(all);


    timeChart
        .width(650)
        .height(140)
        .margins({top: 10, right: 50, bottom: 20, left: 20})
        .dimension(yearDim)
        .group(numRecordsByYear)
        .transitionDuration(500)
        .x(d3.time.scale().domain([minYear, maxYear]))
        .elasticY(true)
        .yAxis().ticks(4);
/*
    genderChart
        .width(300)
        .height(100)
        .dimension(genderDim)
        .group(genderGroup)
        .ordering(function (d) {
            return -d.value
        })
        .colors(['#6baed6'])
        .elasticX(true)
        .xAxis().ticks(4);

    ageSegmentChart
        .width(300)
        .height(150)
        .dimension(ageSegmentDim)
        .group(ageSegmentGroup)
        .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetY(10)
        .xAxis().ticks(4);

    phoneBrandChart
        .width(300)
        .height(310)
        .dimension(phoneBrandDim)
        .group(phoneBrandGroup)
        .ordering(function (d) {
            return -d.value
        })
        .colors(['#6baed6'])
        .elasticX(true)
        .xAxis().ticks(4);

    locationChart
        .width(200)
        .height(510)
        .dimension(locationdDim)
        .group(locationGroup)
        .ordering(function (d) {
            return -d.value
        })
        .colors(['#6baed6'])
        .elasticX(true)
        .labelOffsetY(10)
        .xAxis().ticks(4);

    var map = L.map('map');

    var drawMap = function () {

        map.setView([31.75, 110], 4);
        mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; ' + mapLink + ' Contributors',
                maxZoom: 15,
            }).addTo(map);

        //HeatMap
        var geoData = [];
        _.each(allDim.top(Infinity), function (d) {
            geoData.push([d["latitude"], d["longitude"], 1]);
        });
        var heat = L.heatLayer(geoData, {
            radius: 10,
            blur: 20,
            maxZoom: 1,
        }).addTo(map);

    };

    //Draw Map
    drawMap();

    //Update the heatmap if any dc chart get filtered
    dcCharts = [timeChart, genderChart, ageSegmentChart, phoneBrandChart, locationChart];

    _.each(dcCharts, function (dcChart) {
        dcChart.on("filtered", function (chart, filter) {
            map.eachLayer(function (layer) {
                map.removeLayer(layer)
            });
            drawMap();
        });
    });

    dc.renderAll();
*/
};
