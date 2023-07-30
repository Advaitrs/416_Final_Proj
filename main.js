//main.js
const statePartiesURL = "https://advaitrs.github.io/state_parties.csv";

// Load the CSV data using d3.csv
d3.csv(statePartiesURL, function(data) {
  // Process the data and display the pie chart
  showPieChart(data);
});

// Function to display the pie chart
function showPieChart(data) {
  // Create an array of unique party affiliations and their counts
  const partyCounts = d3.rollup(data, v => v.length, d => d["Governor Political Affiliation"]);

  // Convert the map to an array of objects
  const partyData = Array.from(partyCounts, ([affiliation, count]) => ({ affiliation, count }));

  // Width and height of the chart
  const width = 400;
  const height = 400;

  // Create an SVG container
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Create a pie chart layout
  const pie = d3.pie()
    .value(d => d.count)
    .sort(null);

  // Define the colors for the pie chart slices
  const color = d3.scaleOrdinal(d3.schemeCategory10);

  // Define the arc generator for the pie chart
  const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);

  // Create the pie chart slices
  const slices = svg.selectAll("path")
    .data(pie(partyData))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", (d, i) => color(i))
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

  // Add labels to the pie chart slices
  slices.append("text")
    .attr("transform", d => `translate(${arc.centroid(d)})`)
    .attr("text-anchor", "middle")
    .text(d => d.data.affiliation);

  // Add a title to the pie chart
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", 20)
    .attr("text-anchor", "middle")
    .text("Governor Party Affiliation Pie Chart");
}
