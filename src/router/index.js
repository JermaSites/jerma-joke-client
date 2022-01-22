import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/views/HomePage'

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
      component: () => import(/* webpackChunkName: "StatsPage" */ '@/views/StatsPage')
    },
    {
      path: '/streams/:streamID',
      name: 'stream',
      component: () => import(/* webpackChunkName: "StreamDetails" */ '@/views/StreamDetails'),
      props: true
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "TestPage" */ '@/views/TestPage')
    }
  ]
})
