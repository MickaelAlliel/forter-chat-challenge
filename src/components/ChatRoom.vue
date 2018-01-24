<template>
  <div class="container">
    <chat-box :messages="messages"/>
    <chat-user-list :users="users"/>
  </div>
</template>

<script>
import ChatBox from './ChatBox.vue';
import ChatUserList from './ChatUserList.vue';

export default {
  name: 'ChatRoom',
  data () {
    return {
      users: ['mickael', 'john', 'janette'],
      messages: [{id: 1, timestamp: '12:30', username: 'mickael', message: 'test message lel'},
      {id: 2, timestamp: '12:30', username: 'mickael', message: 'test message lel'},
      {id: 3, timestamp: '12:30', username: 'mickael', message: 'test message lel'}]
    }
  },
  components: {
    ChatBox,
    ChatUserList
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

      margin-top: 50px;
  }
</style>
