<template>
    <div>
      <header>
        <div class="back" @click="goBack"></div>
        <div class="title">分类</div>
        <router-link to="/">
          <div class="icon"></div>
        </router-link>
      </header>
      <div class="category">
        <div class="tabs"></div>
        <div class="tabs-cont"></div>
      </div>
      <Mfooter :indexCurrent=true></Mfooter>
    </div>
</template>

<script type="text/javascript">
  import Mfooter from '../../components/Mfooter'

  export default {
    components: {
      Mfooter
    },
    date() {
      return {

      }
    },
    methods: {
      goBack() {
        window.history.go(-1)
      }
    }
  }
</script>

<style scoped>
  body{
    background-color: #fff!important;
  }
  header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.4rem;
    font-size: 0.75rem;
    height: 1.8rem;
    color: #fff;
    background-color: #B4282D;
  }
  .back{
    width: 1rem;
    height: 1rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/category/back.png");
  }
  .icon{
    width: 1rem;
    height: 1rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/category/search.png");
  }
  .category{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .category .tabs{
    width: 30%;
  }
  .category .tabs-cont{
    width: 70%;

  }
</style>
