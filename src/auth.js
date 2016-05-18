import {router} from './main'
import Lockr from 'lockr'

const API_URL = 'http://localhost:8081'
const LOGIN_URL = API_URL + '/auth/local/login/'
const SIGNUP_URL = API_URL + '/auth/local/register/'

export default {

  user: {
    authenticated: false
  },

  login (context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds, (data) => {
      Lockr.set('token', data.token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }).error((err) => {
      context.error = err
    })
  },

  signup (context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      Lockr.set('token', data.token)

      this.user.authenticated = true

      if (redirect) {
        router.go(redirect)
      }
    }).error((err) => {
      context.error = err
    })
  },

  logout () {
    Lockr.rm('token')
    this.user.authenticated = false
  },

  checkAuth () {
    var jwt = Lockr.get('token')
    if (jwt) {
      this.user.authenticated = true
    } else {
      this.user.authenticated = false
    }
  },

  getAuthHeader () {
    return {
      'Authorization': 'Bearer ' + Lockr.get('id_token')
    }
  }
}
