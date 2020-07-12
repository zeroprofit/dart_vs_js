import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'dart:io';
import 'dart:convert';
import 'package:convert/convert.dart';

main() async {
  var socket = IO.io('http://localhost:8000', <String, dynamic>{
    'transports': ['websocket'],
    'upgrade': false
  });
  

  // var file = 'in.png';
  // var file = '1G.iso';
  var file = 'c.jpg'; // 5MB file
  var f = new File(file);
  Map prop = {};
  prop['ext'] = file.split('.').last;
  prop['size'] = await f.length();
  prop['start'] = 0;
  print(prop);

  var start = new DateTime.now().millisecondsSinceEpoch;

socket.on('connect', (s) {
  var stream = f.openRead();
  var length = 0;

  socket.emit('UPLOAD_START', prop);
  stream
    // .transform(Uint8List.buffer)
    .listen( (data) {
    // print('Sending ...');
    prop['chunk'] = data;
    prop['start'] = prop['start'] + data.length;
    print('Progress: ' + (prop['start'] / prop['size'] * 100).toString() );
    socket.emitWithBinary('UPLOAD_DART', prop);
  }, onDone: () => socket.emit('UPLOAD_END'));

});

  socket.on('UPLOAD_END', (data) {   
    print('UPLOAD_END');
    var end = new DateTime.now().millisecondsSinceEpoch;
    var elapsed = end - start;
    print('');
    print('Language: DART');
    print('Stream block size: 65 * 1024');
    print('Size in bytes: ' + prop['size'].toString());
    print('Elasped in ms:  ' + elapsed.toString());
  });

}
