<template>
  <div class="" v-if="user && user.objectId">
    <ul class="nav-ul all-center">
      <li :class="`nav-item ${isWork ? 'nav-item--active' : ''}`" @click="$pushNamed('workplace')">工作台</li>
      <li :class="`nav-item ${isHome ? 'nav-item--active' : ''}`" @click="$pushNamed('home')">首页</li>
      <el-dropdown :show-timeout="50">
        <span class="nav-item hover" @click="$pushNamed(role === 2 ? 'account' : 'room')">
          设置<i class="el-icon-arrow-down el-icon--right" v-if="role != 2"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <template  v-if="role != 2">
            <el-dropdown-item 
            v-for="menu in menus"
            @click.native="$pushNamed(menu.name)" 
            :key="menu.text">{{menu.text}}</el-dropdown-item>
          </template>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown v-if="role !== 1" :show-timeout="50">
        <span class="nav-item hover">
          账号<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item class="active-drop" v-if="nowUser">当前登录：{{nowUser.branchStoreName}}</el-dropdown-item>
          <el-dropdown-item 
            v-for="child in showChildren"
            @click.native="choose(child)"
            :key="child.objectId">{{child.branchStoreName}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown :show-timeout="50" @click.native="$pushNamed('help')">
        <span class="nav-item hover">
          帮助<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="$pushNamed('help')">常见问题</el-dropdown-item>
          <el-dropdown-item class="extra">
            <div>客服微信：</div>
            <div>2829672684</div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <li :class="`nav-item`" @click="logout1">退出登录</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default Vue.extend({
  name: "MyNav",
  props: {
    msg: String
  },
  methods: {
    logout1() {
      this.logout();
      location.reload();
    },
    ...mapMutations([
      'logout'
    ]),
    ...mapActions([
      'chooseUser'
    ]),
    async choose(child) {
      await this.chooseUser(child)
      // location.reload();
    }
  },
  computed: {
    isHome() {
      return this.$route.path === this.$routes.home
    },
    isWork() {
      return this.$route.path === this.$routes.workplace
    },
    ...mapState([
      'menus',
      'userChildren',
      'user',
      'nowUser'
    ]),
    ...mapGetters([ 'role', 'showChildren' ])
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.nav-item {
  font-size: 24px;
  margin-right: 36px;
  &:hover,
  &--active {
    color: $--color-primary;
    cursor: pointer;
  }
}
</style>
