<template>
  <div class="container">
    <Mheader>
      <div slot="title" id="t">优惠券</div>
    </Mheader>
    <div class="coupons" >
      <div class="coupon" :class="{'unable':item.CouponStatus!=1}" v-for="(item,index) in couponList" :key='index'>
        <div class="coupon-box">
          <div>
            <div>
              <span class="font-red">￥</span>
              <span class="font-red coupon-num">{{item.CouponMoney}}</span>
            </div>
            <div>
              满{{item.CanUseMoney}}可用
            </div>
          </div>
          <div>
            <div class="coupon-name">{{item.UseCondition}}</div>
            <div class="coupon-range">范围：{{item.CouponTypeName}}</div>
            <div class="coupon-time">
              有效期至：{{item.OverducTime | formatTime }}
            </div>
          </div>
        </div>
        <div class="coupon-state" v-if="item.CouponStatus == 4">
          <img src="../../assets/images/myInfo/used.png"/>
        </div>
        <div class="coupon-state" v-if="item.CouponStatus== 2">
          <img src="../../assets/images/myInfo/timeout.png"/>
        </div>
      </div>
    </div>

    <Mfooter :myCenterCurrent='true'></Mfooter>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mheader,
      Mfooter
    },
    data(){
      return {
        pageIndex: 1,
        pageSize: 10,
        couponList: []
      }
    },
    filters: {
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

      //获取用户的优惠券
      getMyCoupons(){
        this.axios({
          url: this.url + '/api/Coupon/GetMyCoupons',
          method: 'post',
          data: {pageIndex: this.pageIndex, pageSize: this.pageSize},
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

        }).then((res) => {
          if (!!res) {
            if (res.data.Code == 200) {
              if (this.pageIndex == 1) {
                this.couponList = res.data.Data;
                this.loading = false;
              } else {
                if (res.data.Data.length > 0) {
                  for (let i = 0; i < res.data.Data.length; i++) {
                    this.couponList.push(res.data.Data[i])
                  }
                  this.loading = false;
                } else {
                  this.loading = true;
                }
              }
            }
            else {
              Toast(res.data.Data);
            }
          }
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.getMyCoupons()
      })
    }
  }


</script>

<style scoped>

  .coupons {
    padding: 0.4rem;
  }

  .coupons .coupon {
    position: relative;
    margin-bottom: 0.4rem;
    width: 100%;
    height: 5rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/myInfo/coupon_03.png");
  }

  .coupon-box .font-red {
    color: #FF2D47;
  }

  .coupon-box .coupon-num {
    font-size: 1.4rem;
    font-weight: 600;
  }

  .coupon .coupon-box {
    display: flex;
    align-items: center;
    height: 4rem;
  }
  .coupon .coupon-state{
    width: 7.2rem;
    height: 3.8rem;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    position: absolute;
  }
  .coupon .coupon-box > div:first-child {
    text-align: center;
    width: 4rem;
  }

  .coupon .coupon-box > div:last-child {
    padding-top: 0.3rem;
    margin-left: 0.8rem;
    position: relative;
  }

  .coupon-box .coupon-name {
    font-size: 0.8rem;
    font-weight: 600;
  }

  .coupon-box .coupon-range {
    margin-top: 0.4rem;
    color: #A4A4A4;
  }

  .coupon .coupon-time {
    font-size: 0.55rem;
    width: 10.4rem;
    height: 1rem;
    top: 3.4rem;
    color: #A4A4A4;
    position: absolute;
  }

  .coupon.unable .font-red {
    color: #989898;
  }
</style>
