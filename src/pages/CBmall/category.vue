<template>
  <div>
    <header>
      <div class="back" @click="goBack"></div>
      <div class="title">分类</div>
      <router-link to="/">
        <div class="icon"></div>
      </router-link>
    </header>
    <div class="category">
      <div class="tabs">
        <div class="tab" :class="{active:teasInx == index}" v-for="(tea,index) in teas" @click="checked(index)">{{
          tea.name }}
        </div>
      </div>
      <div class="tabs-cont">
        <div class="tea-box" v-for="(tea,index) in teas" v-if="teasInx == index">
          <div class="top-img">
            <img src="../../assets/images/category/category_03.png" alt="">
          </div>
          <div class="title">
            <div class="hr"></div>
            <div>{{ tea.name }}</div>
            <div class="hr"></div>
          </div>
          <div class="tea-list">
            <div v-for="item in teas[index].list">
              <img :src="item.imgSrc" alt="">
              <div class="lm-font-sm">{{ item.goods }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Mfooter :indexCurrent='true'></Mfooter>
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
        teasInx: '',
        teas: [
          {
            name: '推荐',
            list: [{
              goods: '金骏眉',
              imgSrc: require('../../assets/images/category/category_07.png')
            },{
              goods: '大红袍',
              imgSrc: require('../../assets/images/category/category_07.png')
            },{
              goods: '大红袍',
              imgSrc: require('../../assets/images/category/category_07.png')
            },{
              goods: '金骏眉',
              imgSrc: require('../../assets/images/category/category_07.png')
            },{
              goods: '大红袍',
              imgSrc: require('../../assets/images/category/category_07.png')
            },{
              goods: '大红袍',
              imgSrc: require('../../assets/images/category/category_07.png')
            }]
          }, {
            name: '龙井茶'
          }, {
            name: '红茶'
          }, {
            name: '普洱'
          }
        ]
      }
    },
    methods: {
      checked(i) {
        this.teasInx = i
      },
      goBack() {
        window.history.go(-1)
      }
    },
    created:function(){
      console.log(this.$store.state.user_id);
    }
  }
</script>

<style scoped>
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.4rem;
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

  .icon {
    width: 1rem;
    height: 1rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/category/search.png");
  }

  .category {
    display: flex;
    height: 100%;
    background-color: #fff;
  }

  .category .tabs {
    padding-top: 0.7rem;
    width: 30%;
  }

  .category .tabs-cont {
    padding: 1rem 0.5rem;
    width: 70%;

  }

  .tabs {
    font-size: 0.7rem;
    border-right: 1px solid #ccc;
  }

  .tabs .tab {
    padding: 0.3rem 0;
    margin: 0.3rem 0;
    text-align: center;
  }

  .tabs .active {
    color: #fff;
    background-color: #f9cacc;
  }

  .category .tabs-cont .top-img {
    border-top: 1px solid #ccc;
  }

  .category .tabs-cont .top-img > img {
    vertical-align: bottom;
  }

  .category .tabs-cont .title {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.5rem 0;
    font-size: 0.75rem;
  }

  .category .tabs-cont .title .hr {
    width: 1rem;
    height: 0.05rem;
    background-color: #000;
    margin: 0 0.4rem;
  }

  .tea-box .tea-list{
    display: flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .tea-box .tea-list > div{
    padding: 0 0.3rem;
    width: 3.4rem;
    margin-top: 0.3rem;
    text-align: center;
  }
</style>
