<template>
    <div>
      <div class="cont">
        <div class="top">
          <span>订单编号:{{ number }}</span>
          <span></span>
        </div>
        <div class="mid">
          <img :src="imgSrc" alt="">
          <span>{{ name }}</span>
        </div>
        <div class="btm">
          <span>实付:{{ price }}元</span>
          <span></span>
        </div>
      </div>
    </div>
</template>

<script>

	export default {
    props: {
      number:{
      	type: String
      },
      price:{
        type: Number
      },
      imgSrc: '',
      name: ''
    }
  }
</script>

<style scoped>
  .cont{
    padding: 0.4rem;
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;
  }
</style>
