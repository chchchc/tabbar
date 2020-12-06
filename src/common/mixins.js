import { debounce } from "@/common/utils";

export const itemListenerMixin = {
  data(){
    return{
      itemImgListener:null,
    }
  },
  mounted(){
    //监听item  img图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    //对监听事件进行保存
    this.itemImgListener = () => {
      // console.log("222");
      refresh(1, 2); //传参数只是示例,没有具体参数
    }
    this.$bus.$on("itemImgLoad", this.itemImgListener);
    console.log('我是混入中的东西')
  }
}
