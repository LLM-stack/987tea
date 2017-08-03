<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">茶圈子</div>
    </Mheader>

    <div class="content">
      <div class="user flex-alig-center">
        <div class="user-avater">
          <img src="../../assets/images/myInfo/toux.jpg"/>
        </div>
        <div class="user-name">
          <div>用户姓名</div>
          <div class="lm-font-xs lm-text-grey lm-margin-t-xs">用户签名</div>
        </div>
      </div>
      <div class="content-p lm-font-sm">
        #主体#内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容容内容内容内容内容内容内容内容内容内容内容内容内容
      </div>
      <div class="content-img flex-alig-center">
        <div><img src="../../assets/images/myInfo/toux.jpg"/></div>
        <div><img src="../../assets/images/myInfo/toux.jpg"/></div>
        <div><img src="../../assets/images/myInfo/toux.jpg"/></div>
        <div><img src="../../assets/images/myInfo/toux.jpg"/></div>
        <div><img src="../../assets/images/myInfo/toux.jpg"/></div>
        <div><img src="../../assets/images/myInfo/toux.jpg"/></div>
      </div>
      <div class="content-reply lm-margin-t-sm lm-padding-t-sm flex-alig-center">
        <div class="re-l flex-alig-center">
          <img src="../../assets/images/teaCommunity/time.png"/>
          <span>1个月前</span>
        </div>
        <div class="re-r flex-alig-center">
          <div class="flex-alig-center lm-margin-l">
            <img src="../../assets/images/teaCommunity/look.png" />
            <span>52152</span>
          </div>
          <div class="flex-alig-center lm-margin-l">
            <img src="../../assets/images/teaCommunity/reply.png"/>
            <span>23</span>
          </div>
          <div class="flex-alig-center lm-margin-l" @click.stop="ding">
            <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
            <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
            <span :class="{isding:isding}">156</span>
          </div>
        </div>
      </div>
    </div>

    <div class="comment-list lm-margin-t-sm">
      <div class="title lm-font-sm">评论</div>
      <div class="comment">
        <div class="user flex-alig-center">
          <div class="flex-alig-center">
            <div class="user-avater">
              <img src="../../assets/images/myInfo/toux.jpg"/>
            </div>
            <div class="user-name">
              <div>用户姓名</div>
              <div class="lm-font-xs lm-text-grey lm-margin-t-xs">10分钟前</div>
            </div>
          </div>
          <div class="toreply flex-alig-center">
            <span class="lm-font-sm" @click.stop="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
              <span :class="{isding:isding}">156</span>
            </span>
            <span><img src="../../assets/images/teaCommunity/reply.png" /></span>
          </div>
        </div>
        <div class="content-p lm-font-sm">
          回复内容回复内容回复内容回复内容复内容回复内容复内容
        </div>
      </div>
      <div class="comment">
        <div class="user flex-alig-center">
          <div class="flex-alig-center">
            <div class="user-avater">
              <img src="../../assets/images/myInfo/toux.jpg"/>
            </div>
            <div class="user-name">
              <div>用户姓名</div>
              <div class="lm-font-xs lm-text-grey lm-margin-t-xs">10分钟前</div>
            </div>
          </div>
          <div class="toreply flex-alig-center">
             <span class="lm-font-sm" @click.stop="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
              <span :class="{isding:isding}">156</span>
            </span>
            <span><img src="../../assets/images/teaCommunity/reply.png" /></span>
          </div>
        </div>
        <div class="content-p lm-font-sm">
          <span>回复了 <span class="font-black">谁谁谁：</span></span>回复内容回复内容回复内容
        </div>
      </div>

    </div>

    <div class="reply-box">
      <div>来说两句吧...</div>
    </div>

    <Mfooter :worldCurrent='true'></Mfooter>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'

  export default {
    components: {
      Mheader,
      Mfooter
    },
    data(){
      return {
        isding:false
      }
    },
    methods:{
      ding(){
        this.isding = !this.isding
      }
    }
  }
</script>

<style scoped>
  .isding{
    color: #D81E06;
  }
  .font-black{
    color: #000;
  }
  .content {
    background-color: #fff;
    padding: 0.4rem;
    margin-top: 0.4rem;
  }

  .content .user .user-avater {
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.5rem;
  }

  .content .content-p {
    margin: 0.2rem 0;
    color: #777;
  }

  .content .content-img {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .content .content-img > div {
    width: 32%;
    margin-top: 0.2rem;
    margin-right: 0.2rem;
  }

  .content .content-reply {
    font-size: 0.55rem;
    color: #999;
    border-top: 1px solid #E1E1E1;
    justify-content: space-between;
  }
  /*评论列表*/
  .comment-list{
    border-top: 1px solid #eee;
    margin-bottom: 2.4rem;
    background-color: #fff;
  }
  .comment-list .title{
    padding: 0.4rem;
    border-bottom: 1px solid #eee;
  }
  .comment-list .comment{
    padding: 0.4rem;
  }
  .comment-list .comment+.comment{
    border-top: 1px solid #eee;
  }
  .comment .user{
    justify-content: space-between;
  }
  .comment .user .toreply img{
    margin-left: 0.5rem;
    width: 0.7rem;
    width: 0.7rem;
  }
  .comment .user .user-avater{
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.5rem;
  }
  .comment .content-p{
    padding-left: 2rem;
    margin: 0.2rem 0;
    color: #777;
  }
  .content-reply img {
    margin-right: 0.1rem;
    width: 0.6rem;
    height: 0.6rem;
  }
  .reply-box{
    position: fixed;
    bottom: 2rem;
    width: 100%;
    padding:0.2rem 0.4rem;
    background-color: #fff;
  }
  .reply-box > div{
    padding: 0.2rem;
    text-align: center;
    color: #999;
    border-radius: 0.5rem;
    background-color: #eee;
    margin: 0 auto;
  }
</style>
