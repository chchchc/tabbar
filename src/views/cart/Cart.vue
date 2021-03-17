<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list :cart-list="cartList" />

    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar"

import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  data() {
    return {

    };
  },

  components: {
    NavBar,
    CartList,
    CartBottomBar
  },

  computed: {
    // cartLength(){
    //   return this.$store.state.cartList.length
    // }

    ...mapGetters([
      'cartLength',
      'cartList'
    ])
  },

  methods: {}
}

</script>
<style  scoped>
.nav-bar {
  background-color: pink;
  color: #fff;
  font-weight: 700;
}
</style>
