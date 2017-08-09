<template>
  <div class="container">
    <Mheader>
      <div slot="title">所有评论</div>
    </Mheader>
    <div class="comment-list lm-margin-t-sm" >
      <div class="comment" >
        <div class="user flex-alig-center">
          <div class="flex-alig-center">
            <div class="user-avater">
              <img src="../../assets/images/myInfo/toux.jpg"/>
              <!--<img :src="cb.uHeaderImg"/>-->
            </div>
            <div class="user-name">
              <div>XXX</div>
              <div class="lm-font-xs lm-text-grey lm-margin-t-xs">2017-15-1</div>
            </div>
          </div>
          <div class="toreply flex-alig-center">
            <!-- <span class="lm-font-sm" @click.stop="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
              <span :class="{isding:isding}">156</span>
            </span> -->
            <span><img src="../../assets/images/teaCommunity/reply.png" /></span>
          </div>
        </div>
        <div class="content-p lm-font-sm">
          <span>回复了<span class="lm-text-red">你</span></span>：回复内容
        </div>
      </div>
      <div class="comment" >
        <div class="user flex-alig-center">
          <div class="flex-alig-center">
            <div class="user-avater">
              <img src="../../assets/images/myInfo/toux.jpg"/>
              <!--<img :src="cb.uHeaderImg"/>-->
            </div>
            <div class="user-name">
              <div>XXX</div>
              <div class="lm-font-xs lm-text-grey lm-margin-t-xs">2017-15-1</div>
            </div>
          </div>
          <div class="toreply flex-alig-center">
            <!-- <span class="lm-font-sm" @click.stop="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
              <span :class="{isding:isding}">156</span>
            </span> -->
            <span><img src="../../assets/images/teaCommunity/reply.png" /></span>
          </div>
        </div>
        <div class="content-p lm-font-sm">
          <span>回复了<span class="lm-text-red">你</span></span>：回复内容
        </div>
      </div>
      <div class="comment" >
        <div class="user flex-alig-center">
          <div class="flex-alig-center">
            <div class="user-avater">
              <img src="../../assets/images/myInfo/toux.jpg"/>
              <!--<img :src="cb.uHeaderImg"/>-->
            </div>
            <div class="user-name">
              <div>XXX</div>
              <div class="lm-font-xs lm-text-grey lm-margin-t-xs">2017-15-1</div>
            </div>
          </div>
          <div class="toreply flex-alig-center">
            <!-- <span class="lm-font-sm" @click.stop="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
              <span :class="{isding:isding}">156</span>
            </span> -->
            <span><img src="../../assets/images/teaCommunity/reply.png" /></span>
          </div>
        </div>
        <div class="content-p lm-font-sm">
          <span>回复了<span class="lm-text-red">你</span></span>：回复内容
        </div>
      </div>
      <div class="comment" >
        <div class="user flex-alig-center">
          <div class="flex-alig-center">
            <div class="user-avater">
              <img src="../../assets/images/myInfo/toux.jpg"/>
              <!--<img :src="cb.uHeaderImg"/>-->
            </div>
            <div class="user-name">
              <div>XXX</div>
              <div class="lm-font-xs lm-text-grey lm-margin-t-xs">2017-15-1</div>
            </div>
          </div>
          <div class="toreply flex-alig-center">
            <!-- <span class="lm-font-sm" @click.stop="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
              <span :class="{isding:isding}">156</span>
            </span> -->
            <span><img src="../../assets/images/teaCommunity/reply.png" /></span>
          </div>
        </div>
        <div class="content-p lm-font-sm">
          <span>回复了<span class="lm-text-red">你</span></span>：回复内容
        </div>
      </div>
      <div class="comment" >
        <div class="user flex-alig-center">
          <div class="flex-alig-center">
            <div class="user-avater">
              <img src="../../assets/images/myInfo/toux.jpg"/>
              <!--<img :src="cb.uHeaderImg"/>-->
            </div>
            <div class="user-name">
              <div>XXX</div>
              <div class="lm-font-xs lm-text-grey lm-margin-t-xs">2017-15-1</div>
            </div>
          </div>
          <div class="toreply flex-alig-center">
            <!-- <span class="lm-font-sm" @click.stop="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
              <span :class="{isding:isding}">156</span>
            </span> -->
            <span><img src="../../assets/images/teaCommunity/reply.png" /></span>
          </div>
        </div>
        <div class="content-p lm-font-sm">
          <span>回复了<span class="lm-text-red">你</span></span>：回复内容
        </div>
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
    data(){
    	return {

      }
    }
  }
</script>

<style scoped>

  /*评论列表*/
  .comment-list {
    border-top: 1px solid #eee;
    margin-bottom: 2.4rem;
    background-color: #fff;
  }

  .comment-list .title {
    padding: 0.4rem;
    border-bottom: 1px solid #eee;
  }

  .comment-list .comment {
    padding: 0.4rem;
  }

  .comment-list .comment + .comment {
    border-top: 1px solid #eee;
  }

  .comment .user {
    justify-content: space-between;
  }

  .comment .user .toreply img {
    margin-left: 0.5rem;
    width: 0.7rem;
    width: 0.7rem;
  }

  .comment .user .user-avater {
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.5rem;
  }

  .comment .content-p {
    padding-left: 2rem;
    margin: 0.2rem 0;
    color: #777;
  }

  .content-p > h1 {
    font-weight: 600;
  }

  .content-reply img {
    margin-right: 0.1rem;
    width: 0.6rem;
    height: 0.6rem;
  }
</style>
