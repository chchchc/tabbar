<template>
    <div>
       <!--v-model形式 -->
      <!-- <div class="icon-selector" :class="{'selector-active': checked}" @click="selectItem"> -->
         <!--绑定value形式-->
      <div class="icon-selector" :class="{'selector-active': value}" @click="selectItem">
        <img src="../../assets/img/cart/tick.svg" alt="">
      </div>
    </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
		  value: {
		    type: Boolean,
        default: true
      }
    },
    //听到217节
    data: function () {
		  return {
		    // checked: this.value   <!--绑定value形式去掉-->
      }
    },
    methods: {
      selectItem: function () {
        this.$emit('checkBtnClick')
      }
    },
    watch: {
		  value: function (newValue) {
        // this.checked = newValue;  <!--绑定value形式去掉-->
      }
    }
	}
</script>

<style scoped>
  .icon-selector {
    position: relative;
    margin: 0;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
  }

  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
