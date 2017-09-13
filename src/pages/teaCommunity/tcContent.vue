<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">茶生活</div>
    </Mheader>

    <div class="content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="user flex-alig-center">
        <div class="user-avater">
          <img :src="themeDetail.HeaderImg" />
        </div>
        <div class="user-name">
          <div>{{themeDetail.UName}}</div>
          <!-- <div class="lm-font-xs lm-text-grey lm-margin-t-xs">用户签名</div> -->
        </div>
      </div>
      <div class="content-p lm-font-sm">
        <h1 class="lm-text-black lm-font-defult">{{themeDetail.Title}}</h1>
         {{'#'+themeDetail.TTName+'# '+themeDetail.Contents}}
      </div>
      <div class="content-img flex-alig-center">
        <div v-for="(img,idx) in themeImgs" :key="idx">
          <img :src="img" @click="enlarge(idx)" />
        </div>
      </div>
      <div class="content-reply lm-margin-t-sm lm-padding-t-sm flex-alig-center">
        <div class="re-l flex-alig-center">
          <img src="../../assets/images/teaCommunity/time.png" />
          <span>{{themeDetail.CreateTime |format }}</span>
        </div>
        <div class="re-r flex-alig-center">
          <div class="flex-alig-center lm-margin-l">
            <img src="../../assets/images/teaCommunity/look.png" />
            <span>{{themeDetail.SeeCount}}</span>
          </div>
          <div class="flex-alig-center lm-margin-l">
            <img src="../../assets/images/teaCommunity/reply.png" />
            <span>{{themeDetail.CommentCount}}</span>
          </div>
          <div class="flex-alig-center lm-margin-l" @click.stop="ding">
            <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png" />
            <img v-show="isding" src="../../assets/images/teaCommunity/isding.png" />
            <span :class="{isding:isding}">{{themeDetail.FabulouCount}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="comment-list lm-margin-t-sm" v-if="commentBackList.length>0">
      <div class="title lm-font-sm">评论</div>
      <div class="comment" v-for="(cb,index) in commentBackList" :key="index">
        <div class="user flex-alig-center">
          <div class="flex-alig-center">
            <div class="user-avater">
              <img :src="cb.uHeaderImg" />
            </div>
            <div class="user-name">
              <div>{{cb.uNickname}}</div>
              <div class="lm-font-xs lm-text-grey lm-margin-t-xs">{{cb.createtime | format}}</div>
            </div>
          </div>
          <div class="toreply flex-alig-center">
            <!-- <span class="lm-font-sm" @click.stop="ding">
                  <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
                  <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
                  <span :class="{isding:isding}">156</span>
                </span> -->
            <span>
              <img src="../../assets/images/teaCommunity/reply.png" @click="reply(1,cb.id,cb.uNickname)" />
            </span>
          </div>
        </div>
        <div class="content-p lm-font-sm">
          <span v-if="!!cb.upUid">回复了
            <span class="font-black">{{cb.upUNickname}}：</span>
          </span> {{cb.contents}}
        </div>
      </div>
      <!--加载中。。。-->
      <div class="loading" v-show="isLoading">
        <mt-spinner :type="3" color="#999"></mt-spinner>
        <span class="lm-margin-l-sm lm-text-grey">加载中...</span>
      </div>
    </div>
    <div class="no-comment lm-text-grey" v-else>
      暂无评论
    </div>
    <div class="reply-box">
      <div @click="reply(1)">来说两句吧...</div>
    </div>

    <!-- 查看大图 -->
    <div class="model" @click="closeModel" v-show="model">
      <mt-swipe :show-indicators="false" :auto="0" :defaultIndex="bigPicIdx">
        <mt-swipe-item v-for="(item,index) in bigPic" :key="index">
          <img :src="item" />
        </mt-swipe-item>
      </mt-swipe>
      <!-- <span>{{(bigPicIdx+1)+'/'+bigPic.length}}</span> -->
    </div>

    <transition name="drop">
      <div class="dialog" v-if="dialog">
        <div class="title">
          回复{{userName}}
        </div>
        <div class="content">
          <textarea class="box-text lm-font-sm" placeholder="来说点什么吧" maxlength="2000" v-model="content"></textarea>
          <span class="word-num ">还可以输入{{ wordNum }}个字</span>
        </div>
        <div class="btn-group">
          <div :class="{disableTap:posting}" @click="addCommentBack()">回复</div>
          <div @click="reply(0)">取消</div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import Mheader from '../../components/Mheader'
import { Toast } from 'mint-ui'
import { formatDate } from '../../assets/js/Date.js'//时间显示格式转换js

export default {
  components: {
    Mheader
  },
  data() {
    return {
      model: false,
      bigPic: [],//查看大图的数组
      bigPicIdx: 0,//打开时默认图片索引
      isding: false,
      dialog: false,
      content: '',
      themeDetail: '',//话题详情实体
      themeImgs: [],//话题图片
      commentBackList: [],//评论信息
      pageIndex: 0,//评论页码
      loading: false,
      isLoading: false,
      upId: '',//上级回复编号
      userName: '帖子',//用户姓名
      posting: false
    }
  },
  filters: {
    format(val) {
      return formatDate(val);
    }
  },
  methods: {
    ding() {
      if (this.isding) {
        this.cancelFabulous();

      } else {
        this.addFabulous();
      }

    },
    //加载更多
    loadMore() {
      this.loading = true;
      this.isLoading = true;
      this.pageIndex++;
      this.getCommentBack();
    },
    //点击查看大图
    enlarge(idx) {
      this.bigPic = this.themeImgs;
      this.bigPicIdx = idx;
      this.model = true;
    },
    //关闭预览大图
    closeModel() {
      this.bigPicIdx = 0;
      this.bigPic = [];
      this.model = false;
    },
    reply(i, id, name) {
      if (i) {
        if (!!id && !!name) {
          this.upId = id;
          this.userName = name;
        } else {
          this.upId = '';
          this.userName = '帖子';
        }
        this.dialog = true
      } else {
        //取消清除输入的未评论的内容
        this.content = '';
        this.dialog = false
      }
    },
    //获取话题详情
    getThemeDetail() {
      this.axios({
        url: this.url + '/api/CM_Theme/GetDetailByThemeId?themeId=' + this.$route.params.themeId,
        method: 'get',
        headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }
      }).then((res) => {
        if (res.data.Code == 200) {
          this.themeDetail = res.data.Data;
          if (this.themeDetail.IsFabulous) {
            this.isding = true;
          }
          if (!!this.themeDetail.Images) {
            this.themeImgs = this.themeDetail.Images.split(',');
          }
        }
        if (res.data.Code == 500) {
          let instance = Toast(res.data.Data);
          this.posting = true;
          setTimeout(() => {
            instance.close();
            this.$router.push({ path: '/tcHome' })
          }, 2000);
        }
      })
    },
    //获取评论信息
    getCommentBack() {
      this.axios.get(this.url + '/api/CM_CommentBack/GetCommentBacksByThemeId?id=' + this.$route.params.themeId + '&index=' + this.pageIndex + '&onlyAuthor=false&desc=true&authorId=' + this.themeDetail.Auditor).then((res) => {
        if (res.data.Code == 200) {
          if (!!res.data.Data) {
            if (res.data.Data.length > 0) {
              for (let i = 0; i < res.data.Data.length; i++) {
                this.commentBackList.push(res.data.Data[i])

              }
              this.loading = false;
            } else {
              this.loading = true;
            }
          } else {
            this.loading = true;
          }
          this.isLoading = false;
        }
      })
    },
    //添加回复
    addCommentBack() {
      this.posting = true;
      if (!!!this.content) {
        Toast("评论的内容不能为空");
        this.posting = false;
        return;
      }
      this.axios({
        url: this.url + '/api/CM_CommentBack/SubmitBack',
        method: 'post',
        data: { text: this.content, UpId: this.upId, ThemeId: this.themeDetail.Id },
        headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }

      }).then((res) => {
        if (!!res) {
          this.posting = false;
          if (res.data.Code == 200) {
            Toast(res.data.Data);
            this.reply(0);
            this.pageIndex = 1;//设置默认从第一页开始加载
            this.commentBackList = [];//先清空原先的评论
            this.getCommentBack();
          } else {
            Toast(res.data.Data);
          }
        }
      })
    },
    //增加点赞
    addFabulous() {
      this.axios({
        url: this.url + '/api/CM_Fabulous/Praise',
        method: 'post',
        data: { themeId: this.themeDetail.Id },
        headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }

      }).then((res) => {
        if (!!res) {
          if (res.data.Code == 200) {
            this.themeDetail.FabulouCount++;
            this.isding = !this.isding
            Toast(res.data.Data);
          } else {
            Toast(res.data.Data);
          }
        }
      })
    },
    //取消点赞
    cancelFabulous() {
      this.axios({
        url: this.url + '/api/CM_Fabulous/CancelPraise',
        method: 'post',
        data: { themeId: this.themeDetail.Id },
        headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }

      }).then((res) => {
        if (!!res) {
          if (res.data.Code == 200) {
            this.themeDetail.FabulouCount--;
            this.isding = !this.isding
            Toast(res.data.Data);
          } else {
            Toast(res.data.Data);
          }
        }
      })
    }
  },
  mounted() {
    this.$nextTick(function () {

    })
  },
  created() {
    this.getThemeDetail();
    if (!!this.$route.query.info) {
      let temp = this.$route.query.info.split('-');
      this.reply(1, temp[0], temp[1]);
    }
  },
  computed: {
    wordNum() {
      return 2000 - this.content.length
    }
  }
}
</script>

