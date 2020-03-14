// 1. Use the D3 library to read in `samples.json`.
d3.json("samples.json").then(function(data) {
    console.log(data)
});

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    // Use `sample_values` as the values for the bar chart.

    // * Use `otu_ids` as the labels for the bar chart.

    // * Use `otu_labels` as the hovertext for the chart.

// Initialize drop down menu for Test Subject ID Nos. 

function init() {
    var dropdownMenu = d3.select("#selDataset");
    d3.json("samples.json").then(function(data) {
        console.log(data.names)
        var samples = data.names
        samples.forEach((sample) => {
            dropdownMenu.append("option")
                .text(sample)
                .property("value", sample);
        })
    });
}
init();


// Build Bar charts

function buildcharts(sampleID) {
    d3.json("samples.json").then(function(data) {
        var samples = data.samples
        var samplearray = samples.filter(sample => sample.id == sampleID);
        var result = samplearray[0]
            console.log(result)
            var otu_labels = result.otu_labels
            var otu_ids = result.otu_ids
            var sample_values = result.sample_values
            var barchart = {
                x: sample_values.slice(0, 10),
                y: otu_ids.slice(0, 10),
                text: otu_labels.slice(0, 10),
                type: "bar"
            }
            var data = [barchart]
            Plotly.newPlot("bar", data);
    })
}

function optionChanged(newSample) {
    buildcharts(newSample);
    // add function for metadata here
}

// Build Bubble Chart