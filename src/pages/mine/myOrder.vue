<template>
  <div class="container">
    <Mheader>
      <div slot="title">我的订单</div>
    </Mheader>
    <div class="tabs">
      <div class="tab" v-for="(item,index) in tabList" :class="{active:activeIdx == index}" :key='index' @click="tabActive(index)">{{
        item.tabName }}
      </div>
    </div>

    <div class="order-box" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <MorderBox v-for="(item,index) in orderList" :orderProductList="item.ProductList" :key="item.ProductOrderId">
        <span slot="number">{{ item.OrderNo }}</span>
        <span slot="state">{{ item.OrderStateStr }}</span>

        <!--<span slot="img"><img :src="item.HeadImg" alt=""></span>-->
        <!--<span class="product-name" slot="name">{{ item.ProductName }}</span>-->
        <!--<span class="lm-text-grey lm-margin-t-sm" slot="count">数量：{{ item.ProductCount}}</span>-->

        <span class="lm-text-red" slot="price">{{ item.TotalPrice }}</span>
        <span slot="cancel" v-show="item.OrderState==0 && item.PayState!=1" @click="cancelOrder(item.ProductOrderId)">取消订单</span>
        <span slot="btn" v-if="item.PayState==0 && item.PayType!=0 && item.OrderState==0" @click="goToPay(index)">去付款</span>
        <span slot="btn" v-else-if="(item.PayType==0&&(item.OrderState==0||item.OrderState==6))||(item.PayType!=0 && item.PayState==1)" @click="addOrderUrged(item.ProductOrderId)">催单</span>
        <span slot="btn" v-else-if="item.OrderState==2" @click="logistics(item.LogisticsNo)">查看物流</span>
        <span slot="btn" v-else-if="item.OrderState==3" @click="goToEvaluate(item.ProductOrderId)" :class="{already:item.OrderState==3}"><span v-if="item.OrderState==3" >已评价</span><span v-else>去评价</span></span>
        <span slot="time">{{ item.CreateTime | format }}</span>
      </MorderBox>
    </div>

    <div class="noorder-box" v-show="orderList.length == 0">
      <div class="noorder">
        <img src="../../assets/images/myInfo/order_03.png"/>
        <p>没有相关的订单</p>
      </div>
    </div>

    <Mfooter :myCenterCurrent='true'></Mfooter>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'
  import MorderBox from '../../components/MorderBox'
  import {Toast} from 'mint-ui'
  import { MessageBox } from 'mint-ui'

  export default {
    components: {
      Mheader,
      Mfooter,
      MorderBox
    },
    data() {
      return {
        tabNum: this.$route.params.tabNum,
        typeId: 1,//选择的订单类型
        pageIndex: 0,
        pageSize: 10,
        loading: false,
        activeIdx: this.$route.params.tabNum,
        tabList: [
          {
            tabName: '全部'
          },
          {
            tabName: '待付款'
          },
          {
            tabName: '待发货'
          },
          {
            tabName: '待收货'
          },
          {
            tabName: '待评价'
          }
        ],
        orderList: []//订单集合
      }
    },
    filters: {
      format(val){
          let date=new Date(val);
          let y = date.getFullYear();
          let m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          let d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          let h = date.getHours();
          let minute = date.getMinutes();
          minute = minute < 10 ? ('0' + minute) : minute;
          return y + '-' + m + '-' + d+' '+h+':'+minute;
      }
    },
    methods: {
      //加载更多
      loadMore() {
        this.loading = true;
        this.pageIndex++;
        this.getOrderByType();
      },
      tabActive(i) {
        this.activeIdx = i;
        this.tabList.forEach(function (value, index, array) {
          array[index].isactive = false;
        });
        this.tabList[i].isactive = true;
        this.tabNum = i;
        this.typeId = i + 1;
        this.pageIndex = 1;
        this.orderList = [];
        this.getOrderByType();
      },
      //获取订单信息
      getOrderByType() {
        this.axios({
          url: this.url + '/api/Order/OrderList',
          method: 'post',
          data: {PageIndex: this.pageIndex, PageSize: this.pageSize, TypeId: this.typeId},
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

        }).then((res) => {
          if(!!res){
            if (res.data.Code == 200) {
              if (this.pageIndex == 1) {
                this.orderList = res.data.Data;
                this.loading = false;
              } else {
                if (res.data.Data.length > 0) {
                  for (let i = 0; i < res.data.Data.length; i++) {
                      this.orderList.push(res.data.Data[i])
                  }
                  this.loading = false;
                }else{
                  this.loading = true;
                }
              }
            }
            else {
              Toast(res.data.Data);
            }
          }
        });
      },
      //取消订单
      cancelOrder(oId){
            MessageBox.confirm('确认取消订单么?').then(action => {
            this.axios({
              url: this.url + '/api/Order/CancelOrder',
              method: 'post',
              data: {orderId: oId},
              headers: {'Authorization': 'BasicAuth ' + localStorage.lut}
            }).then((res) => {
              if(!!res){
                if (res.data.Code == 200) {
                  //移除删除的订单
                  this.orderList = this.orderList.filter(o => o.ProductOrderId != oId);
                  Toast(res.data.Data);
                } else {
                  Toast(res.data.Data);
                }
              }
            })
        });
      },
      //去下单
      goToPay(index){
         //定义商品信息参数
          let skus = [];
          this.orderList[index].ProductList.forEach(function (item) {
              let sku = {
                ShoppingCarId: 0,
                ProductSpecId: item.ProductSpecId,
                ProductId:item.ProductId,
                ProductName: item.ProductName,
                ShortName:item.ShortName,
                ProductCount: item.ProductCount,
                ProductImg: item.HeadImg,
                ProductSpecPrice: item.SalePrice,
                TeaBPrice:0
              }
              skus.push(sku);
          });
          //定义地址参数
          let areas=this.orderList[index].ReceiveArea.split(' ');
          let receiveArea={
            AdressId:'0',
            ConsigneeName:this.orderList[index].ReceiveUser,
            Mobile:this.orderList[index].ReceivePhone,
            Province:areas[0],
            City:areas[1],
            Area:areas[2],
            Detail:this.orderList[index].ReceiveAddress,
            IsDefault:1
          }
          //订单参数
          let sc={
            productOrderId:this.orderList[index].ProductOrderId,
            payType:this.orderList[index].PayType,
            receive:receiveArea,
            skus:skus,
            mallType:this.orderList[index].OrderFrom===4?'teaBMall':''
          }
          sessionStorage.setItem("pay", JSON.stringify(sc));
          this.$router.push({path: '/Payment'})
      },
      //去评价
      goToEvaluate(val){
        this.$router.push({path: '/evaluate/'+val})
      },
      // 查看物流
      logistics(info){
       this.$router.push({ path: '/Logistics', query: { express: info }})
      },
      //催单
      addOrderUrged(oId){
        this.axios({
              url: this.url + '/api/OrderUrged/AddOrderUrged',
              method: 'post',
              data: {OrderId: oId},
              headers: {'Authorization': 'BasicAuth ' + localStorage.lut}
            }).then((res) => {
              if(!!res){
                if (res.data.Code == 200) {
                  Toast(res.data.Data);
                } else {
                  Toast(res.data.Data);
                }
              }
            })
      }
    },
    created() {
      let index = this.$route.params.tabNum
      this.tabList[index].isactive = true
      this.typeId = parseInt(index) + 1;
      // this.getOrderByType();
    }
  }
</script>

<style scoped>
  .tabs {
    width: 100%;
    position: fixed !important;
  }

  .tabs {
    top: 1.8rem;
    display: flex;
    align-items: center;
    height: 1.6rem;
    margin-bottom: 0.5rem;
    line-height: 1.6rem;
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;
  }

  .order-box {
    margin-top: 3.6rem;
  }

  .tabs .tab {
    text-align: center;
    width: 20%;
    height: 100%;
    border-bottom: 3px solid #fff;
  }

  .tabs .active {
    color: #B4282D;
    border-bottom: 3px solid #B4282D;
  }
  .noorder-box{
    width: 100%;
    height: 80vh;
    position: relative;
  }
  .noorder {
    position: absolute;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #C8C8C8;
  }

  .noorder > img {
    width: 4rem;
    height: 4.5rem;
  }
  /*按钮操作后*/
  .already{
    pointer-events: none;
    color: #9d9d9d!important;
    border-color: #9d9d9d!important;
  }
</style>
