<template>
  <div id="app">

        <router-view></router-view>

    <nav class="nav-bottom">
      <router-link :to="{path: item.link}" v-for="(item, index) in tabs" >
        <span class="nav-icon" :class="'nav-icon-' + item.icon + item.current" @click="toggle(index)"></span>
      </router-link>
    </nav>

  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
      return {
          tabs: [
            {
              link: '/',
              icon: 'index',
              current: '-current'
            },
            {
              link: '/',
              icon: 'shop',
              current: ''
            },
            {
              link: '/',
              icon: 'world',
              current: ''
            },
            {
              link: '/',
              icon: 'cart',
              current: ''
            },
            {
              link: '/',
              icon: 'myCenter',
              current: ''
            }
          ]
      }
  },
  methods: {
    toggle(index){
        for(let i=0;i<5;i++ ){
          this.tabs[i].current = ''
        }
      this.tabs[index].current = '-current'
    }
  }
}
</script>

<style>
  @media only screen and (max-width: 375px) {
    html {
      font-size: 20px !important;
    }
  }
  @media only screen and (min-width: 376px) {
    html {
      font-size: 22px !important;
    }
  }
  @media only screen and (min-width: 720px) {
    html {
      font-size: 26px !important;
    }
  }
  /* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  *{
    box-sizing: border-box;
  }
  body {
    color: #4C4C4C;
    background-color:#EEEEEE;
    font-family: "Microsoft YaHei",Roboto,Lato,sans-serif,"Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","WenQuanYi Micro Hei",sans-serif;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input{
    outline: none;
  }
  span{
    display: inline-block;
  }
  img{
    width: 100%;
    height: 100%;
  }
  /*工具样式*/
  .lm-text-grey{
    color: #999!important;
  }
  .lm-text-yellow{
    color: #FFA944!important;
  }
  .lm-text-orange{
    color: #FF9B81!important;
  }
  .lm-text-purple{
    color: #bf7afc!important;
  }
  .lm-text-red{
    color: #B22328!important;
  }
  .lm-font-sm{
    font-size: 0.6rem;
  }
  .lm-font-defult{
    font-size: 0.7rem;
  }
  .lm-margin-t{
    margin-top: 0.6rem;
  }
  .lm-margin-t-sm{
    margin-top: 0.4rem;
  }
  .lm-margin-t-xs{
    margin-top: 0.2rem;
  }
  .lm-margin-b{
    margin-bottom: 0.6rem;
  }
  .lm-margin-b-sm{
    margin-bottom: 0.4rem;
  }
  .lm-margin-b-xs{
    margin-bottom: 0.2rem;
  }
  .lm-margin-r-lg{
    margin-right: 1rem;
  }
  .lm-margin-r{
    margin-right: 0.6rem;
  }
  .lm-margin-r-sm{
    margin-right: 0.4rem;
  }
  .lm-margin-r-xs{
    margin-right: 0.2rem;
  }
  .lm-margin-l-lg{
    margin-left: 1rem;
  }
  .lm-margin-l{
    margin-left: 0.6rem;
  }
  .lm-margin-l-sm{
    margin-left: 0.4rem;
  }
  .lm-margin-l-xs{
    margin-left: 0.2rem;
  }
  /*垂直居中*/
  .flex-alig-center{
    display: flex;
    align-items: center;
  }
  .flex-between{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  /*底部导航*/
  .nav-bottom{
    width: 100%;
    height: 2.4rem;
    position:fixed;
    bottom: 0;
    background-color: #fff;
    display: flex;
    border-top: 1px solid #dedede;
  }
  .nav-bottom >a{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 20%;
    height: 100%;
  }
  .nav-bottom .nav-icon{
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  }
  .nav-icon-index{
    background-image: url("assets/images/tabBar/987tea_index.png");
  }
  .nav-icon-shop{
    background-image: url("assets/images/tabBar/987tea_shop.png");
  }
  .nav-icon-world{
    background-image: url("assets/images/tabBar/987tea_world.png");
  }
  .nav-icon-cart{
    background-image: url("assets/images/tabBar/987tea_cart.png");
  }
  .nav-icon-myCenter{
    background-image: url("assets/images/tabBar/987tea_myCenter.png");
  }
  /*底部导航切换*/
  .nav-icon-index-current{
    background-image: url("assets/images/tabBar/987tea_index_current.png");
  }
  .nav-icon-shop-current{
    background-image: url("assets/images/tabBar/987tea_shop_current.png");
  }
  .nav-icon-world-current{
    background-image: url("assets/images/tabBar/987tea_world_current.png");
  }
  .nav-icon-cart-current{
    background-image: url("assets/images/tabBar/987tea_cart_current.png");
  }
  .nav-icon-myCenter-current{
    background-image: url("assets/images/tabBar/987tea_myCenter_current.png");
  }
  /*路由过渡动画*/


  .slide-enter-active,.slide-leave-active {
    transition: all .5s ;
  }
  .slide-enter,.slide-leave-active {
    transform: translateX(-100%);
    /*opacity: 0;*/
  }
  /*.slide-enter{*/
    /*transform: translateX(100%);*/
  /*}*/
</style>
