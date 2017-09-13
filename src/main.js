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

import { Toast } from 'mint-ui'
//添加一个返回拦截器
axios.interceptors.response.use(function (response) {
  //对返回的数据进行一些处理
  return response;
}, function (err) {
  //对返回的错误进行一些处理
  if (err.response.config.url.includes('/api/Product/IsFavourite')) {
    //过滤商品详情页的登录跳转进行处理
    localStorage.removeItem('lut');
  }
  else if (err.response.config.url.includes('/api/ShoppingCar/UserShoppingCar')) {
    //过滤购物车的登录跳转进行处理
    localStorage.removeItem('lut');
  }
  else if (err.response.config.url.includes('/api/CM_Information/GetInfoCount')) {
    //过滤茶友圈的登录跳转进行处理
    localStorage.removeItem('lut');
  } else if (err.response.config.url.includes('/api/Product/GetUserViewProduct')) {
    //过滤获取用户喜欢的茶的登录跳转进行处理
    localStorage.removeItem('lut');
  }

  else if (err.response.status == 401) {
    let instance = Toast('还未登录，请先登录');
    setTimeout(() => {

      instance.close();
      router.replace({
        path: '/login/',
        query: { redirect: router.currentRoute.fullPath }
      })
    }, 1500);

  } else {
    //Toast('网络请求错误');
    return Promise.reject(error);
  }

});


// 内网地址： 'http://192.168.1.110:8088'
//本地地址： 'http://localhost:55338'  //'http://localhost:8088'
//正式地址： 'http://api.987tea.com'
Vue.prototype.url = 'http://192.168.1.110:8088'
// Vue.prototype.url='http://localhost:55338'
// Vue.prototype.url='http://api.987tea.com'


Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})
