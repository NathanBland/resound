<template lang='jade'> 
.wrapper
  header.navbar
    section.navbar-section
      a.btn.btn-link.btn-lg(href='#')
        i.icon.fa.fa-bars
      a.navbar-brand(href='#') Resound
    section.navbar-section
      input.form-input.input-inline(type='text', placeholder='search')
      a.btn.btn-link(href='/home') Home
      a.btn.btn-link(href='#') Login
      a.btn.btn-primary(href='#') Sign up
  .container
    .columns
      .column.col-3.side-bar
        //sidebar(:time='totalTime')
      .column.col-9.main
        router-view
</template>

<script>
  import Sidebar from './components/Sidebar'
  
  export default {
    components: {'sidebar': Sidebar},
    data () {
      return {
        room: ''
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