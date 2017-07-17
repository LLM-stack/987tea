<template>
  <div>
    <Mheader>
      <div slot="title">{{ this.$route.params.title }}</div>
    </Mheader>
    <div class="tabs">
      <div class="tab" v-for="(item,index) in tabList" :class="{active:item.isactive}" @click="tabActive(index)">{{
        item.tabName }}
      </div>
    </div>

    <div v-for="(item,index) in orderList">
      <MorderBox>
        <span slot="number">{{ item.OrderNo }}</span>
        <span slot="state">{{ item.OrderStateStr }}</span>
        <span slot="name">{{ item.ProductName }}</span>
        <span slot="price">{{ item.TotalPrice }}</span>
      </MorderBox>
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
        number: 12313,
        price: 500,
        typeId: 1,
        pageIndex: 1,
        pageSeze: 100,

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
    methods: {
      tabActive(i) {
        this.tabList.forEach(function (value, index, array) {
          array[index].isactive = false;
        });
        this.tabList[i].isactive = true;
        this.typeId = i + 1;
        this.pageIndex = 1;
        this.orderList = [];
        this.getOrderByType();
      },
      //获取订单信息
      getOrderByType(){
        this.axios({
          url: this.url + '/api/Order/OrderList',
          method: 'post',
          data: {PageIndex: this.pageIndex, PageSize: this.pageSeze, TypeId: this.typeId},
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

        }).then((res) => {
          if (res.data.Code == 200) {
            if (this.pageIndex == 1) {
              this.orderList = res.data.Data.List;
            } else {
              if (res.data.Data.List.length > 0) {
                res.data.Data.List.forEach(function (item) {
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
      }
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
  .tabs {
    display: flex;
    align-items: center;
    height: 1.6rem;
    margin-bottom: 0.5rem;
    line-height: 1.6rem;
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;
  }

  .tabs .tab {
    text-align: center;
    width: 20%;
    height: 100%;
    border-bottom: 3px solid #fff;
  }

  .tabs .active {
    border-bottom: 3px solid #B4282D;
  }
</style>
