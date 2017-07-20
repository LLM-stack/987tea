<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">商品详情</div>
    </Mheader>

    <div class="head-info">
      <img src="../../assets/images/myInfo/icon.3.png"/>
      <div class="lm-margin-l-sm">
        <p>商品名称</p>
        <p class="lm-margin-t-xs">物流公司名字：单号65526232654</p>
      </div>
    </div>

    <div class="logistics-line">

    </div>
    
    </div>
</template>

<script>
  import Mheader from '../../components/Mheader'

  export default {
    components: {
      Mheader
    }
  }
</script>

<style scoped>
  header,.head-info{
    width: 100%;
    position: fixed;
  }
  header{
    top:0;
  }
  .head-info{
    top:1.8rem;
    color: #000;
    padding: 0 0.4rem;
    background-color: #fff;
    display: flex;
    align-items: center;
  }
  .head-info p:first-child{
    width: 11rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .head-info > img{
    width: 3.5rem;
    height: 3.5rem;
  }
</style>
