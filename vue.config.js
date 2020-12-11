// vue.config.js

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "~@/sass/main.scss"'
      }
    }
  }
}
