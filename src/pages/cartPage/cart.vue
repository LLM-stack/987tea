<template>
  <div class="container">
    <Mheader :show=true>
      <div slot="title">购物车</div>
    </Mheader>

    <div class="cart-list">
      <div class="product" v-for="(item,index) in testlist">
        <div class="product-select" :class="{checked:item.ischecked}" @click="check(item)"></div>
        <div class="product-img">
          <img :src="item.HeadImg" alt="">
        </div>
        <div>
          <div>
            <div class="product-name">
              <router-link :to="{path:'/ProductDetails/'+item.ProductId}">
              {{ item.ShortName }}
              </router-link>
            </div>
            <div class="product-delete" @click="del()"></div>
          </div>
          <div class="product-price">
            <div>{{ item.SalePrice | formatMoney(item.Count) }}</div>
            <div class="product-num">
              <span @click="changeNum(item,-1)">-</span>
              <input type="text" v-model="item.Count">
              <span @click="changeNum(item,1)">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="settlement">
      <div>
        <div class="product-select" :class="{checked:allCheck}" @click="checkAll(!allCheck)"></div>
        <div>
          <div>共选择 <span class="lm-text-red">{{ totalNum }}</span> 件商品</div>
          <div>共计 <span class="lm-text-red">{{ totalMoney | formatMoney }}</span></div>
        </div>
      </div>
      <router-link :to="{path:'/Payment'}">
        <div class="tobuy">立即购买</div>
      </router-link>
    </div>


  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mheader
    },
    data() {
      return {
        totalMoney: 0,
        totalNum: 0,
        allCheck:false,
        testlist: []
      }
    },
    filters: {
      formatMoney: function (value, quentity) {
        if (!quentity) quentity = 1;
        return "￥ " + (value * quentity).toFixed(2) + " 元";
      }
    },
    methods: {
      check(product){
        if (typeof product.ischecked == "undefined") {
          this.$set(product, "ischecked", true);
        } else {
          product.ischecked = !product.ischecked;
        }
        this.allCheck = false;
        this.calcTotalMoney();
      },
      changeNum(product, way) {
        if (way > 0) {
          product.Count++;
        } else {
          product.Count--;
          if (product.Count < 1) {
            product.Count = 1;
          }
        }
        this.calcTotalMoney();
      },
      calcTotalMoney() {
        let totalMoney = 0;
        let totalNum = 0;
        this.testlist.forEach(function (item) {
          if (item.ischecked) {
            totalMoney += item.SalePrice * item.Count;
            totalNum++
          }
        });
        this.totalMoney = totalMoney;
        this.totalNum = totalNum;
      },
      checkAll(isCheck) {
        this.allCheck = isCheck;
        this.testlist.forEach((item) =>{
          if (typeof item.checked == "undefined") {
            this.$set(item, "ischecked", isCheck);
          } else {
            item.ischecked = ischecked;
          }
        })
        this.calcTotalMoney();
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.axios.post(this.url + '/api/ShoppingCar/UserShoppingCar', {userId: '4105ef9aea6c4a88bfbf36d703af82db'}).then((res) => {
          if (res.data.Code == 200) {
            this.testlist = res.data.Data;
          } else {
            Toast(res.data.Data);
          }
        }).catch((err) => {
          Toast('网络请求超时');
        })
      })
    }
  }
</script>

<style scoped>
  .product {
    display: flex;
    align-items: center;
    padding: 0.4rem;
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;
  }

  .product .product-img {
    width: 3.5rem;
    height: 3.5rem;
    margin-right: 0.4rem;
  }

  .product > div:last-child {
    position: relative;
    width: 10rem;
    height: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
  }

  .product > div:last-child > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .product .product-name {
    font-size: 0.7rem;
    color: #000;
  }

  .product .product-delete {
    width: 0.8rem;
    height: 0.8rem;
    background-size: 100% 100%;
    background-image: url("../../assets/images/myInfo/delete.png");
  }

  .product .product-price .go-buy {
    border-radius: 0.2rem;
    padding: 0.2rem 0.8rem;
    color: #B4282D;
    border: 0.1rem solid #B4282D;
  }

  .product-select {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.4rem;
    background-image: url("../../assets/images/cart/unchecked.png");
    background-size: 100% 100%;
  }

  .checked {
    background-image: url("../../assets/images/cart/checked.png");
  }

  .product .product-num {
    display: flex;
    align-items: center;
    border-radius: 0.1rem;
    border: 1px solid #bbb;
  }

  .product .product-num > input {
    text-align: center;
    width: 1.8rem;
    height: 1.2rem;
    border-top: none;
    border-bottom: none;
    border-left: 1px solid #bbb;
    border-right: 1px solid #bbb;
  }

  .product .product-num > span {
    width: 1.4rem;
    text-align: center;
    height: 1.2rem;
    padding: 0 0.4rem;
    font-size: 0.85rem;
  }

  .settlement {
    width: 100%;
    bottom: 0;
    position: fixed;
    height: 2.4rem;
    padding-left: 0.4rem;
    border-top: 1px solid #eeeeee;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .settlement > div:first-child {
    display: flex;
    align-items: center;
  }

  .settlement .tobuy {
    text-align: center;
    line-height: 2.4rem;
    color: #ffffff;
    width: 4.5rem;
    height: 100%;
    background-color: #B4282D;
  }
</style>
