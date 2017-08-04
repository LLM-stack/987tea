<template>
  <div class="container">
    <Mheader>
      <div slot="title">标签</div>
      <div slot="info">确定</div>
    </Mheader>

    <mt-radio
      v-model="isSelect"
      :options="options">
    </mt-radio>

    <!--测试-->
<div>{{ isSelect }}</div>

    </div>
</template>

<script>
  import Mheader from '../../components/Mheader'

  export default {
  	components:{
      Mheader
    },
    data(){
  		return {
  			isSelect:'',
        options : [
          {
            label: '#红茶#',
            value: '#红茶#'
          },
          {
            label: '#绿茶#',
            value: '#绿茶#'
          },
          {
            label: '#普洱茶#',
            value: '#普洱茶#'
          }
        ]
      }
    }
  }
</script>

<style scoped>
</style>
