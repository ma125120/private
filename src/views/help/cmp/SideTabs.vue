<template>
  <ul class="side-tabs">
    <li class="side-tabs-item--first hover all-center" @click="$pushNamed('workplace')">
      <i class="el-icon-arrow-left" ></i>
      <div>返回工作台</div>
    </li>
    <!-- <li class="side-tabs-item--first"></li> -->
    <li 
      class="side-tabs-item--box" 
      v-for="tab in tabs"
      @click="$emit('update:activeId', tab.id); $emit('change', tab.id)"
      :key="tab.id">
      <div :class="`side-tabs-item ${+activeId === +tab.id ? 'active' : ''}`">{{tab.name}}</div>
    </li>
    <li 
      class="side-tabs-item--box no-border">
      <div class="side-tabs-item">
        <div>客服微信：</div>
        <div>2829672684</div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import routeNames from '@/router/name'
import { mapGetters } from 'vuex'

export default Vue.extend({
  name: "SideTabs",
  props: {
    activeId: {
      type: String || Number
    }
  },
  data() {
    return {
      tabs: [
        { id: '1', name: '常见问题-工作台类', },
        { id: '2', name: '常见问题-账号类', },
        { id: '3', name: '常见问题-设置类', },
        { id: '4', name: '其他常见问题', },
      ],
      id: '1'
    }
  },
  methods: {

  },
  computed: {
    path() {
      return this.$route.path;
    },
    isChild() {
      return this.path.startsWith(this.$routes.child)
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
    border-bottom: 1px solid #bbb;
    &.side-tab-child {
      font-size: 20px;
      &.none-border {
        border-bottom: 0;
      }
    }
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
    .el-icon-arrow-left {
      color: $--color-primary;
    }
  }
}
.side-tabs-item--box.no-border {
  border-bottom: 0;
}
</style>
