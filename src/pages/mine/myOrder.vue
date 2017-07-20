<template>
  <div class="container">
    <Mheader>
      <div slot="title">{{ this.$route.params.title }}</div>
    </Mheader>
    <div class="tabs">
      <div class="tab" v-for="(item,index) in tabList" :class="{active:item.isactive}" @click="tabActive(index)">{{
        item.tabName }}
      </div>
    </div>

    <div class="order-box" v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10">
      <MorderBox v-for="(item,index) in orderList" :orderProductList="item.ProductList">
        <span slot="number">{{ item.OrderNo }}</span>
        <span slot="state">{{ item.OrderStateStr }}</span>

        <!--<span slot="img"><img :src="item.HeadImg" alt=""></span>-->
        <!--<span class="product-name" slot="name">{{ item.ProductName }}</span>-->
        <!--<span class="lm-text-grey lm-margin-t-sm" slot="count">数量：{{ item.ProductCount}}</span>-->

        <span class="lm-text-red" slot="price">{{ item.TotalPrice }}</span>
        <span slot="cancel" v-if="tabNum == 1">取消订单</span>
        <span slot="btn">去付款</span>
        <span slot="time">{{ item.CreateTime | format }}</span>
      </MorderBox>

    </div>

    <div class="noorder" v-show="orderList.length == 0">
      <img src="../../assets/images/myInfo/order_03.png"/>
      <p>没有相关的订单</p>
    </div>


    <Mfooter :myCenterCurrent='true'></Mfooter>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'
  import MorderBox from '../../components/MorderBox'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mheader,
      Mfooter,
      MorderBox
    },
    data() {
      return {
        tabNum: this.$route.params.tabNum,
        number: 12313,
        price: 500,
        typeId: 1,
        pageIndex: 1,
        pageSeze: 5,
        loading: false,
        tabList: [
          {
            tabName: '全部',
            isactive: false
          },
          {
            tabName: '待付款',
            isactive: false
          },
          {
            tabName: '待发货',
            isactive: false
          },
          {
            tabName: '待收货',
            isactive: false
          },
          {
            tabName: '待评价',
            isactive: false
          }
        ],
        orderList: []
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
      loadMore() {
        this.loading = true;
        // setTimeout(() => {
        //   this.pageIndex++;
        //   this.getOrderByType();         
        //   this.loading = false;
        // }, 2000);
      },
      tabActive(i) {
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
          data: {PageIndex: this.pageIndex, PageSize: this.pageSeze, TypeId: this.typeId},
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

        }).then((res) => {
          if (res.data.Code == 200) {
            if (this.pageIndex == 1) {
              this.orderList = res.data.Data;
            } else {
              if (res.data.Data.length > 0) {
                res.data.Data.forEach(function (item) {
                  this.orderList.push(item);
                });
              }
            }
          }
          else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          if (err.response.status == 401) {
            let instance = Toast('还未登录，请先登录');
            setTimeout(() => {
              instance.close();
              this.$router.replace({
                path: '/login/',
                query: {redirect: this.$router.currentRoute.fullPath}
              })
            }, 1000);
          }
          else {
            Toast('网络请求错误');
          }
        });
      },

    },
    created() {
      let index = this.$route.params.tabNum
      this.tabList[index].isactive = true
      this.typeId = parseInt(index) + 1;
      this.getOrderByType();
    }
  }
</script>

<style scoped>
  header, .tabs {
    width: 100%;
    position: fixed !important;
  }

  header {
    top: 0;
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
</style>
