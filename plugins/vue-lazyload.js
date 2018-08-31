import Vue from 'vue'
import VueLazyload from 'vue-lazyload'
import loading from 'static/loading-2.svg'
import error from 'static/loading.png'
// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: error,
  loading: loading,
  attempt: 1
})
