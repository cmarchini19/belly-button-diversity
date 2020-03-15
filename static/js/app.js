// Use the D3 library to read in `samples.json`.
d3.json("samples.json").then(function(data) {
    console.log(data)
});

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

// Build charts: bar chart, bubble chart, gauge chart (optional)
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

        
        // OPTIONAL - data for gauge chart
        var gaugeresults = data.metadata
        var gaugearray = gaugeresults.filter(gaugesample => gaugesample.id == sampleID);
        var gaugeresult = gaugearray[0]
            console.log(gaugeresult)
        var gaugecurrentid = gaugeresult.id;

        // OPTIONAL - Establish gauge chart var
        var gaugemeta = gaugeresults.filter(s => {return +s.id === +gaugecurrentid}); 
        var gaugechart = {
            type: "indicator",
            mode: "gauge+number",
            value: gaugemeta.map(value => +value.wfreq)[0],
            title: { text: "Scrubs per Week"},
            gauge: {
                axis: { range: [0, 9]},
                steps: [
                    { range: [0, 1], color: "#d6dcd0" },
                    { range: [1, 2], color: "#c6d8b6" },
                    { range: [2, 3], color: "#b7d49c" },
                    { range: [3, 4], color: "#a8d182" },
                    { range: [4, 5], color: "#99cd68" },
                    { range: [5, 6], color: "#8ac94e" },
                    { range: [6, 7], color: "#7bc634" },
                    { range: [7, 8], color: "#6cc21a" },
                    { range: [8, 9], color: "#5dbf00" }
                  ]
            }
        }
        
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
            title: "Top 10 OTUs for Test Subject",
            xaxis: { title: "Sample Values"},
            yaxis: { title: "OTU IDs"},
            margin: {t: 30, l: 150}
        }
       
        // Set-up bubble chart data and layout var for PlotLy
        var bubbledata = [bubblechart]
        var bubblelayout = {
            title: "Samples for Test Subject",
            xaxis: { title: "OTU IDs"},
            yaxis: { title: "Sample Values"},
            height: 600,
            width: 1200
        }
    
        // Set-up gauge chart data and layout var for PlotLy
        var gaugedata = [gaugechart]
        var gaugelayout = {
            title: "Belly Button Washing Frequency",
            margin: {t: 30, l: 75}
        }

        // Plotly Charts
        Plotly.newPlot("bar", bardata, barlayout);
        Plotly.newPlot("bubble", bubbledata, bubblelayout)
        Plotly.newPlot("gauge", gaugedata, gaugelayout)
    });
}

// Build demographics metadata table
function buildmetadata(demodata) {
    var metaData = d3.select("#sample-metadata")
    d3.json("samples.json").then(function(data) {
            console.log(data.metadata)

        //Establish metadata variable
        var metadata = data.metadata
        
        //Make sure filter pulls on id we have selected  
        var samples = data.metadata;
        var samplearray = samples.filter(sample => sample.id == demodata);
        var result = samplearray[0]
            console.log(result)
        var currentid = result.id;
        
        //Reset the data 
        metaData.html("")

        // Filter Metadata down for Current ID
        var currentmeta = metadata.filter(s => {return +s.id === +currentid}); 

        //Append meta data list
        metaData.append('div')
            .text(`id: ${currentmeta.map(meta => meta.id)}`)
        metaData.append('div')
            .text(`ethnicity: ${currentmeta.map(meta => meta.ethnicity)}`)
        metaData.append('div')
            .text(`gender: ${currentmeta.map(meta => meta.gender)}`)
        metaData.append('div')
            .text(`age: ${currentmeta.map(meta => meta.age)}`)
        metaData.append('div')
            .text(`location: ${currentmeta.map(meta => meta.location)}`)
        metaData.append('div')
            .text(`bbtype: ${currentmeta.map(meta => meta.bbtype)}`)
        metaData.append('div')
            .text(`wfreq: ${currentmeta.map(meta => meta.wfreq)}`)
    });
}


//Test Subject Dashboard Updates
function optionChanged(newSample) {
    buildcharts(newSample);
    buildmetadata(newSample);
}

