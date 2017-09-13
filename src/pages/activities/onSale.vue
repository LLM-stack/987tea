<!--<template>-->
  <!--<div class="container">-->
    <!--<Mheader :show=true>-->
      <!--<div slot="title">今日特价</div>-->
    <!--</Mheader>-->
    <!--<div class="banner">-->
      <!--&lt;!&ndash;<mt-swipe :auto="3000">&ndash;&gt;-->
        <!--&lt;!&ndash;<mt-swipe-item>&ndash;&gt;-->
          <!--&lt;!&ndash;<img src="../../assets/images/banner/6-1-8684479.jpg" alt="">&ndash;&gt;-->
        <!--&lt;!&ndash;</mt-swipe-item>&ndash;&gt;-->
        <!--&lt;!&ndash;<mt-swipe-item>&ndash;&gt;-->
          <!--&lt;!&ndash;<img src="../../assets/images/banner/6-1-8684497.jpg" alt="">&ndash;&gt;-->
        <!--&lt;!&ndash;</mt-swipe-item>&ndash;&gt;-->
        <!--&lt;!&ndash;<mt-swipe-item>&ndash;&gt;-->
          <!--&lt;!&ndash;<img src="../../assets/images/banner/6-1-zrjm1580-250.jpg" alt="">&ndash;&gt;-->
        <!--&lt;!&ndash;</mt-swipe-item>&ndash;&gt;-->
      <!--&lt;!&ndash;</mt-swipe>&ndash;&gt;-->
    <!--</div>-->
    <!--<div class="sale-time">-->
      <!--<div class="time ">-->
        <!--<div>10:00</div>-->
        <!--<div>已结束</div>-->
      <!--</div>-->
      <!--<div class="time sale-active">-->
        <!--<div>15:00</div>-->
        <!--<div>正在抢购</div>-->
      <!--</div>-->
      <!--<div class="time">-->
        <!--<div>19:00</div>-->
        <!--<div>即将开始</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="tip">-->
      <!--<div>距开始 <span class="cd-bg">02</span>：<span class="cd-bg">58</span>：<span class="cd-bg">35</span></div>-->
      <!--<div class="rule">-->
        <!--<img src="../../assets/images/home/wenhao.png"/><span class="lm-margin-l-xs">活动规则</span>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="product-list">-->
      <!--<div class="product-box">-->
        <!--<div class="product-img">-->
          <!--<div class="sell-out">已售罄</div>-->
          <!--<img src=""/>-->
        <!--</div>-->
        <!--<div class="product-info">-->
          <!--<div class="product-info-name">洗衣袋护洗袋细网套装文胸袋洗衣服内衣洗护袋大号洗衣机专用网袋</div>-->
          <!--<div class="product-info-intr">洗衣袋护洗袋细网套装</div>-->
          <!--<div class="price-bottom">-->
            <!--<div class="product-price"><span class="new-price"><span>¥3.00</span></span><span-->
              <!--class="old-price">¥3</span>-->
              <!--<div class="buy-per">已抢 72809 件</div>-->
            <!--</div>-->
            <!--<div class="tolook">去看看</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="product-box">-->
        <!--<div class="product-img">-->
          <!--<img src="../../assets/images/goods/987tea_27.png"/>-->
        <!--</div>-->
        <!--<div class="product-info">-->
          <!--<div class="product-info-name">洗衣袋护洗袋细网套装文胸袋洗衣服内衣洗护袋大号洗衣机专用网袋</div>-->
          <!--<div class="product-info-intr">洗衣袋护洗袋细网套装</div>-->
          <!--<div class="price-bottom">-->
            <!--<div class="product-price"><span class="new-price"><span>¥3.00</span></span><span-->
              <!--class="old-price">¥3</span>-->
              <!--<div class="buy-per">已抢 72809 件</div>-->
            <!--</div>-->
            <!--<div class="fast-buy" @click="tips">开抢提醒</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div class="product-box">-->
        <!--<div class="product-img">-->
          <!--<img src="../../assets/images/goods/987tea_27.png"/>-->
        <!--</div>-->
        <!--<div class="product-info">-->
          <!--<div class="product-info-name">洗衣袋护洗袋细网套装文胸袋洗衣服内衣洗护袋大号洗衣机专用网袋</div>-->
          <!--<div class="product-info-intr">洗衣袋护洗袋细网套装</div>-->
          <!--<div class="price-bottom">-->
            <!--<div class="product-price"><span class="new-price"><span>¥3.00</span></span><span-->
              <!--class="old-price">¥3</span>-->
              <!--<div class="buy-per">已抢 72809 件</div>-->
            <!--</div>-->
            <!--<div class="fast-buy">立即抢购</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

    <!--</div>-->




    <!--<Mdialog :dialog="dialog" :prompt="true">-->
      <!--<div slot="title">请输入手机号</div>-->
      <!--<div slot="content">系统会在开抢前给您的手机发送短信提醒。</div>-->
      <!--<div slot="prompt"><input type="text"></div>-->
      <!--<div slot="btn">提醒我</div>-->
      <!--<div slot="cancel" @click="cancel">取消</div>-->
    <!--</Mdialog>-->
  <!--</div>-->


