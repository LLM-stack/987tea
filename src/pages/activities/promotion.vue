<template>
  <div>
    <Mheader :show='true'>
      <div slot="title">987大促</div>
    </Mheader>
    <div class="banner">
      <mt-swipe :auto="3000">
        <mt-swipe-item>
          <img src="../../assets/images/banner/banner1.jpg" alt=""
               @click.stop="chkDetail('dae874c59c56448f99c8045753b5cf0f')">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/images/banner/banner2.jpg" alt=""
               @click.stop="chkDetail('98a0b370bd49446eae702610a19d004f')">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/images/banner/banner3.jpg" alt=""
               @click.stop="chkDetail('4795f6b55ba747919a406b71593080d0')">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/images/banner/banner4.jpg" alt=""
               @click.stop="chkDetail('cb77b03361744feb89c21b5abf03a576')">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="title">
      <div>
        <img src="../../assets/images/activities/activities_03.png"/>
        <span>省钱第一步，下单直接满减</span>
        <img src="../../assets/images/activities/activities_05.png"/>
      </div>
    </div>
    <div class="ticket-box">
      <div class="ticket">
        <span class="orange flex-alig-center">满<span class="lm-font-xxxl">100</span></span>
        <span class="lm-margin-l-sm flex-alig-center">减<span class="yellow lm-font-xxxl">10</span></span>
      </div>
      <div class="ticket">
        <span class="orange flex-alig-center">满<span class="lm-font-xxxl">200</span></span>
        <span class="lm-margin-l-sm flex-alig-center">减<span class="yellow lm-font-xxxl">20</span></span>
      </div>
    </div>
    <div class="title-z">
      <span>距离抢购结束还剩</span>
      <div class="lm-margin-t-xs">
        <span class="bg-time">15</span>：<span class="bg-time">20</span>：<span class="bg-time">56</span>
      </div>
    </div>
    <div class="tab-box">
      <div class="tab" :class="{active:activeIdx == index}" v-for="(item,index) in tabs" @click="select(index)">
        {{ item.tabName }}
      </div>
    </div>
    <div class="title lm-margin-t-sm">
      <div>
        <img src="../../assets/images/activities/activities_03.png"/>
        <span class="lm-font-lg">限时特价</span>
        <img src="../../assets/images/activities/activities_05.png"/>
      </div>
      <div class="lm-font-sm lm-text-grey">超值低价 多款茶类任你选</div>
    </div>
    <div class="scroll-bar">
      <div class="scroll-cont">
        <div class="cont-img">
          <img src="../../assets/images/goods/987tea_27.png"/>
          <div class="cont-name">正品铁观音</div>
        </div>
        <div class="cont-price">
          <div class="new-price">￥88</div>
          <div class="old-price">￥128</div>
        </div>
        <div class="cont-btn">立即抢购</div>
      </div>
      <div class="scroll-cont">
        <div class="cont-img">
          <img src="../../assets/images/goods/987tea_27.png"/>
          <div class="cont-name">正品铁观音</div>
        </div>
        <div class="cont-price">
          <div class="new-price">￥88</div>
          <div class="old-price">￥128</div>
        </div>
        <div class="cont-btn">立即抢购</div>
      </div>
      <div class="scroll-cont">
        <div class="cont-img">
          <img src="../../assets/images/goods/987tea_27.png"/>
          <div class="cont-name">正品铁观音</div>
        </div>
        <div class="cont-price">
          <div class="new-price">￥88</div>
          <div class="old-price">￥128</div>
        </div>
        <div class="cont-btn">立即抢购</div>
      </div>
      <div class="scroll-cont">
        <div class="cont-img">
          <img src="../../assets/images/goods/987tea_27.png"/>
          <div class="cont-name">正品铁观音</div>
        </div>
        <div class="cont-price">
          <div class="new-price">￥88</div>
          <div class="old-price">￥128</div>
        </div>
        <div class="cont-btn">立即抢购</div>
      </div>
      <div class="scroll-cont">
        <div class="cont-img">
          <img src="../../assets/images/goods/987tea_27.png"/>
          <div class="cont-name">正品铁观音</div>
        </div>
        <div class="cont-price">
          <div class="new-price">￥88</div>
          <div class="old-price">￥128</div>
        </div>
        <div class="cont-btn">立即抢购</div>
      </div>
      <div class="scroll-cont">
        <div class="cont-img">
          <img src="../../assets/images/goods/987tea_27.png"/>
          <div class="cont-name">正品铁观音</div>
        </div>
        <div class="cont-price">
          <div class="new-price">￥88</div>
          <div class="old-price">￥128</div>
        </div>
        <div class="cont-btn">立即抢购</div>
      </div>
      <div class="scroll-cont">
        <div class="cont-img">
          <img src="../../assets/images/goods/987tea_27.png"/>
          <div class="cont-name">正品铁观音</div>
        </div>
        <div class="cont-price">
          <div class="new-price">￥88</div>
          <div class="old-price">￥128</div>
        </div>
        <div class="cont-btn">立即抢购</div>
      </div>
      <div class="scroll-cont">
        <div class="cont-img">
          <img src="../../assets/images/goods/987tea_27.png"/>
          <div class="cont-name">正品铁观音</div>
        </div>
        <div class="cont-price">
          <div class="new-price">￥88</div>
          <div class="old-price">￥128</div>
        </div>
        <div class="cont-btn">立即抢购</div>
      </div>
      <div class="scroll-cont">
        <div class="cont-img">
          <img src="../../assets/images/goods/987tea_27.png"/>
          <div class="cont-name">正品铁观音</div>
        </div>
        <div class="cont-price">
          <div class="new-price">￥88</div>
          <div class="old-price">￥128</div>
        </div>
        <div class="cont-btn">立即抢购</div>
      </div>
      <div class="scroll-cont">
        <div class="cont-img">
          <img src="../../assets/images/goods/987tea_27.png"/>
          <div class="cont-name">正品铁观音</div>
        </div>
        <div class="cont-price">
          <div class="new-price">￥88</div>
          <div class="old-price">￥128</div>
        </div>
        <div class="cont-btn">立即抢购</div>
      </div>
      <div class="scroll-cont">
        <div class="cont-img">
          <img src="../../assets/images/goods/987tea_27.png"/>
          <div class="cont-name">正品铁观音</div>
        </div>
        <div class="cont-price">
          <div class="new-price">￥88</div>
          <div class="old-price">￥128</div>
        </div>
        <div class="cont-btn">立即抢购</div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="title lm-margin-t-sm">
      <div>
        <img src="../../assets/images/activities/activities_03.png"/>
        <span class="lm-font-lg">爆款特价</span>
        <img src="../../assets/images/activities/activities_05.png"/>
      </div>
      <div class="lm-font-sm lm-text-grey">热卖爆款 感恩放价</div>
    </div>
    <div class="pro-box">

    </div>



  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import { Toast } from 'mint-ui'

  export default {
    components: {
      Mheader
    },
    data() {
      return {
        activeIdx: 0,
        tabs: [
          {
            tabName: '限时特价'
          },
          {
            tabName: '爆款特价'
          },
          {
            tabName: '精装礼品'
          },
          {
            tabName: '更多福利'
          }
        ]
      }
    },
    methods: {
      select(idx) {
        this.activeIdx = idx
      }
    }
  }
