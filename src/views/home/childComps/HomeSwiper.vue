<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imagLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from '@/components/common/swiper' //这里直接用老师封装好的轮播组件
export default {
  name:'HomeSwiper',
  props:{
    banners:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  data(){
    return {
      isLoad:false
    }
  },
  components:{
    'swiper':Swiper,
    'swiper-item':SwiperItem
  },
  methods:{
    //监听图片是否已经加载完毕
    imagLoad(){
      //这里只需要发送一次事件就好了
      if(!this.isLoad){
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }

    }
  }
}
</script>

<style>

</style>
