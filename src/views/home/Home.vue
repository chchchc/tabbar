<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <!-- 为了下面的吸顶效果-->
    <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
        class="tabControl"
        v-show="isTabFixed"
      ></tab-control>

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scrollPodition="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 轮播图-->
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <!-- 推荐栏目-->
      <recommend-view :recommend="recommend"></recommend-view>
      <!-- 本周流行-->
      <feature-view />
      <!--流行新款  注意 tab-control样式有吸顶效果 利用的是css的 sticky-->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <!-- 商品数据展示-->
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 返回顶部的图标-->
    <!--因为不可以直接监听组件根元素的点击事件，所以在这里加一个native修饰符就可以监听到组件的原生事件 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "@/components/content/tabcontrol/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "@/network/home"; //这里用大括号的原因是因为home.js里面导出来的是export  而不是export default
import { debounce } from "@/common/utils";

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
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed:false,
      saveY:0,
    };
  },
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    //监听item  img图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemImgLoad", () => {
      // console.log("222");
      refresh(1, 2); //传参数只是示例,没有具体参数
    });
  },
  destroyed(){
    console.log('home --destroyed')
  },
  //当前活跃时
  activated(){
    console.log('actived')
    //home保持当前位置状态
    this.$refs.scroll.scrollToTo(0,this.saveY,0)
    //最好刷新一下 以防跳转回去不能滚动
    this.$refs.scroll.refresh()
  },
  //离开时
  deactivated(){
    console.log('deactived')
    this.saveY = this.$refs.scroll.getScrollY()
    console.log('this.saveY',this.saveY)
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
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      //通过refs拿到scroll组件对象，可访问里面的属性及方法
      this.$refs.scroll.scrollToTo(0, 0, 500); //第三个参数代表多少毫秒以内回到顶部
    },
    contentScroll(position) {
      // console.log('位置',position)
      //判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;
      //决定tabControl是否吸顶（position:fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop
    },
    loadMore() {
      console.log("上拉加载更多1111");
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      //获取tabcontrol的offsetTop
      //所有组件都有一个属性$el：用于获取组件的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      console.log("ewew", this.$refs.tabControl2.$el.offsetTop);
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
        this.$refs.scroll.finishPullUpUp(); //告诉它上次的上次加载已经加载完毕
      });
    },
  },
};
</script>
<style  scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: pink;
  color: white;

  /**下面的样式是在使用浏览器原生滚动时，为了让导航不跟随一起滚动
  现在是使用better-scroll滚动 所以不需要此样式了 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/**css语法中的吸顶效果 */
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
} */
/* .fixed{
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
.tabControl{
  position: relative;
  z-index: 9;
}
.content {
  /** 使用定位的方法 计算除开navbar和tabbar以外的中间内容的高度*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

/** 使用calc语法 计算除开navbar和tabbar以外的中间内容的高度*/
/* .content{
  height: calc(100% - 93px);
  overflow:hidden;
  margin-top:44px
} */
</style>
