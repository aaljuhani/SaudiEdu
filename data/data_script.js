/**
 * Created by asmaa on 11/10/16.
 */
// /**
//  * Loads in fifa-matches.csv file, aggregates the data into the correct format,
//  * then calls the appropriate functions to create and populate the table.
//  *
//  */

d3.csv("../data/edu.csv", function (error, csvData) {

    console.log(csvData)

    subjects = d3.keys(csvData[0]);
    subj = []
    subjects.forEach(function(s){
        subj.push(s.substring(0, s.length-4))
    })

    uniqueSubj = subj.filter(function(item, pos) {
    return subj.indexOf(item) == pos;
    })
    uniqueSubj.splice(0, 1);
    uniqueSubj.splice(0, 1)
    console.log('subj',uniqueSubj)


     // ******* TODO: PART I *******
    data = {}
    eduData = d3.nest()
        .key(function (d) {return d.year;})
        .rollup(function (leaves) {
            subj = d3.keys(leaves[0]).filter(function(key) { return key !== "year" ? key.substring(0, key.length-4) : null })
                console.log('subj', subj)
            return{
                values: leaves.map(function(d){
                    console.log('d',d)
                })
            }
        })
        .entries(csvData);

    console.log('edu data', eduData)

});
