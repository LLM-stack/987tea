<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">茶币商城</div>
    </Mheader>
    <div class="cb-current">
      <div class="cb-cu-top">当前茶币</div>
      <div class="cb-cu-mid"><img class="lm-margin-r-sm" src="../../assets/images/cbmall/cb_03.png"/><span>{{user.TeaCurrency}}</span>
      </div>
      <div class="cb-cu-btm"><router-link :to="{path:'/MyCB'}">茶币收支账单</router-link></div>
    </div>
    <div class="cb-category">
      <div class="title0"><img class="lm-margin-r-xs" src="../../assets/images/cbmall/cb_07.png"/>花茶币 换好礼</div>
      <div class="cate">
        <div class="cate-block">
          <div class="cate-block-text">
            <div>试喝好茶</div>
            <div>个性好茶</div>
            <div>新品尝鲜</div>
          </div>
        </div>
        <div class="cate-block">
          <div class="cate-block-text">
            <div>限量抢购</div>
            <div>清仓特卖</div>
            <div>毫无底线</div>
          </div>
        </div>
        <div class="cate-block lm-margin-t-xs">
          <div class="cate-block-text">
            <div>茶具超值购</div>
            <div>茶币抵现金</div>
            <div>购物更实惠</div>
          </div>
        </div>
        <div class="cate-block lm-margin-t-xs">
          <div class="cate-block-text">
            <div>好茶折扣区</div>
            <div>好茶精选</div>
            <div>疯狂折扣</div>
          </div>
        </div>
      </div>
      <div class="title1">
        <img  src="../../assets/images/cbmall/cbmall__03.png" />
        <div class="title0"><img class="lm-margin-r-xs" src="../../assets/images/cbmall/cb_07.png"/>超值购 花茶币换大折扣</div>
      </div>
      <div class="mode-box" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
        <div class="mode-list" v-for="(item,index) in productList" :class="{'mode-left': index % 2 !== 0}" :key="index">
          <!--<router-link :to="{path:'/ProductDetails'}">-->
            <div class="mode-img">
              <img :src="item.Img"/>
            </div>
            <div class="mode-dp">{{ item.Detail }}</div>
            <div class="mode-title">{{ item.Title }}</div>
            <div class="mode-price ">
              <span class="lm-text-red">￥{{ item.Price }}元<span class="cb-price">{{'+' + item.TeaPrice +'茶币' }}</span></span>
              <span class="mode-btn" @click='goToPay(item)'>立即购买</span>
            </div>
          <!--</router-link>-->
        </div>       
      </div>
    </div>
    <Mfooter :myCenterCurrent='true'></Mfooter>

  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'
  import Mmode from '../../components/Mmode'

  export default {
    components: {
      Mheader,
      Mfooter,
      Mmode
    },
    data() {
      return {       
        pageIndex: 0,
        loading: false,
        productList:[],
        user:[]
      }
    },
    methods:{
      //加载更多
      loadMore() {
        this.loading = true;
        this.pageIndex++;
        this.getTCProducts();
      },
      //获取茶币商品
      getTCProducts(){
            this.axios({
              url: this.url + '/api/TeaCurrencyMall/PostProducts',
              method: 'post',
              data: {index: this.pageIndex},
              headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

            }).then((res) => {
              if(!!res){
                if (res.data.Code == 200) {
                  if (this.pageIndex == 1) {
                     this.productList=res.data.ExData;
                    this.loading = false;
                  } else {
                    if (res.data.ExData.length > 0) {
                      for (let i = 0; i < res.data.ExData.length; i++) {
                          this.productList.push(res.data.ExData[i])
                      }
                      this.loading = false;
                    }else{
                      this.loading = true;
                    }
                  }

                } else {
                  Toast(res.data.Data);
                }
              }
            })
      },
      //获取用户信息
      getUserInfo(){
          this.axios({
          url: this.url + '/api/User/GetUserInfoByUserId',
          method: 'get',
          headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }

          }).then((res)=>{
            if(!!res){
              if (res.data.Code == 200) {
              this.user=res.data.ExData;
              } else {
                Toast(res.data.Data);
              }
            }
          }) 
      },
      goToPay(item){       
          //定义下单参数
            let sku = [{
              ShoppingCarId: 0,
              ProductSpecId: item.ProductSpecId,
              ProductId:item.ProductId,
              ShortName:item.Detail,
              ProductName: item.Title,
              ProductCount: 1,
              ProductImg: item.Img,
              ProductSpecPrice: item.Price,
              TeaBPrice:item.TeaPrice
            }];
            let sc={
              productOrderId:"0",
              mallType:'teaBMall',
              skus:sku
            }
            //已经登录的用户购买
            sessionStorage.setItem("pay", JSON.stringify(sc));
            this.$router.push({path: '/Payment'})
      }
    },
    mounted(){
      this.$nextTick(function (){
        this.getUserInfo();
      })
    }

  }
</script>

<style scoped>
  .cb-current {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 7.5rem;
    padding-top: 0.4rem;
    color: #ffffff;
    font-size: 0.7rem;
    background-color: #B4282D;
  }

  .cb-current > div {
    margin-top: 0.9rem;
  }

  .cb-current .cb-cu-mid {
    display: flex;
    align-items: center;
  }

  .cb-current .cb-cu-mid > img {
    width: 1.8rem;
    height: 1.35rem;
  }

  .cb-current .cb-cu-btm {
    padding: 0.1rem;
    font-size: 0.55rem;
    border: 1px solid #ffffff;
  }

  .cb-category {
    padding: 0 0.4rem 0.4rem;
    background-color: #ffffff;
  }

  .cb-category .title0 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0;
  }

  .cb-category .title1{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    padding: 0.5rem 0
  }
  .cb-category .title1 >img:first-child{
    width: 8rem;
    height: 2.6rem;
  }
  .cb-category .title1 >img:last-child{
    width: 0.8rem;
  }


  .cb-category .title0 > img {
    width: 0.8rem;
  }

  .cate {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    color: #ffffff;
  }
  .cate .cate-block .cate-block-text{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 0.55rem;
    background-color: rgba(0,0,0,.3);
  }
  .cate .cate-block .cate-block-text > div:first-child{
    font-weight: 600;
    font-size: 0.6rem;
    margin-bottom: 0.2rem;
  }
  .cate .cate-block {
    width: 7.5rem;
    height: 4.3rem;
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  .cate .cate-block:first-child{
    background-image: url("../../assets/images/cbmall/cbmall_03.png");
  }
  .cate .cate-block:nth-child(2){
    background-image: url("../../assets/images/cbmall/cbmall_05.png");
  }
  .cate .cate-block:nth-child(3){
    background-image: url("../../assets/images/cbmall/cbmall_09.png");
  }
  .cate .cate-block:last-child{
    background-image: url("../../assets/images/cbmall/cbmall_11.png");
  }
</style>
