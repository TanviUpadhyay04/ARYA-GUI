const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const csv = require('csv-parser');
const fastCsv = require('fast-csv');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const telemetryFolder = './telemetry_data'; 
const inputFilePath = 'test.csv';
const now = new Date();

const year = now.getFullYear(); 
const month = String(now.getMonth() + 1); 
const day = String(now.getDate()); 

const hours = String(now.getHours()); // Get the hours (0-23)
const minutes = String(now.getMinutes()) // Get the minutes
const seconds = String(now.getSeconds()); // Get the seconds

const currentDateAndTime = `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
const outputFileName = `new_data_${currentDateAndTime}.csv`; // Timestamp as part of the filename

// Create the telemetry_data folder if it doesn't exist
if (!fs.existsSync(telemetryFolder)) {
  fs.mkdirSync(telemetryFolder);
}

const outputFilePath = path.join(telemetryFolder, outputFileName); 


let isFirstRow = true;
let processDataFlag=false;

io.on('connection', socket => {
  console.log('Connected');
socket.on('startDataProcessing', () => {
  console.log('Starting CSV READ');
  processDataFlag=true;


  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath, { flags: 'a' });

  const processData = async () => {
    const csvStream = fastCsv.format({ headers: true });

    csvStream.pipe(writeStream, { end: false });

    for await (const row of readStream.pipe(csv())) {
      if(processDataFlag==true){
      let currentData = [];
      if (isFirstRow) {
        csvStream.write(row);
        isFirstRow = false;
      } else {
        csvStream.write(row);
        Object.values(row).forEach(value => {
          currentData.push(value);
        });
        
        socket.emit('newData', row);
      }

      console.log('Read row:', row);
      //console.log(currentData[7]); // Example

      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    }

    csvStream.end();
    console.log('Finished reading CSV.');
    readStream.destroy();
    writeStream.end();
  };

  processData().catch(err => {
    console.error('Error processing data:', err);
  });
});
socket.on('stopDataProcessing', () => {
  processDataFlag = false; // Set flag to stop processing
});

});

// Display data in terminal 
io.on('newRow', data => {
  console.log('Received new data:', data);
});
app.use(express.static('public')); 

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
// app.use('/public', express.static(path.join(__dirname, 'ARYA-GUI', 'public'), {
//   // Set the correct MIME type
//   setHeaders: (res, filePath) => {
//     if (filePath.endsWith('.js')) {
//       res.setHeader('Content-Type', 'text/javascript');
//     }
//   }
// }));

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
