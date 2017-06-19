<template>
  <div class="container">
    <header class="flex-alig-center">
      <div class="logo">
        <img src="../assets/images/987tea_logo_03.png" alt="logo">
      </div>
      <div class="search flex-alig-center">
        <img src="../assets/images/987tea_search.png" alt="搜索">
        <input type="text">
      </div>
      <div class="more">
        <img src="../assets/images/987tea_033.png" alt="更多">
      </div>
    </header>
    <div class="banner">
      <mt-swipe :auto="3000">
        <mt-swipe-item>
          <img src="../assets/images/banner/6-1-8684479.jpg" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/images/banner/6-1-8684497.jpg" alt="">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../assets/images/banner/6-1-zrjm1580-250.jpg" alt="">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="promise flex-alig-center">
      <div>
        <span></span>
        商品30天保价
      </div>
      <div>
        <span></span>
        7天退换货
      </div>
      <div>
        <span></span>
        满59元包邮
      </div>
      <div>
        <span></span>
        货到付款
      </div>
    </div>
    <div class="top-tabs">
      <div>
        <img src="../assets/images/987tea_17.png" alt="">
        <span>茶金币</span>
      </div>
      <div>
        <img src="../assets/images/987tea_14.png" alt="">
        <span>茶友圈</span>
      </div>
      <div>
        <img src="../assets/images/987tea_07.png" alt="">
        <span>物流信息</span>
      </div>
      <div>
        <img src="../assets/images/987tea_11.png" alt="">
        <span>联系客服</span>
      </div>
    </div>
    <div class="box hot-buy">
      <div class="title flex-alig-center">
        人气热卖 <span></span>
      </div>
      <div class="box-block box-block-one">
        <div class="box-block-title">折扣好茶推荐</div>
        <div class="box-block-time"><span>01</span>：<span>01</span>：<span>01</span></div>
        <div class="rmtime">距活动结束剩下1天1小时1分</div>
      </div>
      <div class="flex-between">
        <div class="box-block box-block-two">
          <div class="xl-title">2017早春碧螺春</div>
          <div class="buy_one">99元买一送一</div>
          <div class="hot"></div>
        </div>
        <div class="box-block-four">
          <div class="box-block box-block-three">
            <div class="xl-title">2017白瓷系列</div>
            <div class="buy_one">99元买一送一</div>
          </div>
          <div class="box-block box-block-five">
            <div class="xl-title">2017手绘茶具系列</div>
            <div class="buy_one">369元买一送一</div>
          </div>
        </div>
      </div>
    </div>
    <div class="box choice">
      <div class="title flex-alig-center">
        <span></span>为您精选
      </div>
      <div class="small-title">
        您的口味，我们都懂
      </div>
      <div class="box-block flex-between">
        <div class="choice-img">
          <img src="../assets/images/goods/987tea_16.png" alt="">
        </div>
        <div class="choice-text">
          <div class="choice-text-title">这些茶，甜的让人念念不忘。</div>
          <div class="choice-text-p">在众多茶里，以甜占主导地位的，确实不多，幸运的是，小七有幸喝到这几款</div>
          <div class="choice-text-bottom flex-alig-center">
            <div class="flex-alig-center lm-margin-r">
              <span></span>
              77
            </div>
            <div class="flex-alig-center">
              <span></span>
              1457
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="box mode">
      <div class="title flex-alig-center">
        自品好茶 <span></span>
      </div>
      <div class="mode-box">
        <div class="mode-list" v-for="(item,index) in modeList" :class="{'mode-left' : index % 2 !== 0}">
          <div class="mode-img">
            <img :src="item.imgSrc"/>
          </div>
          <div class="mode-dp">{{ item.dp }}</div>
          <div class="mode-title">{{ item.title }}</div>
          <div class="mode-price ">
            <span class="lm-text-red">￥{{ item.price }}元</span>
            <span class="mode-btn">立即购买</span>
          </div>
        </div>
      </div>
    </div>
    <div class="box mode">
      <div class="title flex-alig-center">
        送礼必备 <span></span>
      </div>
      <div class="mode-box">
        <div class="mode-list" v-for="(item,index) in modeList" :class="{'mode-left' : index % 2 !== 0}">
          <div class="mode-img">
            <img :src="item.imgSrc"/>
          </div>
          <div class="mode-dp">{{ item.dp }}</div>
          <div class="mode-title">{{ item.title }}</div>
          <div class="mode-price ">
            <span class="lm-text-red">￥{{ item.price }}元</span>
            <span class="mode-btn">立即购买</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
  export default {
    name: 'index',
    data() {
      return {
        modeList: [
          {
            title: '正品碧螺春',
            dp: '2017新品上市',
            price: '99',
            imgSrc: require('../assets/images/goods/987tea_20.png')
          },
          {
            title: '正品金骏梅',
            dp: '尝鲜价 买一送一',
            price: '99',
            imgSrc: require('../assets/images/goods/987tea_06.png')
          },
          {
            title: '正品正山小种',
            dp: '经典味道 值得一试',
            price: '99',
            imgSrc: require('../assets/images/goods/987tea_25.png')
          },
          {
            title: '正品铁观音',
            dp: '好茶待寻知己',
            price: '99',
            imgSrc: require('../assets/images/goods/987tea_27.png')
          }
        ]
      }
    }
  }
</script>

