<template lang='jade'>
.landing
  h1 Welcome, {{user | capitalize}}
  p
    strong Hey there. 
    | Thanks for visiting..
  p Join, or make a room:
  form(@submit.prevent='joinRoom()')
    .input-group
      span.input-group-addon room/
      input.form-input(type='text', name='room', v-model='room', placeholder='Team Super Awesome')
      button.btn.btn-primary.input-group-btn Submit
</template>

<script>
  import auth from '../auth'
  import {router} from '../main'
  // import Lockr from 'lockr'
  export default {
    data () {
      return {
        room: ''
      }
    },
    methods: {
      joinRoom () {
        router.go('/room/' + this.room)
      }
    },
    computed: {
      user () {
        return auth.user.username
      }
    },
    route: {
      canActivate () {
        return auth.user.authenticated
      }
    }
  }
</script>