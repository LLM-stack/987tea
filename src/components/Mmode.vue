<template>

        <div class="mode-list" :class="{'mode-left' : index % 2 !== 0}">
          <router-link :to="{path:'/ProductDetails/'+path}">
            <div class="mode-img">
              <img v-lazy="imgSrc"/>
            </div>
            <!--<div class="mode-dp">{{ item.SaleComment }}</div>-->
            <div class="mode-title">{{ productName }}</div>
            <div class="mode-price">
              <span class="lm-text-red">￥{{ productPrice }}元</span>
              <span class="mode-btn" :to="{path:'/ProductDetails/'+path}">立即购买</span>
            </div>
          </router-link>
        </div>

</template>

<script>
	export default {
		props:{
			path:'',
      imgSrc:'',
      productName:'',
      productPrice:'',
      index:''
    }
  }
</script>

<style scoped>
</style>
