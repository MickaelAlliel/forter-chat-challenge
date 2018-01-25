<template>
    <div class="chat-user-list">
        <ul>
            <li v-for="u in users" :key="u.id" v-bind:class="{'this-username':(u.id == user.id)}"
                                                    class="username">
                {{u.username}}
                <button class="disconnect-btn" v-if="u.id == user.id"
                        v-on:click="disconnect">X</button>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
    name: 'ChatUserList',
    data () {
        return {
        
        }
    },
    props: ['users', 'user', 'disconnect']
    }
</script>

<style scoped>
    .chat-user-list {
        width: 100px;
        height: 500px;
        padding-left: 10px;
    }

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    li {
        padding-left: 10px;
        overflow-wrap: break-word;
    }

    .username {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .this-username {
        background-color: lightgrey;
        border-radius: 6px;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.12);
    }

    .disconnect-btn {
        -moz-box-shadow:inset 0px 34px 0px -15px #b54b3a;
        -webkit-box-shadow:inset 0px 34px 0px -15px #b54b3a;
        box-shadow:inset 0px 34px 0px -15px #b54b3a;
        background-color:#a73f2d;
        border:1px solid #a73f2d;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-family:Arial;
        font-size:0.8em;
        font-weight:bold;
        text-decoration:none;
        text-shadow:0px -1px 0px #7a2a1d;
    }
    .disconnect-btn:hover {
        background-color:#b34332;
    }
    .disconnect-btn:active {
        position:relative;
        top:1px;
    }

</style>