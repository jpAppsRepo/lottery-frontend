// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2'
import Loading from 'vue-loading-overlay'
import { plainAxiosInstance, securedAxiosInstance } from './backend/axios'

import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-loading-overlay/dist/vue-loading.css'
import './main.css'

Vue.config.productionTip = false

Vue.use(VueSweetalert2)
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

Vue.component('loading', Loading)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  securedAxiosInstance,
  plainAxiosInstance,
  components: { App },
  template: '<App/>'
})
