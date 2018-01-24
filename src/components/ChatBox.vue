<template>
  <div class="chat">
        <div class="message-area">
            <div v-for="message in messages" :key="message.id">
                <chat-message :message="message"/>
            </div>
        </div>
        <div id="input-area">
            <textarea class="message-input" placeholder="Enter your message..."></textarea>
        </div>
    </div>
</template>

<script>
import ChatMessage from './ChatMessage.vue';

export default {
  name: 'ChatBox',
  data () {
    return {
      
    }
  },
  props: ['messages'],
  components: {
      ChatMessage
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .chat {
        background-color: white;
        box-shadow: 0px 0px 5px 1px black;
        height: 500px;
        width: 400px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .message-area {
        display: flex;
        flex-direction: column;
    }

    .message-input {
        width: 100%;
        height: 25px;
        resize: none;
        padding: 0;
        margin: 0;
        margin-bottom: -4px;

        border: 0px solid black;
        border-top-width: 1px;

        transition: height 1s;
    }

    .message-input:focus {
        height: 100px;
        transition: height 1s;
        outline: none;

        border-bottom-width: 5px;
        border-bottom-color: rgb(69%, 87.8%, 90.2%);
        border-bottom-style: solid;
    }

    .message-input::placeholder {
        padding: 5px;
    }
</style>
