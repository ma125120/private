<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style lang="scss">
body {
  background: #f0efef;
  // min-height: 100vh;
}
.bold {
  font-weight: bold;
}
.hover:hover {
  cursor: pointer;
}

body {
  .el-popover {
    min-width: 100px;
    &.my-pop {
      padding: 6px 0;
    }
  }
  .el-popconfirm__action {
    margin-top: 6px;
  }
}
</style>
