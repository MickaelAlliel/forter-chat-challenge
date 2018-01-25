<template>
    <div class="chat-message">
        <span class="chat-timestamp">
            {{message.timestamp}}
        </span>
        <span class="chat-username">
            {{message.user.username}}:
        </span>
        <div class="speech-bubble"
             v-bind:class="{'arrow-right':this.myMessage, 'arrow-left':!this.myMessage}">
            <span class="chat-text">
                {{message.message}}
            </span>
        </div>
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
            'message',
            'user'
        ],
        computed: {
            myMessage: function() {
                return this.user.id == this.message.user.id;
            }
        }
    }
</script>

<style scoped>
    .chat-message {
        display: inline-block;
    }

    .chat-timestamp {
        margin-left: 5px;
        font-style: italic;
        color: grey;
    }

    .chat-username {
        font-weight: 600;
    }

    .chat-text {
        font-family: 'Times New Roman', Times, serif;
    }

    .speech-bubble {
        width: 300px;
        margin: 10px auto;
        background: #378de5;
        padding: 10px;
        min-height: 20px;
        border-radius: 6px;
        color: #fff;
        font-family: arial;
        position:relative;
    }

    .speech-bubble.left {
        text-align: left;
    }

    .speech-bubble.center {
        text-align: center;
    }

    .speech-bubble.right {
        text-align: right;
    }

    .arrow-left:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 10px solid transparent;
        border-right: 10px solid #378de5;
        border-top: 10px solid #378de5;
        border-bottom: 10px solid transparent;
        left: -20px;
        top: 6px;
    }

    .arrow-right:before {
        content: "";
        width: 0px;
        height: 0px;
        position: absolute;
        border-left: 10px solid #378de5;
        border-right: 10px solid transparent;
        border-top: 10px solid #378de5;
        border-bottom: 10px solid transparent;
        right: -20px;
        top: 6px;
    }
</style>