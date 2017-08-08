<template>
    <header class="bar-nav">
      <a v-if="back" @click="backHistory" class="arrow" ></a>
      <div class="title">
        <slot name="title"></slot>
      </div>
      <div class="info">
        <slot name="info"></slot>
      </div>
      <router-link :to="{path: '/'}" v-if="show"  class="home" >
      </router-link>
    </header>
</template>

<script>
  export default {
    name: 'header',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      back: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      backHistory(){
        this.$router.go(-1)
      }
    }
  }
</script>
<style scoped>
  .bar-nav{
    top: 0;
    width: 100%;
    position: fixed;
    z-index: 911;
    background-color: #B4282D;
    display: flex;
    align-items: center;
    height: 1.8rem;
    color: #fff;
  }
  .bar-nav .title{
    width: 100%;
    font-size: 0.75rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
    text-align: center;
  }
  .bar-nav .arrow{
    left: 0.4rem;
    z-index: 99;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: inline-block;
    width: 0.9rem;
    height: 0.9rem;
    background-size: 100% 100%;
    background-image: url("../assets/images/back22.png") ;
  }
  .bar-nav .home{
    width: 1rem;
    height: 0.95rem;
    background-size: 100% 100%;
    background-image: url("../assets/images/cart_03.png");
    right: 0.7rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }
  .bar-nav .info{
    right: 0.7rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
  }
</style>
