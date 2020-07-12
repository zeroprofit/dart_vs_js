# dart_vs_js

Javascript is 16 times faster than Dart when streaming 5MB jpg file at 65KB block over socket.io.  The test is done by running a node socket.io server.  And have a stream dart and a stream javascript client upload 5MB file.

## Setup

npm install

flutter pub get

## Run node server

node stream-server.js

## Run Javascript stream client

node stream-client.js

## Run Dart stream client

dart stream-client.dart

## Results
Dart
```
Stream block size: 65 * 1024
Size in bytes: 5186254
Elasped in ms:  11141
```

Javascript
```
Stream block size: 65 * 1024
Size in bytes: 5186254
Elapsed in ms: 534
```
