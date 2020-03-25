// Read in rawData

// var rawData = json.parse("samples.json")
// console.log(rawData)

function readData(){
    d3.json("samples.json").then(function(data) {
    sampleData = data;
    dropdownData();
    makeBarChart(0);
    makeBubbleChart(0);
    makeDemoData(0);
    gaugeChart(0);

    console.log(sampleData);
    })
};

function optionChange(optionValue){
    console.log(optionValue);
    const idX = parseInt(optionValue);
    makeBarChart(idX);
    makeBubbleChart(idX);
    makeDemoData(idX);
    gaugeChart(idX);
}

// Create Dropdown Selection for Test Subject
function dropdownData(){
    sampleData.names.forEach((val, index) => {
        let selDataset = d3.select("#selDataset");
        let option = selDataset.append("option");
        option.property("text", val);
        option.property("value", index);
        // console.log(sampleData.names);
    })
};
// Parsing in and creating a loop to read metadata to display Demographic Table
function makeDemoData(idX){
    let meta = sampleData.metadata[idX];
    let demo = [];
    for(let key in meta){
        let label = key[0].toUpperCase() + key.slice(1);
        let value = meta[key];
        let lbl = `${label}: ${value}`;
        demo.push(lbl);
    }
    // console.log(demo);
    // reset so we don't see data again
    d3.select("#sample-metadata").selectAll('*').remove();
    // create variable ul to append all data to
    let ul = d3.select('#sample-metadata').append("ul");
    ul.style('marginLeft', '0 px')
    // display as a table
    ul.selectAll('li').data(demo).enter().append('li').text(d => d).style('list-style', 'none');
}

// Build Bar Chart for Bacteria Cultures
function makeBarChart(idX){
    let otuId = sampleData.samples[idX].otu_ids;
    let otuLabels = sampleData.samples[idX].otu_labels;
    let sampleValues = sampleData.samples[idX].sample_values;
    // console.log(otuId);
    // console.log(otuLabels);
    // console.log(sampleValues);
    var trace1 = {
        x: sampleValues.slice(0,10).reverse(), 
        y: otuId.slice(0,10).reverse().map(sampleValues=> "OTU " + sampleValues),
        text: otuLabels.slice(0,10).reverse(), 
        name: "Top 10 Belly Button Bacteria Found",
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

// Build Bubble Chart
function makeBubbleChart(idX){
    let otuId = sampleData.samples[idX].otu_ids;
    let otuLabels = sampleData.samples[idX].otu_labels;
    let sampleValues = sampleData.samples[idX].sample_values;

    let demoList = [];
    for(i = 0; i<otuId.length; i++) {
        demoList.push([otuId[i], otuLabels[i], sampleValues[i]]);
    };
    console.log(demoList);
    demoList.sort((a,b) => {
        return +a[0] - +b[0];
    });
    console.log(demoList);
// Extract data
    otuId = [];
    console.log(otuId);
    otuLabels = [];
    console.log(otuLabels);
    sampleValues = [];
    console.log(sampleValues);

    for(i = 0; i<demoList.length; i++) {
        otuId.push(demoList[i][0]);
        otuLabels.push(demoList[i][1]);
        sampleValues.push(demoList[i][2]);
    };
    console.log(otuId);
    console.log(otuLabels);
    console.log(sampleValues);

    var bubbleLayout = {
        title: "Bacteria Cultures Per Sample",
        margin: {t: 0},
        hovermode: "closest",
        xaxis: {title: "OTU ID"},
        margin: {t:30}
    }
    var bubbleTrace = [
        {
            x: otuId,
            y: sampleValues,
            text: otuLabels,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuId,
                colorscale: "Earth"
            }
        }
    ];
    Plotly.newPlot("bubble", bubbleTrace, bubbleLayout);
};


function gaugeChart(idX){
    let gauge = sampleData.metadata[idX].wfreq;
    console.log(gauge);

    var washTrace = [
        {
            domain: { x: [1], y: [1] },
            value: gauge,
            title: { text: "Wash Frequency" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                axis: { range: [0, 9], tickwidth: 1},
                bar: {color: 'grey'},
                steps: [
                  { range: [0, 1], color: "ghostwhite" },
                  { range: [1, 2], color: "whitesmoke" },
                  { range: [2, 3], color: "oldlace" },
                  { range: [3, 4], color: "lightyellow" },
                  { range: [4, 5], color: "moccasin" },
                  { range: [5, 6], color: "darkseagreen" },
                  { range: [6, 7], color: "mediumseagreen" },
                  { range: [7, 8], color: "seagreen" },
                  { range: [8, 9], color: "darkgreen" }
                      ]
                    }
        }
    ];

    var washLayout = {
        width: 600,
        height: 450,
        xaxis: 
        {
            title: 
            {
                text: `Subject: ${sampleData.samples[idX].id}`,
                font: {size: 24}
            }
        },
    }
    Plotly.newPlot("gauge", washTrace, washLayout);
};

readData();

// // Load in sample.json + console log
// console.log(d3.json("/js/samples.json"))
// //  function(data){
// //     console.log(data);
// // })

// Plotly.newPlot("plot", data, layout);