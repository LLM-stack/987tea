import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Home from '@/pages/indexPage/home'
import ProductDetails from '@/pages/indexPage/productDetails'
import SearchPage from '@/pages/indexPage/searchPage'

// 购物车
import Cart from '@/pages/cartPage/cart'

//登录注册
import Register from '@/pages/Login&Register/Register'
import Login from '@/pages/Login&Register/Login'
import MsgLogin from '@/pages/Login&Register/MsgLogin'
import ResetPassword from '@/pages/Login&Register/ResetPassword'

// 个人中心
import MyInfo from '@/pages/mine/MyInfo'
import MySet from '@/pages/mine/MySet'

// 茶币商场
import Category from '@/pages/CBmall/category'
import MyCB from '@/pages/CBmall/MyCB'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      component: Home
    },{
      path: '/Category',
      component: Category
    },{
      path: '/SearchPage',
      component: SearchPage
    },{
      path: '/ProductDetails',
      component: ProductDetails
    },{
      path: '/Cart',
      component: Cart
    },{
      path: '/Register',
      component: Register
    },{
      path: '/Login',
      component: Login
    },{
      path: '/MsgLogin',
      component: MsgLogin
    },{
      path: '/ResetPassword',
      component: ResetPassword
    },{
      path: '/MyInfo',
      component: MyInfo
    },{
      path: '/MySet',
      component: MySet
    },{
      path: '/MyCB',
      component: MyCB
    }
  ]
})
