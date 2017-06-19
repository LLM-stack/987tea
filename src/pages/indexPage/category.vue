<template>
    <div>
      <header>
        <div class="back" @click="goBack"></div>
        <div class="title">分类</div>
        <router-link to="/">
          <div class="icon"></div>
        </router-link>
      </header>
    </div>
</template>

<script type="text/javascript">
    export default {
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
    padding: 0 0.5rem;
    font-size: 0.85rem;
    height: 2rem;
    color: #fff;
    background-color: #B4282D;
  }
  .back{
    width: 1.2rem;
    height: 1.2rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/category/back.png");
  }
  .icon{
    width: 1.2rem;
    height: 1.2rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/category/search.png");
  }
</style>
