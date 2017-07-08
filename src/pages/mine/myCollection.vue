<template>
  <div>
    <Mheader :show=true>
      <div slot="title">我的收藏</div>
    </Mheader>
    <div class="product">
      <div class="product-img">
        <img src="../../assets/images/goods/987tea_16.png" alt="">
      </div>
      <div>
        <div>
          <div class="product-name">正宗铁观音</div>
          <div class="product-delete"></div>
        </div>
        <div class="product-price">
          <div>￥123</div>
          <div class="go-buy">去下单</div>
        </div>
      </div>
    </div>
    <div class="product">
      <div class="product-img">
        <img src="../../assets/images/goods/987tea_16.png" alt="">
      </div>
      <div>
        <div>
          <div class="product-name">正宗铁观音</div>
          <div class="product-delete"></div>
        </div>
        <div class="product-price">
          <div>￥123</div>
          <div class="go-buy">去下单</div>
        </div>
      </div>
    </div>
    <div class="product">
      <div class="product-img">
        <img src="../../assets/images/goods/987tea_16.png" alt="">
      </div>
      <div>
        <div>
          <div class="product-name">正宗铁观音</div>
          <div class="product-delete"></div>
        </div>
        <div class="product-price">
          <div>￥123</div>
          <div class="go-buy">去下单</div>
        </div>
      </div>
    </div>
    <div class="product">
      <div class="product-img">
        <img src="../../assets/images/goods/987tea_16.png" alt="">
      </div>
      <div>
        <div>
          <div class="product-name">正宗铁观音</div>
          <div class="product-delete"></div>
        </div>
        <div class="product-price">
          <div>￥123</div>
          <div class="go-buy">去下单</div>
        </div>
      </div>
    </div>
    <div class="product">
      <div class="product-img">
        <img src="../../assets/images/goods/987tea_16.png" alt="">
      </div>
      <div>
        <div>
          <div class="product-name">正宗铁观音</div>
          <div class="product-delete"></div>
        </div>
        <div class="product-price">
          <div>￥123</div>
          <div class="go-buy">去下单</div>
        </div>
      </div>
    </div>

    <Mfooter :myCenterCurrent=true></Mfooter>
  </div>

</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'

  export default {
    components: {
      Mheader,
      Mfooter
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
    font-size: 0.7rem;
    color: #000;
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
