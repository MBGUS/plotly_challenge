// ---------- DECLARE VARIABLES FOR THE PROJECT ---------- //

var idSelect = d3.select("#selDataset");                // Select the user input field
var demographicsTable = d3.select("#sample-metadata");  // Select the demographic information
var barChart = d3.select("#bar");                       // Select the bar chart div
var bubbleChart = d3.select("bubble");                  // Select the bubble chart div
var gaugeChart = d3.select("gauge");                    // Select the gauge chart div

// Create a function to initially populate dropdown menu with IDs and draw charts by default (using the first ID)
function init() {

    // Reset any previous data
    resetData();

// ---------- POPULTE DROPDOWN MENU ---------- //

    // Read JSON file
    d3.json("data/samples.json").then((data => {

    // console.log(data);

        data.names.forEach((name => {
            var option = idSelect.append("option");
            option.text(name);
        }));

        // Get the first ID from the list for initial charts as a default
        var initId = idSelect.property("value")

        // Plot charts with initial ID
        plotCharts(initId);
            }));                                // Close .then            
        }                                       // Close init() fucntion

// ---------- RESET AND CLEAR DATA ---------- //
        // Create a function to reset divs to prepare for new data
        function resetData() {
            demographicsTable.html("");
            barChart.html("");
            bubbleChart.html("");
            gaugeChart.html("")
        };                                  // Close resetData Funciton

// ---------- POPULATE DEMOGRAPHICS TABLE ---------- //

    // Read in the JSON data
    d3.json("data/samples.json").then((data => {

        var individualMetadata = data.metadata.filter(participant => participant.id == id)[0];  // Filter the metadata for the ID chosen

        var wfreq = individualMetadata.wfreq;                               // Get frequency for gauge chart later

        Object.entries(individualMetadata).forEach(([key, value]) => {      // Iterate through each key and value in the metadata
            var newList = demographicsTable.append("ul");
            newList.attr("class", "list-group list-group-flush");
            var listItem = newList.append("li");                            // Append a list (li) item to the unordered list tag
            listItem.attr("class", "list-group-item p-1 demo-text bg-transparent"); // Change the class attributes of the list item for styling
            listItem.text(`${key}: ${value}`);                              // Add the key value pair from the metadata to the demographics list
        });                                                                 // Close forEach

// ---------- RETRIEVE DATA FOR PLOTTING CHARTS ---------- //
