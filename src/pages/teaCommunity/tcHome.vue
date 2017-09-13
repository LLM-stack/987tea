<template>
  <div class="container">
    <Mheader>
      <div slot="title">茶圈子</div>
      <div class="msg" slot="info">
        <router-link to="/Msgs">
          <img src="../../assets/images/teaCommunity/msg.png"/>
          <div v-show="infoCount>0" class="msg-num lm-text-red flex-alig-center"></div>
        </router-link>
      </div>
    </Mheader>
    <div class="banner">
      <mt-swipe :auto="4000" v-if="advList.length>0">
        <mt-swipe-item v-for="(item,index) in advList" :key="item.Id"><img :src="item.Img" @click="jump(item.AdUrl)"/>
        </mt-swipe-item>
      </mt-swipe>
      <div v-else>
        <img src="../../assets/images/teaCommunity/tc_02.png"/>
      </div>
    </div>
    <nav class="nav-bar">
      <div :class="{active:isNewest}" @click="newestActive">最新</div>
      <div :class="{active:isHot}" @click="hotActive">最热</div>
      <div v-for="(tt,index) in themeTypeList" :class="{active:tt.isactive}" @click="tabActive(index)" :key="tt.Id">
        {{tt.Name}}
      </div>
    </nav>
    <div class="clear"></div>
    <div class="forum-box"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div class="content" v-for="(theme,index) in themeList" :key="theme.Id">
          <div class="user flex-alig-center">
            <div class="user-avater">
              <img :src="!!!theme.HeaderImg?userHeadImg:theme.HeaderImg" />
            </div>
            <div class="user-name">
              <div>{{theme.UName}}</div>
              <!-- <div class="lm-font-xs lm-text-grey lm-margin-t-xs">用户签名</div> -->
            </div>
          </div>
        <router-link :to="{path:'/teaLife/'+ theme.Id}">
          <div class="content-p lm-font-sm">
            <h1 class="lm-text-black lm-font-defult">{{theme.Title}}</h1>
            <div>{{'#' + theme.TTName + '# ' }} <span v-html="theme.Contents"></span></div>

          </div>
        </router-link>

        <!-- <div class="content-img flex-alig-center" v-show="theme.Imgs.length>0" @click="goToContent(theme.Id)">
          <div v-for="(img,idx) in theme.Imgs" :key="idx"><img :src="img" @click.stop="enlarge(index,idx)"/></div>
        </div> -->
        <div class="content-reply lm-margin-t-sm lm-padding-t-sm flex-alig-center">
          <div class="re-l flex-alig-center">
            <!--<img src="../../assets/images/teaCommunity/time.png"/>-->
            <span>{{theme.CommentTime | formatTime}}</span>
          </div>
          <div class="re-r flex-alig-center">
            <div class="flex-alig-center lm-margin-l">
              <!-- <router-link :to="{path:'/teaLife/'+ theme.Id}"> -->
                <!--<img src="../../assets/images/teaCommunity/share.png"/>-->
                <span>{{theme.ShareCount}}</span>
              <!-- </router-link> -->
            </div>
            <div class="flex-alig-center lm-margin-l">
              <!--<img src="../../assets/images/teaCommunity/look.png"/>-->
              <span>{{theme.SeeCount}}</span>
            </div>
            <div class="flex-alig-center lm-margin-l" @click.stop="ding(index)">
              <!--<img v-show="!theme.IsFabulous" src="../../assets/images/teaCommunity/ding.png"/>-->
              <!--<img v-show="theme.IsFabulous" src="../../assets/images/teaCommunity/isding.png"/>-->
              <span :class="{isding:theme.IsFabulous}">{{theme.FabulouCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--加载中。。。-->
      <div class="loading" v-show="isLoading">
        <mt-spinner :type="3" color="#999"></mt-spinner>
        <span class="lm-margin-l-sm lm-text-grey">加载中...</span>
      </div>
    </div>
    <!--发帖-->
     <!-- <div class="post" @click="goToPost">
        <img src="../../assets/images/teaCommunity/post.png"/>
      </div> -->
    <!-- 查看大图 -->
    <!-- <div class="model" @click="closeModel" v-show="model">
      <mt-swipe :show-indicators="false" :auto="0" :defaultIndex="bigPicIdx" >
        <mt-swipe-item v-for="(item,index) in bigPic" :key="index">
          <img :src="item" />
        </mt-swipe-item>
      </mt-swipe>
    </div> -->

    <Mfooter :worldCurrent='true'></Mfooter>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'
  import {Toast} from 'mint-ui'
  import {formatDate} from '../../assets/js/Date.js'//时间显示格式转换js

  export default {
    components: {
      Mheader,
      Mfooter
    },
    data(){
      return {
        model: false,
        bigPic:[],//查看大图的数组
        bigPicIdx:0,//打开时默认图片索引
        isNewest: true,//是否最新
        isHot: false,//是否最热
        isding: false,//是否点赞过
        key: 'TeaCircleBarnerImg',//barner图位置key
        advList: [], //barner图集合
        themeTypeList: [],//话题类型集合
        themeTypeId: 0,//当前选中的话题类型id
        pageIndex: 0,//当前页码
        loading: false,//是否下拉刷新
        isLoading: false,//是否显示加载中...
        themeList: [],//话题集合
        infoCount:0,//消息数量
        userHeadImg:require("../../assets/images/home_03.png")//默认头像
      }
    },
    filters: {
      formatTime(val) {
        return formatDate(val);
      }
    },

    methods: {
      //查看话题内容
      goToContent(id){
        this.$router.push({path: '/teaLife/'+ id})
      },
      //点击查看大图
      enlarge(index,idx){
        this.bigPic = this.themeList[index].Imgs;
        this.bigPicIdx = idx;
        this.model = true;
      },
      //关闭预览大图
      closeModel(){
        this.bigPicIdx = 0;
        this.bigPic=[];
        this.model = false;
      },
      //点赞
      ding(idx){
        if (!this.themeList[idx].IsFabulous) {
          this.addFabulous(idx);
        } else if (this.themeList[idx].IsFabulous) {
          this.cancelFabulous(idx);
        }

      },
      //最新选中
      newestActive(){
        this.isHot = false;
        this.themeTypeList.forEach(function (value, index, array) {
          array[index].isactive = false;
        });
        this.isNewest = true;
        this.pageIndex = 1;//当前页码重置为1
        this.themeList = [];//清空数据集合
        this.getLatestTopic(1);
      },
      //最热选中
      hotActive(){
        this.isNewest = false;
        this.themeTypeList.forEach(function (value, index, array) {
          array[index].isactive = false;
        });
        this.isHot = true;
        this.pageIndex = 1;//当前页码重置为1
        this.themeList = [];//清空数据集合
        this.getLatestTopic(2);
      },
      //话题类型选中
      tabActive(i) {
        this.themeTypeList.forEach(function (value, index, array) {
          array[index].isactive = false;
        });
        this.isNewest = false;
        this.isHot = false;
        this.pageIndex = 1;//当前页码重置为1
        this.themeList = [];//清空数据集合
        this.themeTypeId = this.themeTypeList[i].Id;
        this.themeTypeList[i].isactive = true;
        this.getThemeByThemeType();
      },
      //加载更多
      loadMore(){
        this.loading = true;
        this.isLoading = true;
        this.pageIndex++;
        if (this.isNewest) {
          this.getLatestTopic(1);
        } else if (this.isHot) {
          this.getLatestTopic(3);
        } else {
          this.getThemeByThemeType();
        }

      },
      //获取banner图
      getBannerImg(){
        if (!!sessionStorage.TeaCirdeAdvList) {
          this.advList = JSON.parse(sessionStorage.TeaCirdeAdvList);
        } else {
          this.axios.get(this.url + '/api/Advertising/GetAdvertisingByKey?key=' + this.key).then((res) => {
            if (res.data.Code == 200) {
              sessionStorage.setItem("TeaCirdeAdvList", JSON.stringify(res.data.Data));
              this.advList = res.data.Data;
            }
          })
        }
      },
      //跳转链接
      jump(val){
        if (!!val) {
          window.location.href = val;
        }
      },
      //获取话题类型
      getThemeType(){
        if (!!sessionStorage.ThemeType) {
          this.themeTypeList = JSON.parse(sessionStorage.ThemeType);
        } else {
          this.axios.get(this.url + '/api/CM_Theme/GetThemeType').then((res) => {
            if (res.data.Code == 200) {
              this.themeTypeList = res.data.Data;
              this.themeTypeList.forEach((item, index) => {
                this.$set(item, "isactive", false);
              })
              sessionStorage.setItem("ThemeType", JSON.stringify(this.themeTypeList));
            }
          })
        }
      },
      //最新话题
      getLatestTopic(type){
        this.axios({
          url: this.url + '/api/CM_Theme/GetThemeList?Index=' + this.pageIndex + '&Type=' + type,
          method: 'get',
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}
        }).then((res) => {
          if (res.data.Code == 200) {
            if (!!res.data.Data) {
              if (res.data.Data.length > 0) {
                for (let i = 0; i < res.data.Data.length; i++) {
                  let temp=res.data.Data[i];
                  this.themeList.push(temp)
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
      //根据话题类型获取话题列表
      getThemeByThemeType(){
        this.axios({
          url: this.url + '/api/CM_Theme/GetThemeListByTypeId?tId=' + this.themeTypeId + '&sort=' + 0 + '&Index=' + this.pageIndex,
          method: 'get',
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}
        }).then((res) => {
          if (res.data.Code == 200) {
            if (!!res.data.Data) {
              if (res.data.Data.length > 0) {
                for (let i = 0; i < res.data.Data.length; i++) {
                  let temp=res.data.Data[i];
                  this.themeList.push(temp)
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
      //增加点赞
      addFabulous(index){
        this.axios({
          url: this.url + '/api/CM_Fabulous/Praise',
          method: 'post',
          data: {themeId: this.themeList[index].Id},
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

        }).then((res) => {
          if (!!res) {
            if (res.data.Code == 200) {
              this.themeList[index].FabulouCount++;
              this.themeList[index].IsFabulous = !this.themeList[index].IsFabulous;
              Toast(res.data.Data);
            } else {
              Toast(res.data.Data);
            }
          }
        })
      },
      //取消点赞
      cancelFabulous(index){
        this.axios({
          url: this.url + '/api/CM_Fabulous/CancelPraise',
          method: 'post',
          data: {themeId: this.themeList[index].Id},
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

        }).then((res) => {
          if (!!res) {
            if (res.data.Code == 200) {
              this.themeList[index].FabulouCount--;
              this.themeList[index].IsFabulous = !this.themeList[index].IsFabulous;
              Toast(res.data.Data);
            } else {
              Toast(res.data.Data);
            }
          }
        })
      },
      //获取消息数量
      getMsgNum(){
        this.axios({
          url: this.url + '/api/CM_Information/GetInfoCount',
          method: 'get',
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

        }).then((res) => {
          if (!!res) {
            if (res.data.Code == 200) {
                this.infoCount=res.data.Data;
            }
          }
        })
      },
      //跳转发帖
      goToPost(){
        if (!!localStorage.lut) {
          //验证localStorage.lut是否在登录状态
           this.axios.get(this.url + '/api/Login/CheckLogin?str='+localStorage.lut).then((res) => {
                if (res.data.Code == 200) {
                  this.$router.push({path: '/Post'})
                }else{
                   let instance = Toast('还未登录，请先登录');
                    setTimeout(() => {
                      instance.close();
                      this.$router.replace({
                            path: '/login/',
                            query: {redirect: this.$router.currentRoute.fullPath}
                          })
                    }, 1500);
                }
              })
        }else{
            let instance = Toast('还未登录，请先登录');
            setTimeout(() => {
            instance.close();
            this.$router.replace({
                  path: '/login/',
                  query: {redirect: this.$router.currentRoute.fullPath}
                })
            }, 1500);
        }
      }

    },
    mounted(){
      this.$nextTick(function () {
        this.getBannerImg();
        this.getThemeType();
        this.getMsgNum();
      })
    }
  }
</script>

<style scoped>
  .msg {
    width: 1rem;
    height: 0.8rem;
    position: relative;
  }

  .msg .msg-num {
    position: absolute;
    top: -0.05rem;
    left: 0.75rem;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: #fff;
  }

  .isding {
    color: #D81E06;
  }

  .banner {
    height: 6rem;
  }

  .banner img {
    vertical-align: sub;
  }

  .nav-bar {
    /*float: left;*/
    white-space: nowrap;
    overflow-x: scroll;
    overflow-y: hidden;
    /*width: 100%;*/
    display: flex;
    align-items: center;
    padding: 0.4rem 0;
    margin-bottom: 0.4rem;
    background-color: #fff;
  }

  .nav-bar .active {
    color: #fff;
    background-color: #B4282D;
  }

  .nav-bar > div {
    border-radius: 0.1rem;
    padding: 0 0.2rem;
    margin-left: 0.5rem;
  }
  .clear {
    clear: both;
    height: 0;
    line-height: 0;
    font-size: 0;
  }
  .content {
    background-color: #fff;
    padding: 0.4rem;
    margin-bottom: 0.4rem;
  }

  .content .user .user-avater {
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.5rem;
  }

  .content .content-p {
    margin: 0.2rem 0;
    color: #777;
    line-height: 0.9rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    word-break: break-all;
  }

  .content-p > h1 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 600;
    margin-top: 0.1rem;
    margin-bottom: 0.2rem;
  }

  .content .content-img {
    width: 100%;
  }

  .content .content-img > div {
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    width: 25%;
    height: 3.5rem;
    overflow: hidden;
    background-color: #eee;
  }

  .content-img > div img {
    height: auto;
  }

  .content .content-img > div + div {
    margin-left: 0.2rem;
  }

  .content .content-reply {
    font-size: 0.55rem;
    color: #999;
    border-top: 1px solid #E1E1E1;
    justify-content: space-between;
  }

  .content-reply > div span{
    padding-left: 0.8rem;
    background-repeat: no-repeat;
    background-size: 0.7rem 0.7rem;
    background-position: left center;
  }
  .content-reply > .re-l span{
    background-image: url("../../assets/images/teaCommunity/time.png");
  }
  .content-reply > .re-r div:first-child span{
    background-image: url("../../assets/images/teaCommunity/share.png");
  }
  .content-reply > .re-r div:nth-child(2) span{
    background-image: url("../../assets/images/teaCommunity/look.png");
  }
  .content-reply > .re-r div:last-child span{
    background-image: url("../../assets/images/teaCommunity/ding.png");
  }
  .content-reply > .re-r div:last-child .isding{
    background-image: url("../../assets/images/teaCommunity/isding.png");
  }
  .content-reply img {
    margin-right: 0.1rem;
    width: 0.6rem;
    height: 0.6rem;
    vertical-align: text-top;
  }

  .post {
    border-radius: 50%;
    padding: 0.3rem;
    background-color: rgba(0, 0, 0, 0.7);
    right: 1rem;
    bottom: 6.8rem;
    position: fixed;
  }

  .post > img {
    width: 1rem;
    height: 1rem;
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
