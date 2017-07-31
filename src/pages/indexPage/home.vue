<template>
  <div class="container">
    <header class="flex-alig-center">
      <div class="logo">
        <img src="../../assets/images/home/987tea_logo_03.png" alt="logo">
      </div>
      <div class="search flex-alig-center">
        <img src="../../assets/images/home/987tea_search.png" alt="搜索">
        <router-link :to="{path:'/SearchPage'}"><input type="text"></router-link>
      </div>
      <div class="more">
        <router-link :to="{path:'/Category'}">
          <img src="../../assets/images/home/987tea_033.png" alt="更多">
        </router-link>
      </div>
    </header>
    <div class="banner">
      <mt-swipe :auto="3000" v-if="advList.length>0">
        <mt-swipe-item v-for="(item,index) in advList"  :key="item.Id">
          <img :src="item.Img" alt="" @click="jump(item.AdUrl)">
        </mt-swipe-item>
        <!--<mt-swipe-item>
          <img src="../../assets/images/banner/banner1.jpg" alt=""
               @click.stop="chkDetail('dae874c59c56448f99c8045753b5cf0f')">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/images/banner/banner2.jpg" alt=""
               @click.stop="chkDetail('98a0b370bd49446eae702610a19d004f')">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/images/banner/banner3.jpg" alt=""
               @click.stop="chkDetail('4795f6b55ba747919a406b71593080d0')">
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/images/banner/banner4.jpg" alt=""
               @click.stop="chkDetail('cb77b03361744feb89c21b5abf03a576')">
        </mt-swipe-item>-->
      </mt-swipe>
      <mt-swipe v-else>
        <mt-swipe-item>
          <img src="../../assets/images/banner/banner1.jpg" alt=""
               @click.stop="chkDetail('dae874c59c56448f99c8045753b5cf0f')">
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
        <!--<router-link :to="{path:'/MyCB'}">-->
          <img src="../../assets/images/myInfo/icon.5.png" alt="">
        <!--</router-link>-->
        <span>茶金币</span>
      </div>
      <div>
        <img src="../../assets/images/myInfo/icon.10.png" alt="">
        <span>茶友圈</span>
      </div>
      <div>
        <router-link :to="{path:'/MyOrder/待收货/3'}">
          <img src="../../assets/images/myInfo/icon.3.png" alt="">
        </router-link>
        <span>物流信息</span>
      </div>
      <div>
        <img src="../../assets/images/myInfo/icon.11.png" alt="">
        <span>联系客服</span>
      </div>
    </div>
    <div class="box hot-buy">
      <div class="title flex-alig-center">
        人气热卖 <span></span>
      </div>
      <!--<router-link :to="{path:'/OnSale'}">-->
      <div class="box-block box-block-one" @click.stop="chkDetail('0092976dc9b844fd9156e18e1affbf0e')">
        <div class="box-block-title">折扣好茶推荐</div>
        <div class="box-block-time"><span>{{hour}}</span>：<span>{{minute}}</span>：<span>{{second}}</span></div>
        <!--<div class="rmtime">下一场19:00开始</div>-->
      </div>
      <!--</router-link>-->
      <div class="flex-between" @click.stop="chkDetail('0c41ebacf33448488c006ca55b5f0b76')">
        <div class="box-block box-block-two">
          <div class="xl-title">2017早春碧螺春</div>
          <div class="buy_one">99元买一送一</div>
          <div class="hot"></div>
        </div>
        <div class="box-block-four" @click.stop="chkDetail('1fe433212fd240d998abc63de01bcd37')">
          <div class="box-block box-block-three">
            <div class="xl-title">手工紫砂壶</div>
            <div class="buy_one">99元</div>
          </div>
          <div class="box-block box-block-five" @click.stop="chkDetail('cb77b03361744feb89c21b5abf03a576')">
            <div class="xl-title">西施壶·紫砂壶</div>
            <div class="buy_one">298元</div>
          </div>
        </div>
      </div>
    </div>
    <!--TODO：社区模块还未完成 先注释
    <div class="box choice">
      <div class="title flex-alig-center">
        <span></span>为您精选
      </div>
      <div class="small-title">
        您的口味，我们都懂
      </div>
      <div class="box-block flex-between">
        <div class="choice-img">
          <img src="../../assets/images/goods/987tea_16.png" alt="">
        </div>
        <div class="choice-text">
          <div class="choice-text-title">这些茶，甜的让人念念不忘。</div>
          <div class="choice-text-p">在众多茶里，以甜占主导地位的，确实不多，幸运的是，小七有幸喝到这几款</div>
          <div class="choice-text-bottom flex-alig-center">
            <div class="flex-alig-center lm-margin-r-lg">
              <span></span>
              77
            </div>
            <div class="flex-alig-center">
              <span></span>
              1457
            </div>
          </div>
        </div>
      </div>
    </div>-->
    <div class="box mode">
      <div class="title flex-alig-center">
        自品好茶 <span></span>
      </div>
      <div class="mode-box">
      <Mmode v-for="(item,index) in ownTea"
             :key="item.ProductId"
             :index="index"
             :path="item.ProductId"
             :imgSrc="item.HeadImg"
             :productName="item.Name"
             :productPrice="item.SalePrice"
      ></Mmode>
      </div>
    </div>

    <div class="box mode">
      <div class="title flex-alig-center">
        送礼必备 <span></span>
      </div>
      <div class="mode-box">
        <Mmode v-for="(item,index) in giftsTea"
               :key="item.ProductId"
               :index="index"
               :path="item.ProductId"
               :imgSrc="item.HeadImg"
               :productName="item.Name"
               :productPrice="item.SalePrice"
        ></Mmode>
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
  import {Toast} from 'mint-ui'

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
        pageIndex:1,
        pageSize:12,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        flag: false,
        time: new Date(),
        key:'MallIndexBannerImg',//banner位置key
        advList:[]//广告信息集合
      }
    },
    mounted () {
      this.$nextTick(function () {
          this.timeDown()
        }
      )
    },
    methods: {
      //获取自品好茶
      getOwnTea(){
        this.axios.post(this.url + '/api/Product/HomeProducts', {tagId: this.ownTag,pageIndex:this.pageIndex,pageSize:this.pageSize}).then((res) => {
          if (res.data.Code == 200) {
            this.ownTea = res.data.Data;
          } else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          Toast('网络请求超时');
        })
      },
      //获取送礼必备
      getGiftsTea(){
        this.axios.post(this.url + '/api/Product/HomeProducts', {tagId: this.giftsTag,pageIndex:this.pageIndex,pageSize:this.pageSize}).then((res) => {
          if (res.data.Code == 200) {
            this.giftsTea = res.data.Data;
          } else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          Toast('网络请求超时');
        })
      },
      //倒计时
      timeDown () {
        var endTime = this.time
        endTime.setHours(endTime.getHours() + 3); //给endTime增加3小时
        setInterval(() => {
          let nowTime = new Date()
          let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000)
          let d = parseInt(leftTime / (24 * 60 * 60))
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
        }, 1000)
      },
      formate (time) {
        if (time >= 10) {
          return time
        } else {
          return `0${time}`
        }
      },
      //跳转详情页
      chkDetail(val){
        this.$router.push({path: '/ProductDetails/' + val})
      },
      //跳转链接
      jump(val){
          if(!!val){
            console.log(val)
           //this.$router.push({path: val})
           window.location.href=val;
          }
      },
      //获取banner图
      getBannerImg(){
        this.axios.get(this.url + '/api/Advertising/GetAdvertisingByKey?key='+this.key).then((res) => {
          if (res.data.Code == 200) {
             this.advList = res.data.Data;
          }
        })
      }

    },
    created(){
      this.getBannerImg();
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

  .promise > div {
    display: flex;
    align-items: center;

  }

  .promise > div > span {
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

  .top-tabs > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .top-tabs > div img {
    width: 2.2rem;
    vertical-align: bottom;
  }

  .top-tabs > div span {
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

  .hot-buy .title > span {
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
    background-image: url("../../assets/images/goods/987tea_03.png");
  }

  .box-block .box-block-title,
  .box-block .box-block-time {
    margin-bottom: 0.3rem;
  }

  .box-block .box-block-time > span {
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
    background-image: url("../../assets/images/goods/987tea_06.png");
  }

  .box-block-three {
    background-image: url("../../assets/images/goods/987tea_08.png");
  }

  .box-block-five {
    background-image: url("../../assets/images/goods/987tea_12.png");
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

  /*人气热卖结束*/
  /*为您精选*/
  .choice .title > span {
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
    border-top: 1px solid #F5F5F5;
  }

  .choice .choice-img,
  .choice .choice-text {
    height: 5.6rem;
    width: 49%;
  }

  .choice .choice-text .choice-text-title {
    color: #000;
    margin-bottom: 0.4rem;
  }

  .choice .choice-text .choice-text-p {
    min-height: 3.6rem;
    color: #8D8D8D;
  }

  .choice .choice-text-bottom > div > span {
    width: 0.6rem;
    height: 0.6rem;
    color: #717171;
    margin-right: 0.2rem;
    background-size: 100% 100%;
  }

  .choice .choice-text-bottom > div:first-child span {
    background-image: url("../../assets/images/home/987tea_38.png");
  }

  .choice .choice-text-bottom > div:last-child span {
    background-image: url("../../assets/images/home/987tea_35.png");
  }

  /*为您精选结束*/
  /*展示模块*/
  .mode .title > span {
    margin-left: 0.4rem;
    width: 0.9rem;
    height: 0.9rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/home/987tea_01_03.png");
  }


</style>
