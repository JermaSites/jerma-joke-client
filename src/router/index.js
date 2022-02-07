import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'
import StatsPage from '@/views/StatsPage'
import StreamDetails from '@/views/StreamDetails'
import TestPage from '@/views/TestPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/stats',
      name: 'stats',
      component: StatsPage
    },
    {
      path: '/streams/:streamID',
      name: 'stream',
      component: StreamDetails,
      props: true
    },
    {
      path: '/test',
      name: 'test',
      component: TestPage
    }
  ]
})
