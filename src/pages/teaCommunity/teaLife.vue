<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">茶圈子</div>
      <div class="msg" slot="info">
      </div>
    </Mheader>
    <div>
      <div class="title" :style="{backgroundImage: 'url(' + bg + ')'}">
        <h1>标题标题标题标题标题标题标题标题标题标题标题标题标题标题</h1>
      </div>
      <div class="content">
        <div class="user flex-between">
          <div class="flex-alig-center">
            <img src="../../assets/images/home/homenew_05.png"/>
            <span class="lm-margin-l-sm">名字名字</span>
          </div>
          <div class="flex-alig-center">
            <div class="lm-margin-l fx">分享</div>
            <div class="lm-margin-l watch">25</div>
            <div class="lm-margin-l ding">100</div>
          </div>
        </div>
        <div class="article lm-margin-t-sm">
          正文内容正文内容正文内容正文内容正文内容正文内容正文内容
          正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容
          正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容
          <img src="../../assets/images/goods/987tea_25.png" />
        </div>
        <div class="zan">
        </div>
        <div class="zannum">
          <span>12354</span>
          <span class="fx">分享</span>
        </div>
      </div>
      <div class="article-list lm-margin-t-sm">
        <div class="article-block flex-alig-center">
          <div class="article-img">
            <img src="../../assets/images/category/wulongtea.jpeg"/>
          </div>
          <div class="article-p lm-margin-l-sm">
            <div class="article-p-title">标题标题标题标题标题标题标题标题标题标题标题标题</div>
            <div class="flex-alig-center">
              <div class="lm-margin-l watch">25</div>
              <div class="lm-margin-l ding">100</div>
            </div>
          </div>
        </div>
        <div class="article-block flex-alig-center">
          <div class="article-img">
            <img src="../../assets/images/category/wulongtea.jpeg"/>
          </div>
          <div class="article-p lm-margin-l-sm">
            <div class="article-p-title">标题标题标题标题标题标题标题标题标题标题标题标题</div>
            <div class="flex-alig-center">
              <div class="lm-margin-l watch">25</div>
              <div class="lm-margin-l ding">100</div>
            </div>
          </div>
        </div>
        <div class="article-block flex-alig-center">
          <div class="article-img">
            <img src="../../assets/images/category/wulongtea.jpeg"/>
          </div>
          <div class="article-p lm-margin-l-sm">
            <div class="article-p-title">标题标题标题标题标题标题标题标题标题标题标题标题</div>
            <div class="flex-alig-center">
              <div class="lm-margin-l watch">25</div>
              <div class="lm-margin-l ding">100</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box mode lm-margin-t-sm">
        <div class="box-title flex-alig-center">
          爆款推荐
        </div>
        <div class="mode-box">
          <Mmode v-for="(item,index) in giftsTea" :key="item.ProductId" :index="index" :path="item.ProductId" :imgSrc="item.HeadImg" :productName="item.Name" :productPrice="item.SalePrice"></Mmode>
        </div>
      </div>
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
        bg: require('../../assets/images/home/homenew_05.png')
      }
    }

  }
</script>

<style scoped>
  .title {
    width: 100%;
    height: 8.4rem;
    padding: 0.4rem;
    color: #fff;
    position: relative;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .title > h1 {
    font-size: 0.75rem;
    width: 95%;
    left: 0.4rem;
    bottom: 0.4rem;
    position: absolute;
  }

  .content {
    padding: 0.4rem;
    background-color: #fff;
  }

  .content .user > div:first-child > img {
    width: 2rem;
    height: 2rem;
    border-radius: 0.2rem;
  }

  .content .user > div:last-child > div {
    font-size: 0.6rem;
    padding-left: 0.8rem;
    background-position: left;
    background-size: 0.7rem 0.7rem;
    background-repeat: no-repeat;
  }
  .content .user > div:last-child .fx{
    background-image: url("../../assets/images/teaCommunity/share.png");
  }
  .content .user > div:last-child .watch{
    background-image: url("../../assets/images/teaCommunity/look.png");
  }
  .content .user > div:last-child .ding{
    background-image: url("../../assets/images/teaCommunity/ding.png");
  }
  .content .article{
    font-size: 0.6rem;
    line-height: 0.85rem;
  }
  .article img{
    display: block;
    margin: 0.4rem auto;
    width: 9rem;
    height: auto;
  }
  .content .zan{
    margin: 0 auto;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    background-color: #B4282D;
    background-size: 0.8rem 0.8rem;
    background-position: center center;
    background-repeat: no-repeat;
    background-image: url("../../assets/images/teaCommunity/zan.png");
  }
  .content .zannum{
    position: relative;
    text-align: center;
  }
  .zannum .fx{
    position: absolute;
    right: 0;
    font-size: 0.6rem;
    padding-left: 0.8rem;
    background-position: left;
    background-size: 0.7rem 0.7rem;
    background-repeat: no-repeat;
    background-image: url("../../assets/images/teaCommunity/share.png");
  }
  .article-list{
    padding: 0 0.4rem;
    background-color: #fff;
  }
  .article-list .article-block{
    height: 3.5rem;
    padding: 0.4rem 0;
  }
  .article-block .article-img{
    height: 100%;
  }
  .article-list .article-block+.article-block{
    border-top: 1px solid #ddd;
  }
  .article-block .article-p{
    height: 100%;
    position: relative;
  }
  .article-block .article-p .article-p-title{
    width: 10.4rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .article-p > div:last-child{
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .article-p > div:last-child >div{
    font-size: 0.6rem;
    padding-left: 0.8rem;
    background-position: left;
    background-size: 0.7rem 0.7rem;
    background-repeat: no-repeat;
  }
  .article-p > div:last-child .watch{
    background-image: url("../../assets/images/teaCommunity/look.png");
  }
  .article-p > div:last-child .ding{
    background-image: url("../../assets/images/teaCommunity/ding.png");
  }

  .box {
    padding: 0.4rem;
    margin-bottom: 0.4rem;
    font-size: 0.7rem;
    background-color: #fff;
  }
  .box .box-title {
    font-weight: 600;
    font-size: 0.7rem;
    border: 1px solid #333;
    padding: 0.1rem 0;
    justify-content: center;
  }
</style>
