<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
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
      default(){
        return []
      }
    }
  },
  components:{
    'swiper':Swiper,
    'swiper-item':SwiperItem
  }
}
</script>

<style>

</style>
