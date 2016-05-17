import Vue from 'vue'
import App from './App'
import Home from './components/Home'
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
  '/home': {
    component: Home
  },
  '/time-entries': {
    component: FakeEntries,
    subRoutes: {
      '/log-time': {
        component: LogTime
      }
    }
  }
})

// Any invalid route will redirect to home
router.redirect({
  '*': '/home'
})

router.start(App, '#app')
