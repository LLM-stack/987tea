<template>
  <div>
    <Mheader :show=true>
      <div slot="title">意见箱</div>
    </Mheader>

    <div class="box">
      <textarea class="box-text" placeholder="在这里写下您给我们的意见个建议！十分感谢您对我们的支持" maxlength="300" ></textarea>
      <div class="btn">提交</div>
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
    }
  }
</script>

<style scoped>
  .box{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .box-text,.btn{
    width: 95%;
    margin-top: 0.5rem;
  }
  .box .box-text{
    padding: 0.3rem;
    font-size: 0.6rem;
    height: 6rem;
    resize: none;
    outline: none;
    color: #888;
    border-radius: 0.2rem;
    border: 1px solid #ccc;
  }
  .box .btn{
    padding: 0.3rem 0;
    text-align: center;
    border-radius: 0.2rem;
    color: #ffffff;
    background-color: #B4282D;
  }


</style>
