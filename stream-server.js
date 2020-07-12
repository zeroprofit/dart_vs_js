const fs = require('fs-extra');
const io = require('socket.io')();

var writeStream;

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('UPLOAD_START', (data) => {
    console.log(data);
    var out = {};
    out['filename'] = 'out.' + data['ext'];
    out['start'] = 0;
    writeStream = fs.createWriteStream(out['filename']);
    socket.emit('UPLOAD_START', out);
  });

  socket.on('UPLOAD', (data) => {
    if (data['chunk'] == null ) {
      return;
    }

    writeStream.write(data['chunk']);
    console.log('Progress: ' + data['start'] / data['size'] * 100 + '%');
  });

  socket.on('UPLOAD_END', () => {
    // Clean up upload manager
    console.log('UPLOAD_END');
    socket.emit('UPLOAD_END');
  });

  socket.on('UPLOAD_DART', (data) => {
    writeStream.write(Buffer.from(data['chunk']));
    console.log('Progress: ' + data['start'] / data['size'] * 100 + '%');
    // console.log(Buffer.from(data['chunk'].slice(0, 5)));
    // console.log('No conversion');
  });

});

io.listen(8000);
console.log('Listening on port 8000');

