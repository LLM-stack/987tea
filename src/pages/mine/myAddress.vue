<template>
  <div class="container">
    <Mheader>
      <div slot="title">地址管理</div>
    </Mheader>

    <div class="address" :class="{checked:item.IsDefault==0}" v-for="(item,index) in userAllAddress" :key='index'>
      <div>
        <div class="name">{{item.ConsigneeName}}</div>
        <div class="mr" v-if="item.IsDefault==0">默认</div>
      </div>
      <div @click="checkAddress(index)">
        <div class="tel">{{item.Mobile}}</div>
        <div class="add">{{item.Province + item.City + item.Area + item.Detail}}</div>
      </div>
      <div>
        <router-link :to="{path:'/EditAddress/'+item.AdressId}" replace>
          <img src="../../assets/images/myInfo/edit.png"/>
        </router-link>
      </div>
    </div>

    <router-link :to="{path:'/EditAddress/0'}" replace>
      <div class="new-address">
        +新建地址
      </div>
    </router-link>


    <Mfooter :myCenterCurrent='true'></Mfooter>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mheader,
      Mfooter
    },
    data() {
      return {
        userAllAddress: []
      }
    },
    methods: {
      //获取用户地址列表
      getUserAddress() {
        this.axios({
          url: this.url + '/api/ReceiveAddress/GetAddressByUserId',
          method: 'get',
          headers: {'Authorization': 'BasicAuth ' + localStorage.lut}

        }).then((res) => {
          if (res.data.Code == 200) {
            this.userAllAddress = res.data.ExData;
          } else {
            Toast(res.data.Data);
          }
        })
      },
      //选中收货地址
      checkAddress(index) {
        if(!!this.$route.query.isban){
          return false;
        }else{
          this.$store.state.receiveAddress = this.userAllAddress[index];  
          this.$router.go(-1);
        }        
      }
    },
    mounted: function () {
      this.getUserAddress();
    }

  }
</script>

<style scoped>
  .address {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
    border-left: 4px solid #fff;
    background-color: #ffffff;
  }

  .address.checked {
    border-left: 4px solid #B4282D;
  }

  .address + .address {
    border-top: 1px solid #eeeeee;
  }

  .address > div:first-child {
    padding-left: 0.5rem;
    width: 4rem;
  }

  .address > div:first-child .name {
    font-size: 0.55rem;
  }

  .address > div:first-child .mr {
    margin-top: 0.3rem;
    width: 1.5rem;
    text-align: center;
    border-radius: 0.1rem;
    font-size: 0.5rem;
    color: #B4282D;
    border: 1px solid #B4282D;
  }

  .address > div:nth-child(2) {
    margin-left: 0.8rem;
    width: 9rem;
  }

  .address > div:nth-child(2) .add {
    margin-top: 0.2rem;
    font-size: 0.6rem;
    color: #999;
  }

  .address > div:last-child {
    width: 0.8rem;
    height: 0.8rem;
    margin-left: 0.7rem;
  }

  .new-address {
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
