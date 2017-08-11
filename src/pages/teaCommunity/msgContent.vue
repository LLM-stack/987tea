<template>
  <div class="container">
    <Mheader>
      <div slot="title">{{title}}</div>
    </Mheader>
    <div class="comment-list lm-margin-t-sm" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <div class="comment" v-for="(info,index) in infoList" :key="index">
        <div class="user flex-alig-center">
          <div class="flex-alig-center">
            <div class="user-avater" v-if="!!info.HeaderImg">
              <img :src="info.HeaderImg" />
            </div>
            <div class="user-avater" v-else>
              <img src="../../assets/images/myInfo/toux.jpg" />
            </div>
            <div class="user-name">
              <div>{{info.Nickname}}</div>
              <div class="lm-font-xs lm-text-grey lm-margin-t-xs">{{info.CreateTime}}</div>
            </div>
          </div>
          <div class="toreply flex-alig-center">
            <!-- <span class="lm-font-sm" @click.stop="ding">
                <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
                <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
                <span :class="{isding:isding}">156</span>
              </span> -->
            <span v-show="typeId!=2">
              <img src="../../assets/images/teaCommunity/reply.png" @click="jumpBack(info.ThemeId,info.BackId,info.Nickname)" />
            </span>
          </div>
        </div>
        <div class="content-p lm-font-sm">
          <span v-show="typeId!=2">回复了
            <span class="lm-text-red">你</span>：</span>{{info.Content}}
        </div>
      </div>
      <!--加载中。。。-->
      <div class="loading" v-show="isLoading">
        <mt-spinner :type="3" color="#999"></mt-spinner>
        <span class="lm-margin-l-sm lm-text-grey">加载中...</span>
      </div>
    </div>
  </div>
</template>

<script>
import Mheader from '../../components/Mheader'

export default {
  components: {
    Mheader
  },
  data() {
    return {
      title: '所有评论',
      infoList: [],//消息集合
      typeId: '',
      pageIndex: 0,//当前页码
      loading: false,//是否下拉刷新
      isLoading: false,//是否显示加载中...
    }
  },
  methods: {
    //加载更多
    loadMore() {
      this.loading = true;
      this.isLoading = true;
      this.pageIndex++;
      if (!!this.typeId && this.typeId == 0) {
        this.getReplyInfo();
      } else if (!!this.typeId && this.typeId == 2) {
        this.getSystemInfo();
      }

    },
    //获取评论回复信息  
    getReplyInfo() {
      this.axios({
        url: this.url + '/api/CM_Information/GetListForReply?index=' + this.pageIndex,
        method: 'get',
        headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }

      }).then((res) => {
        if (!!res.data.Data) {
          if (res.data.Data.length > 0) {
            for (let i = 0; i < res.data.Data.length; i++) {
              this.infoList.push(res.data.Data[i]);
            }
            this.loading = false;
          } else {
            this.loading = true;
          }
        } else {
          this.loading = true;
        }
        this.isLoading = false;
      })
    },
    //获取系统消息
    getSystemInfo() {
      this.axios({
        url: this.url + '/api/CM_Information/GetListForSystem_Vue?index=' + this.pageIndex,
        method: 'get',
        headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }

      }).then((res) => {
        if (!!res.data.Data) {
          if (res.data.Data.length > 0) {
            for (let i = 0; i < res.data.Data.length; i++) {
              this.infoList.push(res.data.Data[i]);
            }
            this.loading = false;
          } else {
            this.loading = true;
          }
        } else {
          this.loading = true;
        }
        this.isLoading = false;
      })
    },
    //跳转话题详情的回复
    jumpBack(themeId, backId, userName) {
      this.$router.push({ path: '/tcContent/' + themeId + '?info=' + backId + '-' + userName })
    }

  },
  created() {
    if (!!this.$route.params.typeId) {
      this.typeId = this.$route.params.typeId;
      if (this.typeId == 2) {
        this.title = '系统消息';
      }
    }
  }
}
</script>

<style scoped>
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

.comment .user {
  justify-content: space-between;
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

.content-p>h1 {
  font-weight: 600;
}

.content-reply img {
  margin-right: 0.1rem;
  width: 0.6rem;
  height: 0.6rem;
}
</style>
