<template>
  <div id="pro" class="container">
    <Mheader :show='true' v-show="!isfixed">
      <div slot="title">{{activity.AcTitle}}</div>
    </Mheader>
    <div class="banner">
      <mt-swipe :auto="3000" v-if="advList.length > 0">
      <mt-swipe-item  v-for="(adv,index) in advList"  :key="adv.Id" >
          <img :src="adv.Img" alt="" @click="jump(adv.AdUrl)">
        </mt-swipe-item>
        <!--<mt-swipe-item>
          <img src="../../assets/images/banner/banner01.jpg"/>
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/images/banner/banner02.jpg"/>
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="../../assets/images/banner/banner03.jpg"/>
        </mt-swipe-item>-->
      </mt-swipe>
      <mt-swipe v-else>
        <mt-swipe-item>
          <img src="../../assets/images/banner/banner01.jpg"/>
        </mt-swipe-item>
       </mt-swipe>
    </div>
    <div class="title">
      <div>
        <img src="../../assets/images/activities/activities_03.png"/>
        <span>省钱第一步，下单直接满减</span>
        <img src="../../assets/images/activities/activities_05.png"/>
      </div>
    </div>
    <div class="ticket-box">
      <div class="ticket">
        <span class="orange flex-alig-center">满<span class="lm-font-xxxl">100</span></span>
        <span class="lm-margin-l-sm flex-alig-center">减<span class="yellow lm-font-xxxl">10</span></span>
      </div>
      <div class="ticket">
        <span class="orange flex-alig-center">满<span class="lm-font-xxxl">200</span></span>
        <span class="lm-margin-l-sm flex-alig-center">减<span class="yellow lm-font-xxxl">20</span></span>
      </div>
    </div>
    <div class="title-z">
      <span>{{timeDownText}}</span>
      <div class="lm-margin-t-xs">
        <span class="bg-time">{{day}}</span> 天 <span class="bg-time">{{hour}}</span> 时 <span class="bg-time">{{minute}}</span> 分 <span class="bg-time">{{second}}</span> 秒
      </div>
    </div>
    <div class="tab-box" id="tabBox" v-if="isfixed">
      <div class="tab" :class="{active:activeIdx == index}" v-for="(item,index) in tabs" :key='index' @click="select(index)">
        {{ item.tabName }}
      </div>
    </div>
    <div class="title" id="id1">
      <div>
        <img src="../../assets/images/activities/activities_03.png"/>
        <span class="lm-font-lg">超值特价</span>
        <img src="../../assets/images/activities/activities_05.png"/>
      </div>
      <div class="lm-font-sm lm-text-grey">超值低价 多款茶类任你选</div>
    </div>
    <div class="scroll-bar">
      <div class="scroll-cont" v-for="(t,index) in timeProducts" :key='index' @click.stop="chkDetail(t.ProductId)">
        <div class="cont-img">
          <img v-lazy="t.HeadImg"/>
          <div class="cont-name">{{t.Name}}</div>
        </div>
        <div class="cont-price">
          <div class="new-price lm-margin-r-sm">￥{{t.SalePrice}}</div>
          <div class="old-price">￥{{t.Price}}</div>
        </div>
        <div class="cont-btn" @click.stop="choice(t.ProductId)">立即抢购</div>
      </div>

    </div>
    <div class="clear"></div>
    <div class="title" id="id2">
      <div>
        <img src="../../assets/images/activities/activities_03.png"/>
        <span class="lm-font-lg">818特价专区</span>
        <img src="../../assets/images/activities/activities_05.png"/>
      </div>
      <div class="lm-font-sm lm-text-grey">感恩放价 加量不加价</div>
    </div>
    <div class="pro-list">
      <div class="pro-box" v-for="(exp,index) in expProducts" :class="{'pro-left' : index % 2 !== 0}" :key='index' @click.stop="chkDetail(exp.ProductId)">
        <div class="pro-img">
          <img v-lazy="exp.HeadImg"/>
        </div>
        <div class="pro-name">{{ exp.Name }}</div>
        <div class="pro-price">
          <div class="new-price lm-margin-r-sm">￥{{ exp.SalePrice }}</div>
          <div class="old-price">￥{{ exp.Price }}</div>
        </div>
        <div class="pro-btn-group">
          <div class="pro-btn zhe" v-if="activity.AdType!=3">{{exp.Price | discount(exp.SalePrice)}}折</div>
          <div class="pro-btn gou" @click.stop="choice(exp.ProductId )">立即抢购</div>
        </div>
      </div>
    </div>
    <div class="title"  id="id3">
      <div>
        <img src="../../assets/images/activities/activities_03.png"/>
        <span class="lm-font-lg">精装礼品</span>
        <img src="../../assets/images/activities/activities_05.png"/>
      </div>
      <div class="lm-font-sm lm-text-grey">独具风味 送礼佳品</div>
    </div>
    <div class="pro-list">
      <div class="pro-box" v-for="(had,index) in hadProducts" :class="{'pro-left' : index % 2 !== 0}" :key='index' @click="chkDetail(had.ProductId)">
        <div class="pro-img">
          <img v-lazy="had.HeadImg"/>
        </div>
        <div class="pro-name">{{ had.Name }}</div>
        <div class="pro-price">
          <div class="new-price lm-margin-r-sm">￥{{ had.SalePrice }}</div>
          <div class="old-price">￥{{ had.Price }}</div>
        </div>
        <div class="pro-btn-group">
          <div class="pro-btn zhe" v-if="activity.AdType!=3">{{had.Price | discount(had.SalePrice)}}折</div>
          <div class="pro-btn gou" @click.stop="choice(had.ProductId )">立即抢购</div>
        </div>
      </div>
    </div>
    <div class="title moerfl"  id="id4">
      <div>
        <img src="../../assets/images/activities/avtive_03.png"/>
        <span class="lm-font-lg">多重福利</span>
        <img src="../../assets/images/activities/avtive_03.png"/>
      </div>
      <div class="lm-font-sm lm-text-white lm-margin-b-sm">惊喜优惠 礼品多多</div>
      <ul class="fl-list">
        <li><span class="orange">满100元减10元、满200减20元</span>以此类推</li>
        <li><span class="orange">满99元</span>送<span class="orange">茶宠</span>一只</li>
        <li><span class="orange">满299元</span>送<span class="orange">茶宠+西湖龙井</span></li>
        <li><span class="orange">满599元</span>送<span class="orange">精品茶具1份+茶宠+西湖龙井</span></li>
      </ul>
      <div>
        <span class="lm-font-lg">还有更多福利</span>
      </div>
      <div class="lm-font-sm lm-text-white lm-margin-b-sm">全都在这里 一般人不知道</div>
      <div class="QRcode flex-alig-center">
        <img src="../../assets/images/activities/dcode_03.png" />
      </div>
      <div class="lm-font-sm lm-text-white lm-margin-t-xs shao">微信扫一扫</div>
    </div>
    <div class="lm-text-grey lm-font-xs more-comment">
      <p>闽ICP备14015705号-1</p>
      <p>营业执照91350104315308392G</p>
      <p>食品经营许可证JY13501040006708</p>
      <p>版权所有：福州中榕网络科技有限公司</p>
    </div>

    <transition name="fade">
      <div class="choice-model" v-if="choiceShow" >

      </div>
    </transition>

    <transition name="drop">
      <div class="choice" v-if="choiceShow">
        <div class="choice-img">
          <img :src="specImg" alt="">
        </div>
        <div class="choice-p">
          <div>
            <div class="choice-p-price ">￥{{specPrice}}</div>
            <div class="del" @click="close"><img src="../../assets/images/productDetails/del.png"/></div>
          </div>
          <div>库存 {{specStock}} 件</div>
          <div>{{checkMsg}}</div>
        </div>
        <div class="choice-spec">
          <div>规格</div>
          <div class="spec-box">

            <div class="spec" v-for="(sku, index) in productSpec" @click="checkSpec(index)"
                 :class="index == checkIndex?'spec-checked':''" :key='index'>{{sku.ShortName}}
            </div>

          </div>
        </div>
        <div class="choice-num">
          <div>购买数量</div>
          <div>
            <span @click="changeNum(-1)">-</span>
            <input readonly="readonly" type="text" v-model="productNum">
            <span @click="changeNum(1)">+</span>
          </div>
        </div>

        <div class="choice-btn" @click="addCar">加入购物车</div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mheader
    },
    data() {
      return {
        top: '',
        isfixed:false,
        tabBox:'',
        tab1:'',
        tab2:'',
        tab3:'',
        tab4:'',

        choiceShow: false,
        checkMsg: '请选择 规格',
        specId: '',
        specName: '',
        specImg: '',
        specPrice: 0,
        specStock: 0,
        checkIndex: -1,
        productNum: 1,
        activeIdx: 0,
        tabs: [
          {
            tabName: '超值特价',
            tabTag:'57b97e21c31e4963a56011720f6e2ea3',//超值特价标签Id
          },
          {
            tabName: '818特价专区',
            tabTag:'e19355ee6b924bc5bb90177de43811da',//818特价专区标签Id
          },
          {
            tabName: '精装礼品',
            tabTag:'ca482e57ed0e434f935e47872f69614a',//精装礼品标签Id
           },
          {
            tabName: '多重福利'
          }
        ],
        productSpec: [],//sku集合
        expProducts:[],//爆款特价商品
        timeProducts:[],//限时特价商品
        hadProducts:[],//精装礼品商品
        activity:'',
        day:0,
        hour:0,
        minute:0,
        second:0,
        flag:false,
        productId:'',
        productName:'',
        key:'ActivityBannerImg',//banner位置key
        advList:[],//广告信息集合,
        timeDownText:'距离抢购开始还剩',
        activityOverducTime:'',//倒计时的结束时间,
        activityNowTime:''//服务器的当前时间
      }
    },
    computed:{

    },
    filters:{
      discount(price,salePrice){
        return ((salePrice/(price!=0?price:1))*10).toFixed(1)
      }
    },
    methods: {
      select(idx) {
        this.activeIdx = idx;
        if(idx == 0){
          document.body.scrollTop = this.tab1
        }
        if(idx == 1){
          document.body.scrollTop = this.tab2
        }
        if(idx == 2){
          document.body.scrollTop = this.tab3
        }
        if(idx == 3){
          document.body.scrollTop = this.tab4
        }


      },
      //获取活动信息
      getActivity(){
        if(!!sessionStorage.Activity){
             this.activity =JSON.parse(sessionStorage.Activity);
             if(!!this.activity){
              let sTime=new Date(this.activity.StartTime);//活动开始时间
              let eTime=new Date(this.activity.NowTime); //当前时间
              this.activityNowTime=this.activity.NowTime;
              if(sTime>eTime){
                  this.timeDownText='距离抢购开始还剩';
                  this.activityOverducTime=this.activity.StartTime;

              }else{
                  this.timeDownText='距离抢购结束还剩';
                  this.activityOverducTime=this.activity.EndTime;
              }
            }
            this.timeDown();
        }else{
          this.axios.get(this.url + '/api/Activity/GetActivityById/'+this.$route.params.id).then((res) => {
          if (res.data.Code == 200) {
            sessionStorage.setItem("Activity", JSON.stringify(res.data.ExData));
            this.activity = res.data.ExData;
            if(!!this.activity){
              let sTime=new Date(this.activity.StartTime);//活动开始时间
              let eTime=new Date(this.activity.NowTime); //当前时间
              this.activityNowTime=this.activity.NowTime;
              if(sTime>eTime){
                  this.timeDownText='距离抢购开始还剩';
                  this.activityOverducTime=this.activity.StartTime;
              }else{
                  this.timeDownText='距离抢购结束还剩';
                  this.activityOverducTime=this.activity.EndTime;
              }
            }
            this.timeDown();
          } else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          Toast('网络请求超时');
        })
        }

      },
      //获取限时特价商品
      getTimelimit(){
        this.axios.post(this.url + '/api/Activity/GetActivityProducts', {acId:this.$route.params.id,tagId: this.tabs[0].tabTag}).then((res) => {
            if (res.data.Code == 200) {
              if(res.data.Data==this.tabs[0].tabTag){
                 sessionStorage.setItem("TimeProducts", JSON.stringify(res.data.ExData));
                  this.timeProducts = res.data.ExData;
              }

            } else {
              Toast(res.data.Data);
            }
          }).catch((err) => {
            Toast('网络请求超时');
          })
      },
      //获取爆款特价商品
      getExplosion(){
        this.axios.post(this.url + '/api/Activity/GetExplosionProducts', {acId:this.$route.params.id,tagId: this.tabs[1].tabTag}).then((res) => {
            if (res.data.Code == 200) {
              if(res.data.Data==this.tabs[1].tabTag){
                  sessionStorage.setItem("ExpProducts", JSON.stringify(res.data.ExData));
                  this.expProducts = res.data.ExData;
              }

            } else {
              Toast(res.data.Data);
            }
          }).catch((err) => {
            Toast('网络请求超时');
          })
      },
      //获取精装礼品商品
      getHardcover(){
         this.axios.post(this.url + '/api/Activity/GetHardcoverProducts', {acId:this.$route.params.id,tagId: this.tabs[2].tabTag}).then((res) => {
            if (res.data.Code == 200) {
              if(res.data.Data==this.tabs[2].tabTag){
                sessionStorage.setItem("HadProducts", JSON.stringify(res.data.ExData));
                this.hadProducts = res.data.ExData;
              }

            } else {
              Toast(res.data.Data);
            }
          }).catch((err) => {
            Toast('网络请求超时');
          })
      } ,

       //倒计时
      timeDown () {
        if(!!!this.activityOverducTime){
            this.day=0;
            this.hour=0;
            this.minute=0;
            this.second=0;
        }else{
            let endTime = new Date(this.activityOverducTime.replace(/-/g,"/").replace('T',' '));
            let nowTime = new Date(this.activityNowTime.replace(/-/g,"/").replace('T',' '))
            let leftTime = parseInt((endTime.getTime()-nowTime.getTime())/1000)
            setInterval( ()=> {
              let d = this.formate(parseInt(leftTime/(24*60*60)))
              let h = this.formate(parseInt(leftTime/(60*60)%24))
              let m = this.formate(parseInt(leftTime/60%60))
              let s = this.formate(parseInt(leftTime%60))
              if(leftTime <= 0){
                this.flag = true
              }
              this.day=d;
              this.hour=h;
              this.minute=m;
              this.second=s;
              leftTime--;
            },1000)
        }

      },
      //时间格式
      formate (time) {
          if(time>=10){
              return time
          }else{
              return `0${time}`
          }
      },
      //立即购买
      choice(id,name,stock) {
        this.stock=stock;
        this.getProductSKU(id);
        this.choiceShow = !this.choiceShow
      },
      //关闭立即购买
      close(){
        this.choiceShow = !this.choiceShow
      },
      //数量变化
      changeNum(val) {
        //加
        if (val > 0) {
          if (parseInt(this.productNum) < parseInt(this.specStock)) {
            this.productNum++;
          } else {
            Toast('已经加到顶啦！');
          }
        } else {
          //减
          if (parseInt(this.productNum) > 1) {
            this.productNum--;
          } else {
            Toast('已经减到底啦！');
          }
        }
      },
      //加入购物车
      addCar() {
        if (this.checkIndex == -1) {
          Toast('请选择商品规格');
          return;
        }
         //定义商品参数

        let sku = {
          ShoppingCarId: 0,
          Name:this.productName,
          ProductId:this.productId,
          ProductSpecId: this.specId,
          ShortName: this.specName,
          Count: this.productNum,
          HeadImg: this.specImg,
          SalePrice: this.specPrice,
          AllStock:this.specStock
        }
        if(!!localStorage.lut){
             //验证localStorage.lut是否在登录状态
            this.axios.get(this.url + '/api/Login/CheckLogin?str='+localStorage.lut).then((res) => {
                if (res.data.Code == 500) {
                  //验证失败 清除localStorage
                  localStorage.removeItem('lut');
                  this.touristAddCar(sku);
                }else{
                  this.userAddCar();
                }
              })
        }else{
          this.touristAddCar(sku);
        }
      },
      //游客加入购物车
      touristAddCar(sku){
        let skus=[];
        if(!!localStorage.tourist){
            //localStorage.tourist已存在商品了
            let sc=JSON.parse(localStorage.tourist);
            let pro=false;
            sc.skus.forEach(function(item){
              if(item.ProductSpecId==sku.ProductSpecId){
                item.Count+=sku.Count;
                pro=true;
              }
            });
            if(!pro){
              sc.skus.push(sku);
            }
            localStorage.tourist=JSON.stringify(sc);
            this.$router.push({path: '/cart'})
          }else{
            skus.push(sku);
            let sc = {
              productOrderId: "0",
              skus: skus
            }
            localStorage.setItem("tourist", JSON.stringify(sc));
            this.$router.push({path: '/cart'})
          }
      },
      //登录的用户加入购物车
      userAddCar(){
            this.axios({
              url: this.url + '/api/ShoppingCar/AddToShoppingCar',
              method: 'post',
              data: {productSpecId: this.specId,  count: this.productNum},
              headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

            }).then((res) => {
              if (!!res) {
                if (res.data.Code == 200) {
                  this.choiceShow = !this.choiceShow
                  Toast(res.data.Data);
                } else {
                  Toast(res.data.Data);
                }
              }
            })
      },
      //选中商品规格
      checkSpec(index) {
        this.checkIndex = index;
        this.productId=this.productSpec[index].ProductId;
        this.productName=this.productSpec[index].ProductName;
        this.specId = this.productSpec[index].ProductSpecId;
        this.specName = this.productSpec[index].ShortName;
        this.specImg = this.productSpec[index].HeadImg;
        this.specPrice = this.productSpec[index].SalePrice;
        this.specStock = this.productSpec[index].Stock;
        this.checkMsg = '已选：' + this.productSpec[index].ShortName;
      },
      //获取商品SKU
      getProductSKU(proId) {
        this.axios.post(this.url + '/api/Product/ProductSpecs', {productId: proId}).then((res) => {
          if (res.data.Code == 200) {
            this.productSpec = res.data.Data;
            //设置默认选中第一个
            this.checkIndex = 0;
            this.productId=this.productSpec[0].ProductId;
            this.productName=this.productSpec[0].ProductName;
            this.specId = this.productSpec[0].ProductSpecId;
            this.specName = this.productSpec[0].ShortName;
            this.specImg = this.productSpec[0].HeadImg;
            this.specPrice = this.productSpec[0].SalePrice;
            this.specStock = this.productSpec[0].Stock;
            this.checkMsg = '已选：' + this.productSpec[0].ShortName;
          } else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          Toast('网络请求超时');
        })
      },
      //跳转商品详情
      chkDetail(val){
        this.$router.push({path: '/ProductDetails/'+val})
      },
      //跳转锚点
      scroll() {
        let pro = document.getElementById('pro');

        this.tab1 = document.getElementById('id1').offsetTop - 150;
        this.tab2 = document.getElementById('id2').offsetTop - 150;
        this.tab3 = document.getElementById('id3').offsetTop - 150;
        this.tab4 = document.getElementById('id4').offsetTop - 150;

        this.top = document.body.scrollTop;

        if(this.top >= this.tab1){
        	this.isfixed = true;
          this.activeIdx = 0
        }else {
          this.isfixed = false
        };

         if( this.top >= this.tab2 && this.tab3 > this.top){
           this.activeIdx = 1
        } if( this.top >= this.tab3 && this.tab4 > this.top){
          this.activeIdx = 2
        }if(this.top > this.tab4){
          this.activeIdx = 3
        }
      },
      //跳转链接
      jump(val){
        if(!!val){
            //this.$router.push({path: val})
            window.location.href=val;
        }

      },
      //获取banner图
      getBannerImg(){
        if(!!sessionStorage.AdvList){
          this.advList=JSON.parse(sessionStorage.AdvList);
        }else{
          this.axios.get(this.url + '/api/Advertising/GetAdvertisingByKey?key='+this.key).then((res) => {
            if (res.data.Code == 200) {
              sessionStorage.setItem("AdvList", JSON.stringify(res.data.Data));
              this.advList = res.data.Data;
            }
          })
        }

      }
    },
    created() {
      this.getBannerImg();
      this.getActivity();
     },
    mounted() {
      this.$nextTick(() => {
          if(!!this.$route.query.Expand){
            //存储推广位ID  ?Expand=
            sessionStorage.setItem("ExpandId",this.$route.query.Expand );
          }
          window.addEventListener('scroll', this.scroll);
          this.getTimelimit();
          this.getExplosion();
          this.getHardcover();
      })
    },
    beforeDestroy(){
      window.removeEventListener('scroll', this.scroll);
    }
  }
