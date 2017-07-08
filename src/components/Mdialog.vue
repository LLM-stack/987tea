<template>
  <div>
    <transition name="drop">
    <div class="dialog" v-if="dialog">
      <div class="title"><slot name="title"></slot></div>
      <div class="content"><slot name="content"></slot></div>
      <div class="btn-group">
        <div><slot name="btn"></slot></div>

      </div>
    </div>
    </transition>
    <div class="modal" v-if="dialog" ></div>
  </div>
</template>

<script>
    export default {
        props: {
          dialog: {
            type: Boolean,
            default: false
          }
        }
    }
</script>

<style scoped>
  .dialog{
    padding: 0.5rem;
    width: 75%;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    z-index: 9999;
    box-shadow: 0 19px 60px rgba(0,0,0,.298039), 0 15px 20px rgba(0,0,0,.219608);
    background-color: #fff;
  }
  .modal{
    background-color: rgba(0,0,0,.5);
    height: 100vh;
    width: 100%;
    position: fixed;
    top:0;
    z-index: 999;
  }
  .dialog .title{
    margin-bottom: 0.5rem;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 600;
  }
  .dialog .content{
    color: #777;
    line-height: 1rem;
    font-size: 0.65rem;
    max-height: 15rem;
    overflow: auto;
  }
  .dialog .btn-group{
    color: #B4282D;
    margin-top: 0.4rem ;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .dialog .btn-group > div{
    padding: 0.2rem 1rem;
  }
  .dialog .btn-group > div:active,  .dialog .btn-group > div:hover
  {
    padding: 0.2rem 1rem;
    background-color: #eee;
  }
  .drop-enter-active,.drop-leave-active {
    transition: all .3s ;
  }
  .drop-enter {
    opacity: 0;
    top:40%;
  }
  .drop-leave-active {
    opacity: 0;
    top:60%;
  }
</style>
