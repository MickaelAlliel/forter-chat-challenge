<template>
  <div class="container-vertical">
    <div v-if="!room">
      <h5>Choose a username to enter the chat:</h5>
      <div class="container">
        <input type="text" v-model="user.username" v-on:keyup.enter="connect" placeholder="Username" autofocus>
        <button v-on:click="connect">Connect</button>
      </div>
    </div>
    <div class="container" v-if="room">
      <chat-box :messages="messages" :room="room" :user="user"/>
      <chat-user-list :users="users" :user="user"/>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
const uuidv4 = require('uuid/v4');
import ChatBox from './ChatBox.vue';
import ChatUserList from './ChatUserList.vue';


export default {
  name: 'ChatRoom',
  methods: {
    connect: function() {
      if (this.user.username != '') {
        var state = this;
        this.room = io('http://localhost:8081');

        this.room.on('connect', function() {
          state.user.socket_id = state.room.id;
          state.room.emit('connected', state.user);
          state.loadUsers();
          state.loadHistory();
          state.newMessageListener();
        });
      }
    },
    newMessageListener: function() {
      var state = this;
      this.room.on('new message', function(data) {
        // If this message is from the current user, it already has been added
        if (data.user.id != state.user.id) {
          state.messages.push(data);
        }
      });
    },
    loadUsers: function() {
      var state = this;
      this.room.on('users list', function(users) {
        state.users = users;
      });
      
      this.room.emit('get users', this.room.id);
    },
    loadHistory: function() {
      var state = this;
      this.room.on('message history', function(history) {
        state.messages = history;
      });
      
      this.room.emit('get history', this.room.id);
    }
  },
  data () {
    return {
      room: null,
      user: {
        id: uuidv4(),
        username: ''
      },
      users: [],
      messages: []
    }
  },
  components: {
    ChatBox,
    ChatUserList
  },
  mounted: function() {
    
  }
}



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  body {
    margin: 0;
    background-color: whitesmoke;
  }

  .container {
      display: flex;
      justify-content: center;
      align-items: center;

      margin-top: 25px;
  }

  .container-vertical {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      margin-top: 25px;
  }
</style>
