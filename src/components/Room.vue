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
  
  export default {
    components: {
      'messageList': messageList,
      'messageInput': messageInput},
    data () {
      return {
        messages: [{user: 'Server Bot', msg: 'There aren\'t any messages here yet :('}, {user: 'Server Bot', msg: 'Time to start a conversation!'}]
      }
    },
    events: {
      sendMessage (message) {
        this.messages.push({user: '', msg: message})
        return true
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
