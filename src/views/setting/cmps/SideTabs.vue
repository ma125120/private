<template>
  <ul class="side-tabs">
    <li class="side-tabs-item--first hover all-center" @click="$pushNamed('workplace')">
      <i class="el-icon-arrow-left"></i>
      <div>返回工作台</div>
    </li>
    <li class="side-tabs-item--first"></li>
    <li class="side-tabs-item--box">
      <div :class="`side-tabs-item ${path === $routes.room ? 'active' : ''}`" @click="$pushNamed('room')">房间管理</div>
    </li>
    <li class="side-tabs-item--box">
      <div :class="`side-tabs-item ${path === $routes.staff ? 'active' : ''}`" @click="$pushNamed('staff')">店员管理</div>
    </li>
    <li class="side-tabs-item--box">
      <div 
        :class="`side-tabs-item ${path === $routes.account ? 'active' : ''}`" 
        @click="$pushNamed('account')">账号管理<i class="el-icon-arrow-down el-icon--right"></i></div>
    </li>
    <li class="side-tabs-item--box" v-if="role === 0">
      <div :class="`side-tabs-item ${path === $routes.shop ? 'active' : ''}`" @click="$pushNamed('shop')">管理分店账号</div>
    </li>
    <li class="side-tabs-item--box">
      <div :class="`side-tabs-item ${path === $routes.child ? 'active' : ''}`" @click="$pushNamed('child')">管理子账号</div>
    </li>
    <li class="side-tabs-item--box">
      <div :class="`side-tabs-item ${path === $routes.excel ? 'active' : ''}`" @click="$pushNamed('excel')">数据导出</div>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import routeNames from '@/router/name'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {

  },
  computed: {
    path() {
      return this.$route.path;
    },
    ...mapGetters([
      'role'
    ])
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.side-tabs {
  background: #fff;
  font-size: 24px;
  padding-bottom: 80px;
  min-width: 280px;
}
.side-tabs-item {
  &--box {
    padding: 4px 0;
    border-bottom: 1px solid #bbb;
  }
  padding: 30px 60px;
  
  &:hover,
  &.active {
    cursor: pointer;
    background: $--color-primary;
    color: #fff;
  }
  &--first {
    padding: 30px 60px;
    border-bottom: 1px solid #bbb;
    min-height: 28px;
    &:hover {
      color: $--color-primary;
    }
    i {
      margin-top: 6px;
    }
    .el-icon-arrow-left {
      color: $--color-primary;
    }
  }
  
}
</style>
