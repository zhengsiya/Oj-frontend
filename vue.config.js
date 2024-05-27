const { resolve } = require('path')
const { defineConfig } = require('@vue/cli-service')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin('define').tap((definitions) => {
      Object.assign(definitions[0], {
        __VUE_OPTIONS_API__: 'true',
        __VUE_PROD_DEVTOOLS__: 'false',
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
      })

      return definitions
    })
    config.plugin('monaco').use(new MonacoWebpackPlugin())
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
