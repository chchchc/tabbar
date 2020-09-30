<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <!-- 轮播图-->
    <home-swiper :banners="banners"></home-swiper>
     <!-- 推荐栏目-->
    <recommend-view :recommend="recommend"></recommend-view>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import {getHomeMultidata} from '@/network/home'   //这里用大括号的原因是因为home.js里面导出来的是export  而不是export default


export default {
  name:"Home",
  data () {
    return {
      banners:[],
      recommend:[]
    };
  },
  components: {
    'nav-bar':NavBar,
    'home-swiper':HomeSwiper,
    'recommend-view':RecommendView
  },
  created(){
    getHomeMultidata().then(res=>{
      console.log(res.data)
      this.banners = res.data.banner.list
      this.recommend = res.data.recommend.list
    })
  },

  computed: {},

  methods: {}
}

</script>
<style  scoped>
.home-nav{
  background-color: pink;
  color: white;
}
</style>
