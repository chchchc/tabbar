<template>
  <div id="detail">
    <!-- 顶部导航栏-->
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <!-- 轮播图-->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <!-- 商品数据-->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息-->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品详细数据-->
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="ImageLoad"
      ></detail-goods-info>
      <!-- 获取商品参数信息-->
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <!-- 图片评论信息-->
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
      <!--商品推荐数据信息展示 -->
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./chilComps/DetailNavBar";
import DetailSwiper from "./chilComps/DetailSwiper";
import DetailBaseInfo from "./chilComps/DetailBaseInfo";
import DetailShopInfo from "./chilComps/DetailShopInfo";
import DetailGoodsInfo from "./chilComps/DetailGoodsInfo";
import DetailParamInfo from "./chilComps/DetailParamInfo";
import DetailCommentInfo from "./chilComps/DetailCommentInfo";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList"

import { getDetail,getRecommend, Goods, Shop, GoodsParam } from "@/network/detail";
import { debounce } from "@/common/utils";
import {itemListenerMixin} from "@/common/mixins"

export default {
  name: "Detail",
  mixins:[itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  },

  created() {
    //1.保存存入的数据id
    this.iid = this.$route.params.iid;
    //2.请求数据
    getDetail(this.iid).then((res) => {
      console.log("res", res);
      const data = res.result;
      //获取顶部轮播数据
      this.topImages = data.itemInfo.topImages;
      //获取商品数据----先整合好数据再传过去组件---面向对象编程--ES6的class知识点
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      //保存商品的详细数据
      this.detailInfo = data.detailInfo;
      //获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //取出商品评论信息
      if(data.rate.cRate !==0){
        this.commentInfo = data.rate.list[0]
      }

    });
    //3.请求推荐数据
    getRecommend().then((res)=>{
      console.log('res',res)
      this.recommends = res.data.list
    })
  },
  mounted() {
    //采用混入
  },
  methods: {
    ImageLoad() {
      console.log("图片加载完毕");
      this.$refs.scroll.refresh();
    },
  },
  destroyed(){
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
  background-color: #fff;
}
</style>
