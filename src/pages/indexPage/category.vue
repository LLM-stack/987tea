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
        <div class="tabs">
          <div class="tab tab-active">推荐</div>
          <div class="tab">绿茶</div>
          <div class="tab">绿茶</div>
          <div class="tab">绿茶</div>
          <div class="tab">绿茶</div>
          <div class="tab">绿茶</div>
          <div class="tab">绿茶</div>
          <div class="tab">绿茶</div>
          <div class="tab">绿茶</div>
          <div class="tab">绿茶</div>
          <div class="tab">绿茶</div>
        </div>
        <div class="tabs-cont">
          <div class="top-img">
            <img src="../../assets/images/category/category_03.png" alt="">
          </div>
        </div>
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
    height: 100%;
    background-color: #fff;
  }
  .category .tabs{
    padding-top: 0.7rem;
    width: 30%;
  }
  .category .tabs-cont{
    padding: 1rem 0.5rem;
    width: 70%;

  }
  .tabs{
    font-size: 0.75rem;
    border-right:1px solid #ccc;
  }
  .tabs .tab{
    padding: 0.3rem 0;
    margin: 0.3rem 0;
    text-align: center;
  }
  .tabs .tab-active{
    color: #fff;
    background-color: #f9cacc;
  }

  .category .tabs-cont .top-img{
    border-top:1px solid #ccc;
  }
</style>
