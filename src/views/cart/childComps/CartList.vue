<template>
  <div class="cart-list">
    <scroll class="content123" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

import Scroll from "@/components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name:"CartList",
  data () {
    return {

    };
  },

  components: {
    Scroll,
    CartListItem
  },

  computed: {
    ...mapGetters(['cartList'])
  },

  methods: {}
}

</script>
<style  scoped>
.cart-list{
  height: 100vh;
  overflow: hidden;
}
.content123{
  height: calc(100% - 44px - 49px);
}
</style>
