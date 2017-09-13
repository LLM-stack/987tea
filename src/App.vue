<template>
  <div id="app">
        <router-view></router-view>

    <div class="gotop" v-show="top>700" @click="gotop">
      <img src="./assets/images/gotop.png"/>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: 'app',
    data() {
      return {
        top: 0
      }
    },
    methods: {
      scrollTop() {
        this.top = document.body.scrollTop;
      },
      gotop() {
        document.body.scrollTop = 0
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        window.addEventListener('scroll', this.scrollTop)
      })
    }
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

  * {
    box-sizing: border-box;
  }

  body {
    color: #4C4C4C;
    background-color: #eee;
    font-size: 0.65rem;
    font-family: "Microsoft YaHei", Roboto, Lato, sans-serif, "Helvetica Neue", Helvetica, Arial, "Hiragino Sans GB", "Hiragino Sans GB W3", "Microsoft YaHei UI", "WenQuanYi Micro Hei", sans-serif;
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

  input {
    outline: none;
  }

  span {
    display: inline-block;
  }

  img {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }

  /*cnzz*/
  #cnzz_stat_icon_1262960756,
  #cnzz_stat_icon_1263920148{
    top: -20px;
    z-index: -999;
    position: fixed;
    width: 0;
    height: 0;
    opacity: 0;
  }

  /*工具样式*/
  .font600{
    font-weight: 600;
  }
  .container {
    height: 100%;
    position: relative;
    margin-top: 1.8rem;
    margin-bottom: 2rem;
  }

  .containerbig {
    height: 100%;
    margin-top: 1.8rem;
    margin-bottom: 2.4rem;
  }
  .lm-text-black {
    color: #000 !important;
  }
  .lm-text-white {
    color: #fff !important;
  }
  .lm-text-grey {
    color: #999 !important;
  }

  .lm-text-yellow {
    color: #FFA944 !important;
  }

  .lm-text-orange {
    color: #FF9B81 !important;
  }

  .lm-text-purple {
    color: #bf7afc !important;
  }

  .lm-text-red {
    color: #B4282D !important;
  }

  .lm-font-xs {
    font-size: 0.5rem;
  }

  .lm-font-sm {
    font-size: 0.6rem;
  }

  .lm-font-defult {
    font-size: 0.7rem;
  }

  .lm-font-lg {
    font-size: 0.8rem;
  }
  .lm-font-xxxl {
    font-size: 1.1rem;
  }
  .lm-font-xxxl {
    font-size: 1.3rem;
  }

  .lm-margin-t {
    margin-top: 0.6rem;
  }

  .lm-margin-t-sm {
    margin-top: 0.4rem;
  }

  .lm-margin-t-xs {
    margin-top: 0.2rem;
  }

  .lm-margin-b-lg {
    margin-bottom: 0.8rem;
  }

  .lm-margin-b {
    margin-bottom: 0.6rem;
  }

  .lm-margin-b-sm {
    margin-bottom: 0.4rem;
  }

  .lm-margin-b-xs {
    margin-bottom: 0.2rem;
  }

  .lm-margin-r-lg {
    margin-right: 0.8rem;
  }

  .lm-margin-r {
    margin-right: 0.6rem;
  }

  .lm-margin-r-sm {
    margin-right: 0.4rem;
  }

  .lm-margin-r-xs {
    margin-right: 0.2rem;
  }

  .lm-margin-l-xxl {
    margin-left: 2.5rem;
  }

  .lm-margin-l-lg {
    margin-left: 1rem;
  }

  .lm-margin-xl {
    margin-left: 0.8rem;
  }

  .lm-margin-l {
    margin-left: 0.6rem;
  }

  .lm-margin-l-sm {
    margin-left: 0.4rem;
  }

  .lm-margin-l-xs {
    margin-left: 0.2rem;
  }
  .lm-padding-t-sm{
    padding-top: 0.4rem;
  }
  /*点击更多*/
  .more-comment {
    color: #aaa;
    padding: 0.6rem 0;
    text-align: center;
  }
  /*禁止点击*/
  .disableTap{
    pointer-events: none;
  }
  /*加载中*/
  .loading{
    height: 2.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /*垂直居中*/
  .flex-alig-center {
    display: flex;
    align-items: center;
  }

  .flex-between {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /*图片懒加载*/
  img[lazy=loading] {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: 60% 40%;
    background-image: url("assets/images/login&register/login_03.png");
    background-color: #fff;
  }

  .gotop {
    bottom: 4rem;
    right: 1rem;
    position: fixed;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
  }

  /*路由过渡动画*/

  .slide-enter-active, .slide-leave-active {
    transition: all .5s;
  }

  .slide-leave {
    transform: translateX(100%);
  }

  .slide-enter {
    transform: translateX(-100%);
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

  .mode-list .mode-img > img {
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
  }

  .mode-list .mode-dp {
    padding: 0.2rem 0.3rem;
    color: #8F7747;
    background-color: #F1ECE2;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .mode-list .mode-title {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0.3rem 0.3rem 0;
  }

  .mode-list .mode-price {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.3rem;
  }

  .mode-list .mode-price .cb-price {
    font-size: 0.5rem;
  }

  .mode-list .mode-btn {
    padding: 0.05rem 0.1rem;
    color: #B4282D;
    font-size: 0.5rem;
    border-radius: 0.15rem;
    transition: all 0.2s;
    border: 1px solid #B4282D;
  }

  .mode-list .mode-btn:active {
    color: #ffffff;
    background-color: #B4282D;
  }

  /*组件样式覆盖*/
  body .mint-indicator-wrapper{
     z-index: 999;
  }
  body .mint-field .mint-cell-wrapper, body .mint-cell-wrapper {
    font-size: 0.6rem;
  }

  body .mint-switch-input:checked + .mint-switch-core {
    border-color: #e20f0f!important;
    background-color: #e20f0f!important;
  }

  body .cont .mint-field .mint-cell-wrapper {
    padding: 0;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 0.2rem;
    margin-top: 0.8rem;
    padding: 0 0.4rem;
  }
  .mint-msgbox-title{
    padding: 0  0.4rem;
    word-break: break-all;
  }
  .mint-checklist-title,
  .mint-radiolist-title {
    margin: 0;
  }

  .mint-radio-input:checked + .mint-radio-core,
  .mint-checkbox-input:checked + .mint-checkbox-core {
    border-color: #B4282D!important;
    background-color: #B4282D!important;
  }

  .mint-radio-input:checked + .mint-radio-core::after {
    border-color: #fff!important;
    background-color: rgba(0, 0, 0, 0)!important;
    transform: rotate(45deg) scale(1)!important;
  }

  .mint-radio-core::after {
    border-radius: 0!important;
    border: 2px solid transparent;
    border-left: 0;
    border-top: 0;
    content: " ";
    top: 3px!important;
    left: 6px!important;
    position: absolute;
    width: 4px!important;
    height: 8px;
    transform: rotate(45deg) scale(0)!important;
    transition: transform .2s;
  }
  .picker-center-highlight{
    height: 78px!important;
    margin-top: -38px!important;
  }
  .picker-item{
    top: -20px!important;
  }
  .picker-center-highlight:before, .picker-center-highlight:after {
    background-color: #bbb!important;
  }
  .picker-item.picker-selected{
    color: #B4282D!important;
    height: 78px!important;
    line-height: 78px!important;
    font-size: 22px!important;
  }

  .sex .mint-cell {
    width: 5.5rem;
    min-height: 1rem;
    background-image: none;
  }

  .sex .mint-cell-wrapper {
    background-image: none;
  }

  .sex .mint-radiolist {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  /*弹窗*/
  .primary-btn {
    color: #fff;
    background-color: #B4282D;
  }

  .primary-btn:active {
    color: #B4282D;
  }

  .back-enter-active,.back-leave-active {
    transition: transform .4s ;
  }

  .back-enter {
    transform: translateX(-100%);
  }

  .back-leave {
    transform: translateX(100%);
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }

</style>
