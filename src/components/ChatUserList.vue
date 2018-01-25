<template>
    <div class="chat-user-list">
        <ul>
            <li v-for="u in users" :key="u.id" v-bind:class="{'this-username':(u.id == user.id)}">
                {{u.username}}
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
    props: ['users', 'user']
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

    .this-username {
        color: royalblue;
    }
</style>