</script>

<style scoped>
  .clear {
    clear: both;
    height: 0;
    line-height: 0;
    font-size: 0
  }

  .orange {
    color: #FF5000;
  }

  .yellow {
    color: #FFF100;
  }

  .banner {
    height: 7.7rem;
  }

  .title {
    margin: 0.6rem 0;
  }

  .title > div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .title > div > img {
    width: 0.7rem;
  }
  .title#id4 > div > img{
    width: 1.5rem;
  }

  .title > div > span {
    font-weight: 600;
    margin: 0 0.3rem;
  }

  .ticket-box {
    line-height: 2.5rem;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  .ticket-box .ticket {
    font-size: 0.75rem;
    font-weight: 600;
    color: #fff;
    width: 7.2rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-size: 100% 100%;
    background-image: url("../../assets/images/activities/activities_10.png");
  }

  .title-z {
    margin: 0.6rem 0;
    text-align: center;
  }

  .title-z > span {
    position: relative;
  }

  .title-z > span:after, .title-z > span:before {
    background: #000000;
    content: "";
    height: 1px;
    position: absolute;
    top: 50%;
    width: 2rem;
  }

  .title-z > span:before {
    left: -2.6rem;
  }

  .title-z > span:after {
    right: -2.6rem;
  }

  .title-z .bg-time {
    padding: 0.1rem;
    border-radius: 0.1rem;
    color: #fff;
    background-color: #FD8661;
  }

  .tab-box {
    position: fixed;
    top:0;
    width: 100%;
    z-index: 99;
    line-height: 1.8rem;
    height: 1.8rem;
    display: flex;
    align-items: center;
    color: #fff;
    background-color: #333333;
  }
  .tab-box .tab {
    position: relative;
    text-align: center;
    width: 25%;
  }

  .tab-box .tab.active {
    height: 100%;
    background-color: #FF5000;
  }

  .tab-box .tab.active:after {
    background-size: 100% 100%;
    background-image: url("../../assets/images/activities/activities_14.png");
    content: "";
    height: 0.3rem;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 0.6rem;
  }

  .scroll-bar {
    width: 100%;
    display: inline;
    white-space: nowrap;
    overflow-x: scroll;
    float: left;
    overflow-y: hidden
  }

  .scroll-bar .scroll-cont {
    margin-left: 0.1rem;
    width: 5.2rem;
    border-radius: 0.2rem;
    background-color: #fff;
    display: inline-block;
  }

  .scroll-cont .cont-img {
    position: relative;
    width: 100%;
    height: 5rem;
  }

  .scroll-cont .cont-img > img {
    border-top-left-radius: 0.2rem;
    border-top-right-radius: 0.2rem;
  }

  .cont-img .cont-name {
    width: 100%;
    font-size: 0.55rem;
    text-align: center;
    position: absolute;
    bottom: 0;
    color: #fff;
    padding: 0 0.2rem;
    height: 0.8rem;
    line-height: 0.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .scroll-cont .cont-price {
    padding: 0.2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .new-price {
    font-size: 0.7rem;
    color: #FF0000;
  }

  .old-price {
    font-size: 0.55rem;
    color: #999;
    text-decoration: line-through;
  }

  .scroll-cont .cont-btn {
    margin: 0 auto 0.4rem;
    padding: 0.1rem 0;
    text-align: center;
    border-radius: 0.1rem;
    color: #fff;
    width: 4rem;
    background-color: #FF0000;
  }

  .pro-list {
    padding: 0 0.4rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .pro-list .pro-left {
    margin-left: 2%;
  }
  .pro-box{
    margin-top: 0.26rem;
    font-size: 0.6rem;
    background-color: #fff;
    width: 49%;
  }
  .pro-box .pro-img {
    width: 100%;
    height: 7rem;
  }
  .pro-box .pro-name{
    font-size: 0.55rem;
    padding:0.1rem 0.2rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .pro-box .pro-price{
    margin: 0.2rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pro-box .pro-btn-group{
    margin: 0.2rem 0;
    padding: 0 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .pro-box .pro-btn-group .pro-btn{
    padding: 0.1rem 0;
    border-radius: 0.1rem;
    text-align: center;
    width: 48%;
    font-size: 0.55rem;
  }
  .pro-btn-group .zhe{
    border: 1px solid #FE0000;
    color: #FE0000;
  }
  .pro-btn-group .gou{
    background-color: #FE0000;
    color: #fff;
  }
  .QRcode{
    justify-content: center;
  }
  .QRcode > img{
    width: 7rem!important;
    height: 7rem;
  }
  .fl-list{
    color: #666;
    margin-bottom: 0.6rem;
  }
  .fl-list > li{
    width: 100%;
    height: 1.68rem;
    line-height: 1.68rem;
    padding-left: 2.5rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/activities/avtive_07.png");
    margin-bottom: 0.5rem;
  }
  /*选择规格*/
  .choice-model {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 922;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .choice {
    width: 100%;
    height: 19rem;
    bottom: 0;
    position: fixed;
    padding: 0.5rem 0.5rem 0;
    z-index: 933;
    background-color: #fff;
  }

  .choice .choice-img {
    width: 5rem;
    height: 5rem;
    border-radius: 0.2rem;
    padding: 0.1rem;
    background-color: #ffffff;
    border: 1px solid #ddd;
    box-shadow: 0 0 3px #ddd;
    top: -0.8rem;
    left: 0.5rem;
    position: absolute;
  }

  .choice .choice-p {
    line-height: 1.1rem;
    padding-left: 6rem;
    height: 4.8rem;
    font-size: 0.55rem;
    border-bottom: 1px solid #eee;
  }

  .choice .choice-p > div:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .choice-p .choice-p-price {
    font-weight: 600;
    color: #d81e06;
    font-size: 0.75rem;
  }

  .choice-p > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .choice-p .del {
    width: 1rem;
    height: 1rem;
  }

  .choice .choice-spec {
    padding: 0.5rem 0 0.7rem;
    height: 8.8rem;
    overflow: auto;
  }

  .choice-spec .spec-box {
    margin-top: 0.5rem;
    font-size: 0.55rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .choice-spec .spec-box .spec {
    padding: 0.2rem;
    margin-left: 0.5rem;
    font-size: 0.5rem;
    border-radius: 0.2rem;
    margin-bottom: 0.5rem;
    background-color: #e8e8e8;
  }

  .choice-spec .spec-box .spec-checked {
    color: #ffffff;
    background-color: #d81e06;
  }

  .choice .choice-num {
    padding: 0.8rem 0;
    border-top: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .choice-num > div:last-child {
    display: flex;
    align-items: center;
    border-radius: 0.1rem;
    border: 1px solid #bbb;
  }

  .choice-num input {
    text-align: center;
    width: 1.8rem;
    height: 1.2rem;
    border-top: none;
    border-bottom: none;
    border-left: 1px solid #bbb;
    border-right: 1px solid #bbb;
  }

  .choice-num span {
    width: 1.4rem;
    text-align: center;
    line-height: 1.2rem;
    height: 1.2rem;
    padding: 0 0.4rem;
    font-size: 0.8rem;
  }

  .choice .choice-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    text-align: center;
    padding: 0.6rem 0;
    color: #ffffff;
    background-color: #d81e06;
    width: 100%;
  }
  .moerfl{
    border-radius: 0.4rem;
    padding: 0.8rem 0.4rem 0.2rem 0.4rem;
    margin-left: 0.4rem;
    margin-right: 0.4rem;
    background-color: #F9BDAA;
  }
  .moerfl > div >span{
    color: #FFF100;
  }
  .drop-enter-active, .drop-leave-active {
    transition: all .4s;
  }

  .drop-enter, .drop-leave-active {
    bottom: -100%;
  }
  .shao{
    margin: 0.4rem auto;
    width: 4.6rem;
    border-radius: 0.4rem;
    background-color: #FF5001;
  }
</style>
