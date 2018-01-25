var server = require('http').createServer();
var io = require('socket.io')(server);
const port = 8081;

io.origins('*:*');

var connectedUsers = [];
var messageHistory = [];

var moment = require('moment');
var uuidv4 = require('uuid/v4');
var ChatAgent = require('./chat_agent');
var Agent = ChatAgent.Agent;
// Adding the bot to the user list
connectedUsers.push(Agent.user);
// Initializing bot knowledge
var hasUnknownQuestion = false;

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

    // Bot logic
    AgentLearn(data);
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


function AgentLearn(data) {
  // Do not check if it is a message from the bot
  if (data.user.id == Agent.user.id)
    return;

  if (hasUnknownQuestion) {
    Agent.known[Agent.known.length - 1].answer = data.message;
    hasUnknownQuestion = false;
  } else {
    let res = Agent.parse(data.message);
    if (!res.needResponse) {
      if (res.response != null) {
        let botMsg = {
          id: uuidv4(),
          timestamp: moment().format('HH:mm'),
          user: Agent.user,
          message: res.response
        };
        messageHistory.push(botMsg);
        setTimeout(function() {
          io.emit('new message', botMsg);
        }, 300);
        console.log(`NEW MSG FROM: ${botMsg.user.username}`);
      }
    } else {
      hasUnknownQuestion = true;
    }
  }
}