<template>
    <div>
      <div class="cont">
        <div class="top">
          <span>订单编号: <slot name="number"></slot></span>
          <span class="lm-text-red"><slot name="state"></slot></span>
        </div>
        <div class="mid" v-for="(pitem,index) in orderProductList" :key="pitem.ProductOrderId">
          <div>
            <span><img alt="" v-lazy="pitem.HeadImg"></span>
            <div class="mid-cont">
              <span class="product-name">{{ pitem.ProductName }}</span>
              <span class="product-name lm-text-grey lm-font-xs lm-margin-t-xs">规格：{{ pitem.ShortName }}</span>
              <span class="lm-text-grey lm-margin-t-sm" >数量：{{ pitem.ProductCount}}</span>
            </div>
          </div>
        </div>
        <div class="btm">
          <span>实付: <slot name="price"></slot>元</span>
          <span><slot name="time"></slot></span>
        </div>
        <div class="btn-group">
               <div class="cancel"><slot name="cancel"></slot></div>
               <div class="btn"><slot name="btn"></slot></div>
             </div>
      </div>
    </div>
</template>

<script>

	export default {
    props: {
      orderProductList: ''
    },
    methods:{

    }
  }
  </script>

<style scoped>
  .cont{
    margin-bottom: 0.5rem;
    padding:0 0.4rem;
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;
  }
  .mid{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem 0;
    border-top:1px solid #eee;
  }
  .mid > div:first-child{
    width: 100%;
    display: flex;
    align-items: flex-start;
  }
  .mid img{
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
  }
  .mid .mid-cont{
    width: 100%;
  }
  .top,.btm{
    border-top:1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem 0;
  }
  .btn-group{
    border-top:1px solid #eee;
    padding: 0.4rem 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .product-name{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .btn-group > div >span {
    min-width: 3rem;
    height: 1.2rem;
    line-height: 1.2rem;
    text-align: center;
    border: 1px solid;
    padding:0 0.2rem;
    border-radius: 0.1rem;
    margin-left: 0.5rem;
  }
  .btn-group .cancel > span{
    color: #9d9d9d;
    border-color: #9d9d9d;
  }
  .btn-group .btn > span{
    color: #B4282D;
    border-color: #B4282D;
  }
</style>
