import Vue from 'vue'
import App from './App'
import Home from './components/Home'
import Room from './components/Room'
import Error from './components/Error'
import FakeEntries from './components/FakeEntries'
import LogTime from './components/LogTime'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

// We want to apply VueResource and VueRouter
// to our Vue instance
Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/': {
    component: Home
  },
  '/404': {
    component: Error
  },
  '/time-entries': {
    component: FakeEntries,
    subRoutes: {
      '/log-time': {
        component: LogTime
      }
    }
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
