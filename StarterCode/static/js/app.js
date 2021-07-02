// Create the function that gets the data and creates the plots for the id 
function getPlot(id) {
    
    // Read JSON file & get the data
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        var wfreq = data.metadata.map(d => d.wfreq)
        console.log(`Washing Freq: ${wfreq}`)

        // filter sample values by id 
        var samples = data.samples.filter(s => s.id.toString() === id)[0];
        console.log(samples);

        // Get only top 10 sample values to plot and reverse for the plotly
        var sampleValues = samples.sample_values.slice(0, 10).reverse();

        // Get only top 10 otu ids for the plot
        var idValues = (samples.otu_ids.slice(0, 10)).reverse();
        
        // Get the otu id's to the desired form for the plot
        var idOtu = idValues.map(d => "OTU " + d)
        console.log(`OTU IDS: ${idOtu}`)

        // Get the top 10 labels for the plot
        var labels = samples.otu_labels.slice(0, 10);

        console.log(`Sample Values: ${sampleValues}`)
        console.log(`Id Values: ${idValues}`)

        // Create trace variable for the plot
        var trace = {
            x: sampleValues,
            y: idOtu,
            text: labels,
            type:"bar",
            orientation: "h",
        };                               // Close the variable "trace"

        // Create data variable
        var data = [trace];

        // Create layout variable to set plots layout
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 30,
                b: 20
            }
        };                              // Close the variable "layout"

        // Create the bar plot
        Plotly.newPlot("bar", data, layout);
        //console.log(`ID: ${samples.otu_ids}`)
        
        // Create the trace for the bubble chart
        var trace1 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: "markers",
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids
            },
            text: samples.otu_labels
        };                              // Close the variable "trace1"

        // Set the layout for the bubble plot
        var layout = {
            xaxis:{title: "OTU ID"},
            height: 600,
            width: 1300
        };

        // Create the data variable 
        var data1 = [trace1];

        // Create the bubble plot
        Plotly.newPlot("bubble", data1, layout); 

        // Create pie chart
        var tracePie = {
            labels: idOtu,
            values:sampleValues,
            type:"pie",
        }

        var data = [tracePie]
        
        Plotly.newPlot("gauge", data)

    });                                 // Close the ".then"    
}                                       // Close the fucntion plot
    
// Create the function to get the necessary data
function getInfo(id) {
    
    // Read JSON file & get the data
    d3.json("data/samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        var metadata = data.metadata;
        console.log(metadata)

        // filter meta data info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        // select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");
        
        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");

        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
        });                             // Close the "forEach"
    });                                 // Close the ".then"
}                                       // Close the function

// Create the function for the change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}

// Create the function for the initial data rendering
function init() {
    // Select dropdown menu 
    var dropdown = d3.select("#selDataset");        // Select the user input field        

    // Read the data 
    d3.json("data/samples.json").then((data)=> {
        console.log(data)

        // Get the id data to the dropdwown menu
        data.names.forEach(function(name) {
            dropdown.append("option").text(name).property("value");
        });

        // Call the functions to display the data and the plots to the page
        getPlot(data.names[0]);
        getInfo(data.names[0]);
    });
}

init();
