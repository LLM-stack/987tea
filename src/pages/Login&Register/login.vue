<template>
  <div class="cont">
    <Mheader :show='true'>
      <div slot="title">登录</div>
    </Mheader>
    <div class="box">
      <div class="login">
        <img src="../../assets/images/login&register/login_03.png"/>
      </div>
      <div class="login-box">
        <mt-field placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
        <mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div class="login-btn" @click="login">登录</div>
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
  //import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';


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
        login(){//登录         
           if(!!!this.phone){
           Toast('手机号不能为空');
            return;
          }
          if(!this.isPhoneNo(this.phone)){
             Toast('手机号格式不正确');
             return;
          }
          if(!!!this.password){
           Toast('密码不能为空');
            return;
          }
          if(this.password.length<6 || this.password.length>12){
            Toast('密码的长度在6-12位之间');
            return;
          }
          if(!this.verifyPassword(this.password)){
            Toast('密码的格式错误');
            return;
          }
         let browse=!!!localStorage.browse?'':localStorage.browse;
          this.axios.post(this.url+'/api/Login/LoginUp',{phone:this.phone,pwd:this.password,browse:browse}).then((res)=>{
            if(res.data.Code==200){
              localStorage.setItem("lut", res.data.ExData);
              localStorage.removeItem('browse');//登录成功后移除浏览过的商品信息
              let instance = Toast(res.data.Data);
              setTimeout(() => {
                instance.close();
               if(this.$route.query.redirect){
                  this.$router.push({path: decodeURIComponent(this.$route.query.redirect)});
                }else{
                  this.$router.push({path: '/'});
                }
              }, 1000);

            }else{
              Toast(res.data.Data);
            }
          }).catch((err)=>{
            Toast(err.message);
          })

        },
        isPhoneNo(phone) {  //手机号验证
          var pattern = /^1[34578]\d{9}$/;
          return pattern.test(phone);
        },
        verifyPassword(pwd){//密码验证
            let pattern=/^[A-Za-z_0-9]{6,16}$/;
            return pattern.test(pwd);
        }

    }
  }
</script>

<style scoped>
  .cont{
    margin-top: 1.8rem;
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
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box .login > img {
    margin: 0 auto;
    width: 5rem;
    height: 3.3rem;
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
