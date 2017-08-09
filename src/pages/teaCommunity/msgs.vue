<template>
  <div class="container">
    <Mheader>
      <div slot="title">消息</div>
    </Mheader>
    <div class="msg-box">
      <router-link to="/MsgContent">
        <div class="msg flex-between">
          <div class="flex-alig-center">
            <img src="../../assets/images/teaCommunity/comment (1).png"/>
            <span class="lm-margin-l-sm">评论</span>
          </div>
          <mt-badge size="small" type="error">10</mt-badge>
        </div>
      </router-link>
      <div class="msg flex-between">
        <div class="flex-alig-center">
          <img src="../../assets/images/teaCommunity/notification.png"/>
          <span class="lm-margin-l-sm">系统消息</span>
        </div>
        <mt-badge size="small" type="error">10</mt-badge>
      </div>
    </div>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'

  export default {
    components: {
      Mheader
    }
  }
</script>

<style scoped>
  .msg-box .msg {
    background-color: #fff;
    border-bottom: 1px solid #eee;
    padding: 0.4rem;
  }

  .msg img {
    width: 1.2rem;
    height: 1.2rem;
  }
</style>
