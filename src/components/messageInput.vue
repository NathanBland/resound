<template lang='jade'>
form(@submit.prevent='send()')
  // form input control
  .input-group
    span.input-group-addon(for='message') Message
    input#message.form-input(type='text', placeholder='I have something to tell you...', v-model='message', autocomplete='off')
    button.btn.btn-primary.input-group-btn Submit
</template>


<script>
  export default {
    data () {
      return {
        message: ''
      }
    },
    methods: {
      send () {
        let message = this.message
        this.$dispatch('sendMessage', message)
        this.message = ''
      }
    },
    props: ['username']
  }
</script>

