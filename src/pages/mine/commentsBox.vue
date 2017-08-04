<template>
  <div class="container">
    <Mheader :show=true>
      <div slot="title">意见箱</div>
    </Mheader>

    <div class="box">
      <textarea class="box-text" placeholder="在这里写下您给我们的意见或建议！十分感谢您对我们的支持。" maxlength="300" v-model="content"></textarea>
      <div class="btn" :class="{disableTap:isOnce}" @click="submitSuggest">提交</div>
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
    },data(){
    	return {
        content:null, 
        isOnce:false
      }
    },
    methods: {

        submitSuggest(){
          this.isOnce=true;
          if(!!!this.content){
            Toast('请填写您的意见或建议后再提交！');
            return;
          }
          let text = {Content:this.content};
          this.axios({
            url:this.url + '/api/Suggest/saveSuggestion',
            method:'post',
            data:text,
            headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }
          }).then((res)=>{
             if(!!res){
               if (res.data.Code == 200) {                 
                  let instance = Toast(res.data.Data);
                  setTimeout(() => {
                    instance.close();
                    this.isOnce=false;
                    this.$router.replace({ path: '/MyInfo'});
                  }, 1000);
                } else {
                   this.isOnce=false;
                  Toast(res.data.Data);
                }
             }
          })
        }
    },
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
    padding: 0.3rem 0;
    text-align: center;
    border-radius: 0.2rem;
    color: #ffffff;
    background-color: #B4282D;
  }


</style>
