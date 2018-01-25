<template>
  <div class="container-vertical">
    <img src='/static/images/logo.png' class="logo">
    <div v-if="!room">
      <div class="container">
        <input type="text" v-model="user.username"
               v-on:keyup.enter="connect"
               placeholder="Username"
               class="username-input"
               autofocus>
        <button v-on:click="connect" class="connect-btn">Connect</button>
      </div>
    </div>
    <div class="container" v-if="room">
      <chat-box :messages="messages" :room="room" :user="user"/>
      <chat-user-list :users="users" :user="user" :disconnect="disconnect"/>
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
        this.user.id = uuidv4();
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
    disconnect: function() {
      this.room.disconnect();
      this.user.id = null;
      this.user.username = '';
      this.room = null;
      this.messages = [];
      this.users = [];
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
        id: null,
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

  .logo {
      height: 50px;
  }

  .username-input {
      display: inline-block;
      -webkit-box-sizing: content-box;
      -moz-box-sizing: content-box;
      box-sizing: content-box;
      padding: 10px 20px;
      border: 1px solid #b7b7b7;
      -webkit-border-radius: 3px;
      border-radius: 3px;
      font: normal 16px/normal "Times New Roman", Times, serif;
      color: rgba(0,0,0,1);
      -o-text-overflow: clip;
      text-overflow: clip;
      background: rgba(252,252,252,1);
      -webkit-box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.2) inset;
      box-shadow: 2px 2px 2px 0 rgba(0,0,0,0.2) inset;
      text-shadow: 1px 1px 0 rgba(255,255,255,0.66) ;
      -webkit-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
      -moz-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
      -o-transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
      transition: all 200ms cubic-bezier(0.42, 0, 0.58, 1);
  }

  .connect-btn {
        -moz-box-shadow:inset 0px 1px 0px 0px #bbdaf7;
        -webkit-box-shadow:inset 0px 1px 0px 0px #bbdaf7;
        box-shadow:inset 0px 1px 0px 0px #bbdaf7;
        background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #79bbff), color-stop(1, #378de5));
        background:-moz-linear-gradient(top, #79bbff 5%, #378de5 100%);
        background:-webkit-linear-gradient(top, #79bbff 5%, #378de5 100%);
        background:-o-linear-gradient(top, #79bbff 5%, #378de5 100%);
        background:-ms-linear-gradient(top, #79bbff 5%, #378de5 100%);
        background:linear-gradient(to bottom, #79bbff 5%, #378de5 100%);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#79bbff', endColorstr='#378de5',GradientType=0);
        background-color:#79bbff;
        border:1px solid #84bbf3;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-family:Arial;
        font-size:15px;
        font-weight:bold;
        transition: height 1s;
        margin: 0;
        padding: 10px;
        text-decoration:none;
        text-shadow:0px 1px 0px #528ecc;
    }
    .connect-btn:hover {
        background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #378de5), color-stop(1, #79bbff));
        background:-moz-linear-gradient(top, #378de5 5%, #79bbff 100%);
        background:-webkit-linear-gradient(top, #378de5 5%, #79bbff 100%);
        background:-o-linear-gradient(top, #378de5 5%, #79bbff 100%);
        background:-ms-linear-gradient(top, #378de5 5%, #79bbff 100%);
        background:linear-gradient(to bottom, #378de5 5%, #79bbff 100%);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#378de5', endColorstr='#79bbff',GradientType=0);
        background-color:#378de5;
    }
    
    .connect-btn:active {
        position:relative;
        top:1px;
    }
</style>