<style scoped>
.isding {
  color: #D81E06;
}

.font-black {
  color: #000;
}

.content {
  background-color: #fff;
  padding: 0.4rem;
  margin-top: 0.4rem;
}

.content .user .user-avater {
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.5rem;
}

.content .content-p {
  margin: 0.2rem 0;
  word-break: break-all;
  color: #777;
  line-height: 0.9rem;
}
.content .content-p > h1{
  font-weight: 600;
  margin-bottom: 0.2rem;
}
.content .content-img {
    width: 100%;
  }

 .mine  .content .content-img > div {
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    width: 25%;
    height: 3.5rem;
    overflow: hidden;
    background-color: #eee;
    margin-top: 0.2rem;
  }

.content .content-img > div + div {
    margin-left: 0.2rem;
  }

.content-img>div img {
  height: auto;
}

.content .content-reply {
  font-size: 0.55rem;
  color: #999;
  border-top: 1px solid #E1E1E1;
  justify-content: space-between;
}


/*评论列表*/

.comment-list {
  border-top: 1px solid #eee;
  margin-bottom: 2.4rem;
  background-color: #fff;
}

.comment-list .title {
  padding: 0.4rem;
  border-bottom: 1px solid #eee;
}

.comment-list .comment {
  padding: 0.4rem;
}

