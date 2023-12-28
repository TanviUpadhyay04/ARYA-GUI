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

const inputFilePath = 'test.csv';
const outputFilePath = 'new_data.csv';
let isFirstRow = true;

io.on('connection', socket => {
  console.log('Connected');

  const readStream = fs.createReadStream(inputFilePath);
  const writeStream = fs.createWriteStream(outputFilePath, { flags: 'a' });

  const processData = async () => {
    const csvStream = fastCsv.format({ headers: true });

    csvStream.pipe(writeStream, { end: false });

    for await (const row of readStream.pipe(csv())) {
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

    csvStream.end();
    console.log('Finished reading CSV.');
    readStream.destroy();
    writeStream.end();
  };

  processData().catch(err => {
    console.error('Error processing data:', err);
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
