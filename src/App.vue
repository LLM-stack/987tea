<template>
  <div id="app">
        <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
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
    background-color:#eee;
    font-size: 0.65rem;
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
  .container {
    margin-bottom: 2.4rem;
  }
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
    color: #B4282D!important;
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
    margin-right: 0.8rem;
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


  /*路由过渡动画*/


  .fade-enter-active,.fade-leave-active {
    transition: all .5s ;
  }
  .fade-enter,.fade-leave {
    opacity: 0;
  }
  /*商品列表模块*/
  .mode-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .mode-box .mode-left {
    margin-left: 2%;
  }

  .mode-list {
    margin-top: 0.26rem;
    font-size: 0.6rem;
    border-radius: 0.2rem;
    background-color: #F4F4F4;
    width: 49%;
  }

  .mode-list .mode-img {
    width: 100%;
    height: 8rem;
  }

  .mode-list .mode-dp {
    padding: 0.2rem 0.3rem;
    color: #8F7747;
    background-color: #F1ECE2;
  }

  .mode-list .mode-title {
    padding: 0.3rem 0.3rem 0;
  }

  .mode-list .mode-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem;
  }
  .mode-list .mode-price .cb-price{
    font-size: 0.5rem;
  }

  .mode-list .mode-btn {
    padding:0.05rem 0.1rem;
    color: #B4282D;
    font-size: 0.5rem;
    border-radius: 0.15rem;
    transition: all 0.2s;
    border: 1px solid #B4282D;
  }
  .mode-list .mode-btn:active{
    color: #ffffff;
    background-color: #B4282D;
  }
  /*组件样式覆盖*/
  body .mint-field .mint-cell-wrapper,body  .mint-cell-wrapper{
    font-size: 0.6rem;
  }
body .mint-switch-input:checked + .mint-switch-core{
  border-color: #e20f0f;
  background-color: #e20f0f;
}
  body .cont .mint-field .mint-cell-wrapper {
    padding: 0;
    background-image:none;
    border: 1px solid #d9d9d9;
    border-radius: 0.2rem;
    margin-top: 0.8rem;
    padding: 0 0.4rem;
  }
  .sex .mint-cell{
    width: 5.5rem;
    min-height: 1rem;
    background-image: none;
  }
  .sex .mint-cell-wrapper{
    background-image: none;
  }
  .sex .mint-radiolist{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  /*弹窗*/
  .primary-btn{
    color: #fff;
    background-color: #B4282D;
  }
  .primary-btn:active{
    color: #B4282D;
  }
</style>
