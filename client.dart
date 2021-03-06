import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'dart:io';
import 'dart:convert';

main() async {
  var socket = IO.io('http://localhost:8000', <String, dynamic>{
    'transports': ['websocket'],
    'upgrade': false
  });
  

  // var file = 'in.png';
  // var file = '1G.iso';
  var file = 'c.jpg'; // 5MB file
  // var file = 'a.zip'; // 68.8MB file
  var f = new File(file);
  Map prop = {};
  prop['ext'] = file.split('.').last;
  prop['size'] = await f.length();

  var start = new DateTime.now().millisecondsSinceEpoch;

  var d = await f.readAsBytes();

  var end = new DateTime.now().millisecondsSinceEpoch;
  var elapsed = end - start;
  print('readAsBytes: ' + elapsed.toString());
  
  print(prop);
  
  socket.emitWithBinary('UPLOAD_FULL_DART', d);

  socket.on('UPLOAD_END', (data) {   
    print('UPLOAD_END');
    var end = new DateTime.now().millisecondsSinceEpoch;
    var elapsed = end - start;
    print('');
    print('Language: DART');
    print('Stream block size: 65 * 1024');
    print('Size in bytes: ' + prop['size'].toString());
    print('Elapsed in ms:  ' + elapsed.toString());
  });

}
