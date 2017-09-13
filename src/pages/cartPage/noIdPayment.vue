<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">提交订单</div>
    </Mheader>

    <div class="info lm-margin-b-sm">
      <mt-field label="收货人" placeholder="请输入收货人姓名" v-model="username"></mt-field>
      <mt-field label="手机号" placeholder="请输入收货人手机号" type="tel" v-model="phone" :attr="{maxlength:11}"></mt-field>
      <mt-field label="省市区" placeholder="请选择省市区" v-model="address">
        <div class="ssq" @click="address_flag = true"></div>
      </mt-field>
      <mt-field label="详细地址" placeholder="请输入地址" v-model="detailAddress">
      </mt-field>
    </div>
    <div class="linkage-wrap">
      <div class="pick-mark" v-show="address_flag" @click="address_flag = false">
        <div class="btn-wrap">
          <a class="btn-cancel" @click="address_flag = false">取消</a>
          <a class="btn-sure" @click="fillAddress">确定</a>
        </div>
        <mt-picker class="select" :slots="slots" value-key="aname" @change="onValuesChange"></mt-picker>
      </div>
    </div>
    <div class="pay-modes lm-margin-b-sm">
      <div>支付方式：</div>
      <div class="pay-mode lm-margin-t-sm">
        <div :class="{active:payType==0}" @click="checkType(0)"><img src="../../assets/images/cart/huo.png" />货到付款</div>
        <div class="lm-margin-xl" :class="{active:payType==2}" @click="checkType(2)"><img src="../../assets/images/cart/zfb.png" />支付宝</div>
        <!--<div class="lm-margin-xl" :class="payType==1?'active':''" @click="checkType(1)"><img src="../../assets/images/cart/wx.png" />微信支付</div>-->
      </div>
    </div>
    <div class="product" v-for="(item,index) in orderDetails" :key='index'>
      <img class="product-img" :src="item.ProductImg" />
      <div class="product-details">
        <div>{{item.ProductName}}</div>
        <p class="lm-text-grey lm-font-xs">{{ item.ShortName }}</p>
        <div>
          <span>￥{{item.ProductSpecPrice}}</span>
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
    <div class="hide" v-html="alipay"></div>
    <div class="pay">
      <div>
        <div>共选择
          <span class="lm-text-red">{{ProductCount}}</span>件商品</div>
        <div>总金额：￥
          <span class="lm-text-red">{{totalContent}}</span> 元</div>
      </div>
      <div class="topay" :class="{disableTap:isOnce}" @click="goToPay">确认下单</div>
    </div>
  </div>
</template>

<script>
import Mheader from '../../components/Mheader'
import { address, slots } from '../../components/linkage/address'
import { Toast } from 'mint-ui'

