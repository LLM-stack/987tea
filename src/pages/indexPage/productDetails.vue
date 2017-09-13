<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">商品详情</div>
    </Mheader>
    <div class="img-box">
      <img v-lazy="product.HeadImg" alt="商品图片">
    </div>
    <div class="title">
      <div>{{product.Name}}</div>
      <div class="lm-text-grey">{{product.SaleComment}}</div>
      <div class="lm-text-red">￥{{product.SalePrice}}
        <span class="old-price lm-text-grey ">￥{{product.Price}}</span>
      </div>
    </div>
    <div class="service">
      <div>
        茶币&nbsp;&nbsp;&nbsp;买就赠送
        <span class="lm-text-red">{{product.SalePrice | teaB}}</span>茶币
      </div>
      <div>
        <div class="fw">服务</div>
        <div class="promise lm-margin-r-lg">
          <div>
            <i></i>全场商品30天保价</div>
          <div>
            <i></i>满59免运费</div>
        </div>
        <div class="promise">
          <div>
            <i></i>7天无忧退换货</div>
          <div>
            <i></i>1000个城市货到付款</div>
        </div>
      </div>
    </div>
    <div class="buy-box">
      <div class="icon">
        <div>
          <img src="../../assets/images/productDetails/kf.png" alt=""> 联系客服
        </div>
      </div>
      <div class="icon" @click="favouriteProduct">
        <div>
          <img v-if="sc" src="../../assets/images/productDetails/ysc.png" />
          <img v-else src="../../assets/images/productDetails/wsc.png" /> 收藏商品
        </div>
      </div>
      <div class="buy-mode" @click="choice(1)">加入购物车</div>
      <div class="buy-mode" @click="choice(2)">立即购买</div>
    </div>

    <div class="tab">
      <div class="navbar-item" v-for="(item, index) in tab" @click="selected(index)" :key='index' :class="{isSelected:index == tabIndex}">{{ item.tabName }}
      </div>
    </div>

    <!-- tab-container -->
    <div>
      <div v-if="tabIndex == 0" class="productDescribe" v-html="product.Describe">
      </div>
      <div v-if="tabIndex == 1">
        <div class="parameter">
          <div class="parameter-list" v-for="(item,index) in productParams" :key='index'>{{item.ParamKey}}：{{item.ParamValue}}</div>
        </div>
      </div>
      <div v-if="tabIndex == 2">
        <div class="evaluate-list">
          <div class="evaluate" v-for="(item,index) in productDesc" :key='index'>
            <div>
              <span class=" lm-text-grey">{{item.UserName}}</span>
            </div>
            <div class="content lm-margin-t-sm">
              {{item.Content}}
            </div>
            <div class="evaluate-time lm-margin-t-xs">
              {{item.CrateTime | formatTime}}
            </div>
          </div>
        </div>
        <div class="more-comment" v-if="productDesc.length>0">
          <span @click="loadMore">{{moreContent}}</span>
        </div>
        <div class="more-comment" v-else>
          <span>暂无评论</span>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div class="choice-model" v-if="choiceShow" @click="choice(isCar)">

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
            <div class="del" @click="close">
              <img src="../../assets/images/productDetails/del.png" />
            </div>
          </div>
          <div>库存 {{specStock}} 件</div>
          <div>{{checkMsg}}</div>
        </div>
        <div class="choice-spec">
          <div>规格</div>
          <div class="spec-box">

            <div class="spec" v-for="(item, index) in productSpec" @click="checkSpec(index)" :key='index' :class="index == checkIndex?'spec-checked':''">{{item.ShortName}}
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

        <div class="choice-btn" @click="addCar">确定</div>
      </div>
    </transition>

  </div>
</template>

<script>
import Mheader from '../../components/Mheader'
import { Toast } from 'mint-ui';

