var server = require('http').createServer();
var io = require('socket.io')(server);
const port = 8081;

io.origins('*:*');

var connectedUsers = [];
var messageHistory = [];

io.on('connection', function(client){
  client.on('connected', function(user) {
    io.emit('add user', user);
    connectedUsers.push(user);
    io.emit('users list', connectedUsers);
    console.log(`CONNECTED : ${user.username} [${user.id}]`);
  });

  client.on('disconnect', function(user){
    connectedUsers = connectedUsers.filter(function(user) {
      if (io.sockets.sockets[user.socket_id] != undefined) {
        return true;
      }
      console.log(`DISCONNECTED : ${user.username} [${user.id}]`);
      return false;
    });

    io.emit('users list', connectedUsers);
  });

  client.on('send message', function(data) {
    io.emit('new message', data);
    messageHistory.push(data);

    console.log(`NEW MSG FROM: ${data.user.username}`);
  });

  client.on('get users', function(client_id) {
    io.sockets.sockets[client_id].emit('users list', connectedUsers);
    console.log(`SENDING USER LIST TO: ${client_id}`);
  });

  client.on('get history', function(client_id) {
    io.sockets.sockets[client_id].emit('message history', messageHistory);
    console.log(`SENDING MESSAGE HISTORY TO: ${client_id}`);
  });
});

server.listen(port, function(){
  console.log(`Socket server listening on port :${port}`);
});