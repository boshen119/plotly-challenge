// Read in rawData

// var rawData = json.parse("samples.json")
// console.log(rawData)

function rawData(sample){
    d3.json("samples.json").then((data)=>{
    var demoData = data.metadata;
    var metadataList = demoData.filter(sampleObject => sampleObject.id == sample);
    console.log(metadataList);
    });
} 

rawData(940);

// // Load in sample.json + console log
// console.log(d3.json("/js/samples.json"))
// //  function(data){
// //     console.log(data);
// // })

