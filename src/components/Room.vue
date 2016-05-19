<template lang='jade'>
  .room
    ul.breadcrumb
      li.breadcrumb-item
        a(href='#') Home
      li.breadcrumb-item
          a(v-link="{ name: 'room', params: { room: $route.params.room }}") {{$route.params.room}}
    message-list(:messages='messages')
    message-input
</template>


<script>
  import messageList from './messageList'
  import messageInput from './messageInput'
  import auth from '../auth'
  export default {
    components: {
      'messageList': messageList,
      'messageInput': messageInput},
    data () {
      return {
        messages: [{user: 'Server Bot', msg: 'There aren\'t any messages here yet :('}, {user: 'Server Bot', msg: 'Time to start a conversation!'}]
      }
    },
    computed: {
      user: function () {
        return auth.user
      }
    },
    events: {
      sendMessage (message) {
        console.log('(message) auth:', auth.user)
        this.messages.push({user: auth.user.username, msg: message})
        return true
      }
    },
    route: {
      canActivate () {
        return auth.user.authenticated
      }
    },
    props: ['room']
  }
</script>

<style scoped lang='sass'>
.room
  display: flex
  flex-flow: column nowrap
  height: 89vh
</style>
