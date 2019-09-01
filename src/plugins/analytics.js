import Vue from 'vue'
import VueAnalytics from 'vue-analytics'

import router from '../router'

Vue.use(VueAnalytics, {
  id: 'UA-145734021-1',
  router,
  debug: {
    enabled: process.env.VUE_APP_GOOGLE_ANALYTICS_DEBUG || false
  }
})
