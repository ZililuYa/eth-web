const pkg = require('./package')
const webpack = require('webpack')

const dev = process.env.NODE_ENV
let plugins = []
if (dev !== 'development') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true
    }
  }))
}

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'ETHICO - 区块链ICO平台',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'keywords', name: 'keywords', content: 'ethico,ico,ico众筹,ico发布,区块链ico,什么是ICO,ICO投资,虚拟币众筹,最新ICO项目,leekico,ico-china,icochina'},
      {hid: 'description', name: 'description', content: 'ethico.pro 发布项目 浏览项目 登录 注册 投资优质项目,交易数位资产 ethico.pro是全球数字货币一站式ICO项目平台,可以轻松得发布项目，找寻项目，投资项目，交易数字资产'}
    ],
    script: [
      {src: 'https://hm.baidu.com/hm.js?7922a2f58dbdd51984f5f8728d974280'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: 'rgba(20,115,251,0.6)', zIndex: 99999, height: '3px'},

  /*
  ** Global CSS
  */
  css: [
    '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
    '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css',
    'flatpickr/dist/flatpickr.css',
    'bootstrap/dist/css/bootstrap.css',
    'bootstrap/dist/css/bootstrap-grid.css',
    'bootstrap/dist/css/bootstrap-reboot.css',
    'bootstrap-vue/dist/bootstrap-vue.css',
    'swiper/dist/css/swiper.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/axios'},
    {src: '~/plugins/i18n', ssr: false},
    {src: '~/plugins/qrcode', ssr: false},
    {src: '~/plugins/alert', ssr: false},
    {src: '~/plugins/vue-flatpickr-component', ssr: false},
    {src: '~/plugins/bootstrap-vue', ssr: false},
    {src: '~/plugins/vue-awesome-swiper', ssr: false},
    {src: '~/plugins/vue-lazyload', ssr: false},
    {src: '~/plugins/nuxt-quill-plugin', ssr: false},
    {src: '~/plugins/statistics.js', ssr: false},
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  proxy: [
    // ['/api', {target: 'https://api.awesomes.cn', pathRewrite: {'^/api': '/'}}],
    // ['/api', {target: 'http://192.168.31.233:8080', pathRewrite: {'^/api': '/'}}],
    ['/api', {target: 'http://47.75.26.14:8080', pathRewrite: {'^/api': '/'}}],
    // ['/api', {target: 'http://192.168.31.237:8080', pathRewrite: {'^/api': '/'}}]
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    plugins,
    vendor: [
      'js-cookie',
      'axios',
      '~/plugins/axios',
      '~/plugins/bootstrap-vue',
      '~/plugins/vue-awesome-swiper',
      '~/plugins/i18n',
      '~/plugins/alert'
    ],
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    linkActiveClass: 'active'
  }
}
