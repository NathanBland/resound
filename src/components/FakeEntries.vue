<template lang='jade'>
div
  button.btn.btn-primary(v-if="$route.path !== '/time-entries/log-time'", v-link="'/time-entries/log-time'") Log Time
  div(v-if="$route.path === '/time-entries/log-time'")
    h3 Log Time
  hr
  router-view
  .time-entries
    p(v-if='!timeEntries.length')
      strong No time entries yet
    .list-group
      a.list-group-item(v-for='timeEntry in timeEntries')
        .columns
          .column.col-2.user-details
            figure.centered.avatar.avatar-xl
              img(:src='timeEntry.user.image')
            p.text-center
              strong {{ timeEntry.user.firstName }} 
               | {{ timeEntry.user.lastName }}
          .column.col-2.text-center.time-block
            h3.list-group-item-text.total-time
              i.fa.fa-clock-o 
              |  {{ timeEntry.totalTime }}
            p.label.label-primary.text-center
              i.fa.fa-calendar 
              |  {{ timeEntry.date }}
          .column.col-7.comment-section
            p {{ timeEntry.comment }}
          .column.col-1
            button.btn.btn-sm.btn-primary.delete-button(@click='deleteTimeEntry(timeEntry)') X
</template>

<script>
  export default {
    data () {
      // We want to start with an existing time entry
      let existingEntry = {
        user: {
          firstName: 'Ryan',
          lastName: 'Chenkie',
          email: 'ryanchenkie@gmail.com',
          image: 'https://1.gravatar.com/avatar/7f4ec37467f2f7db6fffc7b4d2cc8dc2?s=250'
        },
        comment: 'First time entry',
        totalTime: 1.5,
        date: '2016-04-08'
      }
      return {
        // Start out with the existing entry
        // by placing it in the array
        timeEntries: [existingEntry]
      }
    },
    methods: {
      deleteTimeEntry (timeEntry) {
        // Get the index of the clicked time entry and splice it out
        let index = this.timeEntries.indexOf(timeEntry)
        if (window.confirm('Are you sure you want to delete this time entry?')) {
          this.timeEntries.splice(index, 1)
          this.$dispatch('deleteTime', timeEntry)
        }
      }
    },
    events: {
      timeUpdate (timeEntry) {
        this.timeEntries.push(timeEntry)
        return true
      }
    }
  }
</script>

<style lang='sass'>
    
  .user-details
    background-color: #f5f5f5
    border-right: 1px solid #ddd
    margin: -10px 0

  .time-block
    padding: 10px
  
  .comment-section 
    padding: 20px
  
</style>