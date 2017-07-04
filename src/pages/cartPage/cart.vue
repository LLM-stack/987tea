<template>
  <div>
    <Mheader :show=true>
      <div slot="title">购物车</div>
    </Mheader>

    <div class="cart-list">
      <div class="goods">
        <div class="select"></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
      </div>
    </div>


  </div>
</template>

<script type="text/javascript">
  import Mheader from '../../components/Mheader'

  export default {
    components: {
      Mheader
    },
    data() {
      return {}
    }
  }
</script>

<style>
</style>
