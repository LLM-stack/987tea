import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Home from '@/pages/indexPage/home'
import ProductDetails from '@/pages/indexPage/productDetails'
import SearchPage from '@/pages/indexPage/searchPage'
import Category from '@/pages/CBmall/category'
import OnSale from '@/pages/indexPage/onSale'
import Evaluate from '@/pages/indexPage/evaluate'

// 购物车
import Cart from '@/pages/cartPage/cart'
import Payment from '@/pages/cartPage/payment'
import PaymentCompleted from '@/pages/cartPage/paymentCompleted'

//登录注册
import Register from '@/pages/Login&Register/register'
import Login from '@/pages/Login&Register/login'
import MsgLogin from '@/pages/Login&Register/msgLogin'
import ResetPassword from '@/pages/Login&Register/resetPassword'

// 个人中心
import MyInfo from '@/pages/mine/myInfo'
import MySet from '@/pages/mine/mySet'
import MyCB from '@/pages/mine/myCB'
import MyOrder from '@/pages/mine/myOrder'
import MyCollection from '@/pages/mine/myCollection'
import Coupon from '@/pages/mine/coupon'
import MyAddress from '@/pages/mine/myAddress'
import EditAddress from '@/pages/mine/editAddress'
import CommentsBox from '@/pages/mine/commentsBox'
import Preferences from '@/pages/mine/preferences'


// 商城
import CBmall from '@/pages/CBmall/CBmall'
import Mall from '@/pages/CBmall/mall'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/',
  routes: [
    // 首页
    {
      path: '/',
      component: Home
    }, {
      path: '/Category',
      component: Category
    }, {
      path: '/SearchPage',
      component: SearchPage
    }, {
      path: '/ProductDetails/:productID',
      component: ProductDetails
    }, {
      path: '/onSale',
      component: OnSale
    },{
      path: '/Evaluate',
      component: Evaluate
    },
    // 购物车
    {
      path: '/Cart',
      component: Cart
    }, {
      path: '/Payment',
      component: Payment
    }, {
      path: '/PaymentCompleted',
      component: PaymentCompleted
    },
    //登录注册
    {
      path: '/Login',
      component: Login
    }, {
      path: '/MsgLogin',
      component: MsgLogin
    }, {
      path: '/Register',
      component: Register
    }, {
      path: '/ResetPassword',
      component: ResetPassword
    },
    // 个人中心
    {
      path: '/MyInfo',
      component: MyInfo
    }, {
      path: '/MySet',
      component: MySet
    }, {
      path: '/MyCB',
      component: MyCB
    }, {
      path: '/MyOrder/:title/:tabNum',
      component: MyOrder
    }, {
      path: '/MyCollection',
      component: MyCollection
    }, {
      path: '/MyAddress',
      component: MyAddress
    }, {
      path: '/EditAddress/:aId',
      component: EditAddress
    }, {
      path: '/CommentsBox',
      component: CommentsBox
    }, {
      path: '/Coupon',
      component: Coupon
    }, {
      path: '/Preferences/:title/:id',
      component: Preferences
    },
    // 商城
    {
      path: '/CBmall',
      component: CBmall
    }, {
      path: '/Mall',
      component: Mall
    }
  ]
})
