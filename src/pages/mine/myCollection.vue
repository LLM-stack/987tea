<template>
  <div class="container">
    <Mheader :show=true>
      <div slot="title">我的收藏</div>
    </Mheader>
  
    <div class="product" v-for="(item,index) in productlist" :key='index'>
      <div class="product-img">
        <img :src="item.HeadImg" alt="">
      </div>
      <div>
        <div>
          <div class="product-name">
              <router-link :to="{path:'/ProductDetails/'+item.ProductId}">

                <p> {{ item.Name }}</p>

                <!--<span class="lm-text-grey lm-font-xs">{{ item.Name }}</span>-->
              </router-link>
            </div>
          <div class="product-delete" @click="deleteFavourite(item.FavouriteId)"></div>
        </div>
        <div class="product-price">
          <div>￥ <span class="lm-text-red">{{ item.Price }}</span> 元</div>
          <div class="go-buy">
              <router-link :to="{path:'/ProductDetails/'+item.ProductId}">
                去下单
              </router-link>

          </div>
        </div>
      </div>
    </div>

    <Mfooter :myCenterCurrent="true"></Mfooter>

  </div>

</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mheader,
      Mfooter
    },
    data(){
      return{
        productlist:[]
      }
    },
    //获取收藏商品列表
    methods:{
      getFavouriteInfo(){
        this.axios({
        url: this.url + '/api/Product/UserFavourite',
        method: 'get',
        headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }

        }).then((res)=>{
          if(!!res){
            if (res.data.Code == 200) {
              this.productlist = res.data.Data;
            } else {
              Toast(res.data.Data);
            }
          }
        })
      },

      //删除收藏的商品
      deleteFavourite(FavouriteId){
         this.axios({
          url: this.url + '/api/Product/RemoveFavourite',
          method: 'post',
          data:{FavouriteId:FavouriteId},
          headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }

          }).then((res)=>{
            if(!!res){
                if (res.data.Code == 200) {
                //移除删除的商品
                this.productlist = this.productlist.filter(p => p.FavouriteId != FavouriteId);
                Toast(res.data.Data);
                } else {
                  Toast(res.data.Data);
                }
            }
          }) 
      },
    },

      mounted: function () {
      this.$nextTick(function () {
        this.getFavouriteInfo();

      })
    }
  }
</script>

<style scoped>
  .product {
    display: flex;
    align-items: center;
    padding: 0.4rem;
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;
  }

  .product .product-img {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 0.4rem;
  }

  .product > div:last-child {
    position: relative;
    width: 11.3rem;
    height: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
  }

  .product > div:last-child > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .product .product-name{
    max-width: 8.6rem;
    font-size: 0.65rem;
    color: #000;
  }
  .product .product-name p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .product .product-delete{
    width: 0.8rem;
    height: 0.8rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/myInfo/delete.png");
  }
  .product .product-price .go-buy {
    border-radius: 0.2rem;
    padding: 0.2rem 0.8rem;
    color: #B4282D;
    border: 0.1rem solid #B4282D;
  }
</style>
