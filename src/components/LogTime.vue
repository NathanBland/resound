<template lang='jade'>
.form-horizontal
  .form-group
    .col-sm-4.input-group
      span.input-group-addon Date
      input.form-input(type='date', v-model='timeEntry.date', placeholder='Date')
    .col-sm-2
    
    .col-sm-3.input-group
      span.input-group-addon Hours
      input.form-input(type='number', v-model='timeEntry.totalTime', placeholder='Hours')
  .form-group
    .col-sm-12.input-group
      span.input-group-addon Comment
      input.form-input(type='text', v-model='timeEntry.comment', placeholder='Comment')
  button.btn.btn-primary(@click='save()') Save
  button.btn(v-link="'/time-entries'") Cancel
  hr
</template>

<script>
  export default {
    data () {
      return {
        // We default the user object on
        // the timeEntry to have some user details
        timeEntry: {
          user: {
            firstName: 'Ryan',
            lastName: 'Chenkie',
            email: 'ryanchenkie@gmail.com',
            image: 'https://1.gravatar.com/avatar/7f4ec37467f2f7db6fffc7b4d2cc8dc2?s=250&d=retro&r=g'
          }
        }
      }
    },
    methods: {
      save () {
        let timeEntry = this.timeEntry
        // We dispatch the timeEntry so it can be pushed
        // onto the timeEntries array in the parent component
        this.$dispatch('timeUpdate', timeEntry)
        this.timeEntry = {}
      }
    }
  }
</script>