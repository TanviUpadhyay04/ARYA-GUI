
var data2 = new vis.DataSet();

var counter2 = 0;

var options = {
    width: '450px',
    height: '300px',
    style: 'bar-size', 
    showGrid: true,
    showShadow: false,
    keepAspectRatio: true,
    verticalRatio: 0.5,
    xLabel: 'Latitude',
    yLabel: 'Longitude',
    zLabel: 'Altitude',
};

var container2 = document.getElementById('dynamicGraph');



data2.add({
    id: counter2++,
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 100,
    style: Math.random() * 20 
});
var graph3d = new vis.Graph3d(container2, data2, options);

setInterval(function() {
    data2.add({
        id: counter2++,
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 100,
        style: Math.random() * 20 
    });
}, 1000); 
