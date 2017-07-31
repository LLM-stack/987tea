<template>
  <div class="container">
    <header>
      <div class="back" @click="goBack"></div>
      <div class="title">分类</div>
      <router-link to="/">
        <div class="icon"></div>
      </router-link>
    </header>
    <div class="mode-box lm-margin-b-sm">

      <div class="mode-list" :style="cl.bg" :class="{'mode-left': index % 2 !== 0}" v-for="(cl,index) in classList" @click="chkClass(index)">
        <div class="cate-block">{{cl.Name }}</div>
      </div>

    </div>
      <Mfooter :indexCurrent='true'></Mfooter>
    </div>
</template>

<script>
  import Mfooter from '../../components/Mfooter'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mfooter
    },
    data() {
      return {
        classIndex: '',
        classList: [
          {
            Name: '绿茶',
            ProductTagId: 'e72bbaa5b578449a8a42def3ef086599',
            bg: {backgroundImage: 'url('+ require('../../assets/images/category/lvtea.jpg') +')'}
          },
          {
            Name: '红茶',
            ProductTagId: 'ded2fe1e606c40f3a546cc8d3c5fb9af',
            bg: {backgroundImage: 'url('+ require('../../assets/images/category/hongtea.jpg') +')'}
          },
          {
            Name: '乌龙茶',
            ProductTagId: '21e97d03d88f433085126b22cc9f21e5',
            bg: {backgroundImage: 'url('+ require('../../assets/images/category/wulongtea.jpeg') +')'}
          },
          {
            Name: '白茶',
            ProductTagId: '93843e7fcccd4ffa9ede6ad3b20aac2c',
            bg: {backgroundImage: 'url('+ require('../../assets/images/category/baitea.jpg') +')'}
          },          
          {
            Name: '黑茶',
            ProductTagId: '4e82223c669e462d8877324ad6f7fcf4',
            bg: {backgroundImage: 'url('+ require('../../assets/images/category/heitea.jpg') +')'}
          },
          {
            Name: '茶具',
            ProductTagId: '6dd8eae89c9a4fdeac8ebd67aae6ad41',
            bg: {backgroundImage: 'url('+ require('../../assets/images/category/chaju.jpg') +')'}
          }
        ],
        productList: []
      };
    },
    methods: {
      checked(i, classId) {
        this.classIndex = i;
        this.productList = [];
        this.getProducts(classId);
      },
      goBack() {
        window.history.go(-1)
      },
      //获取所有的类别
      getClassInfo(){
        this.axios.get(this.url + '/api/ProductClassify/GetProductClassify', {}).then((res) => {
          if (res.data.Code == 200) {
            this.getProducts(this.classList[0].ProductClassifyId);
          } else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          Toast('网络请求超时');
        })
      },
      //获取类别商品
      getProducts(cId){
        this.axios.post(this.url + '/api/Product/GetCategoryProducts', {categoryId: cId}).then((res) => {
          if (res.data.Code == 200) {
            this.productList = res.data.Data;
          } else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          Toast('网络请求超时');
        })
      },
      chkClass(index){
          this.$router.push({ path: 'mall', query: { index: index }})
      }
    }
  }
  Image</script>

<style scoped>
  header {
    top: 0;
    position: fixed;
    width: 100%;
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

  .margin-left {
    margin-left: 2%;
  }

  .mode-box {
    padding: 0 0.4rem;
  }

  .mode-box .mode-list {
    border-radius: 0;
    text-align: center;
    line-height: 5rem;
    height: 5rem;
    font-size: 0.8rem;
    /*font-weight: 600;*/
    color: #fff;
    background-size: 100% 100%;

  }
  .mode-list .cate-block{
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
</style>
