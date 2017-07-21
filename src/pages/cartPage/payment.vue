<template>
    <div class="container">
      <Mheader :show='true'>
        <div slot="title">提交订单</div>
      </Mheader>
      <!--<router-link :to="{path:'/MyAddress/pay'}">-->
        <div class="address lm-margin-b-sm" @click="selectAddress">
        <div>
          <div class="name">{{defaultAddress.ConsigneeName}}</div>
          <div class="mr" v-if="defaultAddress.IsDefault==0">默认</div>
        </div>
        <div v-if="!!!defaultAddress">
          <div>还没有收货地址</div>
        </div>
        <div v-else>
          <div class="tel">{{defaultAddress.Mobile}}</div>
          <div class="add">{{defaultAddress.Province+defaultAddress.City+defaultAddress.Area+defaultAddress.Detail}}</div>
        </div>
        <div>
          <img src="../../assets/images/arrow.png"/>
        </div>
      </div>
      <!--</router-link>-->
      <div class="pay-modes lm-margin-b-sm">
        <div>支付方式：</div>
        <div class="pay-mode lm-margin-t-sm">
          <div  :class="{active:payType==0}" @click="checkType(0)">货到付款</div>
          <div :class="{active:payType==2}" @click="checkType(2)">支付宝</div>
          <!--<div :class="payType==1?'active':''" @click="checkType(1)">微信支付</div>-->
        </div>
      </div>
      <div class="product lm-margin-b-sm" v-for="(item,index) in orderDetails">
        <img class="product-img" :src="item.ProductImg" />
        <div class="product-details">
          <div>{{item.ProductName}}</div>
          <div>
            <span>￥{{item.ProductSpecPrice}}</span>
            <span>x{{item.ProductCount}}</span>
          </div>
        </div>
      </div>
      <!--优惠券的先注释-->
      <!--<router-link :to="{path:'/Coupon'}">
        <div class="coupon lm-margin-b-sm">
          有3张优惠券可用
        </div>
      </router-link>-->
      <div class="order-details">
        <div class="lm-margin-b-sm">订单明细：</div>
        <div class="details">
          <span>订单总价</span>
          <span>￥{{orderTotal}}</span>
        </div>
        <!--TODO:运费还未计算到总价格中去-->
        <div class="details">
          <span>运费</span>
          <span>{{freight}}</span>
        </div>
        <!--<div class="details">
          <span>优惠券</span>
          <span>￥-5</span>
        </div>-->
        <div class="details">
          <span>总计</span>
          <span class="lm-text-red">￥{{total}}</span>
        </div>
      </div>
      <div class="hide" v-html="alipay"></div>
      <div class="pay">
        <div>
          <div>共选择 <span class="lm-text-red">{{ProductCount}}</span>件商品</div>
          <div>总金额：<span class="lm-text-red">￥{{total}}</span> 元</div>
        </div>
        <div class="topay" @click="oncePayment">立即付款</div>
      </div>

    </div>

</template>

