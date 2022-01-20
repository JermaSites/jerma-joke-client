import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import(/* webpackChunkName: "stats" */ '@/views/Stats')
    },
    {
      path: '/streams/:streamID',
      name: 'stream',
      component: () => import(/* webpackChunkName: "stream" */ '@/views/StreamDetails'),
      props: true
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "test" */ '@/views/Test')
    }
  ]
})
