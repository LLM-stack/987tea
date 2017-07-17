/**
 * Created by Administrator on 2017/7/12.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 定义数据源
const state = {
  // 登录状态
  user_id:"",
  // 购物车
  product_num: 0,
  //订单的收货地址
  receiveAddress:''
 
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