export default {
  components: {
    Mheader
  },
  data() {
    return {
      username: '',
      phone: '',
      address: '',
      detailAddress: '',
      address_flag: false,
      slots: slots,
      temp_addr: '',
      orderDetails: [],
      ProductCount: 0,
      freight: 0,
      discount: [],//优惠记录信息
      chkdiscount: '',//选中的优惠信息
      subtract: '0',//优惠折扣价格
      isChecked: '',
      payType: 0,//支付类型
      alipay: '',//ali支付form表单信息
      isOnce: false
    }
  },
  computed: {
    orderTotal() {
      let t = 0;
      this.orderDetails.forEach(function(item) {
        t += parseInt(item.ProductCount) * parseFloat(item.ProductSpecPrice);
      });
      return t;
    },
    total() {
      return parseFloat(this.orderTotal) + parseFloat(this.freight) + parseFloat(this.subtract);
    },
    totalContent() {
      if (this.subtract == '0') {
        return this.total;
      } else {
        return this.orderTotal + this.freight + this.subtract + '=' + this.total
      }
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
    fillAddress() {
      // 填入省市区
      this.address = this.temp_addr;
      this.address_flag = false;
      this.$emit('getAddress', this.address);
    },
    initAddress() {
      this.slots[0].values = address.filter((item, index) => {
        if (item.apid === 0) {
          return item;
        }
      });
    },
    onValuesChange(picker, values) {
      // 防止没有省份时报错
      if (values[0]) {
        this.slots[1].values = address.filter((item, index) => {
          if (item.apid === values[0].aid) {
            return item;
          }
        });
      }
      // 防止没有市时报错
      if (values[1]) {
        this.slots[2].values = address.filter((item, index) => {
          if (item.apid === values[1].aid) {
            return item;
          }
        });
      }
      // 防止没有区时报错
      if (values[2]) {
        // 这里可以指定地址符，此处以空格进行连接
        this.temp_addr = values[0].aname + ' ' + values[1].aname + ' ' + values[2].aname;
      }
    },
    //手机号验证
    isPhoneNo(phone) {
      var pattern = /^1[34578]\d{9}$/;
      return pattern.test(phone);
    },
    //支付类型选择
    checkType(val) {
      this.payType = val;
    },
    //去下单
    goToPay() {
      if (!!!this.username.replace(/(^\s+)|(\s+$)/g,"")) {
        Toast("请填写收货人姓名")
        return;
      }    
      if (!!!this.phone.replace(/(^\s+)|(\s+$)/g,"")) {
        Toast("请填写收货人手机号")
        return;
      }
      if (!this.isPhoneNo(this.phone.replace(/(^\s+)|(\s+$)/g,""))) {
        Toast("手机号格式错误")
        return;
      }
      if (!!!this.address.replace(/(^\s+)|(\s+$)/g,"")) {
        Toast("请选择省市区")
        return;
      }      
      if (!!!this.detailAddress.replace(/(^\s+)|(\s+$)/g,"")) {
        Toast("请填写详细地址")
        return;
      }
      
      this.isOnce = true;
      //定义地址参数
      let areas = this.address.split(' ');
      let str_address = {
        AddressId: '0',
        Province: areas[0],
        City: areas[1],
        Area: areas[2],
        Detail: this.detailAddress.replace(/(^\s+)|(\s+$)/g, ""),
        Phone: this.phone.replace(/(^\s+)|(\s+$)/g, ""),
        Reciever: this.username.replace(/(^\s+)|(\s+$)/g, "")
      }
      //定义参数
      let sc = {
        TotalPrice: this.total,
        PayType: this.payType,
        ProductCount: this.ProductCount,
        OrderFrom: 2,//订单来源  2标识商城
        AddressId: '0',
        ProductSkus: this.orderDetails,
        ProductOrderId: '0',
        OrderAddress: str_address,
        OrderToPrice: [this.chkdiscount],
        ExpandId: !!sessionStorage.getItem("PromotionKey") ? sessionStorage.getItem("PromotionKey") : sessionStorage.getItem("ExpandId")
      }
      this.axios.post(this.url + '/api/Order/SaveOrder', { strSc: JSON.stringify(sc) }).then((res) => {
        if (res.data.Code == 200) {
          let tPro = JSON.parse(sessionStorage.unPay);//下单的localStorage数据
          let touristProduct = tPro.skus;
          if (!!localStorage.tourist) {
            let carPro = JSON.parse(localStorage.tourist)//购物车的localStorage数据
            touristProduct.forEach(function(od) {
              //过滤掉下单成功后,下单的localStorage数据
              carPro.skus = carPro.skus.filter(p => p.ProductSpecId != od.ProductSpecId);
              if (carPro.skus.length == 0) {
                //当购物车中没有商品时移除localStorage.tourist
                localStorage.removeItem('tourist');
              }
            })
            localStorage.tourist = JSON.stringify(carPro);//购物车中的商品重新赋值
          }
          sessionStorage.removeItem('unPay');//购物成功后移除订单里的商品
          sessionStorage.removeItem("PromotionKey")//移除推广位id
          sessionStorage.removeItem("ExpandId")//移除活动推广位id
          if (this.payType == 0) {
            this.isOnce = false;
            this.$router.push({ path: '/paymentCompleted' })
          }
          if (this.payType == 2) {
            //支付宝支付返回
            this.alipay = res.data.ExData;
            setTimeout(function() {
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
    //获取优惠信息
    getPreOrderFavInfo() {
      //定义参数
      let sc = {
        TotalPrice: this.total,
        PayType: this.payType,
        ProductCount: this.ProductCount,
        OrderFrom: 2,//订单来源  2标识商城
        AddressId: '0',
        ProductSkus: this.orderDetails,
        ProductOrderId: '0',
        OrderAddress: '',
        OrderToPrice: ''
      }
      this.axios.post(this.url + '/api/Order/LoadPreOrderFavInfo', { strSc: JSON.stringify(sc) }).then((res) => {
        if (res.data.Code == 200) {
          this.discount = res.data.Data;
          if (this.discount.length == 0) {
            this.subtract = '0';
          } else {
            this.subtract = '-' + this.discount[0].FavPrice;
          }

        } else {
          if (res.data.Data == '目前暂不支持同时购买多件商品，请分开购买') {
            let instance = Toast(res.data.Data);
            setTimeout(() => {
              instance.close();
              this.$router.replace({
                path: '/cart'
              })
            }, 1500);
          } else {
            Toast(res.data.Data);
          }
        }
      })
    },
    //选中优惠折扣方式
    chkFavInfo(index) {
      this.chkdiscount = this.discount[index];
      this.subtract = '-' + this.discount[index].FavPrice;
      this.isChecked = index;
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.initAddress();
      if (!!sessionStorage.unPay) {
        var sc = JSON.parse(sessionStorage.unPay);
        this.productOrderId = sc.productOrderId;
        this.orderDetails = sc.skus;
        // if(this.productOrderId!='0'){
        //     this.payType=sc.payType;
        //     this.defaultAddress=sc.receive;
        // }
        this.ProductCount = this.orderDetails.length;
        this.getPreOrderFavInfo();
      }
    })
  },
  beforeDestroy() {
    //离开组件的时候清楚localStorage
    sessionStorage.removeItem("unPay");
  }
}
</script>

<style scoped  lang="scss">
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

.linkage-wrap {
  left: 4rem;
  width: 11rem;
  z-index: 999;
  top: 27%;
  position: absolute;
  .address-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    font-size: 14px;
    color: #333;
    .input {
      display: flex;
      align-items: center;
      flex: 1;
      height: 100%;
      padding: 0;
      box-sizing: border-box;
    }
    .btn {
      flex: 0 0 80px;
      width: 100%;
      height: 1.2rem;
      line-height: 30px;
      text-align: center;
      border: 1px solid #ccc;
      border-left: 0 none;
      box-sizing: border-box;
      position: absolute;
      opacity: 0;
    }
  }
  .pick-mark {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, .5);
    overflow: hidden;

    .btn-wrap {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 180px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      padding: 0 20px;
      font-size: 14px;
      background: #fff;
      .btn-cancel {
        color: #999;
      }
      .btn-sure {
        color: #B4282D;
      }
    }
    .select {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background-color: #eeeeee;
    }
    .picker-items {
      font-size: 14px;
      background: #eee;
      .picker-slot {
        font-size: 14px;
      }
      .picker-item {
        &.picker-selected {
          color: #535353;
        }
      }
      .picker-center-highlight {

        &:after,
        &:before {
          background: #fff;
        }
      }
    }
  }
}

.product {
  display: flex;
  align-items: center;
  padding: 0.4rem;
  border-top: 1px solid #eee;
  background-color: #ffffff;
  .product-img {
    width: 3.2rem;
    height: 3.2rem;
    border: 1px solid #eeeeee;
    margin-right: 0.5rem;
  }
  .product-details {
    width: 100%;
    height: 3.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    div:last-child {
      display: flex;
      justify-content: space-between;
    }
  }
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

.order-details {
  padding: 0.4rem;
  background-color: #ffffff;
  .details {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.2rem;
  }
  .details>span:first-child {
    color: #999999;
    font-size: 0.6rem;
  }
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
  .topay {
    text-align: center;
    line-height: 2.4rem;
    color: #ffffff;
    width: 4.5rem;
    height: 100%;
    background-color: #B4282D;
  }
}

.info {
  background-color: #ffffff;
}

.info .ssq {
  width: 11rem;
  height: 1.5rem;
  left: -11rem;
  top: -0.8rem;
  position: absolute;
}
</style>
