<template>
  <div class="container">
    <Mheader>
      <div slot="title">消息</div>
    </Mheader>
    <div class="msg-box">
      <router-link to="/MsgContent/0">
        <div class="msg flex-between">
          <div class="flex-alig-center">
            <img src="../../assets/images/teaCommunity/comment (1).png"/>
            <span class="lm-margin-l-sm">话题回复</span>
          </div>
          <mt-badge v-show="replyCount>0" size="small" type="error">{{replyCount}}</mt-badge>
        </div>
      </router-link>
      <router-link to="/MsgContent/2">
      <div class="msg flex-between">
        <div class="flex-alig-center">
          <img src="../../assets/images/teaCommunity/notification.png"/>
          <span class="lm-margin-l-sm">系统消息</span>
        </div>
        <mt-badge v-show="systemCount>0" size="small" type="error">{{systemCount}}</mt-badge>
      </div>
      </router-link>
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
      return{
        replyCount:0,//话题回复消息数量
        systemCount:0//系统消息数量

      }
    },
    methods:{
        getInfoNum(){
            this.axios({
            url: this.url + '/api/CM_Information/GetInfoCountByType',
            method: 'get',
            headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

          }).then((res) => {
            if (!!res) {
              if (res.data.Code == 200) {
                  res.data.Data.forEach(function(element) {
                    if(element.TypeId==0){
                      this.replyCount=element.InfoCount;
                    }else if(element.TypeId==2){
                      this.systemCount=element.InfoCount;
                    }
                  }, this);
              } 
            }
          })
        },
       
    },
    created(){
          if (!!localStorage.lut) {
          //验证localStorage.lut是否在登录状态
           this.axios.get(this.url + '/api/Login/CheckLogin?str='+localStorage.lut).then((res) => {
                if (res.data.Code == 200) {
                 
                }else{
                   let instance = Toast('还未登录，请先登录');
                    setTimeout(() => {
                      instance.close(); 
                      this.$router.replace({
                            path: '/login/',
                            query: {redirect: this.$router.currentRoute.fullPath}
                          })
                    }, 1500);
                }
              })
        }else{
            let instance = Toast('还未登录，请先登录');
            setTimeout(() => {
            instance.close(); 
            this.$router.replace({
                  path: '/login/',
                  query: {redirect: this.$router.currentRoute.fullPath}
                })
            }, 1500);
        }
      this.getInfoNum();
    }
  }
</script>

<style scoped>
  .msg-box .msg {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    padding: 0.4rem;
  }

  .msg img {
    width: 1.2rem;
    height: 1.2rem;
  }
</style>
