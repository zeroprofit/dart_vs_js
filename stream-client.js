const fs = require('fs-extra');
const io = require('socket.io-client')('http://localhost:8000');
const sha1File = require('sha1-file');

io.on('connect', async () => {

  var prop = {};
  // prop['inFile'] = 'in.png';
  // prop['inFile'] = '1G.iso';
  prop['inFile'] = 'c.jpg'; // 5MB file
  var byteCount = 65 * 1024;
  var f = await fs.stat(prop['inFile'])
  prop['size'] = f.size;
  prop['ext'] = prop['inFile'].split('.').pop();
  var sha1 = await sha1File(prop['inFile']);

  prop['sha1'] = sha1;
  prop['start'] = 0;

  console.log(prop);
  io.emit('UPLOAD_START', prop);

  var stream;

  var start = Date.now();

  io.on('UPLOAD_START', (data) => {
    prop['filename'] = data.filename;
    prop['start'] = data.start;
    console.log(data);
    stream = fs.createReadStream(prop['inFile'], {start: prop['start'], highWaterMark: byteCount});    
    stream.on('readable', () => {
      prop['chunk'] = stream.read();
      io.emit('UPLOAD', prop);
      try {
        if (prop['chunk'] == null) {
            // console.log('Done UPLOAD');
            return;
        }
//        console.log(prop['chunk'].slice(0,5));
        prop['start'] = prop['start'] + prop['chunk'].length;
      } catch (e) {
        console.log(e);
      }
      console.log('Progress: ' + prop['start'] / prop['size'] * 100);
    });

    stream.on('end', () => {
      // console.log('STREAM ENDED');
      io.emit('UPLOAD_END');
    });
  });

  io.on('UPLOAD_END', (data) => {
    console.log('UPLOAD_END');
//    console.log('SHA1: ' + prop['sha1']);
    console.log('');
    console.log('Language: JAVSCRIPT');
    console.log('Stream block size: 65 * 1024');
    console.log('Size in bytes: ' + prop['size']);
    var end = Date.now();
    var elapsed = end - start;
    console.log('Elapsed in ms: ' + elapsed);
  });


});


