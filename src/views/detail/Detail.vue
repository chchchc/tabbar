<template>
  <div id="detail">
    <!-- 顶部导航栏-->
    <detail-nav-bar class="detail-nav" ref="nav" @titleClick="titleClick"></detail-nav-bar>

    <scroll class="content" ref="scroll" :probe-type="3" @scrollPodition="contentScroll">
      <!-- 轮播图-->
      <detail-swiper :topImages="topImages"></detail-swiper>
      <!-- 商品数据-->
      <detail-base-info :goods="goods"></detail-base-info>
      <!-- 店铺信息-->
      <detail-shop-info :shop="shop"></detail-shop-info>
      <!-- 商品详细数据-->
      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailImageLoad"></detail-goods-info>
      <!-- 获取商品参数信息-->
      <detail-param-info :param-info="paramInfo" ref="params"></detail-param-info>
      <!-- 图片评论信息-->
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <!--商品推荐数据信息展示 -->
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <!-- <toast :message="message" :isShow="isShow"/> -->
    <detail-button-bar @addCart="addCart"/>
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
import DetailButtonBar from "./chilComps/DetailButtonBar";

import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";
// import Toast from "@/components/common/toast/Toast";

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "@/network/detail";
import { debounce } from "@/common/utils";
import { itemListenerMixin } from "@/common/mixins"

import {mapActions} from 'vuex'

export default {
  name: "Detail",
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [], //navbar的点击对应的高度
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      // message:'',
      // isShow:false
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
    GoodsList,
    DetailButtonBar,
    BackTop,
    // Toast
  },

    created() {
    //1.保存存入的数据id
    this.iid = this.$route.params.iid;
    //2.请求数据
    getDetail(this.iid).then((res) => {
      // console.log("res", res);
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
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      // this.$nextTick(() => {
      //   //this.$nextTick的作用是 等待dom更新完毕后再获取对应的item位置y值,
      //   //但是还是不对的  原因是：虽然dom是更新完毕了，但是图片还没有加载完毕（目前获取到的offsetTop不包含其中的图片）
      //   //offsetTop值不对的时候，都是因为图片问题
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   console.log('themeTopYs', this.themeTopYs)
      // })

      //  总结--获取themeTopY值不对的地方
      // 1.created肯定不行，因为还获取不到元素
      // 2.mounted也不行，数据还没获取到
      // 3.获取到数据的回调也不行，Dom还没渲染完
      // 4.$nextTick也不行，因为图片的高度还没计算在此中
      // 5.在图片加载完成以后，获取的高度才是正确的


    });
    //3.请求推荐数据
    getRecommend().then((res) => {
      console.log('res', res)
      this.recommends = res.data.list
    })

    //给getThemeTopY赋值（对给getThemeTopY赋值的操作进行防抖）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log('themeTopYs', this.themeTopYs)
    }, 500)
  },
  mounted() {
    //采用混入....

    //拿到navbar中对应每一项的高度-----但是这样是拿不到的，
    //因为数据还没请求完毕[因为数据请求跟mounted中dom渲染是异步的] 请看this.$nextTick中
    // this.themeTopYs.push(0);
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log('themeTopYs',this.themeTopYs)

  },
  methods: {
    ...mapActions({
      add:'addCart'
    }),

    //监听详情页图片加载完毕
    detailImageLoad() {
      // console.log("图片加载完毕");
      //方法一的。。。。。。但是这样做刷新会比较频繁
      // this.$refs.scroll.refresh();
      //方法二的：
      this.refresh()  //去拿到mixin里面的定义的refresh方法

      this.getThemeTopY()
    },
    titleClick(index) {
      console.log(index)
      this.$refs.scroll.scrollToTo(0, -this.themeTopYs[index], 100)
    },

    contentScroll(position) {
      // console.log('position', position)
      //1.获取Y值
      const positionY = -position.y
      //判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;
      //2.positionY和主题中的值进行对比 [0, 12483, 13244, 13422]
      //3. positionY在0-12483中 index等于0  12483-13244中 index等于1
      // console.log('positionY', positionY)
      let length = this.themeTopYs.length;
      // for (let i = 0; i < length; i++) {
      //   //一、但是下列情况会存在越界
      //   // if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) {
      //   //   console.log('此时的i', i)
      //   // }

      //   // if((i<length-1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i===length-1 && positionY > this.themeTopYs[i])){
      //   //   console.log('i',i)
      //   //   this.currentIndex = i;
      //   // }

      //   //二、不等于的时候再打印---防止赋值太过于频繁
      //   if (this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >= this.themeTopYs[i]))) {
      //     console.log('i', i)
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex
      //   }
      // }

      //三、再次优化-hack做法---利用js的最大值 Number.MAX_VALUE   往数组里面塞 变成[0, 12483, 13244, 13422,Number.MAX_VALUE]
      for (let i = 0; i < length - 1; i++) {
        if (this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i;
          console.log('当前所属主题',i)
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }


    },
    backClick() {
      //通过refs拿到scroll组件对象，可访问里面的属性及方法
      this.$refs.scroll.scrollToTo(0, 0, 500); //第三个参数代表多少毫秒以内回到顶部
    },
    addCart(){
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.dexc = this.goods.desc;
      product.price = this.goods.newPrice;
      product.iid = this.iid;

      // this.$store.commit('addCart',product)
      //普通写法
      // this.$store.dispatch('addCart',product).then(res=>{
      //   console.log(res)
      // })
      //使用mapActions写法
      this.add(product).then(res=>{
        // //普通做法。。。
        // this.message = '加入购物车成功';
        // this.isShow = true;
        // setTimeout(()=>{
        //   this.message = '';
        //   this.isShow = false;
        // },1500)

        //组件封装
        this.$toast.show(res)
      })
    }
  },
  destroyed() {
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },

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
  height: calc(100% - 44px - 49px);
  background-color: #fff;
}
</style>
