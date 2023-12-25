document.addEventListener("DOMContentLoaded", function () {
  // create a static network
  var staticContainer = document.getElementById("staticGraph");

  // Define nodes and edges as arrays
  var nodes = [
    { id: 1, label: "Node 1" },
    { id: 2, label: "Node 2" },
    { id: 3, label: "Node 3" },
    // Add more nodes as needed
  ];

  var edges = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    // Add more edges as needed
  ];

  var data = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges),
  };

  var options = {
    layout: {
      randomSeed: 42, // Use a specific random seed for reproducibility
    },
    edges: {
      smooth: {
        type: "continuous",
      },
    },
    physics: {
      barnesHut: {
        gravitationalConstant: -80000,
        springConstant: 0.002,
        springLength: 200,
      },
    },
    interaction: {
      navigationButtons: false, // Remove navigation buttons
      keyboard: true,
    },
    xLabel: "X-Axis",
    yLabel: "Y-Axis",
    zLabel: "Z-Axis",
  };

  var staticGraph = new vis.Network(staticContainer, data, options);

  // Dynamic 3D graph
  var dynamicData = new vis.DataSet();
  var dynamicContainer = document.getElementById("dynamicGraph");

  var dynamicOptions = {
    width: "100%",
    height: "200px",
    style: "bar-size",
    showGrid: true,
    showShadow: false,
    keepAspectRatio: true,
    verticalRatio: 0.5,
    xLabel: "Latitude",
    yLabel: "Longitude",
    zLabel: "Altitude",
  };

  var graph3d = new vis.Graph3d(dynamicContainer, dynamicData, dynamicOptions);

  setInterval(function () {
    dynamicData.add({
      id: new Date().getTime(), // unique id for each node
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 100,
      style: Math.random() * 20,
    });

    // Update the dynamic graph
    graph3d.setData({ nodes: dynamicData.get() });
  }, 1000);
});

const graphs = document.getElementById("graphs");
const csv = document.getElementById("csv");
const coordinates = document.getElementById("coordinates");

function showElement1() {
  graphs.classList.remove("hide");
  csv.classList.add("hide");
  coordinates.classList.add("hide");
  graphs.classList.add("show");
}
function showElement2() {
  csv.classList.remove("hide");
  graphs.classList.add("hide");
  coordinates.classList.add("hide");
  csv.classList.add("show");
}
function showElement3() {
  coordinates.classList.remove("hide");
  graphs.classList.add("hide");
  csv.classList.add("hide");
  coordinates.classList.add("show");
}
