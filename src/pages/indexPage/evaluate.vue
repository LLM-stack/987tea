<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">商品评价</div>
    </Mheader>

    <div class="box">
      <textarea class="box-text" placeholder="亲，记得评价得茶币哦~" maxlength="300" v-model="content"></textarea>
      <div class="btn" @click="submitEvaluate">提交</div>
    </div>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mheader
    },data(){
      return {
        content:null
      }
    },
    methods: {

      submitEvaluate(){
        if(!!!this.content){
          Toast('请填写您的评价后再提交！');
          return;
        }

        this.axios({
          url:this.url + '/api/Order/AddEvaluate',
          method:'post',
          data:{content:this.content,orderId:this.$route.params.orderId},
          headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }
        }).then((res)=>{
          if (res.data.Code == 200) {
            let instance = Toast(res.data.Data);
            setTimeout(() => {
              instance.close();
              this.$router.replace({ path: '/MyInfo'});
            }, 1000);
          } else {
            Toast(res.data.Data);
          }
        })
      }

    }
  }
</script>

<style scoped>
  .box{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .box-text,.btn{
    width: 95%;
    margin-top: 0.5rem;
  }
  .box .box-text{
    padding: 0.3rem;
    font-size: 0.6rem;
    height: 6rem;
    resize: none;
    outline: none;
    color: #888;
    border-radius: 0.2rem;
    border: 1px solid #ccc;
  }
  .box .btn{
    padding: 0.4rem 0;
    text-align: center;
    border-radius: 0.2rem;
    color: #B4282D;
    border:1px solid #B4282D;
    background-color: #fff;
  }


</style>
