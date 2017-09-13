<template>
  <div class="image-box">
    <Mheader :show='true'>
      <div slot="title">赚取茶币</div>
      <div class="msg" slot="info">
      </div>
    </Mheader>
    <div class="image">
      <img src="../../assets/images/CBimg.jpg"/>
      <div class="btn go">
        <router-link to="/MySet">
          现在就去
        </router-link>
      </div>
      <div class="btn fx">
        <router-link to="/MySet">
          立即分享
        </router-link>
      </div>
      <div class="btn mai">
        <router-link to="/">
          买买买
        </router-link>
      </div>
      <div class="btn pl">
        <router-link to="/MyOrder/待评价/4">
          去评论
        </router-link>
      </div>
      <div class="btn cq">
        <router-link to="/TcHome">
          茶友圈走起
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'

  export default {
    components: {
      Mheader
    },
    mounted(){
      this.$nextTick(() => {
        document.body.scrollTop = 0
    })
    }
  }
</script>

<style scoped>
  .image-box{
    margin-top: 1.75rem;
  }
  .image{
    position: relative;
  }
  .btn{
    width: 5.5rem;
    height: 1.5rem;
    color: rgba(0,0,0,0);
    background-color: rgba(15,206,211,0);
    position: absolute;
  }
  .btn > a{
    display: block;
    width: 100%;
    height: 100%;
  }
  .go{
    top: 30.7rem;
    left: 4.3rem;
  }
  .fx{
    top: 44.8rem;
    left: 5.3rem;
  }
  .mai{
    top: 55.8rem;
    left: 5.4rem;
  }
  .pl{
    top: 68.9rem;
    left: 5.3rem;
  }
  .cq{
    top: 86.1rem;
    left: 4.5rem;
  }
</style>
