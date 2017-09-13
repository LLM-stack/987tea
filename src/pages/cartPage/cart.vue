<template>
  <div class="containerbig">
    <Mheader :show=true>
      <div slot="title">购物车</div>
    </Mheader>

    <div class="cart-list">
      <div class="product" v-for="(item,index) in productlist" :key='index'>
        <div class="product-select" :class="{checked:item.ischecked}" @click="check(item)"></div>
        <div class="product-img">
          <img :src="item.HeadImg" alt="">
        </div>
        <div class="product-dts">
          <div>
            <div class="product-name">
              <router-link :to="{path:'/ProductDetails/'+item.ProductId}">
                <p>{{ item.Name }}</p>
              <p class="lm-text-grey lm-font-xs">{{ item.ShortName }}</p>
              </router-link>
            </div>
            <div class="product-delete" @click="deleteProduct(item.ShoppingCarId,item.ProductSpecId)"></div>
          </div>
          <div class="product-price">
            <div>￥ <span class="lm-text-red">{{ item.SalePrice }}</span> 元</div>
            <div class="product-num">
              <span @click="changeNum(item,-1)">-</span>
              <input type="number" v-model="item.Count" @blur="countChange(index)">
              <span @click="changeNum(item,1)">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="cartno" v-if="productlist.length == 0">
      <router-link :to="{path:'/'}">
        购物车空空如也，去逛逛吧！>>
      </router-link>
    </div>

    <div class="settlement">
      <div>
        <div class="product-select" :class="{checked:allCheck}" @click="checkAll(!allCheck)"></div>
        <div>
          <div>共选择 <span class="lm-text-red">{{ totalNum }}</span> 件商品</div>
          <div>共计 <span class="lm-text-red">{{ total }}</span></div>
        </div>
      </div>

      <div class="tobuy" @click="addOrder">立即购买</div>
    </div>


  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import {Toast} from 'mint-ui'
  import { MessageBox } from 'mint-ui'

  export default {
    components: {
      Mheader
    },
    data() {
      return {
        totalMoney: 0,
        totalNum: 0,
        allCheck: false,
        productlist: []
      }
    },
    filters: {
      formatMoney: function (value, quentity) {
        if (!quentity) quentity = 1;
        return "￥ " + (value * quentity).toFixed(2) + " 元";
      }
    },
    computed: {
      total() {
        let t = 0;
        this.productlist.forEach(function (item) {
          if (item.ischecked) {
            t += parseInt(item.Count) * parseFloat(item.SalePrice);
          }
        });
        return "￥ " + t.toFixed(2) + " 元";
      }
    },
    methods: {
      //单个选中事件
      check(product) {
        if (typeof product.ischecked == "undefined") {
          this.$set(product, "ischecked", true);
        } else {
          product.ischecked = !product.ischecked;
        }

        let chkCount = 0;
        this.calcTotalMoney();
        this.productlist.forEach(function (item) {
          if (item.ischecked) {
            chkCount++;
          }
        });
        if (chkCount == this.productlist.length) {
          this.allCheck = true;
        } else {
          this.allCheck = false;
        }
      },
       //商品数量输入失去焦点判断
      countChange(index) {
          var self = this;
          if (!!!self.productlist[index].Count) {
              Toast("商品的数量不能为空");
              self.productlist[index].Count = 1;
          }
          if (self.productlist[index].Count <= 0) {
              Toast("商品的数量不能为0");
              self.productlist[index].Count = 1;
          }
          if (self.productlist[index].Count > 99) {
              Toast("最多只可以购买99件该商品");
              self.productlist[index].Count = 99;
          }
          
      },
      //商品数量变化
      changeNum(product, way) {
        if (way > 0) {
          product.Count++;
        } else {
          product.Count--;
          if (product.Count < 1) {
            product.Count = 1;
          }
        } 
        
        if(product.ShoppingCarId!=0){
            //用户登录后数量变动保存到数据库
            this.axios({
              url: this.url + '/api/ShoppingCar/UpdateCount',
              method: 'post',
              data: {shoppingCarId: product.ShoppingCarId, type: way},
              headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

            }).then((res) => {
            if(!!res){
                if (res.data.Code == 200) {

                } else {
                  Toast(res.data.Data);
                }
            }
          })
        }else{
          if(product.Count>=product.AllStock){
            product.Count=product.AllStock
            Toast("达到库存上限了");
          }
          if(product.Count<=1){
            product.Count=1
            Toast("已经减到底了");
          }
        }       
      
        
      },
      //总金额计算
      calcTotalMoney() {
        let totalMoney = 0;
        let totalNum = 0;
        this.productlist.forEach(function (item) {
          if (item.ischecked) {
            totalMoney += parseFloat(item.SalePrice) * parseInt(item.Count);
            totalNum++
          }
        });
        this.totalMoney = totalMoney;
        this.totalNum = totalNum;
      },
      //选中所有
      checkAll(isCheck) {
        this.allCheck = isCheck;
        this.productlist.forEach((item) => {
          if (typeof item.checked == "undefined") {
            this.$set(item, "ischecked", isCheck);
          } else {
            item.ischecked = ischecked;
          }
        })
        this.calcTotalMoney();
      },
      //获取购车商品列表
      getCarInfo() {
        this.axios({
          url: this.url + '/api/ShoppingCar/UserShoppingCar',
          method: 'get',
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

        }).then((res) => {
          if(!!res){
            if (res.data.Code == 200) {
              this.productlist = res.data.Data;
            } else {
              Toast(res.data.Data);
            }
          }

        })
      },
      //删除购物车中的商品
      deleteProduct(carId,skuId) {
        MessageBox.confirm('确认删除么?').then(action => {
           if(!!localStorage.lut){
              this.axios({
              url: this.url + '/api/ShoppingCar/RemoveProduct',
              method: 'post',
              data: {shoppingCarId: carId},
              headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

            }).then((res) => {
              if(!!res){
                if (res.data.Code == 200) {
                  //登录用户移除删除的商品
                  this.productlist = this.productlist.filter(p => p.ShoppingCarId != carId);
                  Toast(res.data.Data);
                } else {
                  Toast(res.data.Data);
                }
              }
            })
          }else{
            //游客删除的商品
            this.productlist = this.productlist.filter(p => p.ProductSpecId != skuId);
            let sc = {
              productOrderId: "0",
              skus: this.productlist
            }
            localStorage.tourist=JSON.stringify(sc);
          }
        })
      },
      //提交订单
      addOrder() {
        let skus = [];
        this.productlist.forEach(function (item) {
          if (item.ischecked) {
            let sku = {
              ShoppingCarId: item.ShoppingCarId,
              ProductSpecId: item.ProductSpecId,
              ProductId:item.ProductId,
              ShortName:item.ShortName,
              ProductName: item.Name,
              ProductCount: item.Count,
              ProductImg: item.HeadImg,
              ProductSpecPrice: item.SalePrice
            }
            skus.push(sku);
          }
        });
        if (skus.length == 0 && this.productlist.length == 0) {
          Toast('请选择商品后再进行购买！');
          return;
        } else if(!this.totalNum){
          Toast('还未选择商品');
           return;
        } else {
          let sc={
            productOrderId:"0",
            skus:skus
          }
          if(!!!localStorage.lut){
            //游客购买
              sessionStorage.setItem("unPay", JSON.stringify(sc));              
              this.$router.push({path: '/noIdPayment'})
          }else{
            //已经登录的用户购买
              sessionStorage.setItem("pay", JSON.stringify(sc));
              this.$router.push({path: '/Payment'})
          }
          
        }
      }
    },
    mounted () {
      this.$nextTick(function () {
        if(!!localStorage.lut){
          //登录状态加载数据库的购物车
          this.getCarInfo();
        }else{
          if(!!localStorage.tourist){
            let sc=JSON.parse(localStorage.tourist)
            this.productlist=sc.skus;
          }
        }
        
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

  .product .product-dts {
    position: relative;
    width: 10rem;
    height: 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: space-between;
  }

  .product .product-dts > div {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .product .product-name {
    max-width: 8.6rem;
    font-size: 0.65rem;
    color: #000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .product .product-name p{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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

  .cartno {
    /*border-radius: 0.2rem;*/
    /*background-color: #B4282D;*/
    width: 100%;
    text-align: center;
    color: #B4282D;
    padding: 0.2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
