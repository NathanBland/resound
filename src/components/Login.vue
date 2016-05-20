<template lang='jade'>
.login
  h1 Login
  h2 Please sign in
  .toast.toast-danger(v-if='error')
    button.btn.btn-clear.float-right(@click='hideMe()')
    span.icon.icon-error_outline
    span(v-if='error === "Unauthorized"')
    | That didn't work, please try again.
  form(@submit.prevent='doAuth()')
    .input-group
      span.input-group-addon Username
      input.form-input(type='text', name='username', v-model='username', placeholder='SlimJim')
      span.input-group-addon Password
      input.form-input(type='password', name='password', v-model='password', placeholder='******')
      button.btn.btn-primary.input-group-btn Submit
</template>

<script>
  import auth from '../auth'
  export default {
    data () {
      return {
        token: '',
        username: '',
        password: '',
        error: '',
        hide: {
          display: 'none'
        }
      }
    },
    methods: {
      hideMe () {
        this.$set('error', '')
      },
      doAuth () {
        console.log('do auth')
        var credentials = {
          username: this.username,
          password: this.password
        }
        auth.login(this, credentials, '/home')
        this.$dispatch('authenticated', auth.user.authenticated)
        /* this.$http.post('/auth/local/login').then(function (res) {
          console.log('auth status:', res.status)
          if (res.data.token) {
            this.$set('token', res.data.token)
            console.log('token:', res.data.token)
          }
          this.password = ''
        }) */
      }
    }
  }
</script>

<style scoped lang='sass'>
  .toast
    margin-bottom: 1em 
</style>