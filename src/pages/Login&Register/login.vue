<template>
  <div class="cont">
    <Mheader :show=true>
      <div slot="title">登录</div>
    </Mheader>
    <div class="box">
      <div class="login">
        <img src="../../assets/images/login&register/login_03.png"/>
      </div>
      <div class="login-box">
        <mt-field placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        <mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div class="login-btn">登录</div>
        <div class="methods">
          <div class="m-msg">
            <router-link :to="{path:'/MsgLogin'}">
              <img src="../../assets/images/login&register/message.png"/>
              短信登录
            </router-link>
          </div>
          <div class="m-pswd">
            <router-link :to="{path:'/ResetPassword'}">
              <img src="../../assets/images/login&register/password.png" />
              找回密码
            </router-link>
          </div>
          <div class="m-phone">
            <router-link :to="{path:'/Register'}">
              <img src="../../assets/images/login&register/phone.png" />
              快速注册
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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

  .box .login-box {
    padding: 0 1.5em 1rem;
  }

  .box .login {
    height: 9rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box .login > img {
    margin: 0 auto;
    width: 6rem;
    height: 4.0rem;
  }

  .box .login-box .login-btn {
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
</style>
