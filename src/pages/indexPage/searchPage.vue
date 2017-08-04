<template>
  <div class="container">
    <header>
      <div class="back" @click="goBack"></div>
      <div class="search flex-alig-center">
        <img src="../../assets/images/home/987tea_search.png" alt="搜索">
        <input type="text" placeholder="搜索你喜欢的商品" v-model="searchName"/>
      </div>

      <div class="icon" @click="searchProducts(1)">搜索</div>

    </header>
    <div class="box" v-if="!isSearch && searchValue.length>0">
      <div class="title">
        <img src="../../assets/images/home/search_03.png"/>
        <span class="lm-margin-l-xs">热门搜索</span>
      </div>
      <div class="content lm-margin-t-xs">
        <div class="keyword" v-for="(item,index) in searchValue" :key='index' @click="chkSearchValue(index)">{{item.SearchValue}}</div>
      </div>
    </div>

    <div class="box mode" v-if="isSearch" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div class="mode-box">
      <Mmode v-for="(item,index) in productList"
             :key="item.ProductId"
             :index="index"
             :path="item.ProductId"
             :imgSrc="item.HeadImg"
             :productName="item.Name"
             :productPrice="item.SalePrice"
      ></Mmode>
      </div>
    </div>

    <div class="box" v-if="!isSearch && recommend.length>0">
      <div class="title">
        <img src="../../assets/images/home/search_07.png"/>
        <span class="lm-margin-l-xs">推荐商品</span>
      </div>
      <div class="mode-box lm-margin-t-xs">
        <Mmode v-for="(item,index) in recommend"
             :key="item.ProductId"
             :index="index"
             :path="item.ProductId"
             :imgSrc="item.HeadImg"
             :productName="item.Name"
             :productPrice="item.SalePrice"
      ></Mmode>
      </div>
    </div>

    <Mfooter :indexCurrent='true'></Mfooter>
  </div>
</template>

<script>
  import Mfooter from '../../components/Mfooter'
  import Mmode from '../../components/Mmode'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mfooter,
      Mmode
    },
    data() {
      return {
        searchValue:[],//热搜词汇
        searchName:'',//搜索关键字
        pageIndex:0,
        pageSize:20,
        loading: false,
        productList:[],//搜索结果商品
        isSearch:false,
        recommend:[],//推荐商品
        oldSearch:''
      }
    },
    methods: {
      goBack() {
        window.history.go(-1)
      },
      //获取热搜词汇
      getSearchValue(){
        if(!!sessionStorage.SearchValue){
            this.searchValue = JSON.parse(sessionStorage.SearchValue);
        }else{
            this.axios.get(this.url + '/api/Product/GetSearchValue').then((res) => {
          if (res.data.Code == 200) {
             sessionStorage.setItem("SearchValue", JSON.stringify(res.data.Data));
             this.searchValue = res.data.Data;
          }
        })
        }
         
      },
      loadMore(){
          this.loading=true;
           this.pageIndex++;
           this.searchProducts(this.pageIndex);
      },
      //搜索商品
      searchProducts(val){       
        if(!!!this.searchName){
            this.isSearch=false;
            return;
        }       
             
        this.axios.post(this.url + '/api/Product/SearchProducts',{key:this.searchName,starIndex:val,endIndex:this.pageSize}).then((res) => {
          if (res.data.Code == 200) {
            this.isSearch=true;
            this.oldSearch=this.searchName;
            if (val == 1) {
              this.productList = res.data.Data;
              this.loading = false;
            } else {
              if (res.data.Data.length > 0) {
                for (let i = 0; i < res.data.Data.length; i++) {
                    this.productList.push(res.data.Data[i])
                }
                this.loading = false;
              }else{
                this.loading = true;
              }
            }

          } else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          Toast('网络请求超时');
        })
      },
      //获取推荐商品
      getRecommendProduct(){
          if(!!sessionStorage.Recommend){
            this.recommend=JSON.parse(sessionStorage.Recommend);
          }else{
            this.axios.get(this.url + '/api/Product/HotProducts').then((res) => {
              if (res.data.Code == 200) {
                 sessionStorage.setItem("Recommend", JSON.stringify(res.data.Data));
                this.recommend = res.data.Data;
              }
            })
          }
          
      },
      //热搜词点击
      chkSearchValue(idx){
          this.searchName=this.searchValue[idx].SearchValue;
          this.searchProducts();
      }
    },
     mounted() {
      this.$nextTick(() => {
        this.getSearchValue();
        this.getRecommendProduct();
      })
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
