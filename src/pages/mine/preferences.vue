<template>
  <div class="container">
    <Mheader>
      <div slot="title">{{ this.$route.params.title }}</div>
    </Mheader>
    <div v-if="this.$route.params.id == 1">
      <mt-checklist
        v-model="value1"
        :options="options1">
      </mt-checklist>
    </div>
    <div v-if="this.$route.params.id == 2">
      <mt-checklist
        v-model="value2"
        :options="options2">
      </mt-checklist>
    </div>
    <div v-if="this.$route.params.id == 3">
      <mt-radio
        v-model="value3"
        :options="options3">
      </mt-radio>
    </div>

测试
    {{ value1 }}
    {{ value2 }}
    {{ value3 }}
    <div class="btn">提交</div>
  </div>
</template>

<script>
  import Mheader from '../../components/Mheader'

  export default {
    components: {
      Mheader
    },
    data(){
      return {
        value1: [],
        value2: [],
        value3: [],
        options1: [
          {
            label: '绿茶',
            value: '绿茶'
          },
          {
            label: '乌龙',
            value: '乌龙'
          },
          {
            label: '红茶',
            value: '红茶'
          },
          {
            label: '白茶',
            value: '白茶'
          },
          {
            label: '普洱茶',
            value: '普洱茶'
          },
          {
            label: '花茶',
            value: '花茶'
          }
        ],
        options2: [
          {
            label: '玻璃杯',
            value: '玻璃杯'
          },
          {
            label: '飘逸杯',
            value: '飘逸杯'
          },
          {
            label: '功夫茶具',
            value: '功夫茶具'
          },
          {
            label: '紫砂壶',
            value: '紫砂壶'
          }
        ],
        options3: [
          {
            label: '一斤',
            value: '一斤'
          },
          {
            label: '半斤',
            value: '半斤'
          },
          {
            label: '一两泡',
            value: '一两泡'
          },
          {
            label: '视情况而定',
            value: '视情况而定'
          }
        ]
      }
    }
  }
</script>

<style scoped>
  .btn{
    width: 100%;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 1.8rem;
    color: #fff;
    background-color: #B4282D;
  }
</style>
