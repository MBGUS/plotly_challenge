// Select the user input field
var idSelect = d3.select("#selDataset");

// Select the demographic info div's ul list group
var demographicsTable = d3.select("#sample-metadata");

// Select the bar chart div
var barChart = d3.select("#bar");

// Select the bubble chart div
var bubbleChart = d3.select("bubble");

// Create a function to initially populate dropdown menu with IDs and draw charts by default (using the first ID)
function init() {

    // reset any previous data
    resetData();

    // read in samples from JSON file
    d3.json("data/samples.json").then((data => {