</script>

<style scoped>
  .clear {
    clear: both;
    height: 0;
    line-height: 0;
    font-size: 0
  }

  .orange {
    color: #FF5000;
  }

  .yellow {
    color: #FFF100;
  }

  .banner {
    height: 7.7rem;
  }

  .title {
    margin: 0.6rem 0;
  }

  .title > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title > div > img {
    width: 0.7rem;
  }

  .title > div > span {
    font-weight: 600;
    margin: 0 0.3rem;
  }

  .ticket-box {
    line-height: 2.5rem;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .ticket-box .ticket {
    font-size: 0.75rem;
    font-weight: 600;
    color: #fff;
    width: 7.2rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-size: 100% 100%;
    background-image: url("../../assets/images/activities/activities_10.png");
  }

  .title-z {
    margin: 0.6rem 0;
    text-align: center;
  }

  .title-z > span {
    position: relative;
  }

  .title-z > span:after, .title-z > span:before {
    background: #000000;
    content: "";
    height: 1px;
    position: absolute;
    top: 50%;
    width: 2rem;
  }

  .title-z > span:before {
    left: -2.6rem;
  }

  .title-z > span:after {
    right: -2.6rem;
  }

  .title-z .bg-time {
    padding: 0.1rem;
    border-radius: 0.1rem;
    color: #fff;
    background-color: #FD8661;
  }

  .tab-box {
    width: 100%;
    line-height: 1.8rem;
    height: 1.8rem;
    display: flex;
    align-items: center;
    color: #fff;
    background-color: #333333;
  }

  .tab-box .tab {
    position: relative;
    text-align: center;
    width: 25%;
  }

  .tab-box .tab.active {
    height: 100%;
    background-color: #FF5000;
  }

  .tab-box .tab.active:after {
    background-size: 100% 100%;
    background-image: url("../../assets/images/activities/activities_14.png");
    content: "";
    height: 0.3rem;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0.6rem;
  }

  .scroll-bar {
    width: 100%;
    display: inline;
    white-space: nowrap;
    overflow-x: scroll;
    float: left;
    overflow-y: hidden
  }

  .scroll-bar .scroll-cont {
    margin-left: 0.1rem;
    width: 5.2rem;
    border-radius: 0.2rem;
    background-color: #fff;
    display: inline-block;
  }

  .scroll-cont .cont-img {
    position: relative;
    width: 100%;
    height: 5rem;
  }

  .scroll-cont .cont-img > img {
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
  }

  .cont-img .cont-name {
    width: 100%;
    font-size: 0.55rem;
    text-align: center;
    position: absolute;
    bottom: 0;
    color: #fff;
    padding: 0.1rem 0;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .scroll-cont .cont-price {
    padding: 0.2rem 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .cont-price .new-price {
    font-size: 0.75rem;
    color: #FF0000;
  }

  .cont-price .old-price {
    font-size: 0.55rem;
    color: #999;
    text-decoration: line-through;
  }

  .scroll-cont .cont-btn {
    margin: 0 auto 0.4rem;
    padding: 0.1rem 0;
    text-align: center;
    border-radius: 0.1rem;
    color: #fff;
    width: 4rem;
    background-color: #FF0000;
  }

</style>
