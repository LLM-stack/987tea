<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">提交订单</div>
    </Mheader>
    <!--<router-link :to="{path:'/MyAddress/pay'}">-->
    <div class="address lm-margin-b-sm" @click="selectAddress">
      <div>
        <div class="name">{{defaultAddress.ConsigneeName}}</div>
        <div class="mr" v-if="defaultAddress.IsDefault==0">默认</div>
      </div>
      <div v-if="!!!defaultAddress">
        <div>还没有收货地址</div>
      </div>
      <div v-else>
        <div class="tel">{{defaultAddress.Mobile}}</div>
        <div class="add">{{addressDetail}}</div>
      </div>
      <div>
        <img src="../../assets/images/arrow.png" />
      </div>
    </div>
    <!--</router-link>-->
    <div class="pay-modes lm-margin-b-sm">
      <div>支付方式：</div>
      <div class="pay-mode lm-margin-t-sm">
        <div :class="{active:payType==0}" @click="checkType(0)">
          <img src="../../assets/images/cart/huo.png" />货到付款</div>
        <div class="lm-margin-xl" :class="{active:payType==2}" @click="checkType(2)">
          <img src="../../assets/images/cart/zfb.png" />支付宝</div>
        <!--<div class="lm-margin-xl" :class="{active:payType==1}" @click="checkType(1)"><img src="../../assets/images/cart/wx.png" />微信支付</div>-->
      </div>
    </div>
    <div class="product" v-for="(item,index) in orderDetails" :key='index'>
      <img class="product-img" :src="item.ProductImg" />
      <div class="product-details">
        <div>
          <p>{{item.ProductName}}</p>
          <p class="lm-text-grey lm-font-xs">{{ item.ShortName }}</p>
        </div>
  
        <div>
          <span>
            <span class="lm-text-red">￥{{item.ProductSpecPrice}}</span>元
            <span v-if="teaBMall"> +
              <span class="lm-text-red">{{item.TeaBPrice}}</span>茶币</span>
          </span>
          <span>x{{item.ProductCount}}</span>
        </div>
      </div>
    </div>
  
    <div class="lm-margin-b-sm lm-margin-t-sm">
      <div class="coupon" v-for="(dis,index) in discount" @click="chkFavInfo(index)" :key='index'>
        <div>{{dis.FavContent | discountContent}}</div>
        <div class="product-select" :class="{checked:isChecked == index}"></div>
      </div>
    </div>
  
    <div class="order-details lm-margin-b-lg">
      <div class="lm-margin-b-sm">订单明细：</div>
      <div class="details">
        <span>订单总价</span>
        <span>￥{{orderTotal}}</span>
      </div>
      <!--TODO:运费还未计算到总价格中去-->
      <div class="details">
        <span>运费</span>
        <span>{{freight}}</span>
      </div>
      <div class="details" v-if="teaBMall">
        <span>茶币</span>
        <span>{{teaBPrice}}</span>
      </div>
      <div class="details" v-else>
        <span>优惠</span>
        <span>{{subtract}}</span>
      </div>
      <div class="details">
        <span>总计</span>
        <span class="lm-text-red">￥{{total}}</span>
      </div>
    </div>
    <div class="hide" v-html="alipay"></div>
    <div class="pay">
      <div>
        <div>共选择
          <span class="lm-text-red">{{ProductCount}}</span>件商品</div>
        <div>总金额：
          <span class="lm-text-red">￥{{total}}</span> 元</div>
      </div>
      <div class="topay" :class="{disableTap:isOnce}" @click="oncePayment">立即付款</div>
    </div>
  
  </div>
</template>

<script>
import Mheader from '../../components/Mheader'
import { Toast } from 'mint-ui'

