import { debounce } from "@/common/utils";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null,
      refresh:null,
    }
  },
  mounted(){
    //监听item  img图片加载完成，对刷新方法进行一下防抖操作，避免刷新的太频繁
    this.refresh = debounce(this.$refs.scroll.refresh, 500);
    //对监听事件进行保存
    this.itemImgListener = () => {
      // console.log("222");
      // console.log('mixins--this',this)   //----this指向的是home组件
      this.refresh(1, 2); //传参数只是示例,没有具体参数
    }
    this.$bus.$on("itemImgLoad", this.itemImgListener);  //方法名，函数
    console.log('我是混入中的东西')
  }
}
