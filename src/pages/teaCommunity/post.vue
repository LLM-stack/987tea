<template>
  <div class="container">
    <Mheader>
      <div slot="title">发贴</div>
      <div slot="info" :class="{disableTap:posting}" @click="release">发布</div>
    </Mheader>
  
    <div class="title ">
      <input class="lm-font-sm" type="text" placeholder="标题（选填）" v-model="title">
    </div>
    <div class="box">
      <textarea class="box-text lm-font-sm" placeholder="来说点什么吧" maxlength="2000" v-model="content"></textarea>
      <span class="word-num ">还可以输入{{ wordNum }}个字</span>
    </div>
    <div class="flex-alig-center up-img">
      <div class="imgs" v-show="images.length >0">
        <ul class="flex-alig-center">
          <li v-for="(img,idx) in images" :key="idx">
            <img :src="img" />
            <img class="del-img" src="../../assets/images/teaCommunity/del.png" @click='delImage(idx)' />
          </li>
        </ul>
      </div>
      <div class="up-btn" v-show="images.length < 4">
        <input type="file" id="up_img" accept="image/*" @change="previewImage" />
        <img src="../../assets/images/teaCommunity/upimg.png" />
      </div>
    </div>
  
    <div class="tags flex-alig-center lm-margin-t-sm" @click="choiceTag(1)">
      <span class="flex-alig-center lm-margin-r-sm">
        <img src="../../assets/images/teaCommunity/tag.png" /> 标签
      </span>
      <span class="lm-margin-r-xs lm-text-grey">{{ selectValue }}</span>
    </div>
  
    <transition name="drop">
      <div class="dialog" v-if="dialog">
        <div class="btn-group flex-between">
          <div @click="choiceTag(0)">取消</div>
          <div @click="choiceTag(2)">确定</div>
        </div>
        <mt-radio v-model="isSelect" :options="options">
        </mt-radio>
      </div>
    </transition>
  
    <Mfooter :worldCurrent="true"></Mfooter>
  
  </div>
</template>

<script>
import Mheader from '../../components/Mheader'
import Mfooter from '../../components/Mfooter'
import { Toast } from 'mint-ui'
import Exif from 'exif-js'
import { Indicator } from 'mint-ui';
// import Dropzone from 'vue2-dropzone'

export default {
  components: {
    Mheader,
    Mfooter
    // Dropzone
  },
  data() {
    return {
      title: '',
      content: '',
      posting: false,
      dialog: false,
      isSelect: '请选择标签',
      options: [],//标签选项
      typeId: 0,//话题标签Id
      images: [],//预览图片集合
      imgs: []//file文件集合
    }
  },
  methods: {
    //获取话题类型
    getThemeType() {
      this.axios.get(this.url + '/api/CM_Theme/GetThemeType').then((res) => {
        if (res.data.Code == 200) {
          if (!!res.data.Data) {
            res.data.Data.forEach(function (element) {
              let op = {
                label: '#' + element.Name + '#',
                value: element.Id.toString() + '&#' + element.Name + '#'
              }
              this.options.push(op);
            }, this);
          }
        }
      })
    },
    //选中话题标签
    choiceTag(i) {
      if (i) {
        if (i === 2) {
          if (this.isSelect == '请选择标签') {
            Toast("请选择标签");
            return;
          }
        }
        this.dialog = !this.dialog
      } else {
        this.dialog = false;
        this.isSelect = '请选择标签'
      }
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
        Indicator.close();
      }, 500)

    },
    //将base64的图片转换成file格式
    convertBase64UrlToBlob(urlData) {
      var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte            
      //处理异常,将ascii码小于0的转换为大于0  
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/png' });
    },
    //判断客户端
    browser() {
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        return "iPhone";
      } else if (/(Android)/i.test(navigator.userAgent)) {
        return "Android";
      } else {
        return "PC";
      }
    },
    //iphone图片预览
    imgPreview(file) {
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
      }
      //进行最小压缩  
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
    },
    //发布
    release() {
      this.posting = true;
      if (!!!this.content) {
        Toast({
          message: '请填写内容后在发布！',
          duration: 1500
        });
        setTimeout(() => {
          this.posting = false;
        }, 1500);
        return;
      };
      if (this.typeId == 0) {
        Toast("请选择话题标签");
        this.posting = false;
        return;
      }
      let cont = new FormData();
      cont.append("Content", this.content);
      cont.append("Title", this.title);
      cont.append("TypeId", this.typeId);
      this.imgs.forEach((item) => {
        cont.append("myFile[]", item)
      })

      this.axios({
        url: this.url + '/api/CM_Theme/CreateTheme',
        method: 'post',
        data: cont,
        headers: { 'Content-Type': 'multipart/form-data', 'Authorization': 'BasicAuth ' + localStorage.lut }
      }).then((res) => {
        if (!!res && res.data.Code == 200) {
          let instance = Toast({
            message: '发布成功'
          });
          setTimeout(() => {
            this.posting = false;
            instance.close();
            this.$router.replace({ path: '/tcHome' });
          }, 1500);
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getThemeType();
    })
  },
  computed: {
    wordNum() {
      return 2000 - this.content.length
    },
    //标签选中的计算属性
    selectValue() {
      if (this.isSelect == '请选择标签') {
        return '请选择标签';
      } else {
        let values = this.isSelect.split('&');
        this.typeId = values[0];
        return values[1];
      }

    }
  }
}
</script>

<style scoped>
.title {
  padding: 0.4rem 0;
}

.title>input {
  padding: 0.4rem;
  width: 100%;
  border: none;
}

.box {
  position: relative;
  padding: 0.4rem 0.4rem 1rem;
  background-color: #fff;
}

.box .box-text {
  font-family: "Microsoft YaHei";
  width: 100%;
  height: 7rem;
  border: none;
  outline: none;
  resize: none;
}

.box .word-num {
  color: #999;
  bottom: 0.3rem;
  right: 0.5rem;
  position: absolute;
}

.tags {
  background-color: #fff;
  padding: 0.4rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.tags>span:first-child img {
  margin-right: 0.2rem;
  width: 0.8rem;
  height: 0.8rem;
}

.dialog {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  max-height: 40%;
  overflow: auto;
  z-index: 9999;
  background-color: #fff;
}

.dialog .btn-group {
  border-top: 1px solid #eee;
  text-align: center;
  padding: 0.4rem 0.8rem;
}

.up-img {
  height: 4.6rem;
  overflow: hidden;
  border-top: 1px solid #eee;
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

.up-img .imgs>ul>li {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 0.3rem;
  width: 3.6rem;
  height: 3.6rem;
  border: 1px solid #ccc;
}

.imgs>ul>li>img:first-child {
  width: 100%;
  height: auto;
  max-height: 3.6rem;
}

.imgs>ul>li .del-img {
  width: 0.8rem;
  height: 0.8rem;
  top: -0.3rem;
  right: -0.3rem;
  z-index: 999;
  position: absolute;
}

.drop-enter-active,
.drop-leave-active {
  transition: all .4s;
}

.drop-enter,
.drop-leave-active {
  bottom: -100%;
}

.icon-success {
  background-image: url("../../assets/images/teaCommunity/sucess.png");
}
</style>
