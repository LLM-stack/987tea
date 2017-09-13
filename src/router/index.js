import Vue from 'vue'
import Router from 'vue-router'

// 首页
import Home from '@/pages/indexPage/home'
import ProductDetails from '@/pages/indexPage/productDetails'
import SearchPage from '@/pages/indexPage/searchPage'
import Category from '@/pages/CBmall/category'
import Evaluate from '@/pages/indexPage/evaluate'

// 购物车
import Cart from '@/pages/cartPage/cart'
import Payment from '@/pages/cartPage/payment'
import NoIdPayment from '@/pages/cartPage/noIdPayment'
import PaymentCompleted from '@/pages/cartPage/paymentCompleted'

// 茶圈子
import TcHome from '@/pages/teaCommunity/tcHome'
// import TcContent from '@/pages/teaCommunity/tcContent'
import TeaLife from  '@/pages/teaCommunity/teaLife'
import Post from '@/pages/teaCommunity/post'
import MsgContent from '@/pages/teaCommunity/msgContent'
import Msgs from '@/pages/teaCommunity/msgs'

// 活动页
// import OnSale from '@/pages/activities/onSale'
import CBimg from '@/pages/activities/CBimg'
import Promotion from '@/pages/activities/promotion'
import Active815 from '@/pages/activities/Active815'

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
import HelpCenter from '@/pages/mine/HelpCenter'
import MyAddress from '@/pages/mine/myAddress'
import EditAddress from '@/pages/mine/editAddress'
import CommentsBox from '@/pages/mine/commentsBox'
import Preferences from '@/pages/mine/preferences'
import Logistics from '@/pages/mine/logistics'

// 商城
import CBmall from '@/pages/CBmall/CBmall'
import CBmall1 from '@/pages/CBmall/CBmall1'
import Mall from '@/pages/CBmall/mall'

// 入驻申请
import Apply from '@/pages/settled/apply'


Vue.use(Router)

export default new Router({
   mode: 'history',
   hashbang: false,
  // base: '/vue/',
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
      path: '/Evaluate/:orderId',
      component: Evaluate
    },
    // 购物车
    {
      path: '/Cart',
      component: Cart
    }, {
      path: '/Payment',
      component: Payment
    },{
      path: '/NoIdPayment',
      component: NoIdPayment
    }, {
      path: '/PaymentCompleted',
      component: PaymentCompleted
    },
    // 茶圈子
    {
      path: '/TcHome',
      component: TcHome
    }, {
      path: '/TeaLife/:themeId',
      component: TeaLife
    },
    //  {
    //   path: '/Post',
    //   component: Post
    // },
     {
      path: '/MsgContent/:typeId',
      component: MsgContent
    }, {
      path: '/Msgs',
      component: Msgs
    },
    // 活动页
    // {
    //   path: '/onSale',
    //   component: OnSale
    // }
    ,{
      path: '/Promotion/:id',
      component: Promotion
    },{
      path: '/CBimg',
      component: CBimg
    },
    {
      path: '/Active815',
      component: Active815
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
    },  {
      path: '/HelpCenter',
      component: HelpCenter
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
    }, {
      path: '/Logistics',
      component: Logistics
    },
    // 商城
    {
      path: '/CBmall',
      component: CBmall
    },{
      path: '/CBmall1',
      component: CBmall1
    }, {
      path: '/Mall',
      component: Mall
    },
    // 入驻申请
    {
      path:'/Apply',
      component: Apply
    }
  ]
})
