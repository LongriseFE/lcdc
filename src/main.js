// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import 'vue-croppa/dist/vue-croppa.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueLocalStorage from 'vue-localstorage'
import VueHead from 'vue-head'
import Croppa from 'vue-croppa'
import VueHighlightJS from 'vue-highlightjs'
// import 'vue-highlightjs/node_modules/highlight.js/styles/github.css'
import VueLazyload from 'vue-lazyload'
import moment from 'moment'
moment.locale('zh-cn')
Vue.prototype.moment = moment
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'dist/error.png',
  loading: 'static/loading.gif',
  attempt: 1
})
Vue.use(VueHighlightJS)
Vue.use(ElementUI)
Vue.use(Croppa)
Vue.use(VueHead, {
  separator: '',
  complement: ''
})
Vue.use(VueLocalStorage)
Vue.use(iView)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
