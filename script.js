// const { update } = require("plotly.js");

let dataIndex = 0;
// let old_state= document.getElementById('L');

function fetchData() {
  return fetch('data.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      if (dataIndex < data.length) {
        const currentData = data[dataIndex];
        dataIndex++;
        if (dataIndex === data.length) {
          dataIndex = 0;
        }

        return {
          temperature: currentData.TEMPERATURE,
          pressure: currentData.PRESSURE,
          airSpeed: currentData.AIR_SPEED,
          missionTime: currentData.MISSION_TIME,
          packetCount: currentData.PACKET_COUNT,
          mode: currentData.MODE,
          state: currentData.STATE,
          altitude: currentData.ALTITUDE,
          hs: currentData.HS_DEPLOYED,
          pc: currentData.PC_DEPLOYED,
          voltage: currentData.VOLTAGE,
          gpsTime: currentData.GPS_TIME,
          gpsAltitude: currentData.GPS_ALTITUDE,
          latitude: currentData.GPS_LATITUDE,
          longitude: currentData.GPS_LONGITUDE,
          gpsSats: currentData.GPS_SATS,
          tiltX: currentData.TILT_X,
          tiltY: currentData.TILT_Y,
          rotZ: currentData.ROT_Z,
          echo: currentData.CMD_ECHO,
        };
      }
    });
}
let map = L.map('map').setView([0, 0], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

let markers = []; // Array to store markers

function updateMap(data) {
  let latlng = [data.latitude, data.longitude];
  map.setView(latlng, 10);

  let dotIcon = L.icon({
    iconUrl: 'images/red_dot-removebg-preview.png',
    iconSize: [8, 8],
    iconAnchor: [4, 4],
  });

  let currentMarker = L.marker(latlng).addTo(map);

  markers.push(currentMarker);

  markers.slice(0, -1).forEach((marker) => {
    marker.setIcon(dotIcon);
  });
}

setInterval(() => {
  fetchData().then((data) => {
    updateMap(data);
    // count++;
  });
}, 1000);
