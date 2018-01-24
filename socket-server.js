var server = require('http').createServer();
var io = require('socket.io')(server);
const port = 8081;

io.origins('*:*');

io.on('connection', function(client){
  client.on('connected', function(user) {
    io.emit('add user', user);
    console.log(`CONNECTED : ${user.username} [${user.id}]`);
  });

  client.on('disconnect', function(user){
    console.log(`DISCONNECTED : ${user.username} [${user.id}]`);
  });

  client.on('send message', function(data) {
    io.emit('new message', data);
  });
});

server.listen(port, function(){
  console.log(`Socket server listening on port :${port}`);
});