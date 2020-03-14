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


// Build Bar and Bubble chart

function buildcharts(sampleID) {
    d3.json("samples.json").then(function(data) {
        // Data for charts
        var samples = data.samples
        var samplearray = samples.filter(sample => sample.id == sampleID);
        var result = samplearray[0]
            console.log(result)
        var sample_values = result.sample_values;
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
       
        // Establish bar chart var
        var barchart = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
            }

        // Establish bubble chart var
        var bubblechart = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values
            }
        };
        
         // Set-up bar chart data and layout var for PlotLy
        var bardata = [barchart]
        var barlayout = {
            margin: {t: 30, l: 150} 

        }
       
        // Set-up bubble chart data and layout var for PlotLy
        var bubbledata = [bubblechart]
        var bubblelayout = {
            height: 600,
            width: 1000
        }
    
        // Plotly Charts
        Plotly.newPlot("bar", bardata, barlayout);
        Plotly.newPlot("bubble", bubbledata, bubblelayout)
    });
}

function optionChanged(newSample) {
    buildcharts(newSample);
    // add function for metadata here
}

