<template>
    <div class="chat-user-list">
        <ul>
            <li v-for="user in users" :key="user">
                {{user}}
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
    props: ['users']
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
</style>