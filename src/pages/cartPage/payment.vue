<template>
    <div class="container">
      <Mheader :show=true>
        <div slot="title">提交订单</div>
      </Mheader>
      <router-link :to="{path:'/MyAddress'}">
        <div class="address lm-margin-b-sm">
        <div>
          <div class="name">法是否按方法</div>
          <div class="mr">默认</div>
        </div>
        <div>
          <div class="tel">1715646541</div>
          <div class="add">福建省福州市仓山区浦上大道万达C4 1422</div>
        </div>
        <div>
          <img src="../../assets/images/arrow.png"/>
        </div>
      </div>
      </router-link>
      <div class="pay-modes lm-margin-b-sm">
        <div>支付方式：</div>
        <div class="pay-mode lm-margin-t-sm">
          <div class="active">货到付款</div>
          <div>支付宝</div>
          <div>微信支付</div>
        </div>
      </div>
      <div class="product lm-margin-b-sm">
        <img class="product-img" src="../../assets/images/goods/987tea_25.png" />
        <div class="product-details">
          <div>正宗观音铁</div>
          <div>
            <span>￥999</span>
            <span>x1</span>
          </div>
        </div>
      </div>
      <router-link :to="{path:'/Coupon'}">
        <div class="coupon lm-margin-b-sm">
          有3张优惠券可用
        </div>
      </router-link>
      <div class="order-details">
        <div class="lm-margin-b-sm">订单明细：</div>
        <div class="details">
          <span>订单总价</span>
          <span>￥999</span>
        </div>
        <div class="details">
          <span>运费</span>
          <span>0</span>
        </div>
        <div class="details">
          <span>优惠券</span>
          <span>￥-5</span>
        </div>
        <div class="details">
          <span>总计</span>
          <span class="lm-text-red">￥994</span>
        </div>
      </div>

      <div class="pay">
        <div>
          <div>共选择 <span class="lm-text-red">1</span>件商品</div>
          <div>总金额：<span class="lm-text-red">￥994</span> 元</div>
        </div>
        <div class="topay">立即付款</div>
      </div>
    </div>
</template>

<script>
  import Mheader from '../../components/Mheader'

	export default {
    components: {
      Mheader
    }
  }
</script>

<style scoped>
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