export default {
  components: {
    Mheader
  },
  data() {
    return {
      defaultAddress: '',
      ProductCount: '',
      orderDetails: [],
      isChecked: '',
      freight: 0,//运费
      payType: 0,//支付类型
      alipay: '',//ali支付form表单信息
      productOrderId: "0",
      discount: [],//优惠记录信息
      chkdiscount:'',//选中的优惠信息
      subtract: '0',//优惠折扣价格
      teaBMall: false,
      teaBPrice: '0',
      isOnce: false
    }
  },
  computed: {
    orderTotal() {
      let t = 0;
      this.orderDetails.forEach(function (item) {
        t += parseInt(item.ProductCount) * parseFloat(item.ProductSpecPrice);
      });
      return t;
    },
    total() {
      return parseFloat(this.orderTotal) + parseFloat(this.freight) + parseFloat(this.subtract);
    },
    addressDetail() {
      return this.defaultAddress.Province + this.defaultAddress.City + this.defaultAddress.Area + this.defaultAddress.Detail;
    }

  },
  filters: {
    discountContent(val) {
      let strs = val.split('【');
      let lastStr = strs[1].split('】');
      return strs[0] + lastStr[1];
    }
  },
  methods: {
    //获取默认的收货地址
    getDefaultAddress() {
      this.axios({
        url: this.url + '/api/ReceiveAddress/GetDefaultAddress',
        method: 'get',
        headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }

      }).then((res) => {
        if (!!res) {
          if (res.data.Code == 200) {
            this.defaultAddress = res.data.ExData;
          } else {
            Toast(res.data.Data);
          }
        }
      })
    },

    //支付类型选择
    checkType(val) {
      this.payType = val;
    },
    //提交订单支付
    oncePayment() {
      this.isOnce = true;
      //定义地址参数
      let str_address = {
        AddressId: this.defaultAddress.AdressId,
        Province: this.defaultAddress.Province,
        City: this.defaultAddress.City,
        Area: this.defaultAddress.Area,
        Detail: this.defaultAddress.Detail.replace(/(^\s+)|(\s+$)/g, ""),
        Phone: this.defaultAddress.Mobile.replace(/(^\s+)|(\s+$)/g, ""),
        Reciever: this.defaultAddress.ConsigneeName.replace(/(^\s+)|(\s+$)/g, ""),
      }
      //定义参数
      let sc = {
        TotalPrice: this.total,
        PayType: this.payType,
        ProductCount: this.ProductCount,
        OrderFrom: this.teaBMall ? 4 : 2,//订单来源  2标识商城  4表示茶币商城
        AddressId: this.defaultAddress.AdressId,
        ProductSkus: this.orderDetails,
        ProductOrderId: this.productOrderId,
        OrderAddress: str_address,
        OrderToPrice:[!!!this.chkdiscount?undefined:this.chkdiscount],
        ExpandId: !!sessionStorage.getItem("PromotionKey") ? sessionStorage.getItem("PromotionKey") : sessionStorage.getItem("ExpandId")
      }

      if (this.teaBMall) {
        this.taaBMallOrder(sc);
      } else {
        this.mallOrder(sc);
      }

    },
    //商城下单
    mallOrder(sc) {
      this.axios({
        url: this.url + '/api/Order/SaveOrder',
        method: 'post',
        data: { strSc: JSON.stringify(sc) },
        headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }
      }).then((res) => {
        if (!!res)
          if (res.data.Code == 200) {
            sessionStorage.removeItem("pay");
            sessionStorage.removeItem("PromotionKey")//移除推广位id
            sessionStorage.removeItem("ExpandId")//移除活动推广位id
            if (this.payType == 0) {
              this.isOnce = false;
              this.$router.push({ path: '/paymentCompleted' })
            }
            if (this.payType == 2) {
              this.alipay = res.data.ExData;
              setTimeout(function () {
                this.isOnce = false;
                document.forms['alipaysubmit'].submit();
              }, 0)
            }
          } else {
            this.isOnce = false;
            Toast(res.data.Data);
          }

      })
    },
    //茶币商城下单
    taaBMallOrder(sc) {
      this.axios({
        url: this.url + '/api/Order/TeaBPay',
        method: 'post',
        data: { strSc: JSON.stringify(sc) },
        headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }
      }).then((res) => {
        if (!!res)
          if (res.data.Code == 200) {
            sessionStorage.removeItem("pay");
            localStorage.removeItem("PromotionKey")//移除推广位id
            localStorage.removeItem("ExpandId")//移除活动推广位id
            if (this.payType == 0) {
              this.isOnce = false;
              this.$router.push({ path: '/paymentCompleted' })
            }
            if (this.payType == 2) {
              if (res.data.ExData == "0") {
                this.$router.push({ path: '/paymentCompleted' })
              } else {
                this.alipay = res.data.ExData;
                setTimeout(function () {
                  this.isOnce = false;
                  document.forms['alipaysubmit'].submit();
                }, 0)
              }
            }
          } else {
            this.isOnce = false;
            Toast(res.data.Data);
          }

      })
    },
    selectAddress() {
      this.$router.push({ path: '/MyAddress/' })
    },
    //获取优惠信息
    getPreOrderFavInfo() {
      //定义参数
      let sc = {
        TotalPrice: this.total,
        PayType: 0,//0是货到付款
        ProductCount: this.ProductCount,
        OrderFrom: 2,//订单来源  2标识商城
        AddressId: '0',
        ProductSkus: this.orderDetails,
        ProductOrderId: '0',
        OrderAddress: '',
        OrderToPrice: ''
      }
       this.axios({
        url: this.url + '/api/Order/LoadPreOrderFavInfo',
        method: 'post',
        data: { strSc: JSON.stringify(sc) },
        headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }
      }).then((res) => {
        if (res.data.Code == 200) {
          this.discount = res.data.Data;
          if (this.discount.length == 0) {
            this.subtract = '0';
          } else {
            this.subtract = '-' + this.discount[0].FavPrice;
          }
        } else {
           if(res.data.Data=='目前暂不支持同时购买多件商品，请分开购买'){
                let instance = Toast(res.data.Data);
                    setTimeout(() => {
                      instance.close(); 
                      this.$router.replace({
                            path: '/cart'
                          })
                    }, 1500);
            }else{
              Toast(res.data.Data);
            }
        }
      })
    },
    //选中优惠折扣方式
    chkFavInfo(index) {
      this.chkdiscount=this.discount[index];
      this.subtract = '-' + this.discount[index].FavPrice;
      this.isChecked = index;
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (!!sessionStorage.pay) {
        //继续付款
        var sc = JSON.parse(sessionStorage.pay);
        this.productOrderId = sc.productOrderId;
        this.orderDetails = sc.skus;
        this.ProductCount = this.orderDetails.length;
        if (this.productOrderId != '0') {
          this.payType = sc.payType;
          this.defaultAddress = sc.receive;
        } else {
          //首次付款
          if (!!!this.$store.state.receiveAddress) {
            this.getDefaultAddress();
          }
        }
        if (sc.mallType != 'teaBMall') {
          this.teaBMall = false;
          this.getPreOrderFavInfo();
        } else {
          let totalTeaB = 0;
          this.orderDetails.forEach(function (item) {
            totalTeaB += item.TeaBPrice;
          })
          this.teaBPrice = totalTeaB == 0 ? 0 : '-' + totalTeaB;
          this.teaBMall = true;
        }
      }

      //判断选择的地址是否为空
      if (!!this.$store.state.receiveAddress) {
        this.defaultAddress = this.$store.state.receiveAddress;

      }

    })
  },
  beforeDestroy() {

  }

}
</script>

