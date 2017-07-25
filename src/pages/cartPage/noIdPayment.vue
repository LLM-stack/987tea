<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">提交订单</div>
    </Mheader>

    <div class="info">
      <mt-field label="收货人" placeholder="请输入用户名" v-model="username"></mt-field>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="phone"></mt-field>
      <mt-field label="省市区" placeholder="请选择省市区" v-model="address"></mt-field>
      <div class="linkage-wrap">
        <div class="address-wrap">
          <span class="btn" @click="address_flag = true">点击选择</span>
        </div>
        <div class="pick-mark" v-show="address_flag" @click="address_flag = false">
          <div class="btn-wrap">
            <a class="btn-cancel" @click="address_flag = false">取消</a>
            <a class="btn-sure" @click="fillAddress">确定</a>
          </div>
          <mt-picker class="select" :slots="slots" value-key="aname" @change="onValuesChange"></mt-picker>
        </div>
      </div>
      <mt-field label="详细地址" placeholder="请输入地址" v-model="detailAddress"></mt-field>
    </div>

    <div class="product lm-margin-b-sm" v-for="(item,index) in orderDetails">
      <img class="product-img" :src="item.ProductImg"/>
      <div class="product-details">
        <div>{{item.ProductName}}</div>
        <div>
          <span>￥{{item.ProductSpecPrice}}</span>
          <span>x{{item.ProductCount}}</span>
        </div>
      </div>
    </div>
    <div class="hide" v-html="alipay"></div>
    <div class="pay">
      <div>
        <div>共选择 <span class="lm-text-red">{{ProductCount}}</span>件商品</div>
        <div>总金额：<span class="lm-text-red">￥{{total}}</span> 元</div>
      </div>
      <div class="topay" @click="oncePayment">确认下单</div>
    </div>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import {address, slots} from '../../components/linkage/address'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mheader
    },
    data() {
      return {
        username: '',
        phone: '',
        address: '',
        detailAddress:'',
        address_flag: false,
        slots: slots,
        temp_addr: ''
      }
    },
    methods:{
      fillAddress() {
        // 填入省市区
        this.address = this.temp_addr;
        this.address_flag = false;
        this.$emit('getAddress',this.address);
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
      isPhoneNo(phone) {  //手机号验证
        var pattern = /^1[34578]\d{9}$/;
        return pattern.test(phone);
      }
    },
    mounted(){
      this.$nextTick(function () {
      this.initAddress();
    })
    }
  }
</script>

<style scoped  lang="scss">
  .linkage-wrap {
    left: 4rem;
    width: 11rem;
    z-index: 999;
    top: 6.3rem;
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
  &:after, &:before {
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
    padding: 0.4rem;
    background-color: #ffffff;
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
    .details > span:first-child {
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
</style>
