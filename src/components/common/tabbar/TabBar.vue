<template>

    <div id="tab-bar">
      <slot></slot>
    </div>

</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {};
  },

  components: {},

  computed: {},


  methods: {}
};
</script>
<style scoped>
  @import "../../../assets/css/base.css";

  #tab-bar {
    display: flex;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
  }

</style>
