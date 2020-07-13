# dart_vs_js

Javascript is ~6 times faster than Dart when streaming 5MB jpg file at 65KB block over socket.io.  The test is done by running a node socket.io server against a stream dart client and a stream javascript client each uploading same 5MB jpg image file.  Dart takes 11.1 seconds vs Javascript at 0.534 second.


Dart socket.io client library:  https://github.com/rikulo/socket.io-client-dart

Javascript socket.io client library:  https://github.com/socketio/socket.io-client

## Setup

npm install

flutter pub get

## Run node stream server

node stream-server.js

## Run Javascript stream client

node stream-client.js
```
Language: JAVSCRIPT
Size in bytes: 68780375
Elapsed in ms: 4458
```

## Run Dart stream client

dart stream-client.dart
```
Language: DART (emitWithBinary)
Size in bytes: 68780375
Elapsed in ms:  29709
```

## Run BASH transfer via nc

./client.sh
```
Language: BASH (nc)
Size in bytes: 68780375
Elapsed in ms: 904
```

