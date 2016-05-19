<template lang='jade'> 
.wrapper
  header.navbar
    section.navbar-section
      a.btn.btn-link.btn-lg(href='#')
        i.icon.fa.fa-bars
      a.navbar-brand(href='/') Resound
    section.navbar-section(:isAuthentiated v-if='!isAuthentiated')
      input.form-input.input-inline(type='text', placeholder='search')
      a.btn.btn-link(href='/') Home
      a.btn.btn-link(v-link="'/login'") Login
      a.btn.btn-primary(v-link="'/signup'") Sign up
    section.navbar-section(v-else)
      a.btn.btn-link(v-link="'/logout'") Logout
  .container
    .columns
      .column.col-3.side-bar
        //sidebar(:time='totalTime')
      .column.col-6.main
        router-view
</template>

<script>
  import Sidebar from './components/Sidebar'
  import Lockr from 'lockr'
  export default {
    components: {'sidebar': Sidebar},
    data () {
      return {
        room: ''
      }
    },
    computed: {
      isAuthentiated: function () {
        return Lockr.get('token')
      }
    },
    events: {
      joinRoom (room) {
        this.room = room
      },
      leaveRoom (room) {
        this.room = ''
      }
    }
  }
</script>