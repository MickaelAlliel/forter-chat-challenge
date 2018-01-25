<template>
  <div class="chat">
        <div class="message-area"
             v-bind:class="{'message-area-slide-up':inputFocused}"
             v-on:transitionend="scrollMessages">
             
            <chat-message :message="message" :user="user"
                          v-for="message in messages" :key="message.id"/>
        </div>
        <div class="input-area">
            <textarea class="message-input" placeholder="Enter your message..."
                        v-on:keyup.enter="sendMessage"
                        v-model="messageInput"
                        v-on:focus="inputFocusHandler"
                        v-on:blur="inputBlurHandler"></textarea>
            <button v-on:click="sendMessage" class="message-send-btn">Send</button>
        </div>
    </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue';
const uuidv4 = require('uuid/v4');
var moment = require('moment');

export default {
  name: 'ChatBox',
  props: ['messages', 'room', 'user'],
  data () {
    return {
        messageInput: '',
        inputFocused: false,
    }
  },
  methods: {
    sendMessage: function() {
        if (this.messageInput == '')
            return;

        let message = {
            id: uuidv4(),
            timestamp: moment().format('HH:mm'),
            user: this.user,
            message: this.messageInput
        };
        this.room.emit('send message', message);
        this.messageInput = '';
        this.messages.push(message);
    },
    inputFocusHandler: function() {
        this.inputFocused = true;
    },
    inputBlurHandler: function() {
        this.inputFocused = false;
    },
    scrollMessages: function() {
        var area = this.$el.querySelector('.message-area');
        area.scroll({
            top: area.scrollHeight,
            behavior: 'smooth'
        });
    }
  },
  mounted: function() {
  },
  updated: function() {
    this.scrollMessages();
  },
  components: {
      ChatMessage
  },
  watch: {
      messages: function(val) {
        this.scrollMessages();
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .message-area::-webkit-scrollbar {
        width: 1em;
    }
    
    .message-area::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    }
    
    .message-area::-webkit-scrollbar-thumb {
        background-color: lightgray;
        outline: 1px solid darkgray;
    }

    .chat {
        background-color: white;
        box-shadow: 0px 0px 5px 1px black;
        max-height: 500px;
        height: 500px;
        width: 400px;

        overflow: hidden;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .message-area {
        display: flex;
        flex-direction: column;

        max-height: 500px;
        transition: max-height 1s;

        overflow-wrap: break-word;
        overflow-y: scroll;
    }

    .message-area-slide-up {
        max-height: 400px;
        transition: max-height 1s;
    }

    .input-area {
        display: flex;
        flex-direction: row;
    }


    .message-send-btn {
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
        width: 15%;
        transition: height 1s;
        margin: 0;
        padding: 0;
        text-decoration:none;
        text-shadow:0px 1px 0px #528ecc;
    }
    .message-send-btn:hover {
        background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #378de5), color-stop(1, #79bbff));
        background:-moz-linear-gradient(top, #378de5 5%, #79bbff 100%);
        background:-webkit-linear-gradient(top, #378de5 5%, #79bbff 100%);
        background:-o-linear-gradient(top, #378de5 5%, #79bbff 100%);
        background:-ms-linear-gradient(top, #378de5 5%, #79bbff 100%);
        background:linear-gradient(to bottom, #378de5 5%, #79bbff 100%);
        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#378de5', endColorstr='#79bbff',GradientType=0);
        background-color:#378de5;
    }
    
    .message-send-btn:active {
        position:relative;
        top:1px;
    }


    .message-input:focus {
        height: 100px;
        transition: height 1s;
        outline: none;

    }

    .message-input:focus {
        border-bottom-width: 8px;
        border-bottom-color: #378de5;
        border-bottom-style: solid;
    }

    .message-input {
        display: inline-block;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        padding: 5px 10px;
        margin: 0;
        resize: none;
        width: 85%;
        height: 25px;
        border: 0px solid black;
        border-top-width: 1px;
        font: normal 15 px/normal "Times New Roman", Times, serif;
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
        transition: height 1s;
  }
</style>
