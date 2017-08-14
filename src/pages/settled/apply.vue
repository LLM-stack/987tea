<template>
  <div>
    <Mheader :show="true">
      <div slot="title">入驻987茶网</div>
    </Mheader>
    <div class="cont" v-if="!isOk">
      <mt-field placeholder="商家登录名" type="text" v-model="loginName"></mt-field>
      <mt-field placeholder="商家登录密码" type="password" v-model="password"></mt-field>
      <mt-field placeholder="商家登录密码确认" type="password" v-model="oncePassword"></mt-field>
      <mt-field placeholder="商家名称" type="text" v-model="username"></mt-field>
      <mt-field placeholder="联系方式" type="tel" v-model="phoneNum"></mt-field>
      <mt-field placeholder="公司名称" type="text" v-model="companyName"></mt-field>
      <mt-field placeholder="组织机构代码" type="text" v-model="ozCode"></mt-field>
      <p class="lm-text-grey lm-margin-t lm-font-sm lm-margin-l-sm">营业执照上传</p>
      <div class="flex-alig-center up-img lm-margin-t-sm">
        <div class="imgs" v-show="images.length >0">
          <ul class="flex-alig-center">
            <li v-for="(img,idx) in images" :key="idx">
              <img :src="img"/>
              <img class="del-img" src="../../assets/images/teaCommunity/del.png" @click='delImage(idx)'/>
            </li>
          </ul>
        </div>
        <div class="up-btn" v-show="images.length < 4">
          <input type="file" id="up_img" multiple="multiple" accept="image/*" @change="previewImage"/>
          <img src="../../assets/images/teaCommunity/upimg.png"/>
        </div>
      </div>
      <div class="btn"  :class="{disableTap:posting}" @click="apply">提交申请</div>
    </div>

      <div class="completed" v-if="isOk">
        <img src="../../assets/images/cart/completed.png" />
        <div class="lm-margin-t lm-font-defult">入驻申请提交成功！</div>
        <div class="lm-text-grey lm-margin-t">谢谢您的支持，我们会尽快处理您的申请</div>
        <div class="lm-text-grey lm-margin-t-xs">工作人员审核通过后会尽快与您联系！</div>
      </div>

  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import {Toast} from 'mint-ui'
  import {Indicator} from 'mint-ui'
  import Exif from 'exif-js'

  export default {
    components: {
      Mheader
    },
    data(){
      return {
        loginName: '',
        username: '',
        phoneNum: '',
        companyName: '',
        password: '',
        oncePassword: '',
        ozCode: '',
        images: [],
        imgs: [],
        posting: false,
        isOk:false
      }
    },
    methods: {     
      //提交申请
      apply(){
        if (!!!this.loginName) {
          Toast('商家登录名不能为空');
          return;
        }
        if (!!!this.username) {
          Toast('商家名称不能为空');
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
        if(this.password != this.oncePassword){
          Toast('两次密码输入不一致');
          return;
        }
        if (!!!this.phoneNum) {
          Toast('手机号不能为空');
          return;
        }
        if (!this.isPhoneNo(this.phoneNum)) {
          Toast('手机号格式不正确');
          return;
        }
        if (!!!this.companyName) {
          Toast('公司名称不能为空');
          return;
        }
        if (!!!this.ozCode) {
          Toast('组织机构代码不能为空');
          return;
        }
        if (!!!this.images) {
          Toast('请上传营业执照');
          return;
        }
       
        let cont = new FormData();
        cont.append("MerchantName", this.username);
        cont.append("LoginName", this.loginName);
        cont.append("Pwd", this.password);
        cont.append("Phone", this.phoneNum);
        cont.append("CompanyName", this.companyName);
        cont.append("OrganizationCode", this.ozCode);
        this.imgs.forEach((item) => {
          cont.append("myFile[]", item)
        })

        this.axios({
          url: this.url + '/api/Merchants/SubmitMerchantsInfo',
          method: 'post',
          data: cont,
          headers: { 'Content-Type': 'multipart/form-data' }
        }).then((res) => {
          if (!!res && res.data.Code == 200) {
            this.isOk=true;
            this.posting = true;           
          }else{
            this.isOk=false;
            this.posting = false;
            Toast(res.data.Data);
          }
        })
      },
      //图片预览
      previewImage(e) {
        Indicator.open({
          text: '图片上传中...',
          spinnerType: 'snake'
        });
        setTimeout(() => {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) {
              return false;
            }
            if (this.images.length >= 4) {
              Toast("最多只能上传4张图片");
              return false;
            }
            ;
            if (this.browser() === "iPhone") {
              this.imgPreview(files[0]);
            } else {
              for (let i = 0; i < files.length; i++) {
                let reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = f => {
                  this.images.push(f.target.result);
                }
                this.imgs.push(files[i]);
              }
            }
            ;
            Indicator.close();
          }
          , 500)
      },
      //将base64的图片转换成file格式
      convertBase64UrlToBlob(urlData){
        var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
        //处理异常,将ascii码小于0的转换为大于0
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/png'});
      },
      //判断客户端
      browser(){
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          return "iPhone";
        } else if (/(Android)/i.test(navigator.userAgent)) {
          return "Android";
        } else {
          return "PC";
        }
      },
      //iphone图片预览
      imgPreview (file) {
        let self = this;
        let Orientation;
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function () {
          Orientation = Exif.getTag(this, 'Orientation');
        });
        // 看支持不支持FileReader
        if (!file || !window.FileReader) return;

        if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于100K,是就直接上传，反之压缩图片
            if (this.result.length <= (100 * 1024)) {
              self.images.push(this.result);
              self.imgs.push(self.convertBase64UrlToBlob(this.result));
            } else {
              img.onload = function () {
                let data = self.compress(img, Orientation);
                self.images.push(data);
                self.imgs.push(self.convertBase64UrlToBlob(data));
              }
            }
          }
        }
      },
      isPhoneNo(phone) {  //手机号验证
        var pattern = /^1[34578]\d{9}$/;
        return pattern.test(phone);
      },
      verifyPassword(pwd) {//密码验证
        let pattern = /^[A-Za-z_0-9]{6,16}$/;
        return pattern.test(pwd);
      },
      //旋转图片
      rotateImg(img, direction, canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0;
        const max_step = 3;
        if (img == null) return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height;
        let width = img.width;
        let step = 2;
        if (step == null) {
          step = min_step;
        }
        if (direction == 'right') {
          step++;
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step);
        } else {
          step--;
          step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        let degree = step * 90 * Math.PI / 180;
        let ctx = canvas.getContext('2d');
        switch (step) {
          case 0:
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0);
            break;
          case 1:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, 0, -height);
            break;
          case 2:
            canvas.width = width;
            canvas.height = height;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, -height);
            break;
          case 3:
            canvas.width = height;
            canvas.height = width;
            ctx.rotate(degree);
            ctx.drawImage(img, -width, 0);
            break;
        }
      },
      compress(img, Orientation) {
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        //瓦片canvas
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
          console.log("大于400万像素")
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        //铺底色
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制
        let count;
        if ((count = width * height / 1000000) > 1) {
          console.log("超过100W像素");
          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
          //计算每块瓦片的宽和高
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        ctx.drawImage(img, 0, 0, width, height);

        //修复ios上传图片的时候 被旋转的问题
        if (!!Orientation && Orientation != 1) {

          switch (Orientation) {
            case 6://需要顺时针（向左）90度旋转
              this.rotateImg(img, 'left', canvas);
              break;
            case 8://需要逆时针（向右）90度旋转
              this.rotateImg(img, 'right', canvas);
              break;
            case 3://需要180度旋转
              this.rotateImg(img, 'right', canvas);//转两次
              this.rotateImg(img, 'right', canvas);
              break;
          }
        }    //进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.1);
        console.log('压缩前：' + initSize);
        console.log('压缩后：' + ndata.length);
        console.log('压缩率：' + (100 * (initSize - ndata.length) / initSize) + "%");
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
        return ndata;

      },
      //删除图片
      delImage(index) {
        let file = document.getElementById('up_img');
        file.value = '';
        this.imgs.splice(index, 1);
        this.images.splice(index, 1);
      }
    }
  }
