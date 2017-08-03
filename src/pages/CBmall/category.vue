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

      <div class="mode-list" :style="{backgroundImage: 'url(' + tag.Img + ')'}" :class="{'mode-left': index % 2 !== 0}" v-for="(tag,index) in tagList" :key="index" @click="chkClass(index)">
        <div class="cate-block">{{tag.Name |tagName}}</div>
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
        tagList:[],
        productList: []
      };
    },
    filters: {
      tagName(val){
        return val.split('】')[1];
      }
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
      //获取分类信息
      getTagInfo(){
        this.axios.get(this.url + '/api/ProductClassify/GetProductTags', {}).then((res) => {
          if (res.data.Code == 200) {
            this.tagList=res.data.Data;
          } 
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
    },
     mounted() {
      this.$nextTick(() => {
        this.getTagInfo();
      })
     }
  }
  </script>

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
