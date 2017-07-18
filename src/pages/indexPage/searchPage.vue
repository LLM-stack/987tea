<template>
  <div class="container">
    <header>
      <div class="back" @click="goBack"></div>
      <div class="search flex-alig-center">
        <img src="../../assets/images/home/987tea_search.png" alt="搜索">
        <input type="text" placeholder="搜索你喜欢的商品"/>
      </div>
      <router-link to="/">
        <div class="icon">搜索</div>
      </router-link>
    </header>
    <div class="box">
      <div class="title">
        <img src="../../assets/images/home/search_03.png"/>
        <span class="lm-margin-l-xs">热门搜索</span>
      </div>
      <div class="content lm-margin-t-xs">
        <div class="keyword">西施壶</div>
        <div class="keyword">送礼茶</div>
        <div class="keyword">送礼茶</div>
        <div class="keyword">送礼茶</div>
        <div class="keyword">办公室口粮茶</div>
        <div class="keyword">送礼茶</div>
        <div class="keyword">送礼茶</div>
        <div class="keyword">送礼茶</div>
        <div class="keyword">办公室口粮茶</div>
        <div class="keyword">武夷山大红袍</div>
      </div>
    </div>

    <div class="box">
      <div class="title">
        <img src="../../assets/images/home/search_07.png"/>
        <span class="lm-margin-l-xs">推荐商品</span>
      </div>
      <div class="mode-box lm-margin-t-xs">
        <div class="mode-list" v-for="(item,index) in modeList" :class="{'mode-left': index % 2 !== 0}">
          <router-link :to="{path:'/ProductDetails'}">
            <div class="mode-img">
              <img :src="item.imgSrc"/>
            </div>
            <div class="mode-dp">{{ item.dp }}</div>
            <div class="mode-title">{{ item.title }}</div>
            <div class="mode-price ">
              <span class="lm-text-red">￥{{ item.price }}元<span class="cb-price">{{'+' + item.cbPrice +'茶币' }}</span></span>
              <span class="mode-btn">立即购买</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>



    <Mfooter :indexCurrent=true></Mfooter>
  </div>
</template>

<script>
  import Mfooter from '../../components/Mfooter'

  export default {
    components: {
      Mfooter
    },
    data() {
      return {
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
      goBack() {
        window.history.go(-1)
      }
    }
  }
</script>

<style scoped>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.8rem 0 0.4rem;
    font-size: 0.75rem;
    height: 1.8rem;
    color: #fff;
    background-color: #B4282D;
  }

  .back {
    width: 1rem;
    height: 1rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/category/back.png");
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
    width: 9rem;
    font-size: 0.65rem;
    border: none;
  }

  .icon {
    font-size: 0.65rem;
  }

  .box {
    padding: 0.7rem 0.4rem;
  }

  .title {
    display: flex;
    align-items: center;
  }

  .title > img {
    width: 0.8rem;
    height: 0.8rem;
  }

  .box .content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .box .content .keyword {
    color: #999;
    padding: 0 0.2rem;
    margin: 0.4rem 0.4rem 0 0;
    border: 1px solid #888;
  }

  .mode-list{
    background-color: #ffffff;
  }
</style>