</script>

<style scoped>
  .cont {
    margin-top: 1.8rem;
    padding: 0 0.4rem 0.8rem 0.4rem;
    background-color: #fff;
  }

  .up-img {
    height: 4.6rem;
    overflow: hidden;
    position: relative;
    background-color: #fff;
  }

  .up-img .up-btn {
    position: relative;
    margin-left: 0.4rem;
    width: 3.6rem;
    height: 3.6rem;
  }

  .up-img .up-btn input {
    width: 3.6rem;
    height: 3.6rem;
    opacity: 0;
    position: absolute;
    z-index: 99;
  }

  .up-img .up-btn img {
    position: absolute;
    z-index: 9;
    top: 0;
    left: 0;
    width: 3.6rem;
    height: 3.6rem;
  }

  .up-img .imgs > ul > li {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 0.3rem;
    width: 3.6rem;
    height: 3.6rem;
    border: 1px solid #ccc;
  }

  .imgs > ul > li > img:first-child {
    width: 100%;
    height: auto;
    max-height: 3.6rem;
  }

  .imgs > ul > li .del-img {
    width: 0.8rem;
    height: 0.8rem;
    top: -0.3rem;
    right: -0.3rem;
    z-index: 999;
    position: absolute;
  }

  .btn {
    margin-top: 1rem;
    border-radius: 0.2rem;
    width: 100%;
    color: #fff;
    padding: 0.4rem 0;
    text-align: center;
    background-color: #B4282D;
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
</style>
