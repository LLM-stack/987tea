<template>
  <div>
    <Mheader :show='true'>
      <div slot="title">商品详情</div>
    </Mheader>

    <div class="head-info">
      <img src="../../assets/images/myInfo/icon.3.png"/>
      <div class="lm-margin-l-sm">
        <p>物流公司：{{ expressName }}</p>
        <p class="lm-margin-t-xs">物流单号：{{ expressCode }}</p>
      </div>
    </div>

    <div class="logistics-info">
      <div class="logistics-line" v-for="(item,index) in expressList" :key='index'>
        <div class="line-time">
          <p class="lm-font-defult">{{ item.time | timeA }}</p>
          <P class="lm-font-xs lm-text-grey">{{ item.time | timeB }}</P>
          <div class="dot" :class="{dotCurrt:(index == 0)}"></div>
        </div>
        <div class="line-place" :class="{current:(index == 0)}">
          {{ item.context |formatStr}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mheader
    },
    data(){
      return {
        expressCode:'',
        expressName:'',
        expressList:'',
        company: [
                { key: "shunfeng",value: "顺丰快递"},
                { key: "debangwuliu", value: "德邦快递" },
                { key: "yuantong", value: "圆通快递" },
                { key: "shentong", value: "申通快递" },
                { key: "zhongtong", value: "中通快递" },
                { key: "yunda", value: "韵达快递" },
                { key: "ems", value:"EMS" },
                { key: "huitongkuaidi", value: "百世汇通" }
            ]//快递公司
      }
    },
    filters:{
      timeA(val){
        return val.substring(11,16)
      },
      timeB(val){
        return val.substring(0,10)
      },
      formatStr(val) {
                return val.split('|')[2];
            }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.axios({
          url: this.url + '/api/Order/GetLogisticsInfo',
          method: 'post',
          data: {logisticsNo: this.$route.query.express},
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}
        }).then((res) => {
          if(!!res){
            if (res.data.Code == 200) {
              this.expressCode = res.data.ExData.kdcode;
              let msg = JSON.parse(res.data.ExData.RecParam);
              console.log(msg.lastResult.com);
              this.company.forEach((com)=> {
                  if (com.key == msg.lastResult.com) {
                      this.expressName = com.value;
                  }
              });
              this.expressList = msg.lastResult.data;
            } else {
              Toast('获取物流信息错误！');
            }
          }
        })

      })
    }
  }
</script>

<style scoped>
  .current{
    color: #B4282D;
  }
  header, .head-info {
    width: 100%;
    z-index: 99;
    position: fixed!important;
  }

  header {
    top: 0;
  }

  .head-info {
    top: 1.8rem;
    height: 3.2rem;
    color: #000;
    padding: 0 0.4rem;
    background-color: #fff;
    display: flex;
    align-items: center;
  }

  .head-info p:first-child {
    width: 11rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .head-info > img {
    width: 3.5rem;
    height: 3.5rem;
  }
  .logistics-info{
    margin: 5.5rem 0 1.2rem;
    padding: 0.4rem;
  }
  .logistics-info .logistics-line{
    display: flex;
    align-items: center;
    border-left: 0.1rem solid #ccc;
  }
  .logistics-line+.logistics-line{
    padding-top: 1.2rem;
  }
  .logistics-line .line-time{
    position: relative;
    width: 28%;
    text-align: center;
  }
  .logistics-line .line-time .dot{
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    top: 50%;
    left: -0.3rem;
    transform: translateY(-50%);
    background-color: #ccc;
    position: absolute;
  }
  .line-time .dot.dotCurrt{
    background-color: #B4282D;
  }
  .logistics-line .line-place{
    width: 72%;
  }
</style>
