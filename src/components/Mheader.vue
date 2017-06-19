<template>
  <div>
    <header class="bar-nav">
      <a @click="backHistory" class="arrow" ></a>
      <div class="title">{{ title }}</div>
      <div v-if="show" class="info" @click="checkUrl">
        {{　info　}}
      </div>
    </header>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: {
      title: '',
      show: {
        type: Boolean,
        default: false
      },
      info: '',
      url: ''
    },
    methods: {
      checkUrl (){
        return location.href= this.url
      },
      backHistory(){
        window.history.go(-1)
      }
    }
  }
</script>
<style scoped>
  .bar-nav{
    position: relative;
    background-color: #fff;
    display: flex;
    align-items: center;
    height: 2.2rem;
  }
  .bar-nav .title{
    width: 100%;
    font-size: 0.85rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
    text-align: center;
  }
  .bar-nav .arrow{
    left: 0.2rem;
    z-index: 99;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    width: 1.6rem;
    height: 1.6rem;
    background-size: 100% 100%;
    background-image: url("../assets/images/back.png") ;
  }
  .bar-nav .info{
    right: 0.8rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
    color: #666;
  }
</style>
