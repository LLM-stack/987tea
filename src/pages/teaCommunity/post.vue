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

    <!--<dropzone id="myVueDropzone" url="www.com" :vdropzone-success="showSuccess">-->
    <!--&lt;!&ndash; Optional parameters if any! &ndash;&gt;-->
    <!--<input type="hidden" name="token" value="xxx">-->
    <!--</dropzone>-->

    <div class="tags flex-alig-center lm-margin-t-sm" @click="choiceTag(1)">
      <span class="flex-alig-center lm-margin-r-sm">
        <img src="../../assets/images/teaCommunity/tag.png"/>
        标签
      </span>
      <span class="lm-margin-r-xs lm-text-grey">{{ isSelect }}</span>
    </div>

    <transition name="drop">
      <div class="dialog" v-if="dialog">
        <div class="btn-group flex-between">
          <div @click="choiceTag(0)">取消</div>
          <div @click="choiceTag(1)">确定</div>
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
        options: [
          {
            label: '#红茶#',
            value: '#红茶#'
          },
          {
            label: '#绿茶#',
            value: '#绿茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普sssssw洱茶#'
          }
        ],
        typeId: 1
      }
    },
    methods: {
      showSuccess(file) {
        console.log('上传成功！' + file)
      },
      //选中话题标签
      choiceTag(i){
        if (i) {
          this.dialog = !this.dialog
        } else {
          this.dialog = false;
          this.isSelect = '请选择标签'
        }
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
        }
        ;
        let cont = new FormData();
        cont.append("Content", this.content);
        cont.append("Title", this.title);
        cont.append("TypeId", this.typeId);

        this.axios({
          url: this.url + '/api/CM_Theme/CreateTheme',
          method: 'post',
          data: cont,
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}
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
        //话题标题
        if (!!this.$store.state.themeTitle) {
          this.title = this.$store.state.themeTitle;
        }
        //话题内容
        if (!!this.$store.state.themeContent) {
          this.content = this.$store.state.themeContent;
        }
        //判断选择的话题标签是否为空
        if (!!this.$store.state.themeTags) {
          let tags = this.$store.state.themeTags.split('&');
          this.typeId = tags[0];
          this.tagName = tags[1];
        }
      })
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
    height: 40%;
    overflow: auto;
    z-index: 9999;
    background-color: #fff;
  }

  .dialog .btn-group {
    border-top: 1px solid #eee;
    text-align: center;
    padding: 0.4rem 0.8rem;
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
