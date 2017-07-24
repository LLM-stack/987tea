<template>
  <div class="container">
    <Mheader>
      <div slot="title">{{ this.$route.params.title }}</div>
    </Mheader>
    <div v-if="this.$route.params.id == 1">
      <mt-checklist
        v-model="value1"
        :options="options1">
      </mt-checklist>
    </div>
    <div v-if="this.$route.params.id == 2">
      <mt-checklist
        v-model="value2"
        :options="options2">
      </mt-checklist>
    </div>
    <div v-if="this.$route.params.id == 3">
      <mt-radio
        v-model="value3"
        :options="options3">
      </mt-radio>
    </div>

    <div class="btn" @click="saveInfo">提交</div>
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
        value1: [],
        value2: [],
        value3: '',
        options1: [
          {
            label: '绿茶',
            value: '绿茶'
          },
          {
            label: '乌龙',
            value: '乌龙'
          },
          {
            label: '红茶',
            value: '红茶'
          },
          {
            label: '白茶',
            value: '白茶'
          },
          {
            label: '普洱茶',
            value: '普洱茶'
          },
          {
            label: '花茶',
            value: '花茶'
          }
        ],
        options2: [
          {
            label: '玻璃杯',
            value: '玻璃杯'
          },
          {
            label: '飘逸杯',
            value: '飘逸杯'
          },
          {
            label: '功夫茶具',
            value: '功夫茶具'
          },
          {
            label: '紫砂壶',
            value: '紫砂壶'
          }
        ],
        options3: [
          {
            label: '一斤',
            value: '1'
          },
          {
            label: '半斤',
            value: '2'
          },
          {
            label: '一两泡',
            value: '3'
          },
          {
            label: '视情况而定',
            value: '4'
          }
        ]
      }
    },
    methods:{
      //获取用户信息
      getUserInfo(){
          this.axios({
          url: this.url + '/api/User/GetUserInfoByUserId',
          method: 'get',
          headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }

          }).then((res)=>{
            if(!!res){
              if (res.data.Code == 200) {
                let tType=res.data.ExData.TeaType.split(',');
                this.value1=tType;
                let tTool=res.data.ExData.TeaTool.split(',');
                this.value2=tTool;                
                this.value3=res.data.ExData.TeaNum.toString();
              } else {
                Toast(res.data.Data);
              }
            }
          }) 
        },
        //保存信息
      saveInfo(){  
         this.axios({
          url: this.url + '/api/User/SaveUserInfo',
          method: 'post',
          data:{TeaType:this.value1.toString(),TeaTool:this.value2.toString(),TeaNum:this.value3.toString()},
          headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }

          }).then((res)=>{
            if(!!res){
              if (res.data.Code == 200) {
                let instance = Toast(res.data.Data);
                setTimeout(() => {
                  this.$router.replace({ path: '/MySet' })
                }, 1000);
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
  .btn{
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.8rem;
    color: #fff;
    background-color: #B4282D;
  }
</style>