export default {
  components: {
    Mheader
  },
  data() {
    return {
      tabIndex: 0,
      choiceShow: false,
      productNum: 1,
      sc: false,
      tab: [
        { tabName: "商品详情" },
        { tabName: "参数" },
        { tabName: "评论(132)" }
      ],
      product: '',//商品信息
      productSpec: '',//商品sku
      productDesc: [],//商品评论
      productParams: '',//商品参数
      //评论下拉加载
      pageIndex: 1,
      pageSize: 50,
      loading: true,
      moreContent: '点击查看更多...',
      //规格参数
      checkMsg: '请选择 规格',
      specId: '',
      specName: '',
      specImg: '',
      specPrice: 0,
      specStock: 0,
      productName: '',
      productId: '',
      checkIndex: -1,
      isCar: 0
    }
  },
  filters: {
    teaB(value) {
      return parseInt((value) * 5);
    },
    formatTime(val) {
      let date = new Date(val);
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      let minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      return y + '-' + m + '-' + d;
    }
  },
  methods: {
    loadMore() {
      this.pageIndex++;
      this.getProductEstimates();
    },
    selected(i) {
      this.tabIndex = i
    },
    choice(val) {
      //首次点击加载sku信息
      if (this.isCar == 0) {
        this.getProductSKU();
      }
      this.isCar = val;
      this.choiceShow = !this.choiceShow
    },
    close() {
      this.choiceShow = !this.choiceShow
    },
    //获取商品信息
    getProduct() {
      this.axios.post(this.url + '/api/Product/ProductDetail', { productId: this.$route.params.productID }).then((res) => {
        if (res.data.Code == 200) {
          this.product = res.data.Data;
          //设置选择商品规格的默认参数
          this.specImg = this.product.HeadImg;
          this.specPrice = this.product.Price;
          this.specStock = this.product.AllStock;
          //this.getBrowse();
        } else {
          Toast(res.data.Data);
        }
      })
    },
    //获取商品SKU
    getProductSKU() {
      this.axios.post(this.url + '/api/Product/ProductSpecs', { productId: this.$route.params.productID }).then((res) => {
        if (res.data.Code == 200) {
          this.productSpec = res.data.Data;
          //设置默认选中第一个
          this.checkIndex = 0;
          this.productId = this.productSpec[0].ProductId;
          this.productName = this.productSpec[0].ProductName;
          this.specId = this.productSpec[0].ProductSpecId;
          this.specName = this.productSpec[0].ShortName;
          this.specImg = this.productSpec[0].HeadImg;
          this.specPrice = this.productSpec[0].SalePrice;
          this.specStock = this.productSpec[0].Stock;
          this.checkMsg = '已选：' + this.productSpec[0].ShortName;
        } else {
          Toast(res.data.Data);
        }
      })
    },
    //获取商品参数
    getParams() {
      this.axios.post(this.url + '/api/Product/ProductParameters', { productId: this.$route.params.productID }).then((res) => {
        if (res.data.Code == 200) {
          this.productParams = res.data.Data;
        } else {
          Toast(res.data.Data);
        }
      })
    },
    //收藏商品
    favouriteProduct() {
      if (!this.sc) {
        this.axios({
          url: this.url + '/api/Product/FavouriteProduct',
          method: 'post',
          data: { ProductId: this.$route.params.productID },
          headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }
        }).then((res) => {
          if (!!res) {
            if (res.data.Code == 200) {
              this.sc = !this.sc
              Toast(res.data.Data);
            } else {
              Toast(res.data.Data);
            }
          }
        })

      }
    },
    //选中商品规格
    checkSpec(index) {
      this.checkIndex = index;
      this.productId = this.productSpec[index].ProductId;
      this.productName = this.productSpec[index].ProductName;
      this.specId = this.productSpec[index].ProductSpecId;
      this.specName = this.productSpec[index].ShortName;
      this.specImg = this.productSpec[index].HeadImg;
      this.specPrice = this.productSpec[index].SalePrice;
      this.specStock = this.productSpec[index].Stock;
      this.checkMsg = '已选：' + this.productSpec[index].ShortName;
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
    //确定的加入购物车或下单
    addCar() {
      if (this.checkIndex == -1) {
        Toast('请选择商品规格');
        return;
      }

      if (!!localStorage.lut) {
        //验证localStorage.lut是否在登录状态
        this.axios.get(this.url + '/api/Login/CheckLogin?str=' + localStorage.lut).then((res) => {
          if (res.data.Code == 500) {
            //验证失败 清除localStorage
            localStorage.removeItem('lut');
          }
        })
      }
      //加入购物车
      if (this.isCar == 1) {

        if (!!localStorage.lut) {
          //登录的用户加入购物车
          this.axios({
            url: this.url + '/api/ShoppingCar/AddToShoppingCar',
            method: 'post',
            data: { productSpecId: this.specId, count: this.productNum },
            headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }

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
        } else {
          //游客加入购物车
          let skus = [];
          //定义购物车商品参数
          let sku = {
            ShoppingCarId: 0,
            Name: this.productName,
            ProductId: this.productId,
            ProductSpecId: this.specId,
            ShortName: this.specName,
            Count: this.productNum,
            HeadImg: this.specImg,
            SalePrice: this.specPrice,
            AllStock: this.specStock
          }
          if (!!localStorage.tourist) {
            //购物车的localStorage.tourist已经存在商品了
            let sc = JSON.parse(localStorage.tourist);
            let pro = false;
            sc.skus.forEach(function (item) {
              if (item.ProductSpecId == sku.ProductSpecId) {
                item.Count += sku.Count;//相同的商品就增加数量
                pro = true;
              }
            });
            if (!pro) {
              sc.skus.push(sku);
            }
            localStorage.tourist = JSON.stringify(sc);
            this.$router.push({ path: '/cart' })
          } else {
            skus.push(sku);
            let sc = {
              productOrderId: "0",
              skus: skus
            }
            localStorage.setItem("tourist", JSON.stringify(sc));
            this.$router.push({ path: '/cart' })
          }
        }
      }
      //立即下单
      if (this.isCar == 2) {
        if (!!localStorage.lut) {//用户登录的时候
          //定义下单参数
          let sku = [{
            ShoppingCarId: 0,
            ProductId: this.productId,
            ProductSpecId: this.specId,
            ProductName: this.specName,
            ProductCount: this.productNum,
            ProductImg: this.specImg,
            ProductSpecPrice: this.specPrice
          }];
          let sc = {
            productOrderId: "0",
            skus: sku
          }
          sessionStorage.setItem("pay", JSON.stringify(sc));
          this.$router.push({ path: '/Payment' })
        } else {
          //游客身份购买
          let skus = [];
          //定义购物车商品参数
          let sku = {
            ShoppingCarId: 0,
            Name: this.productName,
            ProductId: this.productId,
            ProductSpecId: this.specId,
            ShortName: this.specName,
            Count: this.productNum,
            HeadImg: this.specImg,
            SalePrice: this.specPrice,
            AllStock: this.specStock
          }
          if (!!localStorage.tourist) {
            //购物车的localStorage.tourist已经存在商品了
            let sc = JSON.parse(localStorage.tourist);
            let pro = false;
            sc.skus.forEach(function (item) {
              if (item.ProductSpecId == sku.ProductSpecId) {
                item.Count += sku.Count;//相同的商品就增加数量
                pro = true;
              }
            });
            if (!pro) {
              sc.skus.push(sku);
            }
            localStorage.tourist = JSON.stringify(sc);
            this.$router.push({ path: '/cart' })
          } else {
            skus.push(sku);
            let sc = {
              productOrderId: "0",
              skus: skus
            }
            localStorage.setItem("tourist", JSON.stringify(sc));
            this.$router.push({ path: '/cart' })
          }
        }
      }
    },
    //该商品是否收藏了
    isFavourite() {
      if (!!localStorage.lut) {
        this.axios({
          url: this.url + '/api/Product/IsFavourite',
          method: 'post',
          data: { productId: this.$route.params.productID },
          headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }
        }).then((res) => {
          if (!!res) {
            if (res.data.Code == 200) {
              this.sc = !this.sc
            }
          }
        })

      }
    },
    //获取商品评论
    getProductEstimates() {
      if (this.loading) {
        this.axios.post(this.url + '/api/Product/ProductEstimates', {
          productId: this.$route.params.productID,
          rows: this.pageSize,
          page: this.pageIndex
        }).then((res) => {
          if (res.data.Code == 200) {
            if (this.pageIndex == 1) {
              this.productDesc = res.data.Data.List;
            } else {
              if (res.data.Data.List.length > 0) {
                for (let i = 0; i < res.data.Data.List.length; i++) {
                  this.productDesc.push(res.data.Data.List[i])
                }

              } else {
                this.loading = false;
                this.moreContent = "已经查看了所有的评论了！！！";
              }
            }
            this.tab[2].tabName = "评论(" + res.data.Data.records + ")"
          } else {
            Toast(res.data.Data);
          }
        })
      }

    },
    //组建浏览记录
    getBrowse() {
      let pClass = [];
      let pTags = [];
      let productClass = {
        productClassId: this.product.ProductClassifyId,
        count: 1
      }
      let productTag = {
        productTagId: this.product.ProductTagIds,
        count: 1
      }
      if (!!localStorage.browse) {
        let browses = JSON.parse(localStorage.browse);
        let bo_class = false;
        let bo_tag = false;
        if (browses.productTags.length > 100) {
          //当localStorage的存储的长度超过100后 清空localStorage
          localStorage.removeItem('browse');
        } else {
          browses.productClass.forEach(function (item) {
            if (item.productClassId == productClass.productClassId) {
              item.count += productClass.count;//相同的商品标签就增加数量
              bo_class = true;
            }
          });
          if (!bo_class) {
            browses.productClass.push(productClass);
          }
          browses.productTags.forEach(function (item) {
            if (item.productTagId == productTag.productTagId) {
              item.count += productTag.count;//相同的商品标签就增加数量
              bo_tag = true;
            }
          });
          if (!bo_tag) {
            browses.productTags.push(productTag);
          }

          localStorage.browse = JSON.stringify(browses);
        }

      } else {
        pClass.push(productClass);
        pTags.push(productTag);
        let blog = {
          productClass: pClass,
          productTags: pTags
        }
        localStorage.setItem('browse', JSON.stringify(blog));
      }

    }
  },

  mounted() {
    this.$nextTick(() => {
      document.body.scrollTop = 0;
      this.getProduct();
      this.getParams();
      this.getProductEstimates();
      this.isFavourite();
    });
  },
  beforeDestroy() {

    this.getBrowse();
  }

}
</script>