<!--</template>-->


<!--<script>-->
  <!--import Mheader from '../../components/Mheader'-->
  <!--import Mdialog from '../../components/Mdialog'-->

  <!--export default {-->
    <!--components: {-->
      <!--Mheader,-->
      <!--Mdialog-->
    <!--},-->
    <!--data(){-->
      <!--return {-->
      	<!--dialog: false-->
      <!--}-->
    <!--},-->
    <!--methods: {-->
      <!--tips() {-->
<!--this.dialog = true-->
<!--//        MessageBox.prompt({-->
<!--//          title: '输入您的手机号',-->
<!--//          message: '系统将会给您的手机发送短信提醒'-->
<!--//        }).then((value) => {-->
<!--//          alert(value)-->
<!--//        })-->
      <!--},-->
      <!--cancel() {-->
        <!--this.dialog = false-->
      <!--}-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->
  <!--.banner {-->
    <!--width: 100%;-->
    <!--height: 6rem;-->
  <!--}-->

  <!--.sale-time {-->
    <!--width: 100%;-->
    <!--height: 2rem;-->
    <!--display: flex;-->
    <!--align-items: center;-->
    <!--justify-content: space-between;-->
    <!--background-color: #FFC212;-->
  <!--}-->

  <!--.sale-time .time {-->
    <!--padding-top: 0.2rem;-->
    <!--height: 100%;-->
    <!--font-size: 0.55rem;-->
    <!--text-align: center;-->
    <!--width: 100%;-->
  <!--}-->

  <!--.sale-time .sale-active {-->
    <!--color: #ffffff;-->
    <!--background-color: #FF4B00;-->
  <!--}-->

  <!--.tip {-->
    <!--display: flex;-->
    <!--width: 100%;-->
    <!--height: 2rem;-->
    <!--padding: 0 0.4rem;-->
    <!--margin-bottom: 0.4rem;-->
    <!--background-color: #ffffff;-->
    <!--align-items: center;-->
    <!--justify-content: space-between;-->
  <!--}-->

  <!--.tip .rule {-->
    <!--display: flex;-->
    <!--align-items: center;-->
    <!--color: #aaa;-->
    <!--font-size: 0.55rem;-->
  <!--}-->

  <!--.tip .rule > img {-->
    <!--width: 0.65rem;-->
    <!--height: 0.65rem;-->
  <!--}-->

  <!--.tip .cd-bg {-->
    <!--padding: 0.1rem 0.1rem;-->
    <!--border-radius: 0.1rem;-->
    <!--color: #ffffff;-->
    <!--background-color: #FE4A00;-->
  <!--}-->

  <!--/*已售罄*/-->

  <!--.product-box {-->
    <!--display: flex;-->
    <!--justify-content: space-between;-->
    <!--width: 100%;-->
    <!--height: 6rem;-->
    <!--padding: 0.4rem 0;-->
    <!--border-bottom: 1px solid #e5e5e5;-->
    <!--background-color: #fff;-->
  <!--}-->

  <!--.product-box .product-img {-->
    <!--position: relative;-->
    <!--width: 33%;-->
    <!--height: 100%;-->
  <!--}-->

  <!--.product-box .sell-out {-->
    <!--width: 3rem;-->
    <!--height: 3rem;-->
    <!--border-radius: 50%;-->
    <!--color: #ffffff;-->
    <!--position: absolute;-->
    <!--text-align: center;-->
    <!--line-height: 3rem;-->
    <!--left: 50%;-->
    <!--top: 50%;-->
    <!--transform: translate(-50%, -50%);-->
    <!--background-color: rgba(0, 0, 0, 0.6);-->
  <!--}-->

  <!--.product-box .product-info {-->
    <!--padding: 0 0.2rem 0 0.4rem;-->
    <!--position: relative;-->
    <!--width: 67%;-->
  <!--}-->

  <!--.product-info .product-info-name {-->
    <!--color: #000;-->
    <!--font-size: 0.6rem;-->
    <!--text-overflow: ellipsis;-->
    <!--white-space: nowrap;-->
    <!--overflow: hidden;-->
  <!--}-->

  <!--.product-info .product-info-intr {-->
    <!--text-overflow: ellipsis;-->
    <!--white-space: nowrap;-->
    <!--overflow: hidden;-->
    <!--/*margin-top: 0.1rem;*/-->
    <!--font-size: 0.5rem;-->
    <!--color: #FF4B00;-->
  <!--}-->

  <!--.product-info .price-bottom {-->
    <!--display: flex;-->
    <!--align-items: flex-end;-->
    <!--bottom: 0;-->
    <!--position: absolute;-->
  <!--}-->

  <!--.product-price .new-price {-->
    <!--font-size: 0.85rem;-->
    <!--color: #FF4B00;-->
    <!--margin-right: 0.5rem;-->
  <!--}-->

  <!--.product-price .old-price {-->
    <!--font-size: 0.5rem;-->
    <!--text-decoration: line-through;-->
    <!--color: #A0A0A0;-->
  <!--}-->

  <!--.product-price .buy-per {-->
    <!--font-size: 0.5rem;-->
    <!--color: #ffffff;-->
    <!--margin-top: 0.3rem;-->
    <!--margin-right: 0.3rem;-->
    <!--border-radius: 0.8rem;-->
    <!--text-align: center;-->
    <!--width: 6.4rem;-->
    <!--height: 0.6rem;-->
    <!--line-height: 0.6rem;-->
    <!--background-color: #FCD434;-->
  <!--}-->

  <!--.price-bottom .fast-buy {-->
    <!--border-radius: 0.2rem;-->
    <!--color: #fff;-->
    <!--width: 3.4rem;-->
    <!--height: 1.4rem;-->
    <!--text-align: center;-->
    <!--line-height: 1.4rem;-->
    <!--background-color: #FF4B00;-->
  <!--}-->

  <!--.price-bottom .tolook {-->
    <!--border-radius: 0.2rem;-->
    <!--color: #FF4B00;-->
    <!--border: 1px solid #FF4B00;-->
    <!--width: 3.4rem;-->
    <!--height: 1.4rem;-->
    <!--text-align: center;-->
    <!--line-height: 1.4rem;-->
    <!--background-color: #fff;-->
  <!--}-->

  <!--.dialog .prompt input{-->
    <!--font-size: 0.7rem;-->
    <!--width: 11rem;-->
    <!--height: 1.5rem;-->
    <!--border: 1px solid #aaa;-->
    <!--border-radius: 0.2rem;-->
    <!--padding: 0.2rem 0.3rem;-->
  <!--}-->
<!--</style>-->
