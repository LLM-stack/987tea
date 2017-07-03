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


  /*路由过渡动画*/


  .fade-enter-active,.fade-leave-active {
    transition: all .5s ;
  }
  .fade-enter,.fade-leave {
    opacity: 0;
  }
  /*.fade-leave-active{*/
    /*transform: translateX(100%);*/

  /*}*/
</style>