<style scoped>
  header {
    height: 2.2rem;
    padding: 0 0.5rem;
    justify-content: space-between;
    background-color: #B4282D;
  }
  .container{
    margin-bottom: 2.8rem;
  }
  .logo {
    width: 5.4rem;
    height: 1.3rem;
  }

  .search {
    padding: 0.1rem 0.4rem;
    border-radius: 0.2rem;
    background-color: #fff;
  }

  .search img {
    width: 1rem;
    margin-right: 0.2rem;
  }

  .search input {
    border: none;
  }

  .more {
    width: 1.3rem;
    height: 1.1rem;
  }

  .banner {
    height: 8.6rem;
  }

  .promise {
    font-size: 0.5rem;
    color: #666666;
    height: 1.2rem;
    background-color: #fff;
    padding: 0 0.4rem;
    justify-content: space-between;
  }

  .promise > div {
    display: flex;
    align-items: center;

  }

  .promise > div > span {
    width: 0.7rem;
    height: 0.7rem;
    margin-right: 0.1rem;
    background-size: 100% 100%;
    background-image: url("../assets/images/987tea_077.png");
  }

  .top-tabs {
    height: 4rem;
    margin: 0.8rem 0;
    padding: 0 1.5rem 0.6rem;
    text-align: center;
    font-size: 0.7rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    background-color: #fff;
  }

  .top-tabs > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .top-tabs > div:first-child img {
    width: 1.4rem;
  }

  .top-tabs > div:nth-child(2) img {
    width: 1.6rem;
  }

  .top-tabs > div:nth-child(3) img {
    width: 2.2rem;
  }

  .top-tabs > div:last-child img {
    width: 1.8rem;
  }

  .box {
    padding: 0.5rem;
    margin-bottom: 0.8rem;
    font-size: 0.8rem;
    background-color: #fff;
  }

  /*人气热卖*/
  .box .title {
    font-weight: 600;
    font-size: 0.8rem;
    padding: 0.5rem 0 0.7rem;
    justify-content: center;
  }

  .hot-buy .title > span {
    margin-left: 0.4rem;
    width: 0.9rem;
    height: 0.9rem;
    background-size: 100% 100%;
    background-image: url("../assets/images/987tea_01_03.png");
  }

  .hot-buy .box-block {
    padding: 0.4rem;
    border-radius: 0.3rem;
    background-color: #F4F4F4;
    background-size: 100% 100%;
  }

  .hot-buy .box-block-one {
    padding: 1rem;
    margin-bottom: 0.8rem;
    width: 100%;
    height: 6rem;
    background-image: url("../assets/images/goods/987tea_03.png");
  }

  .box-block .box-block-title,
  .box-block .box-block-time {
    margin-bottom: 0.3rem;
  }

  .box-block .box-block-time > span {
    color: #fff;
    padding: 0.2rem;
    border-radius: 0.1rem;
    background-color: #B22328;
  }

  .box-block .rmtime {
    font-size: 0.5rem;
  }

  .box-block-two {
    height: 10rem;
    background-image: url("../assets/images/goods/987tea_06.png");
  }

  .box-block-three {
    background-image: url("../assets/images/goods/987tea_08.png");
  }

  .box-block-five {
    background-image: url("../assets/images/goods/987tea_12.png");
  }

  .box-block-three,
  .box-block-five {
    height: 4.85rem;
  }

  .box-block-five {
    margin-top: 0.35rem;
  }

  .box-block-four,
  .box-block-two {
    width: 8.7rem;
  }

  .box-block .xl-title {
    font-size: 0.7rem;
    color: #777777;
  }

  .box-block .buy_one {
    font-size: 0.6rem;
    color: #B22328;
  }

  /*人气热卖结束*/
  /*为您精选*/
  .choice .title > span {
    width: 1rem;
    height: 1rem;
    margin-right: 0.4rem;
    background-size: 100% 100%;
    background-image: url("../assets/images/987tea_31.png");
  }

  .choice .small-title {
    color: #9D9D9D;
    margin-bottom: 1rem;
    font-size: 0.55rem;
    text-align: center;
  }

  .choice .box-block {
    padding: 0.6rem 0;
    font-size: 0.65rem;
    border-top: 1px solid #F5F5F5;
  }

  .choice .choice-img,
  .choice .choice-text {
    height: 5.6rem;
    width: 49%;
  }

  .choice .choice-text .choice-text-title {
    color: #000;
    margin-bottom: 0.4rem;
  }

  .choice .choice-text .choice-text-p {
    min-height: 3.6rem;
    color: #8D8D8D;
  }

  .choice .choice-text-bottom > div > span {
    width: 0.7rem;
    height: 0.7rem;
    color: #717171;
    margin-right: 0.2rem;
    background-size: 100% 100%;
  }

  .choice .choice-text-bottom > div:first-child span {
    background-image: url("../assets/images/987tea_38.png");
  }

  .choice .choice-text-bottom > div:last-child span {
    background-image: url("../assets/images/987tea_35.png");
  }

  /*为您精选结束*/
  /*展示模块*/
  .mode .title > span {
    margin-left: 0.4rem;
    width: 0.9rem;
    height: 0.9rem;
    background-size: 100% 100%;
    background-image: url("../assets/images/987tea_01_03.png");
  }

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
    font-size: 0.7rem;
    border-radius: 0.3rem;
    background-color: #F4F4F4;
    width: 49%;
  }
  .mode-list .mode-img{
    width: 100%;
    height: 8.5rem;
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
    padding: 0.3rem ;
  }
  .mode-list .mode-btn{
    padding: 0.1rem;
    color: #B22328;
    font-size: 0.55rem;
    border-radius: 0.2rem;
    border: 1px  solid #B22328;
  }
</style>
