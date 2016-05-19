<template lang='jade'>
.login
  h1 Login
  h2 Please sign in
  .alert.alert-danger(v-if='error')
    p {{ error }}
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
        error: ''
      }
    },
    methods: {
      doAuth () {
        console.log('do auth')
        var credentials = {
          username: this.username,
          password: this.password
        }
        auth.login(this, credentials, 'home')
        console.log('auth:', auth.user, '/room/test')
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