<style scoped>
.img-box {
  margin-top: 1.8rem;
  height: 16rem;
}

.title {
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  background-color: #fff;
}

.title>div {
  margin: 0.2rem 0;
}

.title .old-price {
  font-size: 0.55rem;
  margin-left: 0.2rem;
  text-decoration: line-through;
}

.service {
  margin: 0.4rem 0;
  padding: 0 0.4rem;
  font-size: 0.65rem;
  background-color: #fff;
}

.service>div {
  padding: 0.3rem 0;
}

.service>div:first-child {
  border-bottom: 1px solid #eee;
}

.service>div:last-child {
  display: flex;
}

.service .fw {
  padding-top: 0.1rem;
  margin-right: 0.5rem;
}

.service .promise>div {
  display: flex;
  align-items: center;
  margin-top: 0.1rem;
  font-size: 0.55rem;
  color: #999;
}

.service .promise i {
  width: 0.55rem;
  height: 0.55rem;
  margin-right: 0.1rem;
  display: inline-block;
  background-size: 100% 100%;
  background-image: url("../../assets/images/productDetails/keyi.png");
}

.buy-box {
  font-size: 0.65rem;
  display: flex;
  position: fixed;
  z-index: 911;
  bottom: 0;
  width: 100%;
  height: 2rem;
  text-align: center;
  border-top: 1px solid #ddd;
  background-color: #fff;
}

