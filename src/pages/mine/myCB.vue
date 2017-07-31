<template>
    <div class="container">
      <Mheader :show=true>
        <div slot="title" >我的茶币</div>
      </Mheader>
      <div class="top">
        <img src="../../assets/images/cbmall/cb_03.png"/>
        <div>
          <div>当前茶币合计</div>
          <div class="cb-num">{{user.Score}}</div>
        </div>
      </div>
      <div class="tip">
        <div class="lm-text-red">什么是茶币？</div>
        <div class="lm-margin-t-xs tip-text">茶币是指987茶网为茶友提供的虚拟货币。茶币可兑换赠品、茶样等。茶币为非
          真实货币，不可兑现。</div>
      </div>

      <div class="tabs">
        <div class="tab" :class="{active:isActive}" @click="check(0)">收入</div>
        <div class="tab" :class="{active:!isActive}" @click="check(1)">支出</div>
      </div>
      <div class="pay-cont">
        <div class="pay-deta">
          <div class="left">
            <div>收入支出来源</div>
            <div class="lm-font-xs lm-text-grey">2017-07-30</div>
          </div>
          <div class="right lm-text-yellow">+25</div>
        </div>
        <div class="pay-deta">
          <div class="left">
            <div>收入支出来源</div>
            <div class="lm-font-xs lm-text-grey">2017-07-30</div>
          </div>
          <div class="right lm-text-yellow">-25</div>
        </div>
      </div>
      <div class="more-comment">点击加载更多</div>


      <Mfooter :myCenterCurrent='true'></Mfooter>
    </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'

	export default {
    components: {
      Mheader,
      Mfooter
    },
    data() {
    	return {
    		isActive: true,
        user:'',
        type:0,
        pageIndex:0,
        pageSize:10,
        loading:false,
        tbList:[]
      }
    },
    methods:{
    	 check(val) {
         this.type=val;
    	 	 this.isActive = !this.isActive
       },
       //获取用户信息
       getUserInfo(){
          this.axios({
          url: this.url + '/api/User/GetUserInfoByUserId',
          method: 'get',
          headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }

          }).then((res)=>{
            if(!!res){
              if (res.data.Code == 200) {
              this.user=res.data.ExData;
              } else {
                Toast(res.data.Data);
              }
            }
          })
       },
       getTBLog(){
         this.axios({
          url: this.url + '/api/TeaCurrency/GetTeaCurrencyByUserId',
          method: 'post',
          data:{typeId:this.type,pageIndex:this.pageIndex,pageSize:this.pageSize},
          headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }

          }).then((res)=>{
            if(!!res){
              if (res.data.Code == 200) {
              this.tbList=res.data.ExData;
              } else {
                Toast(res.data.Data);
              }
            }
          })
       }
    },
    mounted:function(){
      this.$nextTick(()=>{
         this.getUserInfo();
       })
    }
  }
</script>

<style scoped>
  .top{
    display: flex;
    align-items: center;
    height: 5.6rem;
    padding-left: 0.5rem;
    background-color: #B4282D;
  }
  .top > img{
    width: 3.5rem;
    height: 2.5rem;
  }
  .top > div{
    color: #fda7aa;
    line-height: 1.2rem;
    margin-left: 1.5rem;
  }
  .top .cb-num{
    color: #ffffff;
    font-size: 0.9rem;
  }
  .tip{
    padding: 0.4rem;
    background-color: #ffffff;
  }
  .tip .tip-text{
    color: #aaa;
    font-size: 0.55rem;
  }
  .tabs{
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    height: 1.8rem;
    color: #777;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #ffffff;
  }
  .tabs .tab{
    height: 1.8rem;
    line-height: 1.8rem;
    text-align: center;
    width: 50%;
    border-bottom: 1px solid #eee;
  }
  .tabs .tab.active{
    color: #B4282D;
    border-bottom: 2px solid #B4282D;
  }
  .pay-cont{
    background-color: #fff;
  }
  .pay-cont .pay-deta{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem;
    border-bottom: 1px solid #eee;
  }
  .pay-cont .pay-deta .right{
    font-weight: 600;
  }
</style>
