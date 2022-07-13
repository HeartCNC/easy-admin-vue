const path = require('path')
const dayjs = require('dayjs')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const { mode } = require('minimist')(process.argv.slice(2))
const { name, version, author } = require('./package.json')
const isProduction = process.env.NODE_ENV === 'production'
const buildTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

const defineEnv = {
  BUILD_ENV: mode,
  BUILD_TIME: buildTime,
  BUILD_VERSION: version,
  AUTHOR: author
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: isProduction ? '' : '/',
  lintOnSave: !isProduction,
  productionSourceMap: false,
  devServer: {
    port: 9100,
    overlay: {
      warnings: false,
      errors: true
    },
    before: null
  },
  chainWebpack(config) {
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    config.plugins.delete('prefetch')

    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: './src/styles/variable.scss'
        })
        .end()
    })

    config.plugin('define').tap(args => {
      Object.keys(defineEnv).forEach(item => {
        args[0]['process.env'][item] = JSON.stringify(defineEnv[item])
      })
      return args
    })

    config.plugin('html')
      .tap(args => {
        Object.keys(defineEnv).forEach(item => {
          args[0][item] = defineEnv[item]
        })
        return args
      })

    config.when(isProduction, config => {
      config.plugin('CompressionWebpackPlugin')
        .use(CompressionWebpackPlugin, [{
          algorithm: 'gzip',
          test: new RegExp('\\.(css|js)$'),
          threshold: 10240
        }])
    })

    config.when(mode === 'st', config => {
      config.plugin('FileManagerPlugin').use(FileManagerPlugin, [
        {
          events: {
            onEnd: {
              archive: [{
                source: 'dist', destination: `.tmp/${name}-${buildTime.replace(/[-:\s]/g, '')}.zip`
              }]
            }
          }
        }
      ])
    })

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
