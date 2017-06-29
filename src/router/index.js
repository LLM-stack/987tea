import Vue from 'vue'
import Router from 'vue-router'
// 首页
import Home from '@/pages/indexPage/home'
import Category from '@/pages/indexPage/category'
// 购物车
import Cart from '@/pages/cartPage/cart'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },{
      path: '/Category',
      name: 'Category',
      component: Category
    },{
      path: '/Cart',
      name: 'Cart',
      component: Cart
    }
  ]
})
