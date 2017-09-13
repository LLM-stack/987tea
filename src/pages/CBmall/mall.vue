<template>
  <div class="container">
    <Mheader :show=true>
      <div slot="title">商城</div>
    </Mheader>

    <div class="banner">
      <router-link to="/CBMall">
        <img src="../../assets/images/cbmall/cbmall1112.png" />
      </router-link>
      <div class="tabs" id="tabs" :class="{fixed:isfixed}">
        <div class="tab" v-for="(item,index) in tagList" :class="{active:item.isactive}" :key='index' @click="tabActive(index)">{{ item.Name |tagName }}</div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="cont">
      <div class="mode-box">
        <Mmode v-for="(item,index) in productList" :key="item.ProductId" :index="index" :path="item.ProductId" :imgSrc="item.HeadImg" :productName="item.Name" :productPrice="item.SalePrice"></Mmode>
      </div>
      <div class="box mode" v-show="recommend.length>0">
        <div class="title flex-alig-center">
          猜你喜欢
          <span></span>
        </div>
        <div class="mode-box">
          <Mmode v-for="(item,index) in recommend" :key="item.ProductId" :index="index" :path="item.ProductId" :imgSrc="item.HeadImg" :productName="item.Name" :productPrice="item.SalePrice"></Mmode>
        </div>
      </div>
    </div>

    <Mfooter :shopCurrent='true'></Mfooter>
  </div>
</template>

<script>
import Mheader from '../../components/Mheader'
import Mfooter from '../../components/Mfooter'
import Mmode from '../../components/Mmode'

export default {
  components: {
    Mheader,
    Mfooter,
    Mmode
  },
  data() {
    return {
      top: '',
      tabs: '',
      isfixed: false,
      tagList: [],
      productList: [],//分类商品
      pageIndex: 1,
      pageSize: 10,
      recommend: []//推荐商品
    }
  },
  filters: {
    tagName(val) {
      return val.split('】')[1];
    }
  },
  methods: {
    tabActive(i) {
      this.tagList.forEach(function(value, index, array) {
        array[index].isactive = false;
      });
      this.tagList[i].isactive = true;
      this.getProducts(this.tagList[i].ProductTagId);

    },
    scroll() {
      this.top = document.body.scrollTop;

      if (this.top >= this.tabs) {
        this.isfixed = true
      } else {
        this.isfixed = false
      };
    },
    //获取分类信息
    getTagInfo() {
      this.axios.get(this.url + '/api/ProductClassify/GetProductTags', {}).then((res) => {
        if (res.data.Code == 200) {
          this.tagList = res.data.Data;
          let idx = this.$route.query.index;
          if (!!!idx) {
            idx = 0;
          }
          this.tagList.forEach((item, index) => {
            if (idx == index) {
              this.$set(item, "isactive", true);
            } else {
              this.$set(item, "isactive", false);
            }
          })
          this.tabActive(idx);
          //跳转选中的标签
          setTimeout(function() {
            if (idx > 3) {
              document.getElementById("tabs").scrollLeft = document.body.clientWidth;
            }
          }, 0)

        }
      })
    },
    //获取类别商品
    getProducts(cId) {
      this.axios.post(this.url + '/api/Product/GetCategoryProducts', { categoryId: cId, pageIndex: this.pageIndex, pageSize: this.pageSize }).then((res) => {
        if (res.data.Code == 200) {
          this.productList = res.data.Data;
        } else {
          Toast(res.data.Data);
        }
      }).catch((err) => {
        Toast('网络请求超时');
      })
    },
    //获取推荐商品
    getRecommendProduct() {
      if (!!localStorage.lut) {
        //验证localStorage.lut是否在登录状态
        this.axios.get(this.url + '/api/Login/CheckLogin?str=' + localStorage.lut).then((res) => {
          if (res.data.Code == 500) {
            //验证失败 清除localStorage
            localStorage.removeItem('lut');
            this.axios.get(this.url + '/api/Product/HotProducts').then((res) => {
              if (res.data.Code == 200) {
                this.recommend = res.data.Data;
              }
            })
          }
          else {
            this.axios({
              url: this.url + '/api/Product/GetUserViewProduct',
              method: 'get',
              headers: { 'Authorization': 'BasicAuth ' + localStorage.lut }
            }).then((res) => {
              if (!!res) {
                if (res.data.Code == 200) {
                  this.recommend = res.data.Data;
                }
              }
            })
          }
        })
      } else {
        this.axios.get(this.url + '/api/Product/HotProducts').then((res) => {
          if (res.data.Code == 200) {
            this.recommend = res.data.Data;
          }
        })
      }
    }

  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.scroll);
      this.tabs = document.getElementById('tabs').offsetTop + 80;
      this.getRecommendProduct();
    })
  },
  created() {
    this.getTagInfo();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.scroll);
  }
}
</script>

<style scoped>
.container {
  background-color: #ffffff;
}

.cont {
  padding: 0 0.4rem 0.4rem;
}

.banner {
  background-color: #ffffff;
}

.fixed {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
}

.banner .tabs {
  width: 100%;
  height: 1.8rem;
  margin-bottom: 0.5rem;
  line-height: 1.6rem;
  background-color: #fff;
  border-bottom: 1px solid #eeeeee;
  white-space: nowrap;
  overflow-x: scroll;
  float: left;
  overflow-y: hidden;
}

.banner .tabs .tab {
  text-align: center;
  display: inline-block;
  width: 25%;
  height: 100%;
  border-bottom: 3px solid #fff;
}

.banner .tabs .active {
  color: #B4282D;
  border-bottom: 3px solid #B4282D;
}

.box {
  margin-top: 1rem;
  margin-bottom: 0.4rem;
  font-size: 0.7rem;
  background-color: #fff;
}

.box .title {
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.5rem 0 0.7rem;
  justify-content: center;
}

.box .title>span {
  margin-left: 0.4rem;
  width: 0.9rem;
  height: 0.9rem;
  background-size: 100% 100%;
  background-image: url("../../assets/images/home/987tea_01_03.png");
}

.clear {
  clear: both;
  height: 0;
  line-height: 0;
  font-size: 0
}
</style>
