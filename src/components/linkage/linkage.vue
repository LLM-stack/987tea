<template>
  <div class="linkage-wrap">
    <div class="address-wrap">
      <input class="input" :value="address" disabled type="text" placeholder="请选择所在地区">
      <span class="btn" @click="address_flag = true">点击选择</span>
    </div>
    <div class="pick-mark" v-show="address_flag" @click="address_flag = false">
      <div class="btn-wrap">
        <a class="btn-cancel" @click="address_flag = false">取消</a>
        <a class="btn-sure" @click="fillAddress">确定</a>
      </div>
      <mt-picker class="select" :slots="slots" value-key="aname" @change="onValuesChange"></mt-picker>
    </div>
  </div>
</template>

<script>
  import {address, slots} from './address';

  export default {
    data() {
      return {
        address_flag: false,
        slots: slots,
        temp_addr: '',
        address: ''
      };
    },
    methods: {
      fillAddress() {
        // 填入省市区
        this.address = this.temp_addr;
        this.address_flag = false;
        this.$emit('getAddress',this.address);
      },
      initAddress() {
        this.slots[0].values = address.filter((item, index) => {
          if (item.apid === 0) {
            return item;
          }
        });
      },
      onValuesChange(picker, values) {
        // 防止没有省份时报错
        if (values[0]) {
          this.slots[1].values = address.filter((item, index) => {
            if (item.apid === values[0].aid) {
              return item;
            }
          });
        }
        // 防止没有市时报错
        if (values[1]) {
          this.slots[2].values = address.filter((item, index) => {
            if (item.apid === values[1].aid) {
              return item;
            }
          });
        }
        // 防止没有区时报错
        if (values[2]) {
          // 这里可以指定地址符，此处以空格进行连接
          this.temp_addr = values[0].aname + ' ' + values[1].aname + ' ' + values[2].aname;
        }
      }
    },
    mounted() {
      this.initAddress();
    }
  };
</script>

<style lang="scss">

  .linkage-wrap {
    position: relative;
    .address-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 30px;
      padding: 10px;
      font-size: 14px;
      color: #333;
      .input {
        display: flex;
        align-items: center;
        flex: 1;
        height: 100%;
        padding: 0;
        box-sizing: border-box;
      }
      .btn {
        flex: 0 0 80px;
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ccc;
        border-left: 0 none;
        box-sizing: border-box;
      }
    }
    .pick-mark {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 999;

      .btn-wrap {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 180px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 40px;
        padding: 0 20px;
        font-size: 14px;
        background: #fff;
        .btn-cancel {
          color: #999;
        }
        .btn-sure {
          color: #B4282D;
        }
      }
      .select {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 9.2rem;
      }
      .picker-items {
        background: #eee;
        .picker-slot {
          font-size: 14px;
        }
        .picker-item {
          &.picker-selected {
            color: #535353;
          }
        }
        .picker-center-highlight {
          &:after, &:before {
            background: #fff;
          }
        }
      }
    }
  }
</style>
