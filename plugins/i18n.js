import Vue from 'vue'
import language from '~/assets/language/lang.js'
import VueI18n from 'vue-i18n'
import Cookie from 'js-cookie'
// let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'cn'

Vue.use(VueI18n)
let lang = Cookie.get('lang') ? Cookie.get('lang') : 'cn'
// let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'cn'
// const i18n = new VueI18n({
//   locale: 'cn', // 语言标识
//   messages: language
// })
export default ({app, store}) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: lang, // 语言标识
    messages: language
  })
}
