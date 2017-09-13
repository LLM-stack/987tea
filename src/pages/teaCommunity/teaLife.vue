<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">茶圈子</div>
      <div class="msg" slot="info">
      </div>
    </Mheader>
    <div>
      <div class="title" :style="{backgroundImage: 'url(' + themeDetail.Images + ')'}">
        <h1>{{themeDetail.Title}}</h1>
      </div>
      <div class="content">
        <div class="user flex-between">
          <div class="flex-alig-center">
            <img :src="!!!themeDetail.HeaderImg?userHeadImg:themeDetail.HeaderImg" />
            <span class="lm-margin-l-sm">{{themeDetail.UName}}</span>
          </div>
          <div class="flex-alig-center">
            <div class="lm-margin-l fx" @click="checkLogin">分享</div>
            <div class="lm-margin-l watch">{{themeDetail.SeeCount}}</div>
            <div class="flex-alig-center lm-margin-l ding" @click="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png" />
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png" />
              <span :class="{isding:isding}">{{themeDetail.FabulouCount}}</span>
            </div>
          </div>
        </div>
        <div class="article lm-margin-t-sm" v-html="themeDetail.Contents">
          <!-- <img src="../../assets/images/goods/987tea_25.png" /> -->
        </div>
        <div :class="{'zan':isding,'nozan':!isding}" @click="ding">
        </div>
        <div class="zannum">
          <span>{{themeDetail.FabulouCount}}</span>
          <span class="fx" @click="checkLogin">分享</span>
        </div>
      </div>
      <div class="article-list lm-margin-t-sm">
        <div class="article-block flex-alig-center" v-for="(theme,index) in themeList" :key='index' @click="jumpDetail(theme.Id)">
          <div class="article-img">
            <img :src="theme.Images" />
          </div>
          <div class="article-p lm-margin-l-sm">
            <div class="article-p-title">{{theme.Title}}</div>
            <div class="flex-alig-center">
              <div class="lm-margin-l watch">{{theme.SeeCount}}</div>
              <div class="lm-margin-l ding">{{theme.FabulouCount}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box mode lm-margin-t-sm">
        <div class="box-title flex-alig-center">
          爆款推荐
        </div>
        <div class="mode-box">
          <Mmode v-for="(item,index) in productList" :key="item.ProductId" :index="index" :path="item.ProductId" :imgSrc="item.HeadImg" :productName="item.Name" :productPrice="item.SalePrice"></Mmode>
        </div>
      </div>
    </div>

    <!--弹窗MMP-->
    <Mdialog :dialog="dialog">
      <div slot="title">复制下面链接去分享</div>
      <div slot="content">{{ diaCont }}</div>
      <div slot="btn" @click="close">确定</div>
    </Mdialog>

    <Mfooter :worldCurrent='true'></Mfooter>
  </div>
</template>

<script>
import Mheader from '../../components/Mheader'
import Mfooter from '../../components/Mfooter'
import Mmode from '../../components/Mmode'
import Mdialog from '../../components/Mdialog'
import { Toast } from 'mint-ui'
import { MessageBox } from 'mint-ui';

export default {
  components: {
    Mheader,
    Mfooter,
    Mmode,
    Mdialog
  },
  data() {
    return {
      dialog: false,
      diaCont: '',
      bg: '',//背景图
      themeDetail: '',//话题详情
      themeList: [],//推荐话题集合
      tagId: '095280620b5e4a99982bf16032da3d78',//茶文化推荐商品标签Id
      productList: [],//推荐商品集合
      isding: false,
      userHeadImg: require("../../assets/images/home_03.png")//默认头像
    }
  },
  methods: {
    close() {
      this.dialog = false;
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
          this.isding = this.themeDetail.IsFabulous;
          this.getThemesByType();
        }
        if (res.data.Code == 500) {
          let instance = Toast(res.data.Data);
          setTimeout(() => {
            instance.close();
            this.$router.push({ path: '/tcHome' })
          }, 2000);
        }
      })
    },
    //获取该话题分类下的推荐话题
    getThemesByType() {
      this.axios({
        url: this.url + '/api/CM_Theme/GetThemeListByTypeId?tId=' + this.themeDetail.ThTypeId + '&sort=2&index=1',
        method: 'get',
      }).then((res) => {
        if (res.data.Code == 200) {
          res.data.Data.forEach((item, index) => {
            if (item.Id != this.themeDetail.Id) {
              if (index <= 6) {
                this.themeList.push(item);
              }
            }
          })

        }
      })
    },
    //获取茶文化的推荐商品
    getProductByTag() {
      this.axios({
        url: this.url + '/api/Product/HomeProducts',
        method: 'post',
        data: { tagId: this.tagId, pageIndex: 1, pageSize: 6 }
      }).then((res) => {
        if (res.data.Code == 200) {
          this.productList = res.data.Data;

        }
      })
    },
    //跳转话题详情
    jumpDetail(id) {
      this.$router.push({ path: '/tcHome/' + id })
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
    },
    //点赞
    ding() {
      if (this.isding) {
        this.cancelFabulous();
      } else {
        this.addFabulous();
      }

    },
    //登录验证
    checkLogin() {
      if (!!localStorage.lut) {
        this.axios.get(this.url + '/api/Login/CheckLogin?str=' + localStorage.lut).then((res) => {
          if (res.data.Code == 500) {
            //验证失败 清除localStorage
            localStorage.removeItem('lut');
            let instance = Toast('还未登录，请先登录');
            setTimeout(() => {
              instance.close();
              this.$router.replace({
                path: '/login/',
                query: { redirect: this.$router.currentRoute.fullPath }
              })
            }, 1000);
          } else {
            this.share();
          }
        })

      } else {
        let instance = Toast('还未登录，请先登录');
        setTimeout(() => {
          instance.close();
          this.$router.replace({
            path: '/login/',
            query: { redirect: this.$router.currentRoute.fullPath }
          })
        }, 1000);
      }
    },
    //分享
    share() {
      if (!!localStorage.lut) {
        this.axios({
          url: this.url + '/api/CM_Share/GetShareTocken?strThemeId=' + this.themeDetail.Id,
          method: 'get',
          headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }
        }).then((res) => {
          this.dialog = true;
          if (res.data.Code == 200) {
            this.diaCont = "http://www.987tea.com/#/teaLife/" + res.data.Data
          }
        })
      }
    }

  },
  mounted() {
    this.$nextTick(function() {
      this.getThemeDetail();
      this.getProductByTag();
    })
  }

}
</script>

