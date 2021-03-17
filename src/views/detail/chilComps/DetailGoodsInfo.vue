<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <!-- 文字部分-->
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>

    <div v-for="item in detailInfo.detailImage" :key="item.key">
      <div class="info-key">{{ item.key }}</div>
      <div class="info-list">
        <img
          v-for="(el, index) in item.list"
          :key="index"
          :src="el"
          @load="imgLoad"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    detailInfo: {
      type: Object,
      default:function() {
        return {};
      },
    },
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0,
    };
  },
  methods: {
    //解决有时候详情页滚动不了的问题（因为better-scroll原本给的高度和后面页面中所有图片加载完毕后的高度不一致，导致后面的图片无法展示，就导致页面无法继续滚动）
    imgLoad() {  //监听到图片加载完成，就开始进行刷新操作
      //方法一：进行判断，如果所有图片都加载完了，那么进行一次回调就可以了
      // if (++this.counter === this.imagesLength) {
      //   this.$emit("imageLoad");
      // }
      //方法二：使用debonce防抖
      // console.log('详情页图片加载完毕')
       this.$emit("imageLoad");
    },
  },
  watch: {
    // detailInfo改变就影响其他数据变化
    detailInfo() {
      //获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-desc {
  padding: 0 15px;
}
.info-desc .desc {
  padding: 15px 0;
  font-size: 14px;
}
.info-desc .start,
.info-desc .end {
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
  position: relative;
}
.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}
.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.info-desc .end::after {
  right: 0;
}
.info-key {
  margin: 10px 0 10px 15px;
  color: #333;
  font-size: 15px;
}
.info-list img {
  width: 100%;
}
</style>
