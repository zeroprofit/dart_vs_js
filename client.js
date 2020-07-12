const fs = require('fs-extra');
const io = require('socket.io-client')('http://localhost:8000');
const sha1File = require('sha1-file');

io.on('connect', async () => {

  var prop = {};
  // prop['inFile'] = 'in.png';
  // prop['inFile'] = '1G.iso';
  prop['inFile'] = 'c.jpg'; // 5MB file
  // prop['inFile'] = 'a.zip'; // 68.8MB file
  
  var f = await fs.stat(prop['inFile']);
  prop['size'] = f.size;
  
  var start = Date.now();

  var buf = await fs.readFile(prop['inFile']);
  
  var end = Date.now();
  var elapsed = end - start;
  console.log('readFile() ' + elapsed);


  console.log(prop);
  io.emit('UPLOAD_FULL', buf);

  io.on('UPLOAD_END', (data) => {

    console.log('Language: JAVSCRIPT');
    console.log('Stream block size: 65 * 1024');
    console.log('Size in bytes: ' + prop['size']);
    var end = Date.now();
    var elapsed = end - start;
    console.log('Elapsed in ms: ' + elapsed);
  });

});


