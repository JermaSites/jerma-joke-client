import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'mdi'
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.pink.lighten1,
        green: '#0AFC9E',
        secondary: '#2CB393',
        accent: '#3D96D2',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196f3',
        success: '#4caf50'
      }
    }
  }
})
