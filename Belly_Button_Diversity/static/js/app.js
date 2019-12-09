// Create a function that builds the metadata panel

function buildMetadata(sample) {
  // Create variable to hold the URL of the data
  var url = `/metadata/${sample}`;
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(bellyData => {
    // Use d3 to select the panel with id of `#sample-metadata` 
    var panel = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    panel.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(bellyData).forEach(([key, value]) => {
      panel.append("h6")
           .text(`${key}:${value}`);
    });
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  });
}

function buildCharts(sample) {
  // Create variable to hold the URL of the data
  var url = `/samples/${sample}`;
  // Use `d3.json` to fetch the sample data for the plots
  d3.json(url).then(bellyData => {
    // Build a Bubble Chart using the sample data
    var x_otu_ids = bellyData.otu_ids;
    var y_sample_values = bellyData.sample_values;
    var otu_text = bellyData.otu_labels;
    var bubble_attr = {
      autosize: true,
      showlegend: false,
      hovermode: "closest",
      title: "Belly Button Biodiversity",
      xaxis: {
        title: "OTU ID",
        automargin: true
      }
    };
    var bubble_chart = [{
      x: x_otu_ids,
      y: y_sample_values,
      text: otu_text,
      mode: "markers",
      marker: {
        color: x_otu_ids,
        size: y_sample_values,
        colorscale: "Jet"
        }
    }];
    // Use Plotly to plot the bubble chart
    Plotly.newPlot("bubble", bubble_chart, bubble_attr);
    // Build a Pie Chart
    var pie_attr = {
      margin: {t: 0, 1: 0}
    };
    var pie_chart = [{
      // Use slice() to grab the top 10 sample_values, otu_ids, and labels (10 each)
      values: y_sample_values.slice(0, 10),
      labels: x_otu_ids.slice(0, 10),
      hovertext: otu_text.slice(0, 10),
      hoverinfo: "hovertext",
      type: "pie"
    }];
    // Use Plotly to plot the pie chart
    Plotly.newPlot("pie", pie_chart, pie_attr);
  });
}  
  
function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();