<template>
  <div>
    <div class="toast" v-show="isShow">{{message}}</div>
  </div>
</template>

<script>

export default {
  name:"Toast",
  //组件传递参数做法
  // props:{
  //   message:{
  //     type:String,
  //     default:""
  //   },
  //   isShow:{
  //     type:Boolean,
  //     default:false
  //   }
  // },
  data () {
    return {
      message:"",
      isShow:false
    };
  },

  components: {},

  computed: {},

  methods: {
    show(message,duration=2000){
      this.isShow = true;
      this.message = message;
      setTimeout(()=>{
        this.isShow = false;
        this.message = "";
      },duration)
    }
  }
}

</script>
<style  scoped>
.toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background-color: rgba(0,0,0,.8);
    padding: 10px;
    /* border-radius: 5px; */
    transform: translate(-50%,-50%);
    color:#fff;
    z-index: 99;
  }
</style>
