<template>
    <div>
      <div class="cont">
        <div class="top">
          <span>订单编号: <slot name="number"></slot></span>
          <span class="lm-text-red"><slot name="state"></slot></span>
        </div>
        <div class="mid">        
          <slot name="img"></slot>
          <slot name="name"></slot>
          x
          <slot name="count"></slot>
        </div>
        <div class="btm">
          <span>实付: <slot name="price"></slot>元</span>
          <slot name="time"></slot>
          <span>
            <span></span>
            <span></span>
          </span>
        </div>
      </div>
    </div>
</template>

<script>

	export default {
    props: {      
      
    },
    methods:{
     
    }
  }
  </script>

<style scoped>
  .cont{
    margin-bottom: 0.5rem;
    padding:0 0.4rem;
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;
  }
  .mid{
    display: flex;
    align-items: center;
    padding: 0.4rem 0;
    border-top:1px solid #eee;
    border-bottom:1px solid #eee;
  }
  .mid img{
    width: 3rem;
    height: 3rem;
    margin-right: 0.5rem;
  }
  .top,.btm{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.4rem 0;
  }
</style>
