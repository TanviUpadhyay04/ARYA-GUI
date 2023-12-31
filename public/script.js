// const graphs = document.getElementById("tab1");
// const csv = document.getElementById("tab2");
// const coordinates = document.getElementById("tab3");
const socket = io.connect("http://localhost:3000/");
// function showTab(tabNumber) {
//   // Get all tabs
//   let tabs = document.querySelectorAll(".tab-content");

//   // Hide all tabs
//   tabs.forEach((tab) => {
//     tab.classList.add("hide");
//   });

//   // Show the selected tab
//   let selectedTab = document.getElementById(`tab${tabNumber}`);
//   if (selectedTab) {
//     selectedTab.classList.remove("hide");
//   }
// }

let d1, d2, d3;
 d2=window.getComputedStyle( document.getElementById('tab2')).display;
 d1=window.getComputedStyle( document.getElementById('tab1')).display;
 d3=window.getComputedStyle( document.getElementById('tab3')).display;

function hideElements2() {
  document.getElementById('tab2').style.display = d2;
  document.getElementById('tab1').style.display = 'none';
  document.getElementById('tab3').style.display = 'none';
  document.getElementById('all-csv').classList.add('active-button');
  document.getElementById('all-graphs').classList.remove('active-button');
  document.getElementById('all-coordinates').classList.remove('active-button');
}

function hideElements3() {
  document.getElementById('tab3').style.display = d3;
  document.getElementById('tab2').style.display = 'none';
  document.getElementById('tab1').style.display = 'none';
  document.getElementById('all-graphs').classList.remove('active-button');
  document.getElementById('all-csv').classList.remove('active-button');
  document.getElementById('all-coordinates').classList.add('active-button');
}


function hideElements1() {
  document.getElementById('tab1').style.display = d1;
  document.getElementById('tab2').style.display = 'none';
  document.getElementById('tab3').style.display = 'none';
  document.getElementById('all-coordinates').classList.remove('active-button');
  document.getElementById('all-csv').classList.remove('active-button');
  document.getElementById('all-graphs').classList.add('active-button');
}

function startDataProcessing(){

socket.on("connect", () => {
  console.log("Connected to server");
});
//let old_state= document.getElementById('L');
//TEMPERATURE GRAPH
Plotly.plot(
  "temperatureGraph",
  [
    {
      y: [],
      type: "line",
      line: { color: "#5C64B7" },
      fill: "tozeroy",
      fillcolor: "rgba(92, 100, 183,0.3)",
    },
  ],
  (layout = {
    plot_bgcolor: "white",
    paper_bgcolor: "white",
    margin: { t: 40, b: 30, l: 40, r: 0 },
  })
);
//PRESSURE GRAPH
Plotly.plot(
  "pressureGraph",
  [
    {
      y: [],
      type: "line",
      line: { color: "#5C64B7" },
      fill: "tozeroy",
      fillcolor: "rgba(92, 100, 183,0.3)",
    },
  ],
  (layout = {
    plot_bgcolor: "white",
    paper_bgcolor: "white",
    margin: { t: 40, b: 30, l: 40, r: 0 },
  })
);
Plotly.plot(
  "altitudeGraph",
  [
    {
      y: [],
      type: "line",
      line: { color: "#5C64B7" },
      fill: "tozeroy",
      fillcolor: "rgba(92, 100, 183,0.3)",
    },
  ],
  (layout = {
    plot_bgcolor: "white",
    paper_bgcolor: "white",
    margin: { t: 40, b: 30, l: 40, r: 0 },
  })
);
//VOLTAGE
Plotly.plot(
  "voltageGraph",
  [
    {
      y: [],
      type: "line",
      line: { color: "#5C64B7" },
      fill: "tozeroy",
      fillcolor: "rgba(92, 100, 183,0.3)",
    },
  ],
  (layout = {
    plot_bgcolor: "white",
    paper_bgcolor: "white",
    margin: { t: 40, b: 30, l: 40, r: 0 },
  })
);

//TILT X

let tiltXTrace = {
  y: [],
  type: "scatter",
  name: "Tilt X",
  line: {
    color: "rgb(254, 215, 170)",
  },
  fill: "tozeroy",
  fillcolor: "rgba(254, 215, 170,0.3)",
};

let tiltYTrace = {
  y: [],
  type: "scatter",
  name: "Tilt Y",
  line: {
    color: "#5C64B7",
  },
  fill: "tozeroy",
  fillcolor: "rgba(92, 100, 183,0.3)",
};

let tiltData = [tiltXTrace, tiltYTrace];
let tiltGraphLayout = {
  plot_bgcolor: "white",
  paper_bgcolor: "white",
  margin: { t: 40, b: 30, l: 40, r: 0 },
};

Plotly.newPlot("tiltGraph", tiltData, tiltGraphLayout);

//Air Speed
var data = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: [],
    paper_bgcolor: "#5C64B7",
    gauge: {
      axis: { range: [0, 150] },
      bar: { color: "#FED7AA" },
      bordercolor: "white",
    },
    type: "indicator",
    mode: "gauge+number",
  },
];

