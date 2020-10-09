<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <!-- 轮播图-->
    <home-swiper :banners="banners"></home-swiper>
    <!-- 推荐栏目-->
    <recommend-view :recommend="recommend"></recommend-view>
    <!-- 本周流行-->
    <feature-view />
    <!--流行新款  注意 tab-control样式有吸顶效果 利用的是css的 sticky-->
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
    ></tab-control>
    <!-- 商品数据展示-->
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "@/components/content/tabcontrol/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";

import { getHomeMultidata, getHomeGoods } from "@/network/home"; //这里用大括号的原因是因为home.js里面导出来的是export  而不是export default

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommend: [],
      //请求首页流行、精品等数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
    };
  },
  components: {
    "nav-bar": NavBar,
    "home-swiper": HomeSwiper,
    "recommend-view": RecommendView,
    "feature-view": FeatureView,
    "tab-control": TabControl,
    "goods-list": GoodsList,
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  methods: {
    /**
     * 事件点击
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    /**
     * 网络请求相关方法
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res.data)
        this.banners = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const pages = this.goods[type].page + 1;
      getHomeGoods(type, pages).then((res) => {
        // console.log("res.data.list", res.data.list);
        this.goods[type].list.push(...res.data.list); //请求回来的数据塞进对应的list里面
        this.goods[type].page += 1; //页码数加1
      });
    },
  },
};
</script>
<style  scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: pink;
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>
