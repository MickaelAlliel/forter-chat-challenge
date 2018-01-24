var app = require('express')();
var http = require('http').Server(app);
const port = 8081;

http.listen(port, function(){
  console.log(`Socket server listening on port :${port}`);
});