var layout = {
  width: 240,
  height: 97,
  margin: { t: 5, b: 10, l: 0, r: 0 },
  paper_bgcolor: "#5C64B7",
  font: { color: "white" },
};

Plotly.newPlot("airSpeedGraph", data, layout);

let map = L.map("tab3").setView([0, 0], 3);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
}).addTo(map);

let markers = []; 

function updateMap(data) {
  let latlng = [data.GPS_LATITUDE, data.GPS_LONGITUDE];
  map.setView(latlng, 10);

  let dotIcon = L.icon({
    iconUrl: "images/red_dot-removebg-preview.png",
    iconSize: [8, 8],
    iconAnchor: [4, 4],
  });

  let currentMarker = L.marker(latlng).addTo(map);

  markers.push(currentMarker);

  markers.slice(0, -1).forEach((marker) => {
    marker.setIcon(dotIcon);
  });
}
var data2 = new vis.DataSet();

var counter = 0;

var options = {
  width: "550px",
  height: "280px",
  style: "bar-size",
  showGrid: true,
  showShadow: false,
  keepAspectRatio: true,
  verticalRatio: 0.5,
  xLabel: "Latitude",
  yLabel: "Longitude",
  zLabel: "Altitude",
  xMin: -90, 
  xMax: 90, 
  yMin: -180, 
  yMax: 180, 
  zMin: 0, 
  zMax: 1000,
};

var container2 = document.getElementById("visualization");

data2.add({
  id: counter++,
  x: 0.0,
  y: 0.0,
  z: 0.0,
  style: 19,
});
var graph3d = new vis.Graph3d(container2, data2, options);
xValues = [];
yValues = [];
zValues = [];

