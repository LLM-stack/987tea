<template>
    <div>
      <Mheader>
        <div slot="title">地址管理</div>
      </Mheader>

      <div class="address">
        <div>
          <div class="name">法是否按方法</div>
          <div class="mr">默认</div>
        </div>
        <div>
          <div class="tel">1715646541</div>
          <div class="add">福建省福州市仓山区浦上大道万达C4 1422</div>
        </div>
        <div>
          <img src="../../assets/images/myInfo/edit.png" />
        </div>
      </div>
      <div class="address">
        <div>
          <div class="name">法是否按方法</div>
          <div class="mr">默认</div>
        </div>
        <div>
          <div class="tel">1715646541</div>
          <div class="add">福建省福州市仓山区浦上大道万达C4 1422</div>
        </div>
        <div>
          <img src="../../assets/images/myInfo/edit.png" />
        </div>
      </div>
      <div class="address">
        <div>
          <div class="name">法是否按方法</div>
          <div class="mr">默认</div>
        </div>
        <div>
          <div class="tel">1715646541</div>
          <div class="add">福建省福州市仓山区浦上大道万达C4 1422</div>
        </div>
        <div>
          <img src="../../assets/images/myInfo/edit.png" />
        </div>
      </div>

      <router-link :to="{path:'/EditAddress'}">
        <div class="new-address">
          +新建地址
        </div>
      </router-link>


      <Mfooter :myCenterCurrent=true></Mfooter>
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
    methods: {
    }
  }
</script>

<style scoped>
  .address{
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    background-color: #ffffff;
  }
  .address+.address{
    border-top: 1px solid #eeeeee;
  }
  .address > div:first-child{
    padding-left: 0.5rem;
    border-left: 4px solid #B4282D;
    width: 4rem;
  }
  .address > div:first-child .name{
    font-size: 0.55rem;
  }
  .address > div:first-child .mr{
    margin-top: 0.3rem;
    width: 1.5rem;
    text-align: center;
    border-radius: 0.1rem;
    font-size: 0.5rem;
    color:  #B4282D;
    border:1px solid  #B4282D;
  }
  .address > div:nth-child(2){
    margin-left: 0.8rem;
    width: 9rem;
  }
  .address > div:nth-child(2) .add{
    margin-top: 0.2rem;
    font-size: 0.6rem;
    color: #999;
  }
  .address > div:last-child{
    width: 0.8rem;
    height: 0.8rem;
    margin-left: 0.7rem;
  }

  .new-address{
    margin: 1.2rem auto;
    width: 90%;
    padding: 0.4rem 0;
    text-align: center;
    border-radius: 0.2rem;
    border: 2px solid #B4282D;
    color: #B4282D;
    background-color: #ffffff;
  }
</style>
