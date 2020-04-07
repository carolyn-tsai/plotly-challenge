# plotly-challenge

For this project, I created a full stack app using the provided belly button diversity data.

- The webpage has an interactive dashboard with different visualizations
  - The pie chart uses data from the samples route */samples/<sample>* to display the top 10 samples
    - *sample_values* will be the values 
    - *otu_ids* will be the labels
    - *otu_labels* will be the hovertext
  - The bubble chart uses data from the samples route */samples/<sample>* to display each sample
    - *otu_ids* will be the x values and marker colors
    - *sample_values* will be the y values and marker size
    - *otu_labels* will be for the text values
- The sample metdata from the route */metadata/<sample>* will be displayed
    - Each key/value pair from the metadata JSON object will be shown
- All plots will be updated any time a new sample is selected

## Tools:
- Plotly.js
- Python
- Flask
- HTML
- JSON
- SQLite


-----------------------------------------------------------------------------------------

## Resoures: 
- https://flask.palletsprojects.com/en/1.1.x/
- https://stackoverflow.com/
- https://www.geeksforgeeks.org/
- https://plotly.com/javascript/
- https://www.heroku.com/
- 