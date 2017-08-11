<template>
  <div class="cont">
    <Mheader :show='true'>
      <div slot="title">注册{{this.$route.params.type}}</div>
    </Mheader>
    <div class="box">
      <div class="register">
        <img src="../../assets/images/login&register/login_03.png"/>
      </div>
      <div class="register-box">
        <mt-field placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>

        <div class="code">
          <mt-field placeholder="请输入验证码" type="text" v-model="imgNumber">
          </mt-field>
          <div class="seconding">
            <img :src="verifyCode" alt="看不清？点击更换" @click="getVCode"/>
          </div>
        </div>

        <div class="code">
          <mt-field placeholder="请输入验证码" type="number" v-model="number">
          </mt-field>
          <div :class="{disabled_btn:vcBool,seconds:fetchCodeMsg,seconding:!fetchCodeMsg}"   @click="sendCode">{{timerCodeMsg}}</div>
        </div>
        <mt-field placeholder="请输入密码" type="password" v-model="password"></mt-field>
        <div class="register-btn" @click="sendRegister">注册</div>
        <div class=" lm-font-sm lm-margin-t-sm">注册即视为同意 <span class="tips lm-text-red" @click="open">《服务协议》</span></div>
      </div>
      <Mdialog :dialog="dialog">
        <div slot="title">九八七茶网用户网络协议</div>
        <div slot="content">
          <div class="lm-margin-t">一、前言</div>
          <div>
            九八七茶网网上各项电子服务的所有权和运作权归武九八七茶网电子商务有限公司所有。用户在本站完成注册的行为即视为同意受本协议的约束，如果您不同意受该等服务条款的约束，应停止注册行为并停止使用九八七茶网网服务。当您使用本网站目前或将来提供的服务（例如，我的账户、礼品卡、会员积分等）时，您同时应接受适用于那些服务的准则和条件（“其它条件”）；如果以下使用条件与其它条件有不一致之处，则以其它条件为准。
          </div>
          <div class="lm-margin-t">二、用户账户信息与密码安全</div>


          <div>
            1、用户一旦完成注册程序成为本站合法用户，将得到一个密码和用户名，您应妥善保管账户和密码，您将对用户名和密码安全负全部责任，且在此情况下本站不承诺用户个人隐私安全，并有权对可疑账户进行权限限制，以保障正常用户的安全使用。凡使用用户账户的行为均视为用户的行为。用户若发现任何非法使用用户账户或存在安全漏洞的情况，请立即通告本站并应结束账户使用，否则用户账户可能得不到九八七茶网网的安全保护。
          </div>
          <div> 2、资料填写：为确保交易的正常进行，您必须向我们提供真实、有效的个人资料，如个人资料有任何变动，您可以记随时根据提示进行修改，以确保您在本站订购的货物和服务能够及时配送到位。
          </div>
          <div> 3、如果您提供的资料包含有不正确的信息，我们保留结束您使用网站服务资格的权利。
          </div>
          <div>
            4、如发生利用计算机程序进行恶意注册、邀请、参与的情形，聚美优品有权在不事先通知用户的情况下单方面中断或终止向用户提供服务而无需通知用户。

            若用户有上述行为，本站有权独立判断并做出暂停用户账号、屏蔽不当言论的处理。用户若在本站发布违反法律的言论，本站系统记录可作为用户违反法律的证据。
          </div>


          <div class="lm-margin-t"> 三、用户管理
          </div>

          <div>
            1、用户同意遵守《中华人民共和国保守国家秘密法》、《中华人民共和国计算机信息系统安全保护条例》、《计算机软件保护条例》、《最高人民法院关于审理侵害信息网络传播权民事纠纷案件适用法律若干问题的规定》（法释[2012]20号）、《互联网著作权行政保护办法》等有关计算机及互联网规定的法律和法规、实施办法。在任何情况下，九八七茶网网合理地认为用户的行为可能违反上述法律、法规，九八七茶网网可以在任何时候，不经事先通知而终止向该用户提供网络服务。用户应了解国际互联网的无国界性，应特别注意遵守当地有关的法律和法规。
          </div>

          2、禁止用户从事以下行为：
          <div> （1）不利用本站从事非法活动；</div>
          <div> （2）不干扰网络服务，遵守网络服务的相关惯例；</div>
          <div> （3）不传输或发布中伤他人的、不文明的信息资料、不发布显失常理的极端性言论；
          </div>
          <div>
            （4）不发布涉及恶意竞争的评论、广告和无意义的文字。

            若用户有上述行为，本站有权独立判断并做出暂停用户账号、屏蔽不当言论的处理。用户若在本站发布违反法律的言论，本站系统记录可作为用户违反法律的证据。
          </div>


          <div class="lm-margin-t"> 四、用户隐私
          </div>

          <div> 1、根据有关法律、法规规定或九八七茶网网合法服务程序规定；
          </div>
          <div> 2、在紧急情况下，为维护用户及公众的权益；
          </div>
          <div> 3、维护九八七茶网网的商标权和其他相关知识产权或权益。
          </div>
          <div> 4、在以下（包括但不限于）几种情况下，用户同意九八七茶网网使用或公开用户的个人信息：
          </div>
          <div> a、在进行促销或抽奖活动时时，九八七茶网网可能会与赞助商共享用户的个人信息，在该情况下九八七茶网网会在发送用户信息之前进行提示，并且用户可以通过不参与活动的方式要求九八七茶网网终止向赞助商发送个人信息。
          </div>
          <div> b、九八七茶网网可以将用户信息与第三方数据匹配。
          </div>
          <div>c、用户在九八七茶网网站上进行商品购买时，九八七茶网网获得的信息（例如：用户支付时所用的银行卡卡号和联系信息）会提供给银行或其他第三方支付商家以配合用户完成支付。

            注：用户自主在本站的互动社区发言、商品评论、个人头像上传过程中，承诺已对个人隐私的公开的可能性的充分理解，本站对用户的自主公开活动不负相关责任。
          </div>


          <div class="lm-margin-t"> 五、合同缔结
          </div>


          <div>
            如果您通过我们网站订购产品，您的订单就成为一种购买产品的申请或要约，不能证明您和我们之间建立了契约关系。只有当您的订单经过了我们工作人员的审核，并通知您我们已将该商品发出时，我们和您之间的订购合同才成立。我们在发现网站上所列商品及订单信息明显错误、缺货及按照您的物流要求无法配送的情况下，会通过email或电话通知您是否更换其他商品或配送方式，我们亦有权单方面取消订单。同时，我们保留对商品订购数量的限制权。
          </div>

          <div class="lm-margin-t"> 六、服务条款的变更和修改
          </div>

          <div>
            九八七茶网网有权根据运营需要随时对服务条款进行修改，修改后的服务条款一经在九八七茶网网上公示即生效，九八七茶网网将不再另行向用户发送修改通知。用户可随时登陆九八七茶网网查阅最新服务条款，用户有义务不时关注并阅读最新版的服务条款及网站公告。用户如果不同意服务条款的修改，可以主动取消或放弃已经获得的九八七茶网网网络服务；如果用户继续享用本站提供的服务，则视为用户已经接受服务条款的修改。
          </div>


          <div class="lm-margin-t">
            七、知识产权
          </div>

          <div>
            本站上的所有内容诸如文字、视频、音频、图像、图表、标识、按钮图标的知识产权均为本站或其内容提供者享有。未经本站或者相关内容提供者的书面许可，用户不得对上述内容或其任何部分进行复制、链接、仿造或以其他方式加以利用。用户同意，用户在本站发表的文章版权归用户和本站共同所有。
          </div>
          <div class="lm-margin-t"> 八、责任声明</div>


          <div> 如因意外事件、第三方原因或本站无法合理控制的原因使本站系统崩溃或无法正常使用导致网上交易无法完成或丢失有关的信息、记录等，本站不承担责任。但是本站会尽可能合理地协助处理善后事宜，并努力使客户免受经济损失。

            在法律允许的范围内，本站对用户的间接损失不承担责任，并且本站承担的直接责任以用户发生索赔的商品的价值为限。
          </div>


          <div class="lm-margin-t">九、法律管辖和适用</div>


          <div> 本协议的订立、执行和解释及争议的解决均应适用中国法律。如发生本站服务条款与中国法律相抵触时，则这些条款将完全按法律规定重新解释，而其它合法条款则依旧保持对用户产生法律效力和影响。
          </div>
          <div>
            本协议的规定是可分割的，如本协议任何规定被裁定为无效或不可执行，该规定可被删除而其余条款应予以执行。如双方就本协议内容或其执行发生任何争议，双方应尽力友好协商解决；协商不成时，任何一方均可向本站所在地的人民法院提起诉讼。
          </div>


        </div>
        <div slot="btn" @click="close">确定</div>
      </Mdialog>
    </div>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mdialog from '../../components/Mdialog'
  import {Toast} from 'mint-ui';

  export default {
    components: {
      Mheader,
      Mdialog
    },
    data() {
      return {
        phone: null,
        number: null,
        imgNumber: null,
        password: null,
        verifyCode: null,
        vcBool: true,
        vcToken: null,
        dialog: null,
        timerCodeMsg: '获取验证码',
        fetchCodeMsg: true
      }
    },
    watch: {
      imgNumber: function (value) {
        if(value.length >= 4){
          this.chkVCode()
        }
      }
    },
    methods: {
      open() {
        this.dialog = true
      },
      close() {
        this.dialog = false
      },
      sendCode() {//发送短信验证码
        if (!!!this.phone) {
          Toast('手机号不能为空');
          return;
        }
        if (!this.isPhoneNo(this.phone)) {
          Toast('手机号格式不正确');
          return;
        }
        this.axios.post(this.url + '/api/Login/SendSMSCode', {phone: this.phone}).then((res) => {
          this.timeOut();//发送成功开始倒计时
          if (res.data.Code == 200) {
            Toast(res.data.Data);
          } else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          Toast('网络请求超时');
        })
      },
      isPhoneNo(phone) {  //手机号验证
        var pattern = /^1[34578]\d{9}$/;
        return pattern.test(phone);
      },
      timeOut() {//倒计时
        let self = this;
        self.fetchCodeMsg = true
        let sec = 60;
        for (let i = 0; i <= 60; i++) {
          window.setTimeout(function () {
            if (sec != 0) {
              self.timerCodeMsg = sec + "s后重新发送";
              sec--;
            } else {
              sec = 60;//如果倒计时结束就让重新获取验证码显示出来
              self.timerCodeMsg = "重新获取验证码";
              self.fetchCodeMsg = false
            }
          }, i * 1000)
        }
      },
      sendRegister() {//注册
        if (!!!this.phone) {
          Toast('手机号不能为空');
          return;
        }
        if (!this.isPhoneNo(this.phone)) {
          Toast('手机号格式不正确');
          return;
        }
        if (!!!this.number) {
          Toast('验证码不能为空');
          return;
        }
        if (this.number.length != 6) {
          Toast('验证码格式不正确');
          return;
        }
        if (!!!this.password) {
          Toast('密码不能为空');
          return;
        }
        if (this.password.length < 6 || this.password.length > 12) {
          Toast('密码的长度在6-12位之间');
          return;
        }
        if (!this.verifyPassword(this.password)) {
          Toast('密码的格式错误');
          return;
        }
          this.axios.post(this.url + '/api/Login/Register', {
            phone: this.phone,
            code: this.number,
            password: this.password
          }).then((res) => {
              if (res.data.Code == 200) {
                let instance = Toast(res.data.Data);
                setTimeout(() => {
                  instance.close();
                  this.$router.push({path: '/login'})
                }, 1000);

              } else {
                Toast(res.data.Data);
              }
            }
          ).catch((err) => {
              Toast('网络请求超时');
            }
          )
      },
      verifyPassword(pwd) {//密码验证
        let pattern = /^[A-Za-z_0-9]{6,16}$/;
        return pattern.test(pwd);
      },
      getVCode() {
        this.axios.get(this.url + '/api/Login/CreateVCode', {}).then((res) => {
          this.verifyCode = res.data.Data.imgUrl;
          this.vcToken = res.data.Data.randVCode;
           this.vcBool=true;
           this.fetchCodeMsg=true;
        }).catch((err) => {
          Toast('网络请求超时');
        })
      },
      chkVCode() {
        if (!!!this.imgNumber) {
          Toast('请输入图片中的字符');
          return;
        }
        if (this.imgNumber.length != 4) {
          Toast('输入的字符长度不对');
          return;
        }
        let strs = this.verifyCode.split('/');
        let imgName = strs[strs.length - 1];
        this.axios.post(this.url + '/api/Login/CheckVCode', {
          vCode: this.imgNumber,
          token: this.vcToken,
          imgName: imgName
        }).then((res) => {
          if (res.data.Code == 200) {
            this.vcBool = false;
            this.fetchCodeMsg=false;
          } else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          Toast('网络请求超时');
        })
      }
    },
    mounted: function () {
      this.$nextTick(() => {
        this.getVCode();
      })
    }
  }