.buy-box .icon {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.45rem;
  width: 20%;
  height: 100%;
  border-right: 1px solid #ddd;
}

.buy-box .icon img {
  margin: 0 auto 0.06rem;
  display: block;
  width: 0.8rem;
  height: 0.8rem;
}

.buy-box .buy-mode {
  line-height: 2rem;
  width: 30%;
  height: 100%;
}

.buy-box .buy-mode:last-child {
  color: #fff;
  background-color: #B22328;
}

.tab {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #eeeeee;
}

.tab>div {
  height: 1.6rem;
  line-height: 1.6rem;
  text-align: center;
  width: 33.33%;
}

.isSelected {
  color: #B22328 !important;
  margin-bottom: 0 !important;
  border-bottom: 3px solid #B22328 !important;
}

.productDescribe img {
  width: 100%;
}


/*参数页*/

.parameter {
  font-size: 0.65rem;
  background-color: #fff;
  padding: 0.4rem;
  min-height: 15rem;
}

.parameter .parameter-list {
  padding: 0.3rem 0;
  border-bottom: 1px dashed #666;
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

.choice .choice-p>div:last-child {
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

.choice-p>div:first-child {
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

.choice-num>div:last-child {
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


/*评价列表*/

.evaluate-list {
  background-color: #ffffff;
}

.evaluate-list .evaluate {
  padding: 0.4rem;
  font-size: 0.55rem;
  border-bottom: 1px solid #eeeeee;
}

.evaluate>div {
  display: flex;
  align-items: center;
}

.evaluate>div:first-child img {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
}

.evaluate .content {
  line-height: 0.8rem;
}

.evaluate .evaluate-time {
  width: 100%;
  justify-content: flex-end;
}



.drop-enter-active,
.drop-leave-active {
  transition: all .4s;
}

.drop-enter,
.drop-leave-active {
  bottom: -100%;
}
</style>
