<template>
  <div>
    <Mheader :show='true'>
      <div slot="title">中秋茶礼</div>
      <div class="msg" slot="info">
      </div>
    </Mheader>
    <div class="active-box">
      <div class="product-top">
        <img class="zdzb" src="../../assets/images/activities/815/zdzb_02.png"/>
        <router-link to="/ProductDetails/fa81053262ef450ba5b8c02e0bb671f5"></router-link>
      </div>
      <div class="product product1">
        <router-link to="/ProductDetails/8625aacf1a0545ff9846028a4700dbcb"></router-link>
      </div>
      <div class="product product2">
        <router-link to="/ProductDetails/b6cec4a9bcf9457eb86c77065968743d"></router-link>
      </div>
      <div class="product product3">
        <router-link to="/ProductDetails/2bfde085eafd4442a28ba353a09d2a44"></router-link>
      </div>
      <div class="product product4">
        <router-link to="/ProductDetails/db7fe93a4c004c2695f1e6398eaf713e"></router-link>
      </div>
      <div class="product product5">
        <router-link to="/ProductDetails/4e75c28682b644e79163f09045bdad34"></router-link>
      </div>
      <div class="product product6">
        <router-link to="/ProductDetails/cb38a3d92a7b41ceb41fdfc0be6b5ff6"></router-link>
      </div>
      <div class="product product7">
        <router-link to="/ProductDetails/dfd8325a06754c84afea863a4ca8a7f4"></router-link>
      </div>
      <div class="product product8">
        <router-link to="/ProductDetails/9e8e6614b5124be8a3866dbc2d1fae23"></router-link>
      </div>
      <div class="product product9">
      </div>
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
  .active-box{
    margin-top: 1.8rem;
    padding: 14rem 0.5rem 1.5rem 0.5rem;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-image: url("../../assets/images/activities/815/815BG.jpg");
  }
  a{
    display: inline-block;
    width: 100%;
    height: 100%;
  }
  .product-top{
    position: relative;
    margin-bottom: 2rem;
    width: 100%;
    height: 6.69rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url("../../assets/images/activities/815/815TOP_03.png");
  }
  .product-top .zdzb{
    width: 3.8rem;
    height: 6rem;
    top: -3rem;
    left: -0.5rem;
    position: absolute;
  }
  .product{
    margin-top: 0.28rem;
    width: 100%;
    height: 6.5rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .product1{
    background-image: url("../../assets/images/activities/815/09_05.png");
  }
  .product2{
    background-image: url("../../assets/images/activities/815/09_11.png");
  }
  .product3{
    background-image: url("../../assets/images/activities/815/09_17.png");
  }
  .product4{
    background-image: url("../../assets/images/activities/815/09_23.png");
  }
  .product5{
    background-image: url("../../assets/images/activities/815/09_29.png");
  }
  .product6{
    background-image: url("../../assets/images/activities/815/09_35.png");
  }
  .product7{
    background-image: url("../../assets/images/activities/815/09_41.png");
  }
  .product8{
    background-image: url("../../assets/images/activities/815/09_47.png");
  }
  .product9{
    background-image: url("../../assets/images/activities/815/09_53.png");
  }
</style>
