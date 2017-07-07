<template>
  <div class="cont">
    <Mheader :show=true>
      <div slot="title">忘记密码</div>
    </Mheader>
    <div class="box">
      <div class="msg-login">
        <img src="../../assets/images/login&register/login_03.png"/>
      </div>
      <div class="msg-login-box">
        <mt-field placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        <div class="code">
          <mt-field placeholder="请输入验证码" type="number" v-model="number">
          </mt-field>
          <div class="seconds">59s后重新发送</div>
        </div>
        <mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div class="msg-login-btn">重置密码</div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import Mheader from '../../components/Mheader'
  import Mdialog from '../../components/Mdialog'

  export default {
    components: {
      Mheader,
      Mdialog
    },
    data() {
      return {
        phone: null,
        number: null,
        password: null
      }
    },
    methods: {

    }
  }
</script>

<style scoped>
  .cont{
    height: 100vh;
    background-color: #ffffff;
  }
  .box {
    font-size: 0.7rem;
  }

  .box .msg-login-box {
    padding: 0 1.5em 1rem;
  }

  .box .msg-login {
    height: 9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box .msg-login > img {
    margin: 0 auto;
    width: 6rem;
    height: 4.0rem;
  }

  .box .msg-login-box .msg-login-btn {
    margin-top: 0.8rem;
    text-align: center;
    color: #fff;
    padding: 0.5rem 0;
    border-radius: 0.2rem;
    background-color: #B4282D;
  }

  .methods{
    margin-top: 0.4rem;
    font-size: 0.65rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .methods  a{
    display: flex;
    align-items: center;
  }
  .methods  a > img{
    margin-right: 0.2rem;
    width: 0.7rem;
    height: 0.7rem;
  }
  .methods .m-msg a > img{
    width: 0.9rem;
    height: 0.9rem;
  }
  .code{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .code .seconds{
    height: 2.1rem;
    width: 5.5rem;
    color: #A9A9A9;
    text-align: center;
    line-height: 2.1rem;
    border: 1px solid #d9d9d9;
    border-radius: 0.2rem;
    margin-top: 0.8rem;
  }
  .code a{

    width: 7.5rem!important;
  }
</style>
