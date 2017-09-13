<template>
  <div class="container">
    <Mheader>
      <div slot="title">个人信息</div>
      <div slot="info" @click='saveUserInfo'>保存</div>
    </Mheader>
    <form>
    <div class="avatar">
      <img :src="!!!user.HeadImg?userHeadImg:user.HeadImg"/>
      <span class="lm-margin-t-xs">点击修改头像</span>
      <input class="upImg" name="file" accept="image/png,image/gif,image/jpeg" type="file" @change="updateHeadImg"/>
    </div>
    </form>
    <div class="info">
      <div class="info-list name">
        昵称 <input class="lm-margin-l-xxl" type="text" v-model="user.UserName">
      </div>
      <div class="info-list">
        性别
        <div class="sex lm-margin-l-xxl">
          <div class="lm-margin-r-lg">
            <input type="radio" v-model="user.Sex" value="0">
            <div class="sex-select" :class="{sexSelected: user.Sex == 0}"></div>男
          </div>
          <div class="lm-margin-l-lg">
            <input type="radio" v-model="user.Sex" value="1">
            <div class="sex-select" :class="{sexSelected: user.Sex == 1}"></div>女
          </div>
        </div>
      </div>

      <div class="info-list" @click="openPicker">
        生日  <div class="lm-margin-l-xxl">{{ user.Birthday | intercept }}</div>
      </div>
    </div>
    <div class="info">
      <router-link to="/MyAddress">
      <div class="info-list arrow">
        收货地址 <img src="../../assets/images/arrow.png" />
      </div>
      </router-link>
      <router-link to="/ResetPassword">
      <div class="info-list arrow">
        改密码 <img src="../../assets/images/arrow.png" />
      </div>
      </router-link>
    </div>
    <div class="info">
      <router-link to="/preferences/选择你喜欢的茶/1">
      <div class="info-list arrow">
        喜欢的茶 <img src="../../assets/images/arrow.png" />
      </div>
      </router-link>
      <router-link to="/preferences/选择你常用的泡茶器具/2">
      <div class="info-list arrow">
       泡茶茶具 <img src="../../assets/images/arrow.png" />
      </div>
      </router-link>
      <router-link to="/preferences/请选择每月喝茶量/3">
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
      v-model="user.Birthday"
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
  import {Toast} from 'mint-ui'

  export default {
    components: {
      Mheader
    },
    data() {
    	return {
    		value: '',
        startYear: new Date(new Date().getFullYear() - 70, 0, 1),
        endYear: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDay()),
        user:'',
        userHeadImg:require("../../assets/images/home_03.png")//默认头像
      }
    },
    filters:{
      intercept(value){
          let birthday = new Date(value);
          birthday = birthday.getFullYear() +'年'+ (birthday.getMonth()+ 1)  +'月'+ birthday.getDate()+'日'
            return birthday
      }
    },
    methods: {
      openPicker() {
        this.$refs.picker.open();
      },
      signOut() {
        localStorage.clear();//清楚全部的localStorage
        this.$router.push({path: '/Login'});
      },
      //获取用户信息
      getUserInfo(){
          this.axios({
          url: this.url + '/api/User/GetUserInfoByUserId',
          method: 'get',
          headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }

          }).then((res)=>{
            if(!!res){
              if (res.data.Code == 200) {
              this.user=res.data.ExData;
              } else {
                Toast(res.data.Data);
              }
            }
          })
      },
      //更新头像
      updateHeadImg(e){
         let file = e.target.files[0];
          let param = new FormData(); //创建form对象
          param.append('file',file,file.name);//通过append向form对象添加数据
          param.append('chunk','0');//添加form表单中其他数据

          let config = {
            headers:{'Content-Type':'multipart/form-data','Authorization': 'BasicAuth ' + localStorage.lut}
          };  //添加请求头
          this.axios.post(this.url + '/api/User/SaveHeadImg',param,config)
          .then(res=>{
            if(res.data.Code=200){
              this.user.HeadImg=res.data.ExData;
              Toast(res.data.Data);
            }else{
              Toast(res.data.Data);
            }
          })
      },
      //保存用户信息
      saveUserInfo(){
        if(!!!this.user.UserName){
          Toast('请填写昵称！');
          return false;
        }
        if(this.user.UserName.length>8){
          Toast('昵称过长，请控制在8个字以内！');
          return false;
        }
        if(!!!this.user.Sex){
          Toast('请选择性别！');
          return false;
        }
        if(!!!this.user.Birthday){
          Toast('请填写生日！');
          return false;
        }
          this.axios({
          url: this.url + '/api/User/SaveUserInfo',
          method: 'post',
          data:{UserName:this.user.UserName,Sex:this.user.Sex,Birthday:this.user.Birthday},
          headers:{ 'Authorization': 'BasicAuth '+ localStorage.lut }

          }).then((res)=>{
            if(!!res){
              if (res.data.Code == 200) {
                Toast(res.data.Data);
              } else {
                Toast(res.data.Data);
              }
            }
          })
      }

    },
     mounted:function(){
       this.$nextTick(()=>{
         this.getUserInfo();
       })
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
