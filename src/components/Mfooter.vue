<template>
    <nav class="nav-bottom">
      <router-link :to="{path: '/'}">
        <span class="nav-icon nav-icon-index" :class="{ indexCurrent: indexCurrent }"></span>
      </router-link>
      <router-link :to="{path: '/'}">
        <span class="nav-icon nav-icon-shop" :class="{ shopCurrent: shopCurrent }"></span>
      </router-link>
      <router-link :to="{path: '/'}">
        <span class="nav-icon nav-icon-world" :class="{ worldCurrent: worldCurrent }"></span>
      </router-link>
      <router-link :to="{path: '/cart'}">
        <span class="nav-icon nav-icon-cart" :class="{ cartCurrent: cartCurrent }"></span>
      </router-link>
      <router-link :to="{path: '/'}">
        <span class="nav-icon nav-icon-myCenter" :class="{ myCenterCurrent: myCenterCurrent }"></span>
      </router-link>
    </nav>
</template>

<script type="text/javascript">
  export default {
    name: 'footer',
    props: {
      indexCurrent: false,
      shopCurrent: false,
      worldCurrent: false,
      cartCurrent: false,
      myCenterCurrent: false
    }
  }
</script>

<style scoped>
  /*底部导航*/
  .nav-bottom {
    width: 100%;
    height: 2rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    display: flex;
    border-top: 1px solid #dedede;
  }

  .nav-bottom > a {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 20%;
    height: 100%;
  }

  .nav-bottom .nav-icon {
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  }

  .nav-icon-index {
    background-image: url("../assets/images/tabBar/987tea_index.png");
  }

  .nav-icon-shop {
    background-image: url("../assets/images/tabBar/987tea_shop.png");
  }

  .nav-icon-world {
    background-image: url("../assets/images/tabBar/987tea_world.png");
  }

  .nav-icon-cart {
    background-image: url("../assets/images/tabBar/987tea_cart.png");
  }

  .nav-icon-myCenter {
    background-image: url("../assets/images/tabBar/987tea_myCenter.png");
  }

  /*当前底部导航*/
  .indexCurrent {
    background-image: url("../assets/images/tabBar/987tea_index_current.png");
  }

  .shopCurrent {
    background-image: url("../assets/images/tabBar/987tea_shop_current.png");
  }

  .worldCurrent {
    background-image: url("../assets/images/tabBar/987tea_world_current.png");
  }

  .cartCurrent {
    background-image: url("../assets/images/tabBar/987tea_cart_current.png");
  }

  .myCenterCurrent {
    background-image: url("../assets/images/tabBar/987tea_myCenter_current.png");
  }
</style>
