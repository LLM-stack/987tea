<template>
  <div class="container">
    <Mheader>
      <div slot="title">标签</div>
      <div slot="info" @click="checkTag">确定</div>
    </Mheader>

    <mt-radio
      v-model="isSelect"
      :options="options">
    </mt-radio>



    </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import {Toast} from 'mint-ui'

  export default {
  	components:{
      Mheader
    },
    data(){
  		return {
  			isSelect:'',
        options : []
      }
    },
    methods:{
       //获取话题类型
      getThemeType(){
        this.axios.get(this.url + '/api/CM_Theme/GetThemeType').then((res)=>{
             if(res.data.Code==200){               
              if(!!res.data.Data){
                res.data.Data.forEach(function(element) {
                  let op={
                    label:'#'+element.Name+'#',
                    value:element.Id.toString()+'&#'+element.Name+'#'
                  }
                  this.options.push(op);
                }, this);
              }               
            }
          })
      },
      //确定选中标签选中标签
      checkTag(){
        if(!!!this.isSelect){
          Toast("请选择一个标签");
          return;
        }   
        this.$store.state.themeTags=this.isSelect; 
        this.$router.go(-1);    
      } 
    },
    created(){
      this.getThemeType();
    }
  }
</script>

<style scoped>
</style>
