<template>
  <div class="container">
    <Mheader></Mheader>
    <div class="head">
      <router-link to="/MySet">
        <div class="avatar lm-margin-r-lg">
          <img :src="!!!user.HeadImg?userHeadImg:user.HeadImg" alt="">
        </div>
      </router-link>
      <div class="info ">
        <div class="name lm-margin-l-sm">{{user.UserName}}</div>
        <div class="cb lm-margin-t-xs">
          <router-link to="/MyCB">
            <i class="lm-margin-r-xs"></i>茶币：{{user.TeaCurrency}}
          </router-link>
        </div>
      </div>

    </div>
    <div class="my-order">
      <div class="title">我的订单</div>
      <div class="order-control">
        <router-link to="/MyOrder/待付款/1">
          <div class="control-icon">
            <img src="../../assets/images/myInfo/icon.1.png" />
            <div>待付款</div>
          </div>
        </router-link>
        <router-link to="/MyOrder/待发货/2">
          <div class="control-icon">
            <img src="../../assets/images/myInfo/icon.2.png" />
            <div>待发货</div>
          </div>
        </router-link>
        <router-link to="/MyOrder/待收货/3">
          <div class="control-icon">
            <img src="../../assets/images/myInfo/icon.3.png" />
            <div>待收货</div>
          </div>
        </router-link>
        <router-link to="/MyOrder/待评价/4">
          <div class="control-icon">
            <img src="../../assets/images/myInfo/icon.4.png" />
            <div>待评价</div>
          </div>
        </router-link>
      </div>
    </div>

    <div class="my-order">
      <div class="title">我的服务</div>
      <div class="server-control ">
        <router-link to="/CBmall">
          <div class="control-icon">
            <img src="../../assets/images/myInfo/icon.5.png" />
            <div>茶币商城</div>
          </div>
        </router-link>
        <router-link to="/MyCollection">
          <div class="control-icon">
            <img src="../../assets/images/myInfo/icon.6.png" />
            <div>我的收藏</div>
          </div>
        </router-link>
        <router-link to="/MyAddress?isban=myinfo">
          <div class="control-icon">
            <img src="../../assets/images/myInfo/icon.7.png" />
            <div>地址管理</div>
          </div>
        </router-link>
        <router-link to="/Coupon">
          <div class="control-icon">
            <img src="../../assets/images/myInfo/icon.8.png" />
            <div>优惠券</div>
          </div>
        </router-link>
      </div>
      <div class="server-control ">
        <router-link to="/Apply">
          <div class="control-icon">
            <img src="../../assets/images/myInfo/icon.9.png" />
            <div>入驻我们</div>
          </div>
        </router-link>
        <router-link to="/TcHome">
          <div class="control-icon">
            <img src="../../assets/images/myInfo/icon.10.png" />
            <div>茶友圈</div>
          </div>
        </router-link>
        <router-link to="/helpcenter">
          <div class="control-icon">
            <img src="../../assets/images/myInfo/icon.11.png" />
            <div>帮助中心</div>
          </div>
        </router-link>
        <router-link to="/CommentsBox">
          <div class="control-icon">
            <img src="../../assets/images/myInfo/icon.12.png" />
            <div>意见箱</div>
          </div>
        </router-link>
      </div>
    </div>
    <Mfooter :myCenterCurrent='true'></Mfooter>
  </div>
</template>

<script>
import Mheader from '../../components/Mheader'
import Mfooter from '../../components/Mfooter'
import { Toast } from 'mint-ui'

export default {
  components: {
    Mheader,
    Mfooter
  },
  data() {
    return {
      user: '',
      userHeadImg:require("../../assets/images/home_03.png")//默认头像
    }
  },
  
  methods: {
    getUserInfo() {
      this.axios({
        url: this.url + '/api/User/GetUserInfoByUserId',
        method: 'get',
        headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }

      }).then((res) => {
        if (!!res) {
          if (res.data.Code == 200) {
            this.user = res.data.ExData;
          } else {
            Toast(res.data.Data);
          }
        }
      })
    }

  },
  mounted: function() {
    this.$nextTick(() => {
      this.getUserInfo();
    })
  }
}
</script>

<style scoped>
.head {
  display: flex;
  align-items: center;
  padding: 0.6rem 0 1rem 1rem;
  color: #ffffff;
  background-color: #B4282D;
}

.head .avatar {
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.head .avatar img {
  border-radius: 50%;
}

.info {
  font-size: 0.75rem;
}

.info .cb a {
  display: flex;
  align-items: center;
  font-size: 0.6rem;
  border-radius: 0.6rem;
  padding: 0.2rem 1rem 0.2rem 0.3rem;
  background-color: #8E1C20;
}

.info .cb i {
  display: inline-block;
  width: 0.8rem;
  height: 0.8rem;
  background-size: 100% 100%;
  background-image: url("../../assets/images/myInfo/myInfo_03.png");
}

.my-order {
  margin-bottom: 0.5rem;
  background-color: #ffffff;
  font-size: 0.65rem;
}

.my-order .title {
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.my-order .order-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem 0.6rem 1rem;
}

.order-control .control-icon,
.server-control .control-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.55rem;
}

.order-control .control-icon>img,
.server-control .control-icon>img {
  width: 2.2rem;
  height: 2.2rem;
}

.order-control .control-icon>div,
.server-control .control-icon>div {
  margin-top: -0.3rem;
}

.my-order .server-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem 1rem 1.2rem 1rem;
}

.my-order .server-control:last-child {
  border-top: 1px solid #eee;
}
</style>
