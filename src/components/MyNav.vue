<template>
  <div class="" v-if="user && user.objectId">
    <ul class="nav-ul all-center">
      <li :class="`nav-item ${isWork ? 'nav-item--active' : ''}`">工作台</li>
      <li :class="`nav-item ${isHome ? 'nav-item--active' : ''}`">首页</li>
      <el-dropdown>
        <span class="nav-item hover">
          设置<i class="el-icon-arrow-down el-icon--right" v-if="role != 1"></i>
        </span>
        <el-dropdown-menu slot="dropdown" v-if="role != 1">
          <el-dropdown-item v-for="menu in menus" :key="menu.text">{{menu.text}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown v-if="role === 0">
        <span class="nav-item hover">
          账号<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="active-drop" v-if="nowUser">当前登录：{{nowUser.branchStoreName}}</el-dropdown-item>
          <el-dropdown-item v-for="child in userChildren" :key="child.branchStoreName">{{child.branchStoreName}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters } from 'vuex'
export default Vue.extend({
  name: "MyNav",
  props: {
    msg: String
  },
  computed: {
    isHome() {
      return /^\/$/g.test(this.$route.path)
    },
    isWork() {
      return /^\/work/g.test(this.$route.path)
    },
    ...mapState([
      'menus',
      'userChildren',
      'user',
      'nowUser'
    ]),
    ...mapGetters([ 'role' ])
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav-item {
  font-size: 24px;
  margin-right: 36px;
}
</style>
