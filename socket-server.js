var server = require('http').createServer();
var io = require('socket.io')(server);
const port = 8081;

io.origins('*:*');

io.on('connection', function(client){
  client.on('event', function(data){});
  client.on('disconnect', function(){});
});

server.listen(port, function(){
  console.log(`Socket server listening on port :${port}`);
});