<style scoped>
.hide {
  display: none;
}

.address {
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  background-color: #ffffff;
}

.address+.address {
  border-top: 1px solid #eeeeee;
}

.address>div:first-child {
  padding-left: 0.5rem;
  width: 4rem;
}

.address>div:first-child .name {
  font-size: 0.55rem;
}

.address>div:first-child .mr {
  margin-top: 0.3rem;
  width: 1.5rem;
  text-align: center;
  border-radius: 0.1rem;
  font-size: 0.5rem;
  color: #B4282D;
  border: 1px solid #B4282D;
}

.address>div:nth-child(2) {
  margin-left: 0.8rem;
  width: 9rem;
}

.address>div:nth-child(2) .add {
  margin-top: 0.2rem;
  font-size: 0.6rem;
  color: #999;
}

.address>div:last-child {
  width: 1rem;
  height: 1rem;
  margin-left: 0.7rem;
}

.pay-modes {
  padding: 0.4rem;
  background-color: #ffffff;
}

.pay-modes .pay-mode {
  display: flex;
  align-items: center;
}

.pay-modes .pay-mode>div {
  display: flex;
  align-items: center;
  min-width: 4.4rem;
  padding: 0.1rem;
  border-radius: 0.1rem;
  font-size: 0.6rem;
  border: 1px solid #999;
}

.pay-mode>div>img {
  margin-right: 0.2rem;
  width: 1.2rem;
  height: 1.2rem;
}

.pay-mode .active {
  color: #B4282D;
  border-color: #B4282D!important;
  /*background-color: #B4282D;*/
}

.product {
  display: flex;
  align-items: center;
  padding: 0.4rem;
  border-top: 1px solid #eee;
  background-color: #ffffff;
}

.product .product-img {
  width: 3.2rem;
  height: 3.2rem;
  border: 1px solid #eeeeee;
  margin-right: 0.5rem;
}

.product .product-details {
  width: 100%;
  height: 3.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product .product-details>div:last-child {
  display: flex;
  justify-content: space-between;
}

.coupon {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.6rem;
  border-top: 1px solid #eee;
  padding: 0.4rem;
  background-color: #ffffff;
}

.order-details {
  padding: 0.4rem;
  background-color: #ffffff;
}

.order-details .details {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.2rem;
}

.order-details .details>span:first-child {
  color: #999999;
  font-size: 0.6rem;
}

.pay {
  width: 100%;
  bottom: 0;
  position: fixed;
  height: 2.4rem;
  padding-left: 0.4rem;
  border-top: 1px solid #eeeeee;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pay .topay {
  text-align: center;
  line-height: 2.4rem;
  color: #ffffff;
  width: 4.5rem;
  height: 100%;
  background-color: #B4282D;
}

.product-select {
  width: 0.8rem;
  height: 0.8rem;
  margin-right: 0.4rem;
  background-image: url("../../assets/images/cart/unchecked.png");
  background-size: 100% 100%;
}

.checked {
  background-image: url("../../assets/images/cart/checked.png");
}
</style>