.comment-list .comment+.comment {
  border-top: 1px solid #eee;
}

.comment .content-p {
  line-height: 0.9rem;
  padding-left: 2rem;
  margin: 0.2rem 0;
  word-break: break-all;
  color: #777;
}

.content-p>h1 {
  font-weight: 600;
  word-break: break-all;
}

.content-reply img {
  margin-right: 0.1rem;
  width: 0.6rem;
  height: 0.6rem;
  vertical-align: sub;
}

.comment .user {
  justify-content: space-between;
}

.reply-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.4rem;
  border-top: 1px solid #eee;
  background-color: #fff;
}

.comment .user .toreply img {
  margin-left: 0.5rem;
  width: 0.7rem;
  width: 0.7rem;
}

.comment .user .user-avater {
  width: 1.6rem;
  height: 1.6rem;
  margin-right: 0.5rem;
}

.comment .content-p {
  padding-left: 2rem;
  margin: 0.2rem 0;
  color: #777;
}

.content-reply img {
  margin-right: 0.1rem;
  width: 0.6rem;
  height: 0.6rem;
  vertical-align: middle;
}

.reply-box {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.4rem;
  border-top: 1px solid #eee;
  background-color: #fff;
}

.reply-box div {
  padding: 0.2rem;
  text-align: center;
  color: #999;
  border-radius: 0.5rem;
  background-color: #eee;
  margin: 0 auto;
}



/*暂无评论*/

.no-comment {
  padding: 2rem 0;
  text-align: center;
}



/*弹出评论框*/

.dialog {
  padding: 0.5rem 0.2rem;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 922;
  background-color: #fff;
}

.dialog .title {
  margin-bottom: 0.5rem;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.dialog .content {
  position: relative;
  color: #777;
  line-height: 1rem;
  font-size: 0.65rem;
  max-height: 15rem;
}

.dialog .btn-group {
  text-align: center;
  color: #fff;
  padding: 0 0.4rem;
  margin-top: 1rem;
}

.dialog .btn-group>div {
  margin-top: 0.5rem;
  padding: 0.3rem 1rem;
  border-radius: 0.2rem;
}

.dialog .btn-group>div:first-child {
  background-color: #B4272D;
}

.dialog .btn-group>div:last-child {
  background-color: #999;
}

.drop-enter-active,
.drop-leave-active {
  transition: all .4s;
}

.drop-enter,
.drop-leave-active {
  left: -100%;
}

.content .box-text {
  font-family: "Microsoft YaHei";
  padding: 0.4rem;
  width: 100%;
  height: 7rem;
  border-radius: 0.2rem;
  border: 1px solid #E3E3E3;
  outline: none;
  resize: none;
}

.content .word-num {
  color: #999;
  bottom: -0.4rem;
  right: 0.5rem;
  position: absolute;
}

.model {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.9);
}

.model img {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  height: auto;
}
</style>