</script>

<style scoped>
   .disabled_btn{
    pointer-events: none;
    color: gainsboro;
    border-color: gainsboro;
   }
  .cont {
    height: 100vh;
    margin-top: 1.8rem;
    padding-bottom: 1rem;
    background-color: #ffffff;
  }

  .code {
    font-size: 0.55rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .code .seconds {
    height: 2.1rem;
    width: 5.5rem;
    color: #A9A9A9;
    text-align: center;
    line-height: 2.1rem;
    border: 1px solid #d9d9d9;
    border-radius: 0.2rem;
    margin-top: 0.8rem;
    pointer-events: none;
  }

  .code .seconding {
    height: 2.1rem;
    width: 5.5rem;
    color: #B4282D;
    text-align: center;
    line-height: 2.1rem;
    border: 1px solid #B4282D;
    border-radius: 0.2rem;
    margin-top: 0.8rem;
  }

  .code .seconding > img {
    vertical-align: inherit;
    border-radius: 0.2rem;
  }

  .code a {
    width: 7.5rem !important;
  }

  .box {
    font-size: 0.7rem;

  }

  .box .register-box {
    padding: 0 1.5em 1rem;
  }

  .box .register {
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .box .register > img {
    margin: 0 auto;
    width: 5rem;
    height: 3.3rem;
  }

  .box .register-box .register-btn {
    margin-top: 0.8rem;
    text-align: center;
    color: #fff;
    padding: 0.5rem 0;
    border-radius: 0.2rem;
    background-color: #B4282D;
  }


</style>
