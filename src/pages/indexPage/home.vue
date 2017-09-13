<template>
  <div class="container">
    <header class="flex-alig-center">
      <div class="logo">
        <img src="../../assets/images/home/987tea_logo_03.png" alt="logo">
      </div>
      <div class="search flex-alig-center">
        <img src="../../assets/images/home/987tea_search.png" alt="搜索">
        <router-link to="/SearchPage">
          <input type="text">
        </router-link>
      </div>
      <div class="more">
        <router-link to="/Category">
          <img src="../../assets/images/home/987tea_033.png" alt="更多">
        </router-link>
      </div>
    </header>
    <div class="banner">
      <mt-swipe :auto="3000" v-if="advList.length>0">
        <mt-swipe-item v-for="(item,index) in advList" :key="item.Id">
          <img :src="item.Img" alt="" @click="jump(item.AdUrl)">
        </mt-swipe-item>

      </mt-swipe>
      <mt-swipe v-if="isShowBanner">
        <mt-swipe-item>
          <img src="../../assets/images/banner/banner1.png" alt="" @click.stop="chkDetail('dae874c59c56448f99c8045753b5cf0f')">
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="promise flex-alig-center">
      <div>
        <span></span>
        商品30天保价
      </div>
      <div>
        <span></span>
        7天退换货
      </div>
      <div>
        <span></span>
        满59元包邮
      </div>
      <div>
        <span></span>
        货到付款
      </div>
    </div>
    <div class="top-tabs">
      <div>
        <router-link to="/MyCB">
          <img src="../../assets/images/myInfo/icon.5.png" alt="">
        </router-link>
        <span>茶金币</span>

      </div>
      <div>
        <router-link to="/TcHome">
          <img src="../../assets/images/myInfo/icon.10.png" alt="">
        </router-link>
        <span>茶友圈</span>

      </div>
      <div>
        <router-link to="/MyOrder/待收货/3">
          <img src="../../assets/images/myInfo/icon.3.png" alt="">
        </router-link>
        <span>物流信息</span>

      </div>
      <div>
        <router-link to="/Apply">
          <img src="../../assets/images/myInfo/icon.9.png" alt="">
        </router-link>
        <span>入驻我们</span>

      </div>
    </div>
    <div class="box hot-buy">
      <div class="title flex-alig-center">
        人气热卖
        <span></span>
      </div>
      <!--<router-link :to="{path:'/OnSale'}">-->
      <div class="box-block box-block-one" @click="jump(Popular1.AdUrl)" :style="{backgroundImage:'url('+Popular1.Img+')'}">
        <div class="box-block-title">{{Popular1.AContent}}</div>
        <div class="box-block-time">
          <span class="bg-time">{{day}}</span> 天
          <span class="bg-time">{{hour}}</span> 时
          <span class="bg-time">{{minute}}</span> 分
          <span class="bg-time">{{second}}</span> 秒
        </div>
        <!--<div class="rmtime">下一场19:00开始</div>-->
      </div>
      <!--</router-link>-->
      <div class="flex-between">
        <div class="box-block box-block-two" @click="jump(Popular2.AdUrl)" :style="{backgroundImage:'url('+Popular2.Img+')'}">
          <div class="xl-title">{{Popular2.AContent}}</div>
          <div class="buy_one">{{Popular2.Remark}}</div>
          <div class="hot"></div>
        </div>
        <div class="box-block-four">
          <div class="box-block box-block-three" @click.stop="jump(Popular3.AdUrl)" :style="{backgroundImage:'url('+Popular3.Img+')'}">
            <div class="xl-title">{{Popular3.AContent}}</div>
            <div class="buy_one">{{Popular3.Remark}}</div>
          </div>
          <div class="box-block box-block-five" @click.stop="jump(Popular4.AdUrl)" :style="{backgroundImage:'url('+Popular4.Img+')'}">
            <div class="xl-title">{{Popular4.AContent}}</div>
            <div class="buy_one">{{Popular4.Remark}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 社区模块 -->
    <div class="box choice">
      <div class="title flex-alig-center">
        · 茶文化 ·
      </div>
      <router-link :to="{path:'/TcHome'}">
        <div class="box-block flex-between">
          <div class="selected">
            <h1>好文精选</h1>
            <span>原创好文都在这</span>
          </div>
          <div class="baike">
            <h1>茶叶百科</h1>
            <span>让您喝茶更专业</span>
          </div>
        </div>
      </router-link>
    </div>
    <div class="box mode">
      <div class="title flex-alig-center">
        自品好茶
        <span></span>
      </div>
      <div class="mode-box">
        <Mmode v-for="(item,index) in ownTea" :key="item.ProductId" :index="index" :path="item.ProductId" :imgSrc="item.HeadImg" :productName="item.Name" :productPrice="item.SalePrice"></Mmode>
      </div>
    </div>

    <div class="box mode">
      <div class="title flex-alig-center">
        送礼必备
        <span></span>
      </div>
      <div class="mode-box">
        <Mmode v-for="(item,index) in giftsTea" :key="item.ProductId" :index="index" :path="item.ProductId" :imgSrc="item.HeadImg" :productName="item.Name" :productPrice="item.SalePrice"></Mmode>
      </div>
    </div>
    <div class="lm-text-grey lm-font-xs more-comment">
      <p>闽ICP备14015705号-1</p>
      <p>营业执照91350104315308392G</p>
      <p>食品经营许可证JY13501040006708</p>
      <p>版权所有：福州中榕网络科技有限公司</p>
    </div>
    <Mfooter :indexCurrent='true'></Mfooter>
  </div>
</template>

<script>
import Mfooter from '../../components/Mfooter'
import Mmode from '../../components/Mmode'
import { Toast } from 'mint-ui'

export default {
  name: 'index',
  components: {
    Mfooter,
    Mmode
  },
  data() {
    return {
      ownTag: 'c996e6f4a4614793a42f89428eab7039',
      giftsTag: '068cf06410bd48629a01a98fd514e9bc',
      ownTea: [],
      giftsTea: [],
      pageIndex: 1,
      pageSize: 12,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      flag: false,
      time: '',//好茶推荐倒计数结束时间
      key: 'MallIndexBannerImg',//banner位置key
      isShowBanner:false,
      PopularKey: 'PopularSelling',//人气热卖
      advList: [],//广告信息集合
      theme: '',//置顶的话题
      Popular1: '',//人气热卖1
      Popular2: '',//人气热卖2
      Popular3: '',//人气热卖3
      Popular4: ''//人气热卖4
    }
  },
  methods: {
    //获取自品好茶
    getOwnTea() {
      if (!!sessionStorage.OwnTea) {
        this.ownTea = JSON.parse(sessionStorage.OwnTea);
      } else {
        this.axios.post(this.url + '/api/Product/HomeProducts', { tagId: this.ownTag, pageIndex: this.pageIndex, pageSize: this.pageSize }).then((res) => {
          if (res.data.Code == 200) {
            sessionStorage.setItem("OwnTea", JSON.stringify(res.data.Data));
            this.ownTea = res.data.Data;
          } else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          Toast('网络请求超时');
        })
      }

    },
    //获取送礼必备
    getGiftsTea() {
      if (!!sessionStorage.GiftsTea) {
        this.giftsTea = JSON.parse(sessionStorage.GiftsTea);
      } else {
        this.axios.post(this.url + '/api/Product/HomeProducts', { tagId: this.giftsTag, pageIndex: this.pageIndex, pageSize: this.pageSize }).then((res) => {
          if (res.data.Code == 200) {
            sessionStorage.setItem("GiftsTea", JSON.stringify(res.data.Data));
            this.giftsTea = res.data.Data;
          } else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          Toast('网络请求超时');
        })
      }

    },
    //倒计时
    timeDown() {
      if (!!!this.time) {
        this.day = 0;
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
      } else {
        let endTime = new Date(this.time.replace(/-/g, "/").replace('T', ' '));
        let nowTime = new Date();
        let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
        setInterval(() => {
          let d = this.formate(parseInt(leftTime / (24 * 60 * 60)))
          let h = this.formate(parseInt(leftTime / (60 * 60) % 24))
          let m = this.formate(parseInt(leftTime / 60 % 60))
          let s = this.formate(parseInt(leftTime % 60))
          if (leftTime <= 0) {
            this.flag = true
          }
          this.day = d;
          this.hour = h;
          this.minute = m;
          this.second = s;
          leftTime--;
        }, 1000)
      }

    },
    //时间格式
    formate(time) {
      if (time >= 10) {
        return time
      } else {
        return `0${time}`
      }
    },
    //跳转详情页
    chkDetail(val) {
      this.$router.push({ path: '/ProductDetails/' + val })
    },
    //跳转链接
    jump(val) {
      if (!!val) {
        //this.$router.push({path: val})
        window.location.href = val;
      }
    },
    //获取banner图
    getBannerImg() {
      this.axios.get(this.url + '/api/Advertising/GetAdvertisingByKey?key=' + this.key).then((res) => {
        if (res.data.Code == 200) {
          this.advList = res.data.Data;
          if(this.advList.length<=0){
            this.isShowBanner=true;
          }
        }
      })
    },
    //获取人气热卖
    getPopularSelling() {
      this.axios.get(this.url + '/api/Advertising/GetAdvertisingByKey?key=' + this.PopularKey).then((res) => {
        if (res.data.Code == 200) {
          if (!!res.data.Data) {
            res.data.Data.forEach((item, index) => {
              if (index == 0) {
                this.Popular1 = item;
                this.time = item.Endtime;
                this.timeDown();
              }
              if (index == 1) {
                this.Popular2 = item;
              }
              if (index == 2) {
                this.Popular3 = item;
              }
              if (index == 3) {
                this.Popular4 = item;
              }
            })
          }
        }
      })
    },
    //获取置顶的帖子
    getTopTheme() {
      this.axios.get(this.url + '/api/CM_Theme/GetThemeByTop').then((res) => {
        if (res.data.Code == 200) {
          this.theme = res.data.Data;
          if (this.theme.Imgs.length > 0) {
            this.themeImg = this.theme.Imgs[0];
          }
        }
      })
    },
    //跳转话题内容
    toThemeDetail(id) {
      this.$router.push({ path: '/tcContent/' + id })
    }
  },
  mounted() {
    this.$nextTick(function() {
      if (!!this.$route.query.PromotionKey) {
        //推广位Id ?PromotionKey=
        sessionStorage.setItem('PromotionKey', this.$route.query.PromotionKey);
      }
    })
  },
  created() {
    this.getBannerImg();
    this.getPopularSelling();
    this.getOwnTea();
    this.getGiftsTea();
  }
}
</script>

<style scoped>
header {
  height: 1.8rem;
  padding: 0 0.4rem;
  justify-content: space-between;
  background-color: #B4282D;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
}

header img {
  display: block;
}

.logo {
  width: 4.2rem;
  height: 1rem;
}

.search {
  padding: 0.1rem 0.4rem;
  border-radius: 0.2rem;
  background-color: #fff;
}

.search img {
  width: 1rem;
  margin-right: 0.2rem;
}

.search input {
  width: 7.4rem;
  border: none;
}

.more {
  width: 1rem;
  height: 0.9rem;
}

.banner {
  margin-top: 1.8rem;
  height: 7.7rem;
}

.promise {
  font-size: 0.5rem;
  color: #666666;
  height: 1rem;
  background-color: #fff;
  padding: 0 0.3rem;
  justify-content: space-between;
}

.promise>div {
  display: flex;
  align-items: center;
}

.promise>div>span {
  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.1rem;
  background-size: 100% 100%;
  background-image: url("../../assets/images/home/987tea_077.png");
}

.top-tabs {
  height: 3.6rem;
  margin: 0.4rem 0;
  padding: 0 1rem 0.6rem;
  text-align: center;
  font-size: 0.55rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  background-color: #fff;
}

.top-tabs>div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-tabs>div img {
  width: 2.2rem;
  vertical-align: bottom;
}

.top-tabs>div span {
  margin-top: -0.3rem;
}

.box {
  padding: 0.4rem;
  margin-bottom: 0.4rem;
  font-size: 0.7rem;
  background-color: #fff;
}






/*人气热卖*/

.box .title {
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.5rem 0 0.7rem;
  justify-content: center;
}

.hot-buy .title>span {
  margin-left: 0.4rem;
  width: 0.9rem;
  height: 0.9rem;
  background-size: 100% 100%;
  background-image: url("../../assets/images/home/987tea_01_03.png");
}

.hot-buy .box-block {
  padding: 0.4rem;
  border-radius: 0.3rem;
  background-color: #F4F4F4;
  background-size: 100% 100%;
}

.hot-buy .box-block-one {
  padding: 1rem;
  margin-bottom: 0.5rem;
  width: 100%;
  height: 5.5rem;
}

.box-block .box-block-title,
.box-block .box-block-time {
  margin-bottom: 0.3rem;
}

.box-block .box-block-time>span {
  color: #fff;
  padding: 0.1rem;
  border-radius: 0.1rem;
  background-color: #B22328;
}

.box-block .rmtime {
  font-size: 0.5rem;
}

.box-block-two {
  height: 10rem;
}

.box-block-three,
.box-block-five {
  height: 4.85rem;
}

.box-block-five {
  margin-top: 0.35rem;
}

.box-block-four,
.box-block-two {
  width: 49%;
}

.box-block .xl-title {
  font-size: 0.7rem;
  color: #777777;
}

.box-block .buy_one {
  font-size: 0.6rem;
  color: #B22328;
}

.box-block .selected h1,
.box-block .baike h1 {
  font-size: 0.7rem;
  font-weight: bold;
}

.box-block .selected,
.box-block .baike {
  padding: 0.4rem;
  color: #fff;
  width: 7.4rem;
  height: 6.8rem;
  background-size: 100% 100%;
}

.box-block .selected {
  background-image: url("../../assets/images/home/homenew_03.gif");
}

.box-block .baike {
  background-image: url("../../assets/images/home/homenew_05.png");
}



/*人气热卖结束*/


/*为您精选*/

.choice .title>span {
  width: 1rem;
  height: 1rem;
  margin-right: 0.4rem;
  background-size: 100% 100%;
  background-image: url("../../assets/images/home/987tea_31.png");
}

.choice .small-title {
  color: #9D9D9D;
  margin-bottom: 0.8rem;
  font-size: 0.55rem;
  text-align: center;
}

.choice .box-block {
  padding: 0.5rem 0;
  font-size: 0.55rem;
  /*border-top: 1px solid #F5F5F5;*/
}

.choice .choice-text-bottom>div>span {
  width: 0.6rem;
  height: 0.6rem;
  color: #717171;
  margin-right: 0.2rem;
  background-size: 100% 100%;
}

.choice .choice-text-bottom>div:first-child span {
  background-image: url("../../assets/images/home/987tea_38.png");
}

.choice .choice-text-bottom>div:last-child span {
  background-image: url("../../assets/images/home/987tea_35.png");
}






/*为您精选结束*/


/*展示模块*/

.mode .title>span {
  margin-left: 0.4rem;
  width: 0.9rem;
  height: 0.9rem;
  background-size: 100% 100%;
  background-image: url("../../assets/images/home/987tea_01_03.png");
}
</style>
