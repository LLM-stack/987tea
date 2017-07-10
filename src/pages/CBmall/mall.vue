<template>
  <div class="container">
    <Mheader :show=true>
      <div slot="title">商城</div>
    </Mheader>

    <div class="banner">
      <img src="../../assets/images/cbmall/cbshop_02.png"/>
      <div class="tabs">
        <div class="tab" v-for="(item,index) in tabList" :class="{active:item.isactive}" @click="tabActive(index)">{{ item.tabName }}</div>
      </div>
    </div>
    <div class="cont">
      <div class="mode-box">
        <div class="mode-list" v-for="(item,index) in modeList" :class="{'mode-left': index % 2 !== 0}">
          <router-link :to="{path:'/ProductDetails'}">
            <div class="mode-img">
              <img :src="item.imgSrc"/>
            </div>
            <div class="mode-dp">{{ item.dp }}</div>
            <div class="mode-title">{{ item.title }}</div>
            <div class="mode-price ">
              <span class="lm-text-red">￥{{ item.price }}元</span>
              <span class="mode-btn">立即购买</span>
            </div>
          </router-link>
        </div>
      </div>
      <div class="box mode">
        <div class="title flex-alig-center">
          猜你喜欢 <span></span>
        </div>
        <div class="mode-box">
          <div class="mode-list" v-for="(item,index) in modeList" :class="{'mode-left' : index % 2 !== 0}">
            <div class="mode-img">
              <img :src="item.imgSrc"/>
            </div>
            <div class="mode-dp">{{ item.dp }}</div>
            <div class="mode-title">{{ item.title }}</div>
            <div class="mode-price">
              <span class="lm-text-red">￥{{ item.price }}元</span>
              <span class="mode-btn">立即购买</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Mfooter :shopCurrent=true></Mfooter>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'

  export default {
    components: {
      Mheader,
      Mfooter
    },
    data() {
      return {
        tabList: [
          {
            tabName: '试喝好茶',
            isactive: true
          },
          {
            tabName: '限量抢购',
            isactive: false
          },
          {
            tabName: '好茶优惠',
            isactive: false
          },
          {
            tabName: '茶具特卖',
            isactive: false
          }
        ],
        modeList: [
          {
            title: '正品碧螺春',
            dp: '2017新品上市',
            price: '99',
            cbPrice: '999',
            imgSrc: require('../../assets/images/goods/987tea_20.png')
          },
          {
            title: '正品金骏梅',
            dp: '尝鲜价 买一送一',
            price: '99',
            cbPrice: '123',
            imgSrc: require('../../assets/images/goods/987tea_06.png')
          },
          {
            title: '正品正山小种',
            dp: '经典味道 值得一试',
            price: '99',
            cbPrice: '123',
            imgSrc: require('../../assets/images/goods/987tea_25.png')
          },
          {
            title: '正品铁观音',
            dp: '好茶待寻知己',
            price: '99',
            cbPrice: '123',
            imgSrc: require('../../assets/images/goods/987tea_27.png')
          }
        ]
      }
    },
    methods: {
    	tabActive(i) {
    		this.tabList.forEach(function(value,index,array){
          array[index].isactive= false;
        });
    		this.tabList[i].isactive = true;
      }
    }
  }
</script>

<style scoped>
  .container {
    background-color: #ffffff;
  }

  .cont {
    padding: 0 0.4rem 0.4rem;
  }

  .banner {
    background-color: #ffffff;
  }

  .banner .tabs {
    display: flex;
    align-items: center;
    height: 1.6rem;
    margin-bottom: 0.5rem;
    line-height: 1.6rem;
    border-bottom: 1px solid #eeeeee;
  }

  .banner .tabs .tab {
    text-align: center;
    width: 25%;
    height: 100%;
    border-bottom: 3px solid #fff;
  }

  .banner .tabs .active {
    border-bottom: 3px solid #B4282D;
  }

  .box {
    margin-top: 1rem;
    margin-bottom: 0.4rem;
    font-size: 0.7rem;
    background-color: #fff;
  }

  .box .title {
    font-weight: 600;
    font-size: 0.8rem;
    padding: 0.5rem 0 0.7rem;
    justify-content: center;
  }

  .box .title > span {
    margin-left: 0.4rem;
    width: 0.9rem;
    height: 0.9rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/home/987tea_01_03.png");
  }
</style>
