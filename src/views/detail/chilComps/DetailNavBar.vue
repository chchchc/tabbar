<template>
  <div>
    <!-- 导航栏-->
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="item"
          class="title-item"
          :class="{ actived: index === currentIndex }"
          @click="itemClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  components: {
    NavBar,
  },

  methods:{
    itemClick(index){
      this.currentIndex = index
    },
    backClick(){
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.actived {
  color: pink;
}
.back img{
  margin-top: 12px;
}
</style>
