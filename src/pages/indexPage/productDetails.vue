<template>
  <div>
    <Mheader :show=true>
      <div slot="title">商品详情</div>

    </Mheader>
    <div class="img-box">
      <img src="../../assets/images/goods/987tea_20.png" alt="">
    </div>
    <div class="title">
      <div>正宗碧螺新春发售</div>
      <div class="lm-text-grey">尝鲜价，买一送一</div>
      <div class="lm-text-red">￥99 <span class="old-price lm-text-grey ">￥199</span></div>
    </div>
    <div class="service">
      <div>
        茶币&nbsp;&nbsp;&nbsp;买就赠送<span class="lm-text-red">50</span>茶币
      </div>
      <div>
        <div class="fw">服务</div>
        <div class="promise lm-margin-r-lg">
          <div><i></i>全场商品30天保价</div>
          <div><i></i>满59免运费</div>
        </div>
        <div class="promise">
          <div><i></i>7天无忧退换货</div>
          <div><i></i>2000个城市货到付款</div>
        </div>
      </div>
    </div>
    <div class="buy-box">
      <div class="icon">
        <div>
          <img src="../../assets/images/productDetails/kf.png" alt="">
          联系客服
        </div>
      </div>
      <div class="icon">
        <div>
          <img src="../../assets/images/productDetails/wsc.png" alt="">
          收藏商品
        </div>
      </div>
      <div class="buy-mode">加入购物车</div>
      <div class="buy-mode" @click="choice">立即购买</div>
    </div>

    <div class="tab">
      <div class="navbar-item" v-for="(item, index) in tab" @click="selected(index)"
           :class="{isSelected:index == tabIndex}">{{ item.tabName }}
      </div>
    </div>

    <!-- tab-container -->
    <div>
      <div v-if="tabIndex == 0">
        图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片图片
      </div>
      <div v-if="tabIndex == 1">
        <div class="parameter">
          <div class="parameter-list">产品名称：碧螺春</div>
          <div class="parameter-list">茶叶配料：2017嫩芽</div>
          <div class="parameter-list">净含量：155g</div>
          <div class="parameter-list">茶叶产地：江苏</div>
        </div>
      </div>
      <div v-if="tabIndex == 2">
        test test
      </div>
    </div>

    <transition name="fade">
      <div class="choice-model" v-if="choiceShow" @click="choice">

      </div>
    </transition>

    <transition name="drop">
      <div class="choice" v-if="choiceShow">
        <div class="choice-img">
          <img src="../../assets/images/goods/987tea_20.png" alt="">
        </div>
        <div class="choice-p">
          
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'

  export default {
    components: {
      Mheader
    },
    data() {
      return {
        tabIndex: 0,
        choiceShow: false,
        tab: [
          {tabName: "商品详情"},
          {tabName: "参数"},
          {tabName: "评论(132)"}
        ],
        timer: 30,       //默认倒数30秒
        stop: false,   //默认是停止的，但界面加载之后会变成false
        Interval: null  //setInterval的对象
      }
    },
    methods: {
      selected(i) {
        this.tabIndex = i
      },
      choice() {
        this.choiceShow = !this.choiceShow
      }
    }
  }
</script>

<style scoped>
  .img-box {
    height: 13.6rem;
  }

  .title {
    padding: 0.2rem 0.4rem;
    font-size: 0.7rem;
    background-color: #fff;
  }

  .title > div {
    margin: 0.2rem 0;
  }

  .title .old-price {
    font-size: 0.55rem;
    margin-left: 0.2rem;
    text-decoration: line-through;
  }

  .service {
    margin: 0.4rem 0;
    padding: 0 0.4rem;
    font-size: 0.65rem;
    background-color: #fff;
  }

  .service > div {
    padding: 0.3rem 0;
  }

  .service > div:first-child {
    border-bottom: 1px solid #eee;
  }

  .service > div:last-child {
    display: flex;
  }

  .service .fw {
    padding-top: 0.1rem;
    margin-right: 0.5rem;
  }

  .service .promise > div {
    display: flex;
    align-items: center;
    margin-top: 0.1rem;
    font-size: 0.55rem;
    color: #999;
  }

  .service .promise i {
    width: 0.55rem;
    height: 0.55rem;
    margin-right: 0.1rem;
    display: inline-block;
    background-size: 100% 100%;
    background-image: url("../../assets/images/productDetails/keyi.png");
  }

  .buy-box {
    font-size: 0.65rem;
    display: flex;
    position: fixed;
    z-index: 999;
    bottom: 0;
    width: 100%;
    height: 2rem;
    text-align: center;
    border-top: 1px solid #ddd;
    background-color: #fff;
  }

  .buy-box .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.45rem;
    width: 20%;
    height: 100%;
    border-right: 1px solid #ddd;
  }

  .buy-box .icon img {
    margin: 0 auto 0.06rem;
    display: block;
    width: 1rem;
    height: 1rem;
  }

  .buy-box .buy-mode {
    line-height: 2rem;
    width: 30%;
    height: 100%;
  }

  .buy-box .buy-mode:last-child {
    color: #fff;
    background-color: #B22328;
  }

  .tab {
    display: flex;
    align-items: center;
    background-color: #fff;;
  }

  .tab > div {
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;
    width: 33.33%;
  }

  .isSelected {
    color: #B22328 !important;
    margin-bottom: 0 !important;
    border-bottom: 3px solid #B22328 !important;
  }

  /*参数页*/

  .parameter {
    font-size: 0.65rem;
    background-color: #fff;
    padding: 0.4rem;
    min-height: 15rem;

  }

  .parameter .parameter-list {
    padding: 0.3rem 0;
    border-bottom: 1px dashed #666;
  }

  /*选择规格*/
  .choice-model {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.75);
  }

  .choice {
    width: 100%;
    height: 16rem;
    bottom: 0;
    position: fixed;
    z-index: 99999;
    background-color: #fff;
  }

  .choice .choice-img{
    width: 5rem;
    height: 5rem;
    border-radius: 0.2rem;
    background-color: #ffffff;
    border: 1px solid #ddd;
    top:-0.8rem;
    left: 0.5rem;
    position: absolute;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .4s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .drop-enter-active, .drop-leave-active {
    transition: all .4s;
  }

  .drop-enter, .drop-leave-active {
    bottom: -100%;
  }
</style>
