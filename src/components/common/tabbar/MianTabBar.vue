<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="pink">
        <img slot="item-icon" src="../../../assets/img/tabbar/my.png" alt="">
        <img slot="item-icon-active" src="../../../assets/img/tabbar/my-active.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="pink">
        <img slot="item-icon" src="../../../assets/img/tabbar/my.png" alt="">
         <img slot="item-icon-active" src="../../../assets/img/tabbar/my-active.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="pink">
        <img slot="item-icon" src="../../../assets/img/tabbar/my.png" alt="">
         <img slot="item-icon-active" src="../../../assets/img/tabbar/my-active.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="pink">
        <img slot="item-icon" src="../../../assets/img/tabbar/my.png" alt="">
         <img slot="item-icon-active" src="../../../assets/img/tabbar/my-active.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>

    </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/TabBarItem'

export default {
  name:"MainTabBar",
  components: {
     'tab-bar': TabBar,
     'tab-bar-item':TabBarItem
  }
}

</script>
<style scoped>

</style>
