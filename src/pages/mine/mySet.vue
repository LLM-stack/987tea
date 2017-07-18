<template>
  <div class="container">
    <Mheader>
      <div slot="title">个人信息</div>
      <div slot="info">保存</div>
    </Mheader>
    <div class="avatar">
      <img src="../../assets/images/myInfo/toux.jpg"/>
      <span class="lm-margin-t-xs">点击修改头像</span>
      <input class="upImg" type="file"/>
    </div>
    <div class="info">
      <div class="info-list name">
        昵称 <input class="lm-margin-l-xxl" type="text">
      </div>
      <div class="info-list">
        性别
        <div class="sex lm-margin-l-xxl">
          <div class="lm-margin-r-lg">
            <input type="radio" v-model="sex" value="男">
            <div class="sex-select" :class="{sexSelected: sex == '男'}"></div>男
          </div>
          <div class="lm-margin-l-lg">
            <input type="radio" v-model="sex" value="女">
            <div class="sex-select" :class="{sexSelected: sex == '女'}"></div>女
          </div>
        </div>
      </div>

      <div class="info-list" @click="openPicker">
        生日  <div class="lm-margin-l-xxl">{{ pickerValue | intercept }}</div>
      </div>
    </div>
    <div class="info">
      <router-link :to="{path:'/MyAddress'}">
      <div class="info-list arrow">
        收货地址 <img src="../../assets/images/arrow.png" />
      </div>
      </router-link>
      <router-link :to="{path:'/ResetPassword'}">
      <div class="info-list arrow">
        改密码 <img src="../../assets/images/arrow.png" />
      </div>
      </router-link>
    </div>
    <div class="info">
      <router-link :to="{path:'/preferences/选择你喜欢的茶/1'}">
      <div class="info-list arrow">
        喜欢的茶 <img src="../../assets/images/arrow.png" />
      </div>
      </router-link>
      <router-link :to="{path:'/preferences/选择你常用的泡茶器具/2'}">
      <div class="info-list arrow">
       泡茶茶具 <img src="../../assets/images/arrow.png" />
      </div>
      </router-link>
      <router-link :to="{path:'/preferences/请选择每月喝茶量/3'}">
      <div class="info-list arrow">
        喝茶量 <img src="../../assets/images/arrow.png" />
      </div>
      </router-link>
    </div>
    <div class="info" @click="signOut">
      <div class="info-list lm-text-grey " style="justify-content: center">
        退出登录
      </div>
    </div>

    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="pickerValue"
      :startDate="startYear"
      :endDate="endYear"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
    >
    </mt-datetime-picker>
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
        pickerValue:'',
    		value: '',
        sex: null,
        startYear: new Date(new Date().getFullYear() - 70, 0, 1),
        endYear: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay())
      }
    },
    filters:{
      intercept(value){
        let birthday = new Date(value.toString().substring(0,33));
        birthday = birthday.getFullYear() +'年'+ (birthday.getMonth()+ 1)  +'月'+ birthday.getDate()+'日'
          return birthday
      }
    },
    methods: {
      openPicker() {
        this.$refs.picker.open();
      },
      signOut() {
        localStorage.clear();
        this.$router.push({path: '/Login'});
      }
    }
  }
</script>

<style scoped>
  .avatar {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #999;
    padding: 1.2rem 0;
    background-color: #ffffff;
  }

  .avatar > img {
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
  }
  .avatar .upImg {
    height: 4.5rem;
    width: 3.9rem;
    position: absolute;
    top: 1.2rem;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
  }
  .info {
    margin-top: 0.5rem;
    padding:0 0.8rem ;
    background-color: #ffffff;
  }
  .info .info-list{
    padding: 0.6rem 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .info .info-list+.info-list,.info a+a .info-list{
    border-top: 1px solid #ddd;
  }
  .info .info-list.arrow{
    justify-content: space-between;
  }
  .info .info-list.arrow img{
    width: 0.8rem;
    height: 0.8rem;
  }
  .info .name > input{
    border: none;
    padding: 0.1rem;
    width: 10.5rem;
  }
  .info .sex{
    width: 10.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .info .sex > div{
    position: relative;
    display: flex;
    align-items: center;
  }
  .info .sex input{
    position: absolute;
    width: 1.5rem;
    top: 0;
    opacity: 0;
    height: 0.7rem;
  }
  .info .sex .sex-select{
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.4rem;
    background-image: url('../../assets/images/myInfo/oo.png');
    background-size: 100% 100%;
  }
  .info .sex .sexSelected{
    background-image: url('../../assets/images/cart/checked.png');
  }
</style>
