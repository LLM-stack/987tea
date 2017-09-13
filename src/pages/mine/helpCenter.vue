<template>
  <div class="container">
    <Mheader :show='true'>
      <div slot="title">帮助中心</div>
      <div class="msg" slot="info">
      </div>
    </Mheader>

    <div class="help-box">
      <div class="help-block">
        <div class="flex-between title" @click="toggleLook(0)">
          <span>1.关于我们</span>
          <img class="arrow" :class="{rotate:cont0}" src="../../assets/images/arrow1.png" />
        </div>
        <transition name="slide-fade">
          <div v-show="cont0" class="cont">
            <div class="font600">中榕987茶网简介</div>
            <div class="lm-font-sm lm-margin-t-xs">中榕987茶网以“忠于茶”为核心，围绕茶行业的产业链，打造以消费者为核心，品牌商、渠道商、原料产地、茶行业从业者为骨架的体系平台，提供符合行业、符合消费的全面客观的资讯体系、产品流通体系，搭建消费者、茶企、茶人和产地无缝连接的信息分解平台。</div>
          </div>
        </transition>
      </div>
      <div class="help-block">
        <div class="flex-between title" @click="toggleLook(1)">
          <span>2.支付方式</span>
          <img class="arrow" :class="{rotate:cont1}" src="../../assets/images/arrow1.png" />
        </div>
        <transition name="slide-fade">
          <div v-show="cont1" class="cont">
            <div class="font600">2.1支付宝</div>
            <div class="lm-font-sm lm-margin-t-xs">
              用户在对商品进行购买时，提交订单时，在支付方式选择支付宝付款即可，百分百零风险购物，方便省心。
            </div>
            <div class="font600 lm-margin-t-xs">2.2支付宝付款 申明事项</div>
            <div class="lm-font-sm lm-margin-t-xs">
              1、987茶网支付宝付款支持所有的快递。
              2、支付宝付款的客户，收货后对产品不满意，承诺七天无理由退换。
              3、由于快运航空管制，请勿购买金属的茶刀和茶针。
              4、支持7天无理由退换。
              987茶网采取先验货，满意后在签收付款，不满意直接拒签，不用花1分钱，运费我们全出，全心全意为客户服务。
            </div>
            <div class="font600 lm-margin-t-xs">2.3货到付款</div>
            <div class="lm-font-sm lm-margin-t-xs">
              为方便您的实际需求，987茶网提供货到付款服务，我们会根据您提交订单的内容，在承诺配送时间内，将商品送达您订单指定交货地址（货到付款范围，详情请咨询987茶网客服），当场验收商品，当场交纳货款，百分百零风险购物，方便省心。
            </div>
            <div class="font600 lm-margin-t-xs">2.4货到付款 申明事项</div>
            <div class="lm-font-sm lm-margin-t-xs">
              1、987茶网货到付款支持顺丰、百世汇通。
              2、货到付款的客户需承担支付第三方物流额外手续费。
              3、由于快运航空管制，货到付款请勿购买金属的茶刀和茶针。
             </div>
            <div class="font600 lm-margin-t-xs"> 2.5温馨提示</div>
            <div class="lm-font-sm lm-margin-t-xs">
              商品发货后由快递公司统一配送，如在正常配送时间范围内还没收到商品，可能是以下几种原因：
              1、您的送货地址或邮编填写错误；
              2、快递送货时无法联系上收货人；
              3、可能在运输过程中，由于雨雪、自然灾害等不可抗力因素造成延迟。
              使用支付宝付款如遇有任何问题，请第一时间联系987茶网客服。
            </div>
          </div>
        </transition>
      </div>
      <div class="help-block">
        <div class="flex-between title" @click="toggleLook(2)">
          <span>3.配送政策</span>
          <img class="arrow" :class="{rotate:cont2}" src="../../assets/images/arrow1.png" />
        </div>
        <transition name="slide-fade">
          <div v-show="cont2" class="cont">
            <div class="font600">3.1快递方式</div>
            <div class="lm-font-sm lm-margin-t-xs">
              目前987茶网的快递方式有：，顺丰，百世汇通、申通、中通、韵达、天天快递等，覆盖全国大部分地区。一般1-3天可送货上门，运输安全性高，运费较其他快递高，百世汇通相对较为实惠，用户可以根据实际情况选择。
            </div>

            <div class="font600 lm-margin-t-xs">3.2验货查收</div>
            <div class="lm-font-sm lm-margin-t-xs">
              1、当您收到货物后，请您检查包装箱封茶是否完整，快递面单是否为正规打印面单。
              2、开箱后请仔细核对您所订购的商品种类、数量、规格以及相应的赠品，合格后，请在送货单上签字。
              3、对于货到付款的订单，如果您对某件或某几件商品不满意，可以当面拒收该商品，只须支付实收商品的货款。
              4、请详细查看产品包装以及现场拆包验货，货品有问题请当场提出拒收，请勿损坏商品及外包装。
            </div>

            <div class="font600 lm-margin-t-xs">3.3快递资费及送达时间</div>
            <div class="lm-font-sm lm-margin-t-xs">
              快递资费由系统根据您选择的快递自动计算资费。
              一般来说您下单之后24小时之内即可发货，根据您的所在地不同略有区别，3－5天后可以送达到您的手中(重大节假日除外)。
              您的订单如果是在当天16点之前生成并支付成功，则您的订单会在当天发货，否则次日发货。
            </div>

            <div class="font600 lm-margin-t-xs">3.4注意事项：</div>
            <div class="lm-font-sm lm-margin-t-xs">
              1、港澳台及海外地区物流资费以系统计算为准；
              2、特殊说明的商品的订单物流资费以系统计算为准；
              注：如遇促销活动，运费以活动说明为准。
            </div>

            <div class="font600 lm-margin-t-xs">3.5超出配送时间未收到商品的可能情况</div>
            <div class="lm-font-sm lm-margin-t-xs">
              商品发货后由快递公司统一配送，如在正常配送时间范围内还没收到商品，可能是以下几种原因：
              1、您的送货地址或邮编填写错误；
              2、快递送货时没有联系上收货人；
              3、可能在运输过程中，由于雨雪、自然灾害等不可抗力因素造成延迟。
              发生这种情况，您可以通过我们的售后服务热线：18558612256或者登陆相关快递配送公司网站查询快递状态。
            </div>
          </div>
        </transition>
      </div>
      <div class="help-block">
        <div class="flex-between title" @click="toggleLook(3)">
          <span>4.招商加盟</span>
          <img class="arrow" :class="{rotate:cont3}" src="../../assets/images/arrow1.png" />
        </div>
        <transition name="slide-fade">
          <div v-show="cont3" class="cont">
            <div>商家入驻咨询</div>
            <div>服务时间：9:00-18:00</div>
            <div>987茶网市场部：商务合作、联合运营、推广渠道等</div>
            <div class="font600">987茶网市场经理</div>
            <div class="font600">电话：18695799978  叶先生</div>
            <div class="font600">微信号：yw19861016</div>
          </div>
        </transition>
      </div>
      <div class="help-block">
        <div class="flex-between title" @click="toggleLook(4)">
          <span>5.茶币用途</span>
          <img class="arrow" :class="{rotate:cont4}" src="../../assets/images/arrow1.png" />
        </div>
        <transition name="slide-fade">
          <div v-show="cont4" class="cont">
            <div class="lm-font-sm">茶币是987茶网为茶友提供的虚拟货币。茶币可兑换赠品、茶样和商城各种礼品。茶币为非真实货币，不可提现。</div>
            <div class="lm-font-sm lm-margin-t-xs">如何获取茶币：
              <router-link :to="{path:'/CBimg'}">
              <a href="">跳转如何获取茶币页面</a>
              </router-link>
              </div>
          </div>
        </transition>
      </div>
      <div class="service lm-margin-t-sm flex-between">
        <div class="flex-alig-center">
          <div class="tel-img">
          </div>
          <div>
            <div>电话客服：4008788351</div>
            <div class="lm-font-sm lm-text-grey lm-margin-t-xs">上班时间：9:00-22:00</div>
          </div>
        </div>
        <div class="contact">
          <a href="tel:4008788351">联系客服</a>
        </div>
      </div>
    </div>

    <Mfooter :myCenterCurrent='true'></Mfooter>
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
        cont0:false,
        cont1:false,
        cont2:false,
        cont3:false,
        cont4:false
      }
    },
    methods: {
    	toggleLook(e){
        switch(e)
        {
          case 0:
            this.cont0 = !this.cont0
            break;
          case 1:
            this.cont1 = !this.cont1
            break;
          case 2:
            this.cont2 = !this.cont2
            break;
          case 3:
            this.cont3 = !this.cont3
            break;
          default:
            this.cont4 = !this.cont4
        }
      }
    }
  }
</script>

<style scoped>
  .rotate{
    transform: rotate(0)!important;
  }
  .help-box{
    padding: 0.5rem 0;
  }
  .help-box .help-block+.help-block{
    border-top: 1px solid #eee;
  }
  .help-block .title,.service{
    background-color: #fff;
    padding: 0.5rem;
  }
  .help-block .title .arrow{
    width: 0.8rem;
    height: 0.8rem;
    transition: all .3s;
    transform: rotate(-90deg);
  }
  .help-block .cont{
    line-height: 1.1rem;
    padding: 0.4rem;
  }

  .service .tel-img{
    margin-right: 0.5rem;
    border-radius: 50%;
    width: 1.8rem;
    height: 1.8rem;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 1.4rem 1.4rem;
    background-color: #1DCB98;
    background-image: url("../../assets/images/tel.png");
  }

  .service .contact{
    padding: 0.1rem 0.2rem;
    border-radius: 3px;
    color: #b4282d;
    border: 1px solid #b4282d;
  }


  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