<style scoped>
.isding {
  color: #D81E06;
}

.title {
  width: 100%;
  height: 8.4rem;
  padding: 0.4rem;
  color: #fff;
  position: relative;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.title>h1 {
  font-size: 0.75rem;
  width: 95%;
  left: 0.4rem;
  bottom: 0.4rem;
  position: absolute;
}

.content {
  padding: 0.4rem;
  background-color: #fff;
}

.content .user>div:first-child>img {
  width: 2rem;
  height: 2rem;
  border-radius: 0.2rem;
}

.content .user>div:last-child>div {
  font-size: 0.6rem;
  background-position: left;
  background-size: 0.7rem 0.7rem;
  background-repeat: no-repeat;
}

.content .user>div:last-child .fx {
  padding-left: 0.8rem;
  background-image: url("../../assets/images/teaCommunity/share.png");
}

.content .user>div:last-child .watch {
  padding-left: 0.8rem;
  background-image: url("../../assets/images/teaCommunity/look.png");
}

.content .user>div:last-child .ding img {
  width: 0.7rem;
  height: 0.7rem;
}

.content .article {
  font-size: 0.6rem;
  line-height: 0.85rem;
}

.article img {
  display: block;
  margin: 0.4rem auto;
  width: 9rem;
  height: auto;
}

.content .zan {
  margin: 2rem auto 0;
  border-radius: 50%;
  width: 1.8rem;
  height: 1.8rem;
  background-color: #B4282D;
  background-size: 0.8rem 0.8rem;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url("../../assets/images/teaCommunity/zan.png");
}

.content .nozan {
  margin: 2rem auto 0;
  border-radius: 50%;
  width: 1.8rem;
  height: 1.8rem;
  background-color: #ccc;
  background-size: 0.8rem 0.8rem;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url("../../assets/images/teaCommunity/zan.png");
}

.content .zannum {
  position: relative;
  text-align: center;
}

.zannum .fx {
  position: absolute;
  right: 0;
  font-size: 0.6rem;
  padding-left: 0.8rem;
  background-position: left;
  background-size: 0.7rem 0.7rem;
  background-repeat: no-repeat;
  background-image: url("../../assets/images/teaCommunity/share.png");
}

.article-list {
  padding: 0 0.4rem;
  background-color: #fff;
}

.article-list .article-block {
  height: 3.5rem;
  padding: 0.4rem 0;
}

.article-block .article-img {
  width: 5rem;
  height: 2.65rem;
}

.article-list .article-block+.article-block {
  border-top: 1px solid #ddd;
}

.article-block .article-p {
  height: 100%;
  position: relative;
}

.article-block .article-p .article-p-title {
  width: 10.4rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.article-p>div:last-child {
  position: absolute;
  right: 0;
  bottom: 0;
}

.article-p>div:last-child>div {
  font-size: 0.6rem;
  padding-left: 0.8rem;
  background-position: left;
  background-size: 0.7rem 0.7rem;
  background-repeat: no-repeat;
}

.article-p>div:last-child .watch {
  background-image: url("../../assets/images/teaCommunity/look.png");
}

.article-p>div:last-child .ding {
  background-image: url("../../assets/images/teaCommunity/ding.png");
}

.box {
  padding: 0.4rem;
  margin-bottom: 0.4rem;
  font-size: 0.7rem;
  background-color: #fff;
}

.box .box-title {
  font-weight: 600;
  font-size: 0.7rem;
  border: 1px solid #333;
  padding: 0.1rem 0;
  justify-content: center;
}
</style>
