<template>
  <div>
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
        昵称 <input type="text">
      </div>
      <div class="info-list">
        性别

        <div class="sex">
          <mt-radio
            v-model="value"
            :options="['男', '女']">
          </mt-radio>
        </div>

      </div>

      <div class="info-list" @click="openPicker">
        生日  <div>{{ pickerValue }}</div>
      </div>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="pickerValue"

    >
    </mt-datetime-picker>
  </div>

</template>

<script>
  import Mheader from '../../components/Mheader'
  import { DatetimePicker } from 'mint-ui';

  export default {
    components: {
      Mheader,
      DatetimePicker
    },
    data() {
    	return {
        pickerValue:'',
    		value: '',
        options: [
          {
            label: '男',
            value: '男'
          },
          {
            label: '女',
            value: '女'
          }
        ]
      }
    },
    methods: {
      openPicker() {
        this.$refs.picker.open();
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
    opacity: 0;
  }
  .info {
    margin-top: 0.5rem;
    padding:0 1rem ;
    background-color: #ffffff;
  }
  .info .info-list{
    padding: 0.8rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .info .info-list+.info-list{
    border-top: 1px solid #ddd;
  }
  .info .name > input{
    border: none;
    padding: 0.1rem;
    width: 10.5rem;
  }
</style>
