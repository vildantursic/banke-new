module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'banke',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Blog page for banke' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: {
    color: '#ff7100',
    height: '5px'
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  vendor: [
    'axios',
    'lodash',
    'moment',
    'semantic-ui-vue'
  ],
  css: [
    {src: 'assets/main.scss', lang: 'scss'},
    'swiper/dist/css/swiper.css',
    'semantic-ui-css/semantic.min.css'
  ],
  plugins: [
    { src: '~/plugins/swiper.js', ssr: false },
    '~/plugins/vue2-filters'
  ]
}
