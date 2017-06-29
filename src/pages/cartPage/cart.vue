<template>
    <div>
      <!--<Mheader>-->
        <!--<div slot="title">购物车</div>-->
      <!--</Mheader>-->
      <mt-header title="购物车">
        <router-link to="/" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>

      </mt-header>
    </div>
</template>

<script type="text/javascript">
  import Mheader from '../../components/Mheader'

    export default {
      components: {
        Mheader
      }
    }
</script>

<style>
</style>
