import {router} from './main'
import Lockr from 'lockr'

const API_URL = 'http://localhost:8081/api/v1'
const LOGIN_URL = API_URL + '/auth/local/login/'
const SIGNUP_URL = API_URL + '/auth/local/register/'

export default {

  user: {
    authenticated: false,
    username: ''
  },

  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds, (data) => {
      Lockr.set('token', data.token)
      Lockr.set('username', data.username)
      console.log('login data:', data.username)
      this.user.authenticated = true
      this.user.username = data.username
      if (redirect) {
        router.go(redirect)
      }
    }).error((err) => {
      context.error = err
    })
  },

  signup (context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds).then(function (data) {
      Lockr.set('token', data.token)
      Lockr.set('username', data.username)
      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }).catch(function (err) {
      context.error = err
    })
  },

  logout () {
    console.log('logging out')
    Lockr.rm('token')
    Lockr.rm('username')
    this.user.authenticated = false
  },

  checkAuth () {
    var jwt = Lockr.get('token')
    if (jwt) {
      this.user.username = Lockr.get('username')
      this.user.authenticated = true
      // Vue.$broadcast('authenticated', true)
    } else {
      this.user.authenticated = false
      // Vue.$broadcast('authenticated', false)
    }
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + Lockr.get('id_token')
    }
  }
}
