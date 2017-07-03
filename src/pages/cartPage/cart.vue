<template>
    <div>
      <Mheader>
        <div slot="title">购物车</div>
      </Mheader>
      <Mfooter :cartCurrent=true></Mfooter>
    </div>
</template>

<script type="text/javascript">
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'

    export default {
      components: {
        Mheader,
        Mfooter
      }
    }
</script>

<style>
</style>
