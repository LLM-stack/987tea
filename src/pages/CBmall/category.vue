<template>
  <div class="container" >
    <header>
      <div class="back" @click="goBack"></div>
      <div class="title">分类</div>
      <router-link to="/">
        <div class="icon"></div>
      </router-link>
    </header>
    <div class="category">
      <div class="tabs">
        <div class="tab" :class="{active:classIndex == index}" v-for="(cl,index) in classList" @click="checked(index,cl.ProductClassifyId)">{{
          cl.Name }}
        </div>
      </div>
      <div class="tabs-cont">
        <div class="tea-box" v-for="(teaClass,index) in classList" v-if="classIndex == index">
          <div class="top-img">
            <img src="../../assets/images/category/category_03.png" alt="">
          </div>
          <div class="title">
            <div class="hr"></div>
            <div>{{ teaClass.Name }}</div>
            <div class="hr"></div>
          </div>
          <div class="tea-list">
            <div class="tea-product" v-for="item in productList" @click="chkDetail(item.ProductId)">
              <img v-lazy="item.HeadImg" />
              <div class="lm-font-sm">{{ item.Name }}</div>
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
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mfooter
    },
    data() {
      return {
        classIndex: '',
        classList:[      
          {             
            Name:'茶叶',
            ProductClassifyId:'7c3f558606074157b9ee4f131c073e3a'
          },{            
            Name:'茶具',
            ProductClassifyId:'7c95c107a7424fdcb6c9561e8fb3679c'
          }
        ],
        productList:[]
      }
    },
    methods: {
      checked(i,classId) {
        this.classIndex = i;
        this.productList=[];
        this.getProducts(classId);
      },
      goBack() {
        window.history.go(-1)
      },
      //获取类别
      getClassInfo(){
         this.axios.get(this.url+'/api/ProductClassify/GetProductClassify',{}).then((res)=>{
           if(res.data.Code==200){
             this.getProducts(this.classList[0].ProductClassifyId);
            }else{
              Toast(res.data.Data);
            }
          }).catch((err)=>{
             Toast('网络请求超时');
          })
      },
      getProducts(cId){
        this.axios.post(this.url+'/api/Product/GetCategoryProducts',{categoryId:cId}).then((res)=>{
           if(res.data.Code==200){
             this.productList=res.data.Data;
            }else{
              Toast(res.data.Data);
            }
          }).catch((err)=>{
             Toast('网络请求超时');
          })
      },
      chkDetail(val){
          this.$router.push({path: '/ProductDetails/'+val})
      }
    },
    created:function(){
      this.getClassInfo();

    }
  }
</script>

<style scoped>
  header {
    position: fixed;
    top:0;
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

  .category {
    margin-top: 1.8rem;
    display: flex;
    height: 100%;
    background-color: #fff;
  }

  .category .tabs {
    top:1.8rem;
    left: 0;
    position: fixed;
    padding-top: 0.7rem;
    width: 30%;
    height: 100%;
  }

  .category .tabs-cont {
    margin-left: 30%;
    padding: 1rem 0.22rem;
    width: 70%;
  }

  .tabs {
    font-size: 0.7rem;
    background-color: #fff;
    border-right: 1px solid #ccc;
  }

  .tabs .tab {
    padding: 0.15rem 0;
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
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .tea-box .tea-list .tea-product{
    width: 49%;
    margin-top: 0.3rem;
    height: 7.8rem;
  }
  .tea-box .tea-list .tea-product >div {
    font-size: 0.55rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .tea-box .tea-list .tea-product >img{
    width: 100%;
    height: 6rem;
  }
</style>
