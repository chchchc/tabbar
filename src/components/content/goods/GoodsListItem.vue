<template>
  <div class="goods-item" @click="itemClick">
    <!-- <img :src="showImages" alt="" @load="imgLoad"> -->
    <!-- 改为使用vue懒加载功能-->
    <img v-lazy="showImages" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:"GoodsListItem",
  data(){
    return{

    }
  },
  props:{
    goodsItem:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  computed:{
    showImages(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  },
  methods:{
    //监听图片加载完毕
    imgLoad(){  //1.在这里准备发射'事件总线'出去，直接给到home组件，然后home组件拿到scroll组件对象
      // console.log('*******', );
      this.$bus.$emit('itemImgLoad')

      //2.当detail页面引用的时候，图片加载完毕时候，
      //就需要区分是home的图片需要刷新，还是detail里面图片需要刷新，
      //所以可以如下使用1.：
      // if(this.$route.path.indexOf('/home')!==-1){
      //   this.$bus.$emit('homeItemImgLoad')  //重命名一下home中原本的方法
      // }else if(this.$route.path.indexOf('/detail')){
      //   this.$bus.$emit('detailItemImgLoad')
      // }
      //还可以另外使用方法 mixins 详见代码
    },
    itemClick(){
      this.$router.push('/detail/'+this.goodsItem.iid)
    }
  }
}
</script>

<style scoped>
.goods-item{
  padding-bottom:40px;
  position:relative;
  width:48%
}
.goods-item img{
  width: 100%;
  border-radius: 5px;
}
.goods-info{
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }
  .goods-info .price {
    color: #ff5777;
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
