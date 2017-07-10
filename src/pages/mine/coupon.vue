<template>
    <div class="container">
      <Mheader :show=true>
        <div slot="title" id="t">优惠券</div>
      </Mheader>
      <div class="coupons">
        <div class="coupon">
          <div class="coupon-box">
            <div>
              <div>
                <span class="font-red">￥</span>
                <span class="font-red coupon-num">15</span>
              </div>
              <div class="lm-margin-t-sm">
                满49可用
              </div>
            </div>
            <div>
              <div class="coupon-name">现金抵用券</div>
              <div class="coupon-range">范围：全场通用</div>
              <div class="coupon-time">
                有效期至：2016-10-10
              </div>
            </div>
          </div>

        </div>
        <div class="coupon">
          <div class="coupon-box">
            <div>
              <div>
                <span class="font-red">￥</span>
                <span class="font-red coupon-num">15</span>
              </div>
              <div class="lm-margin-t-sm">
                满49可用
              </div>
            </div>
            <div>
              <div class="coupon-name">现金抵用券</div>
              <div class="coupon-range">范围：全场通用</div>
              <div class="coupon-time">
                有效期至：2016-10-10
              </div>
            </div>
          </div>

        </div>
        <div class="coupon">
          <div class="coupon-box">
            <div>
              <div>
                <span class="font-red">￥</span>
                <span class="font-red coupon-num">15</span>
              </div>
              <div class="lm-margin-t-sm">
                满49可用
              </div>
            </div>
            <div>
              <div class="coupon-name">现金抵用券</div>
              <div class="coupon-range">范围：全场通用</div>
              <div class="coupon-time">
                有效期至：2016-10-10
              </div>
            </div>
          </div>

        </div>
        <div class="coupon">
          <div class="coupon-box">
            <div>
              <div>
                <span class="font-red">￥</span>
                <span class="font-red coupon-num">15</span>
              </div>
              <div class="lm-margin-t-sm">
                满49可用
              </div>
            </div>
            <div>
              <div class="coupon-name">现金抵用券</div>
              <div class="coupon-range">范围：全场通用</div>
              <div class="coupon-time">
                有效期至：2016-10-10
              </div>
            </div>
          </div>

        </div>
      </div>


      <Mfooter :myCenterCurrent=true></Mfooter>
    </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'

	export default {
    components: {
      Mheader,
      Mfooter
    }
  }


</script>

<style scoped>

  .coupons{
    padding: 0.4rem;
  }
  .coupons .coupon{
    margin-bottom: 0.4rem;
    width: 100%;
    height: 5rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/myInfo/coupon_03.png");
  }
  .coupon-box .font-red{
    color: #FF2D47;
  }
  .coupon-box .coupon-num{
    font-size: 1.4rem;
    font-weight: 600;
  }
   .coupon .coupon-box{
    display: flex;
    align-items: center;
    height: 3.5rem;
  }
   .coupon .coupon-box > div:first-child{
    text-align: center;
    width: 4rem;
  }
   .coupon .coupon-box > div:last-child{
     padding-top: 0.3rem;
    margin-left: 0.8rem;
     position: relative;
  }
  .coupon-box .coupon-name{
    font-size: 0.8rem;
    font-weight: 600;
  }
  .coupon-box .coupon-range{
    margin-top: 0.8rem;
    color: #A4A4A4;
  }
  .coupon .coupon-time{
    font-size: 0.55rem;
    width: 10.4rem;
    height: 1rem;
    top: 3.8rem;
   color: #A4A4A4;
    position: absolute;
  }
</style>
