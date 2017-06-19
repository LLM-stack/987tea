import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'
import Category from '@/pages/indexPage/category'

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
    }
  ]
})
