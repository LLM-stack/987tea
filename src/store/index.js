/**
 * Created by Administrator on 2017/7/12.
 */
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// 定义数据源
const state = {

  //订单的收货地址
  receiveAddress:'',
  //话题类型标签
  themeTags:'',
  //话题标题
  themeTitle:'',
  //话题内容
  themeContent:''

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
