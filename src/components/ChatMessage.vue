<template>
    <div class="chat-message">
        <span class="chat-timestamp">
            {{message.timestamp}}
        </span>
        <span class="chat-username">
            {{message.user.username}}:
        </span>
        <span class="chat-text">
            {{message.message}}
        </span>
    </div>
</template>

<script>
    export default {
        name: 'ChatMessage',
        data () {
            return {
            
            }
        },
        props: [
            'message'
        ]
    }
</script>

<style scoped>
    .chat-message {
        margin: 5px;
    }

    .chat-timestamp {
        font-style: italic;
        color: grey;
    }

    .chat-username {
        font-weight: 600;
    }

    .chat-text {
        font-family: 'Times New Roman', Times, serif;
    }
</style>