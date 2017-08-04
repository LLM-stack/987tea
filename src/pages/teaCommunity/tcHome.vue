<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">茶圈子</div>
    </Mheader>
    <div class="banner">
      <mt-swipe :auto="4000" v-if="advList.length>0">
        <mt-swipe-item v-for="(item,index) in advList" :key="item.Id"><img :src="item.Img" @click="jump(item.AdUrl)"/></mt-swipe-item>
      </mt-swipe>
      <div v-else>
        <img src="../../assets/images/teaCommunity/tc_02.png"/>
      </div>
    </div>
    <nav class="nav-bar">
      <div class="active">最新</div>
      <div>最热</div>
      <div v-for="(tt,index) in themeTypeList" :key="tt.Id">{{tt.Name}}</div>
    </nav>
    <div class="forum-box"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <div class="content" v-for="(theme,index) in themeList" :key="theme.Id">
        <router-link to="/tcContent">
          <div class="user flex-alig-center">
            <div class="user-avater">
              <img :src="theme.HeaderImg"/>
            </div>
            <div class="user-name">
              <div>{{theme.UName}}</div>
              <!-- <div class="lm-font-xs lm-text-grey lm-margin-t-xs">用户签名</div> -->
            </div>
          </div>

          <div class="content-p lm-font-sm">
            <h1 class="lm-text-black lm-font-defult">{{theme.Title}}</h1>
            {{'#'+theme.TTName+'#'+theme.Contents}}
          </div>
        </router-link>
        <div class="content-img flex-alig-center" v-for="(img,idx) in theme.Images.split(',')" :key="idx">
          <div><img :src="img[idx]"/></div>
        </div>
        <div class="content-reply lm-margin-t-sm lm-padding-t-sm flex-alig-center">
          <div class="re-l flex-alig-center">
            <img src="../../assets/images/teaCommunity/time.png"/>
            <span>{{theme.CommentTime |formatTime}}</span>
          </div>
          <div class="re-r flex-alig-center">
            <div class="flex-alig-center lm-margin-l">
              <img src="../../assets/images/teaCommunity/look.png"/>
              <span>{{theme.SeeCount}}</span>
            </div>
            <div class="flex-alig-center lm-margin-l">
              <router-link to="/tcContent">
                <img src="../../assets/images/teaCommunity/reply.png"/>
                <span>{{theme.CommentCount}}</span>
              </router-link>
            </div>
            <div class="flex-alig-center lm-margin-l" @click.stop="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
              <span :class="{isding:isding}">{{theme.FabulouCount}}</span>
            </div>
          </div>
        </div>
      </div>
      <!--加载中。。。-->
      <div class="loading" v-show="!loading">
        <mt-spinner :type="3" color="#999"></mt-spinner><span class="lm-margin-l-sm lm-text-grey">加载中...</span>
      </div>
    </div>
    <!--发帖-->
    <router-link to="/Post">
    <div class="post">
      <img src="../../assets/images/teaCommunity/post.png" />
    </div>
    </router-link>

    <Mfooter :worldCurrent='true'></Mfooter>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'
  import {Toast} from 'mint-ui'
  import {formatDate} from '../js/Date.js'

  export default {
    components: {
      Mheader,
      Mfooter
    },
    data(){
    	return {
        isding:false,
        key:'TeaCircleBarnerImg',//barner图位置key
        advList:[], //barner图集合
        themeTypeList:[],//话题类型集合
        pageIndex:0,//当前页码
        loading: false,//是否下拉刷新
        themeList:[]//话题集合
      }
    },
    filters: {
      formatTime(val) {
        return formatDate(val);
      }
    },
    methods:{
    	ding(){
    		this.isding = !this.isding
      },
      //加载更多
      loadMore(){
        this.pageIndex++;
        this.getLatestTopic();
      },
      //获取banner图
      getBannerImg(){
        if(!!sessionStorage.TeaCirdeAdvList){
          this.advList=JSON.parse(sessionStorage.TeaCirdeAdvList);
        }else{
          this.axios.get(this.url + '/api/Advertising/GetAdvertisingByKey?key='+this.key).then((res) => {
            if (res.data.Code == 200) {
              sessionStorage.setItem("TeaCirdeAdvList", JSON.stringify(res.data.Data));
              this.advList = res.data.Data;
            }
          })
        }
      },
       //跳转链接
      jump(val){
          if(!!val){
           window.location.href=val;
          }
      },
      //获取话题类型
      getThemeType(){
        if(!!sessionStorage.ThemeType){
          this.themeTypeList=JSON.parse(sessionStorage.ThemeType);
        }else{
          this.axios.get(this.url + '/api/CM_Theme/GetThemeType').then((res)=>{
            if(res.data.Code==200){
               sessionStorage.setItem("ThemeType", JSON.stringify(res.data.Data));
               this.themeTypeList = res.data.Data;
            }
          })
        }
      },
      //点击话题类型
      checkType(){

      },
      //最新话题
      getLatestTopic(){
        this.axios.get(this.url + '/api/CM_Theme/GetThemeList?Index='+this.pageIndex).then((res)=>{
            if(res.data.Code==200){
              if(this.pageIndex==1){
                this.themeList = res.data.Data;
              }else{
                if (res.data.Data.length > 0) {
                    for (let i = 0; i < res.data.Data.length; i++) {
                        this.themeList.push(res.data.Data[i])
                    }
                  }else{
                  this.loading = true;
                  }
              }
            }
          })
      },
    },
    mounted(){
      this.$nextTick(function(){
        this.getBannerImg();
        this.getThemeType();
      })
    }
  }
</script>

<style scoped>
  .isding{
    color: #D81E06;
  }
  .banner {
    height: 6rem;
  }

  .nav-bar {
    display: flex;
    align-items: center;
    padding: 0.4rem 0;
    margin-bottom: 0.4rem;
    background-color: #fff;
  }

  .nav-bar .active {
    color: #fff;
    border-radius: 0.1rem;
    background-color: #B4282D;
  }

  .nav-bar > div {
    padding: 0 0.2rem;
    margin-left: 0.5rem;
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
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .content-p > h1{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 600;
  }
  .content .content-img {
    width: 100%;
    justify-content: space-between;
  }

  /*.content .content-img > div{*/
  /*overflow: hidden;*/
  /*max-height: 5rem;*/
  /*}*/
  .content .content-img > div + div {
    margin-left: 0.2rem;
  }

  .content .content-reply {
    font-size: 0.55rem;
    color: #999;
    border-top: 1px solid #E1E1E1;
    justify-content: space-between;
  }

  .content-reply img {
    margin-right: 0.1rem;
    width: 0.6rem;
    height: 0.6rem;
  }
  .post{
    border-radius: 50%;
    padding: 0.3rem;
    background-color: rgba(0,0,0,0.7);
    right: 1rem;
    bottom: 6.8rem;
    position: fixed;
  }
  .post > img{
    width: 1rem;
    height: 1rem;
  }
</style>
