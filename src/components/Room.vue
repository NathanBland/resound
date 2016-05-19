<template lang='jade'>
  .room
    ul.breadcrumb
      li.breadcrumb-item
        a(href='#') Home
      li.breadcrumb-item
          a(v-link="{ name: 'room', params: { room: $route.params.room }}") {{$route.params.room}}
    user-chip(:users='users')
    message-list(:messages='messages')
    message-input
</template>


<script>
  import userChip from './UserChip'
  import messageList from './messageList'
  import messageInput from './messageInput'
  import auth from '../auth'
  import {router} from '../main'
  import io from 'socket.io-client'
  let socket = io('//localhost:8081')
  // import Lockr from 'lockr'
  export default {
    components: {
      'messageList': messageList,
      'messageInput': messageInput,
      'userChip': userChip},
    data () {
      return {
        messages: [],
        users: [],
        connected: false
      }
    },
    ready: function () {
      this.$http({url: 'room/' + this.$route.params.room, method: 'GET'}).then(function (res) {
        console.log('res:', res)
        this.$set('messages', res.data.messages)
        this.$set('users', res.data.users)
        socket.on('connect', function (data) {
          console.log('got Socket Connection:', data)
          // socket.emit('join', location.pathname)
        })
      }, function (res) {
        console.log('err:', res)
        if (!res.ok) {
          console.log('trying to create room')
          this.$http({
            url: 'room',
            method: 'POST',
            data: {title: this.$route.params.room}
          }).then(function (res) {
            console.log('success:', res)
            router.go('/room/' + res.data.alias)
          }, function (res) {
            console.log('err:', res)
            router.go('/room/' + res.data.room.alias)
          })
        }
      })
    },
    events: {
      sendMessage (message) {
        // console.log('(message) auth:', auth.user)
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
