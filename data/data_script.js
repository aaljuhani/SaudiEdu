/**
 * Created by asmaa on 11/10/16.
 */

d3.csv("../data/saudi_edu_data.csv", function(error, testData){
    console.log('test',testData)
    data = d3.nest()
        .key(function(d){ return d.year })
        .key(function(d){ return d.subject })
        .key(function(d){ return d.gender })
        .rollup(function(leaves){
            return {
                //total: d3.sum(leaves, function (d) { return d.value }), // total = grad + undergrad
                values: leaves
            }
        }).entries(testData)
    console.log(data)



    var textFile = null,
    makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

    // returns a URL you can use as a href
    return textFile;
  };

    console.log(makeTextFile(data))
})

/*
d3.csv("../data/edu.csv", function (error, csvData) {

    // getting all subject with out the last specification
    subjects = d3.keys(csvData[0]);
    subj = []
    subjects.forEach(function(s){
        subj.push(s.substring(0, s.length-4))
    })
    console.log(' subj',subj)

    //get unique subject
    uniqueSubj = subj.filter(function(item, pos) {
    return subj.indexOf(item) == pos;
    })
    uniqueSubj.splice(0, 1);
    uniqueSubj.splice(0, 1);
    console.log('unique subj',uniqueSubj)

    jsonData = {

    };
    csvData.map(function(d){
         jsonData.year = 123
        uniqueSubj.forEach(function(s){
            jsonData.year = 123
        })
    })

    console.log(jsonData)
  /*
    console.log(csvData)
    csvData.map(function(data){
        console.log(data)
       // Object.keys(data).map(key => data[key]);
        console.log(JSON.parse(data))
    })
/*
    subjects = d3.keys(csvData[0]);
    subj = []
    subjects.forEach(function(s){
        subj.push(s.substring(0, s.length-4))
    })

    uniqueSubj = subj.filter(function(item, pos) {
    return subj.indexOf(item) == pos;
    })
    uniqueSubj.splice(0, 1);
    uniqueSubj.splice(0, 1);
    console.log('subj',uniqueSubj)



    data = {}
    eduData = d3.nest()
        .key(function (d) {return d.year;})
        .entries(csvData);

    console.log('edu data', eduData)*/

//});
