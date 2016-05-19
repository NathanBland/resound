import Vue from 'vue'
import App from './App'
import Home from './components/Home'
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

Vue.http.headers.common['Authorization'] = 'Bearer ' + Lockr.get('token')

auth.checkAuth()

export const router = new VueRouter()

router.map({
  '/': {
    component: Home
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

// Any invalid route will redirect to home
router.redirect({
  '*': '/404'
})

router.start(App, '#app')
