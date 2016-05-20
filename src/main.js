import Vue from 'vue'
import App from './App'
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Room from './components/Room'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Error from './components/Error'
import auth from './auth'
import Lockr from 'lockr'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// We want to apply VueResource and VueRouter
// to our Vue instance
Vue.use(VueResource)
Vue.use(VueRouter)

// Vue.http.headers.common['Authorization'] = 'Bearer ' + Lockr.get('token')
Vue.http.options.root = process.env.API || 'http://localhost:8081/api/v1'
Vue.http.interceptors.push({
  request: function (request) {
    // console.log('before.. :', request)
    // request.headers['Authorization'] = 'Bearer ' + Lockr.get('token')
    if (request.url.indexOf('auth') < 0) {
      request.url += '?access_token=' + Lockr.get('token')
    }
    return request
  }
})
auth.checkAuth()

export const router = new VueRouter()

router.map({
  '/': {
    component: Home
  },
  '/home': {
    component: Dashboard
  },
  '/login': {
    component: Login
  },
  '/signup': {
    component: SignUp
  },
  '/404': {
    component: Error
  },
  '/room/:room': {
    name: 'room',
    component: Room
  }
})
router.beforeEach(function ({ to, next }) {
  // console.log('to:', to)
  next()
})
// Any invalid route will redirect to home
router.redirect({
  '*': '/404'
})

router.start(App, '#app')
