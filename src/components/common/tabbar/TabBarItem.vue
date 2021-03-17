<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String, //当前路径值
    activeColor: {
      //当前父组件传递过来的颜色值
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      //用下方计算属性代替
      // isActive:true,
    };
  },

  computed: {
    isActive() {
      console.log("this.$route", this.$route);   //当前单个的路由对象信息
      //判断当前活跃的路由是否等于传进来的path值 如果等于则代表当前path是属于活跃状态
      return this.$route.path.indexOf(this.path) != -1;
    },
    //做成一个动态的获取父组件传递过来的颜色值去渲染
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      console.log("click点击事件", this.$router);  //this.$router是代表一整个router对象
      console.log('this.path',this.path)
      this.$router.replace(this.path); //导航式编程
    },
  },
};
</script>
<style  scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
/* .active{
    color: red;
  } */
</style>
