// Read in rawData

// var rawData = json.parse("samples.json")
// console.log(rawData)

function readData(){
    d3.json("samples.json").then(function(data) {
    sampleData = data;
    dropdownData();
    makeBarChart(0);
    // makeBubbleChart(0);
    makeDemoData(0);
    // gaugeChart(0);

    console.log(sampleData);
    })
};

function optionChange(optionValue){
    console.log(optionValue);
    const idX = parseInt(optionValue);
    makeBarChart(idX);
    // makeBubbleChart(idX);
    makeDemoData(idX);
    // gaugeChart(idX);
}

function dropdownData(){
    sampleData.names.forEach((val, index) => {
        let selDataset = d3.select("#selDataset");
        let option = selDataset.append("option");
        option.property("text", val);
        option.property("value", index);
        console.log(sampleData.names);
    })
};
// Parsing in and creating a loop to read metadata 
function makeDemoData(idX){
    let meta = sampleData.metadata[idX];
    let demo = [];
    for(let key in meta){
        let label = key[0].toUpperCase() + key.slice(1);
        let value = meta[key];
        let lbl = `${label}: ${value}`;
        demo.push(lbl);
    }
    console.log(demo);
    // reset so we don't see data again
    d3.select("#sample-metadata").selectAll('*').remove();
    // create variable ul to append all data to
    let ul = d3.select('#sample-metadata').append("ul");
    ul.style('marginLeft', '0 px')
    // display as a table
    ul.selectAll('li').data(demo).enter().append('li').text(d => d).style('list-style', 'none');
}

function makeBarChart(idX){
    let otuId = sampleData.samples[idX].otu_ids;
    let otuLabels = sampleData.samples[idX].otu_labels;
    let sampleValues = sampleData.samples[idX].sample_values;
    console.log(otuId);
    console.log(otuLabels);
    console.log(sampleValues);
    var trace1 = {
        x: sampleValues.slice(0,10).reverse(), 
        y: otuId.slice(0,10).reverse().map(sampleValues=> "OTU " + sampleValues),
        text: otuLabels.slice(0,10).reverse(), 
        name: "Belly Button Bacteria",
        type: "bar", 
        orientation: "h"
    };
    var data = [trace1];
    var layout = 
    {
        title: 
        {
            text: "Belly Button Bacteria",
            font: {size: 24}
        },
        xaxis: 
        {
            title: 
            {
                text: `Subject: ${sampleData.samples[idX].id}`,
                font: {size: 24}
            }
        },
        margin: 
        {
                l: 100,
                r: 100,
                t: 100,
                b: 100
        }
    };
    Plotly.react("bar", data, layout);
}

readData();

// // Load in sample.json + console log
// console.log(d3.json("/js/samples.json"))
// //  function(data){
// //     console.log(data);
// // })



// Plotly.newPlot("plot", data, layout);