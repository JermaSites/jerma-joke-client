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
      path: '/streams',
      name: 'streams',
      component: () => import(/* webpackChunkName: "streams" */ '@/views/Streams')
    },
    {
      path: '/streams/:streamID',
      name: 'stream',
      component: () => import(/* webpackChunkName: "stream" */ '@/views/StreamDetails'),
      props (route) {
        const props = { ...route.params }
        props.streamID = +props.streamID
        return props
      }
    }
  ]
})
