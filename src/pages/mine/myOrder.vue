<template>
    <div>
      <Mheader>
          <div slot="title" >{{ this.$route.params.title }}</div>
      </Mheader>
      <div class="tabs">
        <div class="tab" v-for="(item,index) in tabList" :class="{active:item.isactive}" @click="tabActive(index)">{{ item.tabName }}</div>
      </div>

      <div>
        <MorderBox :number="number" :price="price"></MorderBox>
      </div>
      <div>
        <MorderBox :number="number" :price="price"></MorderBox>
      </div>

      <Mfooter :myCenterCurrent=true></Mfooter>
    </div>
</template>

<script>
  import Mheader from '../../components/Mheader'
  import Mfooter from '../../components/Mfooter'
  import MorderBox from '../../components/MorderBox'

  export default {
    components: {
      Mheader,
      Mfooter,
      MorderBox
    },
    data() {
      return {
      	number:12313,
        price: 500,

        tabList: [
          {
            tabName: '全部',
            isactive: false
          },
          {
            tabName: '待付款',
            isactive: false
          },
          {
            tabName: '待发货',
            isactive: false
          },
          {
            tabName: '已发货',
            isactive: false
          },
          {
            tabName: '待评价',
            isactive: false
          }
        ]
      }
    },
    methods: {
      tabActive(i) {
        this.tabList.forEach(function(value,index,array){
          array[index].isactive= false;
        });
        this.tabList[i].isactive = true;
      }
    },
    created() {
    	let index = this.$route.params.tabNum
    	this.tabList[index].isactive = true
    }
  }
</script>

<style scoped>
  .tabs {
    display: flex;
    align-items: center;
    height: 1.6rem;
    margin-bottom: 0.5rem;
    line-height: 1.6rem;
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;
  }
  .tabs .tab {
    text-align: center;
    width: 20%;
    height: 100%;
    border-bottom: 3px solid #fff;
  }

  .tabs .active {
    border-bottom: 3px solid #B4282D;
  }
</style>
