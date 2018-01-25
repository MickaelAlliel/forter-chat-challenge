<template>
  <div class="chat">
        <div class="message-area">
            <div v-for="message in messages" :key="message.id">
                <chat-message :message="message"/>
            </div>
        </div>
        <div class="input-area">
            <textarea class="message-input" placeholder="Enter your message..."
                        v-on:keyup.enter="sendMessage"
                        v-model="messageInput"></textarea>
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
    handleChatHeight: function() {
        var messageInput = $('.message-input');
        var messageArea = $('.message-area');
        var state = this;

        messageInput.on('focus', function() {
            messageArea.addClass('message-area-slide-up');
            state.scrollMessages();
        });

        messageInput.on('blur', function() {
            messageArea.removeClass('message-area-slide-up');
        })
    },
    scrollMessages: function() {
        let area = $('.message-area');
        area.stop().animate({
            scrollTop: area.prop('scrollHeight')
        }, 800);
    }
  },
  mounted: function() {
    this.handleChatHeight();
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
        width: 15%;
        height: 25px;
        transition: height 1s;

        margin: 0;
        padding: 0;
    }

    .message-input:focus + .message-send-btn, .message-input:focus {
        height: 100px;
        transition: height 1s;
        outline: none;
    }

    .input-area:focus-within {
        border-bottom-width: 5px;
        border-bottom-color: rgb(69%, 87.8%, 90.2%);
        border-bottom-style: solid;
    }

    .message-input {
        width: 85%;
        height: 25px;
        resize: none;
        padding: 0;
        margin: 0;

        border: 0px solid black;
        border-top-width: 1px;

        transition: height 1s;
    }

    .message-input::placeholder {
        padding: 5px;
    }
</style>