<script>
  import Mheader from '../../components/Mheader'
  import {Toast} from 'mint-ui'

	export default {
    components: {
      Mheader
    },
    data() {
      return {
        defaultAddress:'',
        ProductCount:'',
        orderDetails:[],
        freight:0,
        payType:0,
        alipay:'',
        productOrderId:"0"
      }
    },
    computed: {
      orderTotal(){
        let t=0;
        this.orderDetails.forEach(function (item) {
           t+=parseInt(item.ProductCount)*parseFloat(item.ProductSpecPrice);
        });
        return t;
      },
      total(){
        return  parseFloat(this.orderTotal)+parseFloat(this.freight);
      }
    },
   methods:{
     //获取默认的收货地址
     getDefaultAddress(){
       this.axios({
        url: this.url + '/api/ReceiveAddress/GetDefaultAddress',
        method: 'get',
        headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }

        }).then((res)=>{
          if(!!res){
            if (res.data.Code == 200) {
              this.defaultAddress = res.data.ExData;
            } else {
              Toast(res.data.Data);
            }
          }
        }) 
     },

     //支付类型选择
     checkType(val){
        this.payType=val;      
     },
     //提交订单支付
     oncePayment(){
       //定义参数
        var sc={
          TotalPrice:this.total,
          PayType:this.payType,
          ProductCount:this.ProductCount,
          OrderFrom:2,//订单来源  2标识商城
          AddressId:this.defaultAddress.AdressId,
          ProductSkus:this.orderDetails,
          ProductOrderId:this.productOrderId
        }
       this.axios({
        url: this.url + '/api/Order/OncePayment',
        method: 'post',
        data:{strSc:JSON.stringify(sc)},
        headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }
        }).then((res)=>{
          if(!!res)
             if (res.data.Code == 200) {
             if(this.payType==0){
               this.$router.push({path: '/MyOrder/全部/0'})
             }
             if(this.payType==2){
               this.alipay=res.data.ExData; 
               setTimeout(function() {
                 document.forms['alipaysubmit'].submit();
               },0)

               //this.onSubmit();
               localStorage.removeItem("cars");
             }
            }else {
              Toast(res.data.Data);
            }

        })
     },
     selectAddress() {
       this.$router.push({ path: '/MyAddress/', query: { from: 'pay'}})
     }
   },
   mounted:function(){
     this.$nextTick(()=>{
       //收货地址展示
        if(!!!this.$store.state.receiveAddress){
            this.getDefaultAddress();
        }else{
          this.defaultAddress=this.$store.state.receiveAddress;
        }
        
        if(!!localStorage.cars){  
          var sc=JSON.parse(localStorage.cars);
          this.productOrderId=sc.productOrderId;     
          this.orderDetails=sc.skus;
          this.ProductCount=this.orderDetails.length;
        }
        

     })
    
   }
  }
</script>

<style scoped>
  .hide{
    display:none;
  }
  .address{
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    background-color: #ffffff;
  }
  .address+.address{
    border-top: 1px solid #eeeeee;
  }
  .address > div:first-child{
    padding-left: 0.5rem;
    width: 4rem;
  }
  .address > div:first-child .name{
    font-size: 0.55rem;
  }
  .address > div:first-child .mr{
    margin-top: 0.3rem;
    width: 1.5rem;
    text-align: center;
    border-radius: 0.1rem;
    font-size: 0.5rem;
    color:  #B4282D;
    border:1px solid  #B4282D;
  }
  .address > div:nth-child(2){
    margin-left: 0.8rem;
    width: 9rem;
  }
  .address > div:nth-child(2) .add{
    margin-top: 0.2rem;
    font-size: 0.6rem;
    color: #999;
  }
  .address > div:last-child{
    width: 1rem;
    height: 1rem;
    margin-left: 0.7rem;
  }
  .pay-modes{
    padding: 0.4rem;
    background-color: #ffffff;
  }
  .pay-modes .pay-mode{
    display: flex;
    align-items: center;
  }
  .pay-modes .pay-mode > div{
    padding: 0.1rem 0.2rem;
    margin-right: 1rem;
    border-radius: 0.1rem;
    font-size: 0.6rem;
    border:1px solid;
  }
  .pay-mode .active{
    color: #B4282D;
    border:1px solid  #B4282D;
  }
  .product{
    display: flex;
    align-items: center;
    padding: 0.4rem;
    background-color: #ffffff;
  }
  .product .product-img{
    width: 3.2rem;
    height: 3.2rem;
    border: 1px solid #eeeeee;
    margin-right: 0.5rem;
  }
  .product .product-details{
    width: 100%;
    height: 3.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .product .product-details > div:last-child{
    display: flex;
    justify-content: space-between;
  }
  .coupon{
    padding: 0.4rem;
    background-color: #ffffff;
  }
  .order-details{
    padding: 0.4rem;
    background-color: #ffffff;
  }
  .order-details .details{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.2rem;
  }
  .order-details .details > span:first-child{
    color: #999999;
    font-size: 0.6rem;
  }

  .pay{
    width: 100%;
    bottom: 0;
    position: fixed;
    height: 2.4rem;
    padding-left: 0.4rem;
    border-top: 1px solid #eeeeee;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .pay .topay{
    text-align: center;
    line-height: 2.4rem;
    color: #ffffff;
    width: 4.5rem;
    height: 100%;
    background-color: #B4282D;
  }
</style>
