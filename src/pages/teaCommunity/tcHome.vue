<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">茶圈子</div>
    </Mheader>
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item><img src="../../assets/images/teaCommunity/tc_02.png"/></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/images/teaCommunity/tc_02.png"/></mt-swipe-item>
        <mt-swipe-item><img src="../../assets/images/teaCommunity/tc_02.png"/></mt-swipe-item>
      </mt-swipe>
    </div>
    <nav class="nav-bar">
      <div class="active">最新</div>
      <div>最热</div>
      <div>茶生活</div>
      <div>白茶</div>
      <div>乌龙茶</div>
    </nav>
    <div class="forum-box">
      <div class="content">
        <router-link to="/tcContent">
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
        </router-link>
        <div class="content-img flex-alig-center">
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
              <img src="../../assets/images/teaCommunity/look.png"/>
              <span>52152</span>
            </div>
            <div class="flex-alig-center lm-margin-l">
              <router-link to="/tcContent">
                <img src="../../assets/images/teaCommunity/reply.png"/>
                <span>23</span>
              </router-link>
            </div>
            <div class="flex-alig-center lm-margin-l" @click.stop="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
              <span :class="{isding:isding}">156</span>
            </div>
          </div>
        </div>

      </div>
      <div class="content">
        <router-link to="/tcContent">
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
        </router-link>
        <div class="content-img flex-alig-center">
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
              <img src="../../assets/images/teaCommunity/look.png"/>
              <span>52152</span>
            </div>
            <div class="flex-alig-center lm-margin-l">
              <router-link to="/tcContent">
                <img src="../../assets/images/teaCommunity/reply.png"/>
                <span>23</span>
              </router-link>
            </div>
            <div class="flex-alig-center lm-margin-l" @click.stop="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
              <span :class="{isding:isding}">156</span>
            </div>
          </div>
        </div>

      </div>
      <div class="content">
        <router-link to="/tcContent">
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
        </router-link>
        <div class="content-img flex-alig-center">
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
              <img src="../../assets/images/teaCommunity/look.png"/>
              <span>52152</span>
            </div>
            <div class="flex-alig-center lm-margin-l">
              <router-link to="/tcContent">
                <img src="../../assets/images/teaCommunity/reply.png"/>
                <span>23</span>
              </router-link>
            </div>
            <div class="flex-alig-center lm-margin-l" @click.stop="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
              <span :class="{isding:isding}">156</span>
            </div>
          </div>
        </div>

      </div>
      <div class="content">
        <router-link to="/tcContent">
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
        </router-link>
        <div class="content-img flex-alig-center">
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
              <img src="../../assets/images/teaCommunity/look.png"/>
              <span>52152</span>
            </div>
            <div class="flex-alig-center lm-margin-l">
              <router-link to="/tcContent">
                <img src="../../assets/images/teaCommunity/reply.png"/>
                <span>23</span>
              </router-link>
            </div>
            <div class="flex-alig-center lm-margin-l" @click.stop="ding">
              <img v-show="!isding" src="../../assets/images/teaCommunity/ding.png"/>
              <img v-show="isding" src="../../assets/images/teaCommunity/isding.png"/>
              <span :class="{isding:isding}">156</span>
            </div>
          </div>
        </div>

      </div>
    </div>
    <!--发帖-->
    <router-link to="/Post">
    <div class="post">
      <img src="../../assets/images/teaCommunity/post.png" />
    </div>
    </router-link>

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
  .banner {
    height: 6rem;
  }

  .nav-bar {
    display: flex;
    align-items: center;
    padding: 0.4rem 0;
    margin-bottom: 0.4rem;
    background-color: #fff;
  }

  .nav-bar .active {
    color: #fff;
    border-radius: 0.1rem;
    background-color: #B4282D;
  }

  .nav-bar > div {
    padding: 0 0.2rem;
    margin-left: 0.5rem;
  }

  .content {
    background-color: #fff;
    padding: 0.4rem;
    margin-bottom: 0.4rem;
  }

  .content .user .user-avater {
    width: 1.6rem;
    height: 1.6rem;
    margin-right: 0.5rem;
  }

  .content .content-p {
    margin: 0.2rem 0;
    color: #777;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .content .content-img {
    width: 100%;
    justify-content: space-between;
  }

  /*.content .content-img > div{*/
  /*overflow: hidden;*/
  /*max-height: 5rem;*/
  /*}*/
  .content .content-img > div + div {
    margin-left: 0.2rem;
  }

  .content .content-reply {
    font-size: 0.55rem;
    color: #999;
    border-top: 1px solid #E1E1E1;
    justify-content: space-between;
  }

  .content-reply img {
    margin-right: 0.1rem;
    width: 0.6rem;
    height: 0.6rem;
  }
  .post{
    border-radius: 50%;
    padding: 0.3rem;
    background-color: rgba(0,0,0,0.7);
    right: 1rem;
    bottom: 6.8rem;
    position: fixed;
  }
  .post > img{
    width: 1rem;
    height: 1rem;
  }
</style>
