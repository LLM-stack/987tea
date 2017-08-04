<template>
  <div class="container">
    <Mheader>
      <div slot="title">发贴</div>
      <div slot="info" :class="{disableTap:posting}" @click="release">发布</div>
    </Mheader>

    <div class="title">
      <input type="text" placeholder="标题（选填）">
    </div>
    <div class="box">
      <textarea class="box-text" placeholder="来说点什么吧" maxlength="2000" v-model="content"></textarea>
      <span class="word-num lm-font-xs">还可以输入{{ wordNum }}个字</span>
    </div>

    <!--<dropzone id="myVueDropzone" url="www.com" :vdropzone-success="showSuccess">-->
    <!--&lt;!&ndash; Optional parameters if any! &ndash;&gt;-->
    <!--<input type="hidden" name="token" value="xxx">-->
    <!--</dropzone>-->
    <router-link to="/Tags">
      <div class="tags flex-alig-center lm-margin-t-sm">
      <span class="flex-alig-center lm-margin-r-sm">
        <img src="../../assets/images/teaCommunity/tag.png"/>
        标签
      </span>
        <span class="lm-margin-r-xs lm-text-grey">#白茶#</span>
      </div>
    </router-link>

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
    }, data(){
      return {
        content: '',
        posting: false
      }
    },
    methods: {
      showSuccess(file) {
        console.log('上传成功！' + file)
      },
      //发布
      release(){
        this.posting = true;
        if (!!!this.content) {
          Toast('请填写内容后在发布！');
          return;
        }
        ;
        let cont = new FormData();
        cont.append("Content", this.content);
        cont.append("Title", 'fffffff');
        cont.append("TypeId", '1');

        this.axios({
          url: this.url + '/api/CM_Theme/CreateTheme',
          method: 'post',
          data: cont,
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}
        }).then((res) => {
          if (!!res && res.data.Code == 200) {
            let instance = Toast({
              message: '发布成功',
              duration: 1500
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
    computed: {
      wordNum(){
        return 2000 - this.content.length
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
    color: #ccc;
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

  .icon-success {
    background-image: url("../../assets/images/teaCommunity/sucess.png");
  }
</style>
