<template>
  <div class="container">
    <Mheader :show=true>
      <div slot="title">购物车</div>
    </Mheader>

    <div class="cart-list">
      <div class="product" v-for="(item,index) in testlist">
        <div class="product-select" :class="{checked:item.ischecked}" @click="check(item)"></div>
        <div class="product-img">
          <img src="../../assets/images/goods/987tea_16.png" alt="">
        </div>
        <div>
          <div>
            <div class="product-name">正宗铁观音</div>
            <div class="product-delete" @click="del()"></div>
          </div>
          <div class="product-price">
            <div>￥{{ item.price | formatMoney(item.num) }}</div>
            <div class="product-num">
              <span @click="changeNum(item,-1)">-</span>
              <input type="text" v-model="item.num">
              <span @click="changeNum(item,1)">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="settlement">
      <div>
        <div class="product-select"  @click="check(item)"></div>
        <div>
          <div>共选择 <span class="lm-text-red">{{ totalMoney  }}</span> 件商品</div>
          <div>共计￥ <span class="lm-text-red">{{ totalMoney | formatMoney }}</span> 元</div>

          </div>
      </div>

      <div class="tobuy">立即购买</div>
    </div>


  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'

  export default {
    components: {
      Mheader
    },
    data() {
      return {
          totalMoney:0,
        price: 22,
        num: 1,
        testlist: [{
          price: 10,
          num:1
        }, {
          price: 22,
          num:1
        }, {
          price: 8,
          num:1
        }
        ]
      }
    },
    filters: {
      formatMoney: function (value, quentity) {
        if(!quentity)quentity=1;
        return (value*quentity).toFixed(2) +" 元";
      }
    },
    methods: {
      check(product){
        if(typeof product.ischecked == "undefined"){
          this.$set(product,"ischecked",true);
        }else{
          product.ischecked = !product.ischecked;
        }
        this.calcTotalMoney();
      },
      changeNum(product,way) {
        if(way>0){
          product.num++;
        }else{
          product.num--;
          if(product.num<1){
            product.num=1;
          }
        }
        this.calcTotalMoney();
      },
      calcTotalMoney() {
        let totalMoney = 0;
        this.testlist.forEach(function (item) {
          if(item.ischecked){
            totalMoney+=item.price*item.num;
          }
        });
        this.totalMoney = totalMoney;
      },
      del(){

      },
      delProduct(){

      }
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

  .product .checked {
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
    height: 1.2rem;
    padding: 0 0.4rem;
    font-size: 0.9rem;
  }

  .settlement{
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
  .settlement > div:first-child{
    display: flex;
    align-items: center;
  }
  .settlement .tobuy{
    text-align: center;
    line-height: 2.4rem;
    color: #ffffff;
    width: 4.5rem;
    height: 100%;
    background-color: #B4282D;
  }
</style>