socket.on("newData", (data) => {
  console.log("Received new data:", data);
  xValues.push(data.GPS_LATITUDE);
  yValues.push(data.GPS_LONGITUDE);
  zValues.push(data.ALTITUDE);

  // Update your charts or perform actions with received data here

  //append new CSV values on the table
  var table = document.getElementById("CSVtable");
  var i=1;
  var row = table.insertRow(i);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);
  var cell9 = row.insertCell(8);
  var cell10 = row.insertCell(9);
  var cell11= row.insertCell(10);
  var cell12= row.insertCell(11);
  var cell13 = row.insertCell(12);
  var cell14 = row.insertCell(13);
  var cell15 = row.insertCell(14);
  var cell16 = row.insertCell(15);
  var cell17 = row.insertCell(16);
  var cell18 = row.insertCell(17);
  var cell19 = row.insertCell(18);
  var cell20 = row.insertCell(19);
  var cell21 = row.insertCell(20);

  cell1.innerHTML = data.TEAM_ID;
  cell2.innerHTML = data.MISSION_TIME;
  cell3.innerHTML = data.PACKET_COUNT;
  cell4.innerHTML = data.MODE;
  cell5.innerHTML = data.STATE;
  cell6.innerHTML = data.ALTITUDE;
  cell7.innerHTML = data.AIR_SPEED;
  cell8.innerHTML = data.HS_DEPLOYED;
  cell9.innerHTML = data.PC_DEPLOYED;
  cell10.innerHTML = data.TEMPERATURE
  cell11.innerHTML = data.VOLTAGE;
  cell12.innerHTML = data.PRESSURE;
  cell13.innerHTML = data.GPS_TIME;
  cell14.innerHTML = data.GPS_ALTITUDE;
  cell15.innerHTML = data.GPS_LATITUDE;
  cell16.innerHTML = data.GPS_LONGITUDE;
  cell17.innerHTML = data.GPS_SATS;
  cell18.innerHTML = data.TILT_X;
  cell19.innerHTML = data.TILT_Y;
  cell20.innerHTML = data.ROT_Z;
  cell21.innerHTML = data.CMD_ECHO;
  
  i++;
  // Example: Update charts using Plotly, update DOM elements, etc.
  data2.add({
    id: counter++,
    x: data.GPS_LATITUDE,
    y: data.GPS_LONGITUDE,
    z: data.ALTITUDE,
    style: 19,
  });

  Plotly.extendTraces(
    "temperatureGraph",
    {
      y: [[data.TEMPERATURE]],
    },
    [0]
  );
  //pressure update
  Plotly.extendTraces(
    "pressureGraph",
    {
      y: [[data.PRESSURE]],
    },
    [0]
  );
  //altitude
  Plotly.extendTraces(
    "altitudeGraph",
    {
      y: [[data.ALTITUDE]],
    },
    [0]
  );
  Plotly.extendTraces(
    "voltageGraph",
    {
      y: [[data.VOLTAGE]],
    },
    [0]
  );

  //air speed update(speedometer)
  Plotly.restyle("airSpeedGraph", "value", [data.AIR_SPEED]);

  let newTiltX = data.TILT_X;
  let newTiltY = data.TILT_Y;

  Plotly.extendTraces(
    "tiltGraph",
    {
      y: [[newTiltX]],
    },
    [0]
  );

  Plotly.extendTraces(
    "tiltGraph",
    {
      y: [[newTiltY]],
    },
    [1]
  );

  updateMap(data);

  // values set
  document.querySelector("#PressureValue").textContent = data.PRESSURE;
  document.querySelector("#TemperatureValue").textContent = data.TEMPERATURE;
  //document.querySelector('#AirSpeedValue').textContent=data.AIR_SPEED;
  document.querySelector("#VoltageValue").textContent = data.VOLTAGE;
  //document.querySelector('#AltitudeValue').textContent=data.ALTITUDE;
  document.querySelector(
    "#TiltXValue"
  ).textContent = `${data.TILT_X},${data.TILT_Y}`;
  //document.querySelector('#TiltYValue').textContent=data.TILT_Y;
  document.querySelector("#RotZValue").textContent = data.ROT_Z;
  document.querySelector("#GPSTimeValue").textContent = data.GPS_TIME;
  document.querySelector("#GPSAltitudeValue").textContent = data.GPS_ALTITUDE;
  document.querySelector(
    "#GPSLongiValue"
  ).textContent = `${data.GPS_LATITUDE},${data.GPS_LONGITUDE}`;
  //document.querySelector('#GPSLatiValue').textContent=data.LATITUDE;
  document.querySelector("#GPSSatsValue").textContent = data.GPS_SATS;
  document.querySelector("#HSValue").textContent = data.HS_DEPLOYED;
  document.querySelector("#PCValue").textContent = data.PC_DEPLOYED;
  document.querySelector("#ModeValue").textContent = data.MODE;
  document.querySelector("#StateValue").textContent = data.STATE;
  document.querySelector("#EchoValue").textContent = data.CMD_ECHO;
  document.querySelector("#PacketCountValue").textContent = data.PACKET_COUNT;
  document.querySelector("#MissionTimeValue").textContent = data.MISSION_TIME;


});
}

const startButton = document.getElementById("startButton");
startButton.addEventListener("click", () => {
  
  socket.emit("startDataProcessing");
  startDataProcessing();
});
const stopButton = document.getElementById("stopButton");
stopButton.addEventListener("click", () => {

  socket.emit("stopDataProcessing");
  console.log("Stopped")
 
});