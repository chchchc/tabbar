<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll, { PullUpLoad } from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //1.创建的better-scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType, //根据需求实现是否监听
      pullUpLoad: this.pullUpLoad, //根据需求实现是否需要上拉加载
    });
    //2.监听位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log('position')
        //向父组件发出事件，传参
        this.$emit("scrollPodition", position);
      });
    }

    //3.监听上拉事件
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        console.log("上拉加载更多");
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollToTo(x, y, time = 500) {
      console.log("回到顶部点击事件");
      this.scroll && this.scroll.scrollTo(x, y, time); //调用better-scroll自身方法
    },
    finishPullUpUp() {
      console.log("完成上拉加载功能");
      this.scroll && this.scroll.finishPullUp(); //调用better-scroll自身方法
    },
    refresh(a, b) {
      console.log("刷新事件", a, b);
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      console.log('获取当前y轴距离')
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>
