<template>
    <div class="container">
      <Mheader :show=true :back="false">
        <div slot="title">支付完成</div>
      </Mheader>
      <div class="completed-box">
        <div class="completed">
          <img src="../../assets/images/cart/completed.png" />
          <div class="lm-margin-t lm-font-defult">订单提交完成</div>
          <div class="lm-text-grey lm-margin-t">谢谢您的支持，您的订单对我们非常重要</div>
          <div class="lm-text-grey lm-margin-t-xs">稍后我们的专属客服将和您联系确认</div>
          <div class="btn-group">
            <router-link :to="{path:'/'}">
              <div class="btn">继续逛逛</div>
            </router-link>
            <router-link :to="{path:'/MyOrder/我的订单/0'}">
              <div class="btn">我的订单</div>
            </router-link>
          </div>
        </div>
      </div>

      <Mfooter></Mfooter>
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
  .completed-box{
    width: 100%;
    position: relative;
    height: 80vh;
  }
  .completed{
    text-align: center;
    top:30%;
    left: 50%;
    transform: translate(-50%,-30%);
    position: absolute;
    width: 80%;
  }
  .completed > img{
    width:5rem;
    height: 5rem;
    vertical-align: bottom;
  }
  .btn-group{
    margin-top: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .btn-group .btn{
    padding: 0.35rem;
    border-radius: 0.2rem;
    width: 5rem;
    color: #ffffff;
    background-color: #B4282D;
  }
</style>
