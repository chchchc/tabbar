<template>
<div class="wrapper" ref="aaa">
   <ul class="content">
    <li>121212</li>
    <li>12121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>1212121212121</li>
    <li>56564</li>
    <li>4654646</li>
    <li>2424241</li>
    <li>535</li>
    <li>3543525252525252525252</li>
    <li>7777</li>
  </ul>
</div>

</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Category",
  data() {
    return {
      scroll:null
    };
  },
  created(){

  },
  mounted(){
    console.log('this.$refs.aaa',this.$refs.aaa)
    //默认情况下BScroll是不可以实时的监听滚动位置
    // probe 侦测
    // 0,1 都是不侦测实时位置
    // 2: 在手指滚动的过程中侦测，手指离开后的惯性滚动过程中不侦测
    // 3: 只要是滚动，都能侦测
    //该插件对结构有严格要求 里面必须只有一个元素 即这里的ul
    this.scroll = new BScroll(this.$refs.aaa,{
      probeType:3,
      pullUpLoad:true
    })
    // this.scroll.on('scroll',(position)=>{
    //   console.log('position',position)
    // })
    this.scroll.on('pullingUp',()=>{
      console.log('上拉加载更多')
    })
  },
  components: {},

  computed: {},

  methods: {},
};
</script>
<style  scoped>
/*原生滚动 */
/* .content {
  height: 150px;
  background-color: green;
  overflow-y: scroll;
} */

/**better-scroll插件使用效果 */
.wrapper{
  height: 180px;
  background-color: green;
  overflow:hidden;
}
</style>
