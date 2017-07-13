/**
 * Created by Administrator on 2017/7/12.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 定义数据源
const state = {
  // 登录状态
  user_id:"123456",
  // 购物车
  product_num: 0,
  url:'http://114.55.178.84:81'?'':'https://bird.ioliu.cn/v1?url=http://114.55.178.84:81'
}

// 定义方法
const mutations = {
  changeUserName(state,ll) {
    state.user_name = ll
  },
  showUserName(state){
    alert(state.cc);
  }
}


export default new Vuex.Store({
  state,
  mutations
})
