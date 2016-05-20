<template lang='jade'> 
.wrapper
  header.navbar
    section.navbar-section
      a.btn.btn-link.btn-lg(v-link="'/'")
        i.icon.fa.fa-bars
      a.navbar-brand(v-link="'/'") Resound
    section.navbar-section(:authenticated v-if='!authenticated')
      input.form-input.input-inline(type='text', placeholder='search')
      a.btn.btn-link(v-link="'/home'") Home
      a.btn.btn-link(v-link="'/login'") Login
      a.btn.btn-primary(v-link="'/signup'") Sign up
    section.navbar-section(v-else)
      a.btn.btn-link(v-link="'/home'") Home
      a.btn.btn-link(v-link="'/'", @click='logOut()) Logout
  .container
    .columns
      .column.col-3.side-bar
        //sidebar(:time='totalTime')
      .column.col-6.main
        router-view
</template>

<script>
  import Sidebar from './components/Sidebar'
  // import Lockr from 'lockr'
  import auth from './auth'
  // import {router} from './main'
  export default {
    components: {'sidebar': Sidebar},
    data () {
      return {
        room: '',
        authenticated: false
      }
    },
    methods: {
      logOut () {
        auth.logout()
        // router.go('/')
        this.$dispatch('authenticated', auth.user.authenticated)
      }
    },
    computed: {
      isAuthenticated: function () {
        return auth.user.authenticated
      }
    },
    events: {
      joinRoom (room) {
        this.room = room
      },
      leaveRoom (room) {
        this.room = ''
      },
      authenticated (isAuthenticated) {
        console.log('saw auth event:', isAuthenticated)
        this.authenticated = isAuthenticated
      }
    }
  }
</script>