<template>
  <div>
    <header class="bar-nav">
      <a @click="backHistory" class="arrow" ></a>
      <div class="title">
        <slot name="title"></slot>
      </div>
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
    background-color: #B4282D;
    display: flex;
    align-items: center;
    height: 2rem;
    color: #fff;
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
    left: 0.5rem;
    z-index: 99;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-size: 100% 100%;
    background-image: url("../assets/images/back22.png") ;
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
