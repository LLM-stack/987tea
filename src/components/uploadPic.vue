<template>
    <div>
      <div class="flex-alig-center up-img">
        <div class="imgs" v-show="images.length >0">
          <ul class="flex-alig-center">
            <li v-for="(img,idx) in images" :key="idx">
              <img :src="img"/>
              <img class="del-img" src="../../assets/images/teaCommunity/del.png"  @click='delImage(idx)'/>
            </li>
          </ul>
        </div>
        <div class="up-btn" v-show="images.length < 4">
          <input  type="file"  @change="previewImage"/>
          <img src="../../assets/images/teaCommunity/upimg.png" />
        </div>
      </div>
    </div>
</template>

<script>
	export default {
		data(){
			return {
        images:[],//预览图片集合
        imgs:[]//file文件集合
      }
    },
    methods:{
      //图片预览
      previewImage(e){
        let  files = e.target.files || e.dataTransfer.files;
        if(!files.length){
          return false;
        }
        for(let i=0;i<files.length;i++){
          let reader=new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload=f=>{
            this.images.push(f.target.result);
          }
          this.imgs.push(files[i]);
        }

      },
      //删除图片
      delImage(index){
        this.imgs.splice(index,1);
        this.images.splice(index,1);
      }
    }
  }
</script>

<style scoped>
</style>
