// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'

import axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(Mint)
//Vue.use(axios)
Vue.prototype.axios = axios

Vue.prototype.userId = '0'
//https://bird.ioliu.cn/v1?url=http://114.55.178.84:81
Vue.prototype.url='http://localhost:8088'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})
