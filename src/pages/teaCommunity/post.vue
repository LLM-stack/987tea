<template>
  <div class="container">
    <Mheader>
      <div slot="title">发贴</div>
      <div slot="info" :class="{disableTap:posting}" @click="release">发布</div>
    </Mheader>

    <div class="title">
      <input type="text" placeholder="标题（选填）" v-model="title">
    </div>
    <div class="box">
      <textarea class="box-text" placeholder="来说点什么吧" maxlength="2000" v-model="content"></textarea>
      <span class="word-num lm-font-xs">还可以输入{{ wordNum }}个字</span>
    </div>
    <div class="flex-alig-center up-img">
        <div class="imgs" v-show="images.length >0">
              <ul class="flex-alig-center">
                <li v-for="(img,idx) in images" :key="idx">
                  <img :src="img"/>
                  <img class="del-img" src="../../assets/images/teaCommunity/del.png"  @click='delImage(idx)'/>
                </li>
              </ul>
        </div>
        <div class="up-btn" v-show="images.length < 4">
          <input  type="file" id="up_img"  @change="previewImage"/>
          <img src="../../assets/images/teaCommunity/upimg.png" />
        </div>
    </div>
    <!--<dropzone id="myVueDropzone" url="www.com" :vdropzone-success="showSuccess">-->
    <!--&lt;!&ndash; Optional parameters if any! &ndash;&gt;-->
    <!--<input type="hidden" name="token" value="xxx">-->
    <!--</dropzone>-->

    <div class="tags flex-alig-center lm-margin-t-sm" @click="choiceTag(1)">
      <span class="flex-alig-center lm-margin-r-sm">
        <img src="../../assets/images/teaCommunity/tag.png"/>
        标签
      </span>
      <span class="lm-margin-r-xs lm-text-grey">{{ selectValue }}</span>
    </div>

    <transition name="drop">
      <div class="dialog" v-if="dialog">
        <div class="btn-group flex-between">
          <div @click="choiceTag(0)">取消</div>
          <div @click="choiceTag(2)">确定</div>
        </div>
        <mt-radio
          v-model="isSelect"
          :options="options">
        </mt-radio>
      </div>
    </transition>


    <Mfooter :worldCurrent="true"></Mfooter>

  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'
  import {Toast} from 'mint-ui'
  // import Dropzone from 'vue2-dropzone'

  export default {
    components: {
      Mheader,
      Mfooter
      // Dropzone
    },
    data(){
      return {
        title: '',
        content: '',
        posting: false,
        dialog: false,
        isSelect: '请选择标签',
        options: [],//标签选项
        typeId: 0,//话题标签Id
        images:[],//预览图片集合
        imgs:[]//file文件集合
      }
    },
    methods: {
       //获取话题类型
      getThemeType(){
        this.axios.get(this.url + '/api/CM_Theme/GetThemeType').then((res)=>{
             if(res.data.Code==200){
              if(!!res.data.Data){
                res.data.Data.forEach(function(element) {
                  let op={
                    label:'#'+element.Name+'#',
                    value:element.Id.toString()+'&#'+element.Name+'#'
                  }
                  this.options.push(op);
                }, this);
              }
            }
          })
      },
      //选中话题标签
      choiceTag(i){
        if (i) {
          if(i===2){
            if(this.isSelect=='请选择标签'){
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
      previewImage(e){
        let  files = e.target.files || e.dataTransfer.files;
        if(!files.length){
          return false;
        } 
        if(this.images.length>=4){
          Toast("最多只能上传4张图片");
          return false;
        }  
          
        for(let i=0;i<files.length;i++){          
          let reader=new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload=f=>{
            this.images.push(f.target.result);
          }
          this.imgs.push(files[i]);
        }

      },
      //删除图片
      delImage(index){  
        let file=document.getElementById('up_img'); 
        file.value='';   
        this.imgs.splice(index,1);
        this.images.splice(index,1);
      },
      //发布
      release(){
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
        let cont = new FormData();
        cont.append("Content", this.content);
        cont.append("Title", this.title);
        cont.append("TypeId", this.typeId);
        this.imgs.forEach((item)=>{
            cont.append("myFile[]",item)
        })

        this.axios({
          url: this.url + '/api/CM_Theme/CreateTheme',
          method: 'post',
          data: cont,
          headers: {'Content-Type':'multipart/form-data','Authorization': 'BasicAuth ' + localStorage.lut}
        }).then((res) => {
          if (!!res && res.data.Code == 200) {
            let instance = Toast({
              message: '发布成功'
            });
            setTimeout(() => {
              this.posting = false;
              instance.close();
              this.$router.replace({path: '/tcHome'});
            }, 1500);
          }
        })
      }
    },
    mounted(){
      this.$nextTick(() => {
        this.getThemeType();
      })
    },
    computed: {
      wordNum(){
        return 2000 - this.content.length
      },
      //标签选中的计算属性
      selectValue(){
        if(this.isSelect=='请选择标签'){
          return '请选择标签';
        }else{
          let values =this.isSelect.split('&');
          this.typeId=values[0];
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

  .title > input {
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

  .tags > span:first-child img {
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
  .up-img{
    height: 4.6rem;
    overflow: hidden;
    border-top: 1px solid #eee;
    position: relative;
    background-color: #fff;
  }
  .up-img .up-btn{
    position: relative;
    margin-left: 0.4rem;
    width: 3.6rem;
    height: 3.6rem;
  }
  .up-img .up-btn input{
    width: 3.6rem;
    height: 3.6rem;
    opacity: 0;
    position: absolute;
    z-index: 99;
  }
  .up-img .up-btn img{
    position: absolute;
    z-index: 9;
    top:0;
    left: 0;
    width: 3.6rem;
    height: 3.6rem;
  }
  .up-img .imgs >ul >li{
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 0.3rem;
    width: 3.6rem;
    height: 3.6rem;
    border: 1px solid #ccc;
    border-radius: 0.2rem;
  }
  .imgs >ul >li >img:first-child{
    width: 100%;
    height: auto;
    max-height: 3.6rem;
  }
  .imgs >ul >li .del-img{
    width: 0.8rem;
    height: 0.8rem;
    top:-0.3rem;
    right: -0.3rem;
    z-index: 999;
    position: absolute;
  }
  .drop-enter-active, .drop-leave-active {
    transition: all .4s;
  }

  .drop-enter, .drop-leave-active {
    bottom: -100%;
  }

  .icon-success {
    background-image: url("../../assets/images/teaCommunity/sucess.png");
  }
</style>
