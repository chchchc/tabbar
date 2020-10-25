<template>
  <div id="app">
    <keep-alive>
      <router-view/>
    </keep-alive>

    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MianTabBar from './components/common/tabbar/MianTabBar'
export default {
  name: 'App',
  components: {
   "main-tab-bar":MianTabBar
  }
}
</script>

<style>
@import "./assets/css/base.css";

</style>
