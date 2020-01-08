<template>
  <div id="app">
    <router-view></router-view>
    <el-dialog 
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      center
      custom-class="add-dialog my-dialog"
      @close="close"
      :visible.sync="show">
      <div style="font-size: 24px;margin-top: -12px; margin-bottom: 32px">
        <div>你的分店账号：{{ invaildNames }}已到期，账号对应的系统所有功能无法使用，请联系客户经理微信：2829672684续费，否则分店历史数据将在30天后永久删除，无法找回。 </div>
      </div>
      <div class="all-center" style="margin-top: 24px;">
        <el-button type="primary" @click="close" class="dialog-btn">知道了</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, } from 'vuex'
export default {
  name: "app",
  components: {},
  data() {
    return {
      show: false,
    }
  },
  watch: {
    invaildNames(val) {
      // this.show = false;
      this.show = this.isRestore ? false : !!val
    },
    isRestore(val) {
      this.show = val ? false : !!this.invaildNames
    }
  },
  computed: {
    disabled() {
      return !(this.form.userName && this.form.passWord)
    },
    ...mapState([
      'isShowAddChild',
      'user',
      'isRestore',
    ]),
    ...mapGetters([
      'invaildNames',
      'isReload'
    ])
  },
  methods: {
    close() {
      this.show = false;
      this.isReload && (location.reload());
    }
  }
};
</script>

<style lang="scss">
body {
  background: #f0efef;
  min-height: 100vh;
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
